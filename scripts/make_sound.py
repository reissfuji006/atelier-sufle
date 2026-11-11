"""Soft, sweet soprano-recorder voice by additive synthesis.

Usage: python3 scripts/make_sound.py assets/audio 2 0.46   (output dir, octave factor, beat in seconds)

Recorder acoustics: an almost pure tone (strong fundamental, weak 2nd/3rd harmonics), a short
breathy "chiff" at the attack, a little steady breath noise, light or delayed vibrato.
"""
import subprocess, sys, numpy as np
SR = 44100
rng = np.random.default_rng(3)

def lowpass(x, cutoff):
    a = np.exp(-2 * np.pi * cutoff / SR); y = np.empty_like(x); acc = 0.0
    for i, v in enumerate(x): acc = (1 - a) * v + a * acc; y[i] = acc
    return y

def bandnoise(n, lo, hi):
    w = rng.standard_normal(n)
    return lowpass(w, hi) - lowpass(w, lo)

def note(f0, dur, release=0.16, harmonics=(1, .10, .07, .02, .012), vib_depth=.0025, vib_rate=5.0, chiff=.22, breath=.012):
    n = int((dur + release) * SR); t = np.arange(n) / SR
    # delayed, gently fading-in vibrato + tiny pitch scoop at the start
    vib = vib_depth * np.sin(2 * np.pi * vib_rate * t) * np.clip((t - .22) / .25, 0, 1)
    scoop = -.006 * np.exp(-t / .03)
    phase = 2 * np.pi * np.cumsum(f0 * (1 + vib + scoop)) / SR
    tone = sum(a * np.sin(k * phase) for k, a in enumerate(harmonics, 1))
    # envelope: soft 40 ms rise, slight decay, smooth release
    env = np.clip(t / .04, 0, 1) ** 1.5 * (1 - .12 * np.clip(t / dur, 0, 1))
    rel = int(dur * SR)
    env[rel:] *= np.linspace(1, 0, n - rel) ** 2
    # chiff: short band-limited breath burst at the attack, plus constant soft breath
    ch = bandnoise(n, f0 * 1.5, f0 * 4) * np.exp(-t / .018) * chiff
    br = bandnoise(n, 800, 4000) * breath
    return (tone * env + ch + br * env)

rng2 = np.random.default_rng(7)
ir_len = int(.7 * SR)
ir = rng2.standard_normal(ir_len) * np.exp(-np.arange(ir_len) / (.12 * SR)); ir[:int(.008 * SR)] = 0
ir = lowpass(ir, 5000); ir /= np.sqrt((ir ** 2).sum())

def reverb(x, wet=.07):
    size = 1 << (len(x) + ir_len).bit_length()
    w = np.fft.irfft(np.fft.rfft(x, size) * np.fft.rfft(ir, size), size)[:len(x) + ir_len]
    y = np.concatenate([x, np.zeros(ir_len)]) * (1 - wet) + w * wet * 2
    end = len(y) - np.argmax(np.abs(y[::-1]) > 2e-4)
    return y[:end]

def save(path, y, peak=.5):           # peak -6 dBFS: soft, never loud
    y = y / np.abs(y).max() * peak
    fade = int(.02 * SR); y[-fade:] *= np.linspace(1, 0, fade)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f64le', '-ar', str(SR), '-ac', '1', '-i', '-',
                    '-c:a', 'libmp3lame', '-b:a', '96k', path], input=y.tobytes(), check=True)

BEAT_S = .46

def render(outdir, octave):
    F = {'b4': 493.88 * octave, 'a4': 440.0 * octave, 'g4': 392.0 * octave}
    for k, f in F.items():
        save(f'{outdir}/{k}.mp3', reverb(note(f, .5)))
    BEAT = BEAT_S
    mel = [('b4', 1), ('a4', 1), ('g4', 1), ('a4', 1), ('b4', 1), ('b4', 1), ('b4', 2)]
    total = int((sum(d for _, d in mel) * BEAT + .5) * SR); mix = np.zeros(total); t = 0
    for k, d in mel:
        last = d == 2
        y = note(F[k], d * BEAT - .04 + (.15 if last else 0), release=.25 if last else .07)
        i = int(t * SR); mix[i:i + len(y)] += y[:total - i]; t += d * BEAT
    save(f'{outdir}/mary.mp3', reverb(mix))

if __name__ == '__main__':
    out, octave = sys.argv[1], float(sys.argv[2])
    BEAT_S = float(sys.argv[3]) if len(sys.argv) > 3 else .46
    render(out, octave)
