#!/usr/bin/env python3
"""
P& — material plates.

Original art direction, rendered rather than photographed. Every plate is a
material study: a surface, a light and a colour, built from fractal noise,
domain warping and an analytic raking light, then gradient-mapped into one
business's palette and finished with film grain.

These are temporary. They exist so the homepage can be judged as a composition
instead of as a set of grey rectangles, and so the final commissioned
photography has a brief to match. Every plate is listed in PLATES below with
the shot it stands in for.
"""

import numpy as np
from PIL import Image
import os, json

OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'plates')
os.makedirs(OUT, exist_ok=True)

# --------------------------------------------------------------- primitives

def _rng(seed):
    return np.random.default_rng(seed)


def value_noise(h, w, cells, seed):
    """Smooth value noise by bicubic-ish upsample of a coarse lattice."""
    g = _rng(seed).random((cells + 1, cells + 1)).astype(np.float32)
    img = Image.fromarray((g * 255).astype(np.uint8)).resize((w, h), Image.BICUBIC)
    return np.asarray(img, dtype=np.float32) / 255.0


def value_noise_aniso(h, w, cy, cx, seed):
    g = _rng(seed).random((int(cy) + 1, int(cx) + 1)).astype(np.float32)
    img = Image.fromarray((g * 255).astype(np.uint8)).resize((w, h), Image.BICUBIC)
    return np.asarray(img, dtype=np.float32) / 255.0


def fbm_aniso(h, w, seed, cy, cx, octaves=4, gain=0.5):
    """Directional fbm. Long in one axis, tight in the other — fibres, not blobs."""
    out = np.zeros((h, w), np.float32)
    amp, norm = 1.0, 0.0
    for o in range(octaves):
        out += amp * value_noise_aniso(h, w, cy * (2 ** o), cx * (2 ** o), seed + o * 61)
        norm += amp
        amp *= gain
    return out / norm


def fbm(h, w, seed, octaves=6, base=3, gain=0.5, lac=2.0):
    """Fractal brownian motion. The bread and butter of every surface here."""
    out = np.zeros((h, w), np.float32)
    amp, cells, norm = 1.0, base, 0.0
    for o in range(octaves):
        out += amp * value_noise(h, w, int(cells), seed + o * 97)
        norm += amp
        amp *= gain
        cells *= lac
    return out / norm


def ridged(h, w, seed, octaves=5, base=3):
    """Ridged multifractal — gives caustics and veining their sharp spines."""
    out = np.zeros((h, w), np.float32)
    amp, cells, norm = 1.0, base, 0.0
    for o in range(octaves):
        n = value_noise(h, w, int(cells), seed + o * 131)
        out += amp * (1.0 - np.abs(n * 2.0 - 1.0)) ** 2
        norm += amp
        amp *= 0.55
        cells *= 2.0
    return out / norm


def warp(field_fn, h, w, seed, strength=0.18, cells=4):
    """Domain warping. This is what stops a surface looking like a gradient."""
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    dx = (value_noise(h, w, cells, seed + 11) - 0.5) * strength * w
    dy = (value_noise(h, w, cells, seed + 23) - 0.5) * strength * h
    sx = np.clip(xx + dx, 0, w - 1).astype(np.int32)
    sy = np.clip(yy + dy, 0, h - 1).astype(np.int32)
    base = field_fn()
    return base[sy, sx]


def raking_light(h, w, angle_deg=28.0, softness=0.55, origin=0.22):
    """
    A single directional light with real penumbra. `origin` is where along the
    axis the light lands; `softness` how far the shadow takes to close.
    """
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    a = np.deg2rad(angle_deg)
    axis = (xx / w) * np.cos(a) + (yy / h) * np.sin(a)
    axis = (axis - axis.min()) / (axis.max() - axis.min())
    t = (axis - origin) / max(softness, 1e-3)
    return 1.0 / (1.0 + np.exp(t * 6.0 - 1.2))  # logistic falloff


def aperture(h, w, centre=0.62, width=0.055, soft=0.09, vertical=True):
    """A slot of light — the architectural move. One bright band, soft edges."""
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    u = (xx / w) if vertical else (yy / h)
    d = np.abs(u - centre)
    return np.clip(1.0 - (d - width) / max(soft, 1e-3), 0.0, 1.0) ** 1.6


def vignette(h, w, amount=0.30, power=1.5):
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    nx = (xx / w - 0.5) * 2.0
    ny = (yy / h - 0.5) * 2.0
    r = np.sqrt(nx * nx * 0.9 + ny * ny)
    return 1.0 - amount * np.clip(r, 0, 1.6) ** power


def shadow_edge(h, w, angle_deg=34.0, at=0.46, penumbra=0.030, invert=False):
    """
    A cast shadow with a real, narrow penumbra — the hard architectural edge a
    broad falloff can never give you. This is what reads as a room.
    """
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    a = np.deg2rad(angle_deg)
    axis = (xx / w) * np.cos(a) + (yy / h) * np.sin(a)
    axis = (axis - axis.min()) / (axis.max() - axis.min())
    e = np.clip((axis - at) / max(penumbra, 1e-4), -1, 1)
    e = 0.5 + 0.5 * np.sin(e * np.pi / 2)
    return 1.0 - e if invert else e


def _blur(a, radius):
    """Cheap separable blur by downsample/upsample — only used for cavity AO."""
    h, w = a.shape
    s = max(2, int(radius))
    small = Image.fromarray((np.clip(a, 0, 1) * 255).astype(np.uint8)).resize(
        (max(1, w // s), max(1, h // s)), Image.BILINEAR)
    return np.asarray(small.resize((w, h), Image.BILINEAR), np.float32) / 255.0


def shade(H, *, light=(-0.55, -0.70, 0.45), relief=140.0, ambient=0.17,
          diffuse=0.78, spec=0.0, shin=48.0, ao=0.55, ao_radius=26, illum=None):
    """
    Treat the field as a heightfield and actually light it: normals, Lambert,
    Blinn-Phong and a cavity occlusion term. This is the difference between a
    surface and a fog, and it is the whole reason the earlier pass failed.
    """
    gy, gx = np.gradient(H.astype(np.float32))
    nx, ny = -gx * relief, -gy * relief
    nz = np.ones_like(nx)
    inv = 1.0 / np.sqrt(nx * nx + ny * ny + nz * nz)
    nx, ny, nz = nx * inv, ny * inv, nz * inv

    lx, ly, lz = light
    ln = (lx * lx + ly * ly + lz * lz) ** 0.5
    lx, ly, lz = lx / ln, ly / ln, lz / ln

    ndl = np.clip(nx * lx + ny * ly + nz * lz, 0.0, 1.0)

    # cavity occlusion: how far below its neighbourhood a point sits
    cav = np.clip(_blur(H, ao_radius) - H, 0.0, 1.0)
    occ = 1.0 - ao * np.clip(cav * 3.2, 0.0, 1.0)

    lum = ambient * occ + diffuse * ndl * occ

    if spec:
        hx, hy, hz = lx, ly, lz + 1.0
        hn = (hx * hx + hy * hy + hz * hz) ** 0.5
        ndh = np.clip(nx * hx / hn + ny * hy / hn + nz * hz / hn, 0.0, 1.0)
        lum = lum + spec * ndh ** shin

    if illum is not None:
        lum = lum * illum

    return np.clip(lum, 0.0, 1.0)


# ------------------------------------------------------------- colour ramp

def _srgb_to_lin(c):
    c = np.asarray(c, np.float32)
    return np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)


def _lin_to_srgb(c):
    c = np.clip(c, 0.0, 1.0)
    return np.where(c <= 0.0031308, c * 12.92, 1.055 * c ** (1 / 2.4) - 0.055)


def hexf(h):
    h = h.lstrip('#')
    return np.array([int(h[i:i + 2], 16) / 255.0 for i in (0, 2, 4)], np.float32)


def gradient_map(v, stops):
    """
    Map a 0..1 field through a colour ramp, interpolating in LINEAR light so
    the midtones don't go muddy the way a naive sRGB lerp makes them.
    """
    pos = np.array([s[0] for s in stops], np.float32)
    cols = _srgb_to_lin(np.stack([hexf(s[1]) for s in stops]))
    v = np.clip(v, 0.0, 1.0)
    idx = np.clip(np.searchsorted(pos, v, side='right') - 1, 0, len(pos) - 2)
    p0, p1 = pos[idx], pos[idx + 1]
    t = ((v - p0) / np.maximum(p1 - p0, 1e-6))[..., None]
    out = cols[idx] * (1 - t) + cols[idx + 1] * t
    return _lin_to_srgb(out)


def finish(rgb, seed, grain=0.016, warm=0.0):
    """Film grain, weighted to the midtones, plus an optional warm bias."""
    h, w, _ = rgb.shape
    g = _rng(seed + 7777).normal(0, 1, (h, w, 1)).astype(np.float32)
    g = g * grain * (1.0 - np.abs(rgb.mean(axis=2, keepdims=True) - 0.5) * 1.3)
    rgb = rgb + g
    if warm:
        rgb = rgb * np.array([1.0 + warm, 1.0, 1.0 - warm * 0.7], np.float32)
    return np.clip(rgb, 0, 1)


def save(rgb, name, quality=72):
    img = Image.fromarray((rgb * 255).astype(np.uint8))
    p = os.path.join(OUT, name + '.webp')
    img.save(p, 'WEBP', quality=quality, method=6)
    return p, os.path.getsize(p)


# ------------------------------------------------------------------ plates
# Each surface returns a 0..1 luminance field. Colour arrives afterwards, so
# the same material can be re-lit in any business's palette.

def surface_plaster(h, w, seed):
    """Polished plaster. Slow trowel sweeps over a fine, tight tooth."""
    sweep = warp(lambda: fbm(h, w, seed, octaves=4, base=2, gain=0.56), h, w, seed, 0.14, 3)
    tooth = fbm(h, w, seed + 311, octaves=4, base=150, gain=0.48)
    micro = fbm(h, w, seed + 907, octaves=3, base=420, gain=0.5)
    return np.clip(sweep * 0.78 + tooth * 0.16 + micro * 0.06, 0, 1)


def surface_stone(h, w, seed):
    """
    Travertine. Sedimentary bedding runs across the face with elongated voids
    through it. The ridged noise this replaced produced a maze of worm shapes
    that read as embossed vinyl, not as a cut stone face.
    """
    body = fbm(h, w, seed + 7, octaves=5, base=3, gain=0.58)
    beds = fbm_aniso(h, w, seed, cy=80, cx=5, octaves=4, gain=0.56)
    voids = fbm_aniso(h, w, seed + 53, cy=26, cx=9, octaves=3, gain=0.50)
    f = body * 0.50 + beds * 0.32 + voids * 0.18
    return np.clip((f - f.min()) / max(f.max() - f.min(), 1e-6), 0, 1)


def surface_lacquer(h, w, seed):
    """Deep lacquer over a worked ground. Smooth, so the gloss carries it."""
    flow = warp(lambda: fbm(h, w, seed, octaves=4, base=2, gain=0.58), h, w, seed, 0.30, 2)
    ripple = fbm(h, w, seed + 77, octaves=3, base=14, gain=0.45)
    return np.clip(flow * 0.86 + ripple * 0.14, 0, 1)


def surface_textile(h, w, seed):
    """
    Raw silk. Fibres running the long way, slubs across them, and a slow drape
    underneath. Deliberately no periodic thread: a regular lattice renders as
    an embossed panel, which is what the first attempt at this looked like.
    """
    warpf = fbm_aniso(h, w, seed, cy=3, cx=90, octaves=4, gain=0.52)
    weft = fbm_aniso(h, w, seed + 404, cy=60, cx=3, octaves=3, gain=0.5)
    slub = fbm_aniso(h, w, seed + 77, cy=5, cx=260, octaves=2, gain=0.45)
    drape = warp(lambda: fbm(h, w, seed + 91, octaves=4, base=2, gain=0.64), h, w, seed, 0.20, 2)
    fibre = warpf * 0.58 + weft * 0.22 + slub * 0.20
    return np.clip(drape * 0.56 + fibre * 0.44, 0, 1)


def surface_caustics(h, w, seed):
    """Water. Refracted spines over a dark floor — sharp, not hazy."""
    c1 = warp(lambda: ridged(h, w, seed, octaves=4, base=6), h, w, seed, 0.16, 3)
    c2 = warp(lambda: ridged(h, w, seed + 404, octaves=4, base=13), h, w, seed + 9, 0.10, 4)
    net = np.clip(c1 * 0.60 + c2 * 0.40, 0, 1) ** 3.0
    swell = warp(lambda: fbm(h, w, seed + 17, octaves=3, base=2, gain=0.6), h, w, seed, 0.18, 2)
    return np.clip(swell * 0.30 + net * 0.95, 0, 1)


def surface_patina(h, w, seed):
    """Oxidised bronze. Patches with edges, crust in the hollows."""
    blotch = warp(lambda: fbm(h, w, seed, octaves=3, base=4, gain=0.66), h, w, seed, 0.26, 2)
    # terrace it so oxidation reads as discrete patches rather than a haze
    terr = np.floor(blotch * 4.0) / 4.0 + (np.clip(blotch * 4.0 % 1.0, 0, 1) ** 3.4) / 4.0
    crust = ridged(h, w, seed + 71, octaves=5, base=26)
    speck = fbm(h, w, seed + 211, octaves=3, base=220, gain=0.45)
    f = terr * 0.74 + (1.0 - crust) * 0.18 + speck * 0.08
    return np.clip((f - f.min()) / max(f.max() - f.min(), 1e-6), 0, 1)



def plate_hall(h, w, seed):
    """
    An interior rather than a surface, built from an actual pinhole
    projection rather than from stripes.

    A colonnade stands along one side of a room at a fixed world X, running
    back in z. Because the piers are projected properly, their tops and
    bottoms converge on the horizon instead of running the full height of the
    frame, which is the cue that makes a run of verticals read as a building.
    The floor is reprojected back to world depth, so the gaps between the
    piers throw bands of daylight across it at constant z — the one effect
    that cannot be faked with a gradient.

    Returned as finished luminance: a constructed scene, not a heightfield,
    so it is composed flat rather than shaded.
    """
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    u, v = xx / w, yy / h

    f = 0.52                 # focal length
    vx, vy = 0.70, 0.46      # vanishing point
    X_COL = -0.95            # the colonnade's plane
    W_PIER = 0.115           # pier width and depth in world units
    Y_FLOOR, Y_CEIL = 0.52, 1.05
    zs = [1.02 * (1.30 ** i) for i in range(13)]

    below, above = v > vy, v < vy
    # reproject floor and ceiling pixels back to world depth
    z_f = f * Y_FLOOR / np.maximum(v - vy, 1e-4)
    z_c = f * Y_CEIL / np.maximum(vy - v, 1e-4)

    # the daylight beyond the colonnade, seen down the room
    lum = 0.06 + 0.80 * np.exp(-((u - vx) ** 2) / 0.075) * np.exp(-((v - vy) ** 2) / 0.085)

    # shadow bands sit at constant depth, because the piers run along z
    sh_f = np.zeros((h, w), bool)
    sh_c = np.zeros((h, w), bool)
    for z in zs:
        sh_f |= np.abs(z_f - z) < W_PIER * 0.5
        sh_c |= np.abs(z_c - z) < W_PIER * 0.5

    # floor: brighter near the colonnade, falling away with depth
    fall = np.clip(1.0 / (1.0 + z_f * 0.42), 0, 1)
    side = np.clip(1.0 - (u - (vx - 0.1)) * 0.55, 0.25, 1.25)
    floor = (0.10 + 0.78 * fall * side) * np.where(sh_f, 0.26, 1.0)
    lum = np.where(below, floor, lum)

    # ceiling: the same logic, much darker — light does not reach it
    cfall = np.clip(1.0 / (1.0 + z_c * 0.7), 0, 1)
    ceil = (0.05 + 0.22 * cfall) * np.where(sh_c, 0.45, 1.0)
    lum = np.where(above, ceil, lum)

    # the piers, projected
    for z in zs:
        uc = vx + f * X_COL / z
        hw = f * W_PIER * 0.5 / z
        vt = vy - f * Y_CEIL / z
        vb = vy + f * Y_FLOOR / z
        near = np.clip(1.0 / (1.0 + z * 0.5), 0, 1)
        band = (np.abs(u - uc) < hw) & (v > vt) & (v < vb)
        # the face is turned away from the light
        lum = np.where(band, 0.055 + 0.10 * near, lum)
        # its inboard edge catches the daylight from the next gap
        lit = (np.abs(u - (uc + hw)) < np.maximum(hw * 0.26, 0.0008)) & (v > vt) & (v < vb)
        lum = np.where(lit, 0.40 + 0.50 * near, lum)

    # nothing in a real room is perfectly smooth
    tooth = fbm(h, w, seed + 404, octaves=4, base=110, gain=0.5)
    drift = fbm(h, w, seed, octaves=4, base=5, gain=0.58)
    lum = lum * (0.91 + 0.13 * tooth) * (0.94 + 0.11 * drift)
    return np.clip(lum, 0, 1)



# --------------------------------------------------------- constructed rooms
# The plates above are materials, photographed flat. These three are places,
# built from analytic geometry, because the brief asks for human purpose and a
# surface cannot carry it. No people are drawn: a generated face would be both
# obviously synthetic and a misrepresentation. What they show instead is
# evidence of someone working — a lit bench, a wall of drawings, morning light
# across a floor — which is as close to human as honest generation gets.

def _rect(u, v, cx, cy, rw, rh, ang, ar):
    """Signed test for a rotated rectangle, in frame coordinates."""
    ca, sa = np.cos(-ang), np.sin(-ang)
    dx, dy = (u - cx) * ar, v - cy
    x, y = dx * ca - dy * sa, dx * sa + dy * ca
    return (np.abs(x) < rw * 0.5) & (np.abs(y) < rh * 0.5)


def plate_studio(h, w, seed):
    """
    A working surface under a task light. The pool of warm light, a few boards
    and a rule laid across them, deep fall-off everywhere else.
    """
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    u, v = xx / w, yy / h
    ar = w / h
    horizon = 0.40

    lum = np.full((h, w), 0.035, np.float32)

    # the wall behind, falling away
    lum = np.where(v < horizon, 0.03 + 0.10 * (v / horizon) ** 1.6, lum)
    # a wall down the left, so the dark side the type sits on is a surface

    # the bench, receding
    depth = np.clip((v - horizon) / (1 - horizon), 1e-3, 1)
    bench = 0.10 + 0.40 * depth ** 0.7
    lum = np.where(v >= horizon, bench, lum)

    # the pool of light from an off-frame lamp, up and to the left
    pool = np.exp(-(((u - 0.68) * ar * 0.78) ** 2 + ((v - 0.70) * 1.5) ** 2) / 0.30)
    lum = lum + 0.92 * pool * np.where(v >= horizon, 1.0, 0.35)

    # boards and paper on the bench, each with a contact shadow beneath it.
    # These replace the surface rather than tinting it — compositing them over
    # the pool of light is what made the first attempt look like glass.
    for (cx, cy, rw, rh, ang, tone) in (
        (0.63, 0.66, 0.34, 0.23, -0.055, 0.92),   # the big sheet
        (0.82, 0.79, 0.27, 0.16, 0.045, 0.80),    # paper over it
        (0.52, 0.88, 0.23, 0.12, -0.02, 0.70),    # a board, half out of frame
        (0.93, 0.62, 0.14, 0.10, 0.09, 0.26),     # something dark — a device
    ):
        sh = _rect(u, v, cx + 0.014, cy + 0.019, rw * 1.03, rh * 1.06, ang, ar)
        lum = np.where(sh, lum * 0.38, lum)
        top = _rect(u, v, cx, cy, rw, rh, ang, ar)
        lum = np.where(top, tone * (0.16 + 0.88 * pool), lum)

    # a drawn line and a block on the big sheet, so it is not a blank card
    for (lx, ly, lw) in ((0.59, 0.62, 0.17), (0.59, 0.655, 0.11), (0.59, 0.69, 0.14)):
        mark = _rect(u, v, lx, ly, lw, 0.006, -0.055, ar)
        lum = np.where(mark, lum * 0.42, lum)
    block = _rect(u, v, 0.715, 0.655, 0.07, 0.075, -0.055, ar)
    lum = np.where(block, lum * 0.52, lum)

    # a steel rule laid across, catching a hard specular line
    rule = _rect(u, v, 0.70, 0.755, 0.46, 0.011, -0.05, ar)
    lum = np.where(rule, 0.18 + 0.86 * pool, lum)

    # a cylinder standing at the back of the bench — a jar of pencils
    cyl = (np.abs((u - 0.40) * ar) < 0.055) & (v > 0.47) & (v < 0.64)
    cshade = 0.22 + 0.55 * np.exp(-(((u - 0.418) * ar) ** 2) / 0.0016)
    lum = np.where(cyl, cshade * (0.30 + 0.70 * pool), lum)

    tooth = fbm(h, w, seed + 51, octaves=4, base=90, gain=0.5)
    grainy = fbm(h, w, seed, octaves=4, base=6, gain=0.56)
    lum = lum * (0.90 + 0.15 * tooth) * (0.93 + 0.12 * grainy)
    return np.clip(lum, 0, 1)


def plate_wall(h, w, seed):
    """
    A wall of pinned sheets in raking light. The evidence of thinking, rather
    than a picture of someone doing it.
    """
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    u, v = xx / w, yy / h
    ar = w / h
    rng = _rng(seed)

    rake = raking_light(h, w, angle_deg=28, softness=0.62, origin=0.12)
    lum = 0.10 + 0.34 * rake

    # Pinned by hand, so: mixed formats, real overlap, and marks that differ
    # from sheet to sheet. A regular grid of identical cards reads as a
    # filing system, which is what the first attempt looked like.
    sheets = []
    for c in range(4):
        n = int(rng.integers(2, 4))
        for r in range(n):
            land = bool(rng.random() < 0.38)
            rw = float(rng.uniform(0.15, 0.23)) * (1.25 if land else 0.92)
            rh = float(rng.uniform(0.17, 0.27)) * (0.72 if land else 1.08)
            cx = (c + 0.5) / 4 + float(rng.normal(0, 0.034))
            cy = (r + 0.5) / n + float(rng.normal(0, 0.040))
            sheets.append((cx, cy, rw, rh, float(rng.normal(0, 0.030))))
    rng.shuffle(sheets)

    for (cx, cy, rw, rh, ang) in sheets:
        light = 0.38 + 0.60 * float(np.interp(cx, [0, 1], [1.0, 0.32]))
        sh = _rect(u, v, cx + 0.006, cy + 0.010, rw * 1.04, rh * 1.06, ang, ar)
        lum = np.where(sh, lum * 0.46, lum)
        sheet = _rect(u, v, cx, cy, rw, rh, ang, ar)
        lum = np.where(sheet, light * (0.80 + 0.30 * rake), lum)

        kind = int(rng.integers(0, 3))
        if kind == 0:                      # a block of lines, like notes
            for k in range(int(rng.integers(3, 6))):
                mark = _rect(u, v, cx - rw * 0.10, cy - rh * 0.26 + k * rh * 0.13,
                             rw * float(rng.uniform(0.28, 0.62)), rh * 0.026, ang, ar)
                lum = np.where(mark, lum * 0.50, lum)
        elif kind == 1:                    # an image area and a caption
            img = _rect(u, v, cx, cy - rh * 0.10, rw * 0.72, rh * 0.46, ang, ar)
            lum = np.where(img, lum * 0.44, lum)
            cap = _rect(u, v, cx - rw * 0.14, cy + rh * 0.26, rw * 0.42, rh * 0.028, ang, ar)
            lum = np.where(cap, lum * 0.52, lum)
        else:                              # a diagram: a frame and a diagonal
            fr = _rect(u, v, cx, cy, rw * 0.62, rh * 0.50, ang, ar)
            inr = _rect(u, v, cx, cy, rw * 0.56, rh * 0.42, ang, ar)
            lum = np.where(fr & ~inr, lum * 0.48, lum)
            for k in range(3):
                mark = _rect(u, v, cx, cy - rh * 0.05 + k * rh * 0.10,
                             rw * 0.44, rh * 0.022, ang + 0.14, ar)
                lum = np.where(mark, lum * 0.55, lum)

    tooth = fbm(h, w, seed + 7, octaves=4, base=140, gain=0.48)
    lum = lum * (0.92 + 0.13 * tooth)
    return np.clip(lum, 0, 1)


def plate_dawn(h, w, seed):
    """
    Morning light through a window, falling obliquely across a floor.

    The first version cast the light dead centre and symmetrically, which read
    as a CGI runway — perfect symmetry is the tell. Real window light lands at
    an angle and drifts across the floor as it comes toward you, and the
    opening itself is a bloom in a wall rather than a crisp rectangle hanging
    in space. Both are fixed here.

    The warmest plate in the set, and the only optimistic one.
    """
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    u, v = xx / w, yy / h
    ar = w / h
    horizon = 0.33

    lum = np.full((h, w), 0.055, np.float32)
    # the far wall
    lum = np.where(v < horizon, 0.045 + 0.10 * (1 - v / horizon) ** 1.5, lum)

    depth = np.clip((v - horizon) / (1 - horizon), 1e-3, 1)
    lum = np.where(v >= horizon, 0.075 + 0.17 * depth ** 0.85, lum)

    # the cast light: a skewed quad. It starts right and walks left as it
    # nears the camera, which is what an oblique shaft actually does.
    centre = 0.655 - 0.40 * depth
    half = 0.045 + 0.30 * depth
    d = np.abs(u - centre)
    core = np.clip(1.0 - (d - half * 0.72) / (half * 0.42), 0, 1)
    inside = (v >= horizon) & (core > 0)
    lum = np.where(inside, lum + 0.92 * core * (0.40 + 0.60 * depth ** 0.45), lum)

    # the window's bars, thinner than before, running with the cast
    t = (u - centre) / np.maximum(half, 1e-4)
    for b_ in (-0.46, 0.08, 0.60):
        bar = inside & (np.abs(t - b_) < 0.030)
        lum = np.where(bar, lum * 0.62, lum)
    for tt in (0.38, 0.72):
        tb = inside & (np.abs(depth - tt) < 0.014)
        lum = np.where(tb, lum * 0.66, lum)

    # the opening: a tall doorway set into the far wall, standing on the floor
    # line. A plain ellipse read as a glowing orb and a hard rectangle read as
    # a canvas hung in the dark, so this is a superellipse — square-ish with
    # eased corners — with the mullions carried across it.
    wx = 0.655
    wtop, wbot = horizon - 0.235, horizon + 0.005
    wcy = (wtop + wbot) * 0.5
    sx = np.abs((u - wx) * ar / 0.082)
    sy = np.abs((v - wcy) / ((wbot - wtop) * 0.5))
    se = sx ** 5 + sy ** 5
    pane = np.clip((1.18 - se) / 0.60, 0, 1) ** 0.6
    # the same bars, continued up through the opening
    for b_ in (-0.46, 0.08, 0.60):
        pane = np.where(np.abs((u - wx) * ar / 0.082 - b_) < 0.075, pane * 0.72, pane)
    lum = np.where(v < horizon + 0.01, np.maximum(lum, pane), lum)
    # the light it throws onto the wall around itself
    lum = lum + 0.30 * np.exp(-se / 6.0) * np.where(v < horizon + 0.01, 1.0, 0.25)

    # a wall plane down the left, so the room has a side
    wall = np.clip((0.16 - u) / 0.16, 0, 1) ** 1.3
    lum = lum * (1.0 - 0.52 * wall)

    tooth = fbm(h, w, seed + 19, octaves=4, base=110, gain=0.5)
    drift = fbm(h, w, seed, octaves=4, base=5, gain=0.58)
    lum = lum * (0.91 + 0.14 * tooth) * (0.94 + 0.11 * drift)
    return np.clip(lum, 0, 1)


def surface_cyanotype(h, w, seed):
    """
    A drafting sheet. Paper tooth, a fine grid, and the arcs and setting-out
    lines of a real drawing — the only plate with deliberate geometry in it.
    """
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    paper = fbm(h, w, seed, octaves=5, base=6, gain=0.5)
    wash = warp(lambda: fbm(h, w, seed + 5, octaves=4, base=2, gain=0.62), h, w, seed, 0.22, 2)

    return np.clip(paper * 0.30 + wash * 0.70, 0, 1)


def cyanotype_ink(h, w, seed):
    """
    The draughtsman's marks: a setting-out grid, struck arcs, a dimension run.
    Kept separate from the paper so the ink sits ON the sheet rather than being
    lit as if it were a groove in it.
    """
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    u, v = xx / w, yy / h
    ar = w / h
    ink = np.zeros((h, w), np.float32)

    mod = min(h, w) / 16.0
    thin = max(1.0, min(h, w) / 1400.0)
    gx = np.abs((xx % mod) - mod / 2) < thin
    gy = np.abs((yy % mod) - mod / 2) < thin
    ink += (gx | gy).astype(np.float32) * 0.10

    for (cx, cy, r, wgt) in ((0.16, 1.06, 0.78, 0.40), (0.95, -0.10, 0.62, 0.34),
                             (0.54, 0.46, 0.26, 0.44)):
        d = np.sqrt(((u - cx) * ar) ** 2 + (v - cy) ** 2)
        ink += (np.abs(d - r) < 0.0016 * ar).astype(np.float32) * wgt

    run = (np.abs(v - 0.80) < 0.0012) & (u > 0.12) & (u < 0.70)
    ink += run.astype(np.float32) * 0.42
    for t in (0.12, 0.70):
        tick = (np.abs(u - t) < 0.0010 * ar) & (np.abs(v - 0.80) < 0.016)
        ink += tick.astype(np.float32) * 0.42

    return np.clip(ink, 0, 1)


# ------------------------------------------------------------ compositions

PALETTES = {
    # ground-up ramps: shadow -> body -> light. The lead colour sits mid-ramp
    # so it reads as the material's own colour rather than as a tint laid over.
    'pand':      [(0.0, '#0a0a0a'), (0.34, '#3a352f'), (0.68, '#b4aa9c'), (1.0, '#f6f2ea')],
    'group':     [(0.0, '#2b2721'), (0.34, '#6d6659'), (0.70, '#cec5b7'), (1.0, '#faf8f5')],
    'powxd':     [(0.0, '#0b0406'), (0.38, '#4a0718'), (0.70, '#8c0b2d'), (0.90, '#c9637c'), (1.0, '#f3e4e8')],
    'crafted':   [(0.0, '#14160f'), (0.34, '#3c4434'), (0.64, '#667464'), (0.86, '#b8ae7e'), (1.0, '#f0e4c6')],
    'nexus':     [(0.0, '#04100f'), (0.40, '#0f3d3e'), (0.72, '#2c6f6a'), (0.90, '#8fc0b4'), (1.0, '#eaf4ef')],
    'atelier':   [(0.0, '#050d0c'), (0.30, '#07322e'), (0.58, '#0d6b62'), (0.82, '#6aa89a'), (1.0, '#dfe9e0')],
    'blueprint': [(0.0, '#070e16'), (0.34, '#15395b'), (0.66, '#43688c'), (0.88, '#a9bccd'), (1.0, '#eef1f4')],
}

PLATES = []


def compose(name, h, w, surface, palette, *, seed, stands_for, material,
            illum=None, vig=0.30, grain=0.016, warm=0.0, gamma=1.0,
            direct=False, ink=None):
    """
    Shade the surface, gradient-map it, grain it. `material` carries the
    physical parameters — relief, how much it takes a specular, how deep the
    cavities go — which is what separates plaster from lacquer from water.
    """
    s = surface(h, w, seed)
    lum = s if direct else shade(s, illum=illum, **material)
    if direct and illum is not None:
        lum = np.clip(lum * (0.45 + 0.55 * illum), 0, 1)
    if ink is not None:
        lum = np.clip(lum - ink, 0, 1)
    lum = np.clip(lum, 0, 1) ** gamma
    lum = lum * vignette(h, w, amount=vig)
    rgb = gradient_map(np.clip(lum, 0, 1), palette)
    rgb = finish(rgb, seed, grain=grain, warm=warm)
    p, size = save(rgb, name)
    PLATES.append({'file': os.path.basename(p), 'px': f'{w}x{h}',
                   'kb': round(size / 1024), 'stands_for': stands_for})
    print(f'  {os.path.basename(p):<30} {w}x{h:<6} {size/1024:6.0f} KB')
    return p


# Material parameters. Relief is the headline: high relief reads as rough
# stone, low relief as something polished where gloss does the describing.
MAT = {
    'plaster':  dict(light=(-0.62, -0.42, 0.40), relief=130, ambient=0.14,
                     diffuse=0.80, spec=0.05, shin=26, ao=0.60, ao_radius=30),
    'stone':    dict(light=(-0.50, -0.66, 0.38), relief=105, ambient=0.30,
                     diffuse=0.70, spec=0.06, shin=22, ao=0.42, ao_radius=28),
    'lacquer':  dict(light=(-0.70, -0.38, 0.34), relief=90, ambient=0.10,
                     diffuse=0.46, spec=0.85, shin=120, ao=0.30, ao_radius=34),
    'silk':     dict(light=(-0.74, -0.30, 0.34), relief=200, ambient=0.14,
                     diffuse=0.56, spec=0.54, shin=34, ao=0.46, ao_radius=30),
    'water':    dict(light=(-0.34, -0.74, 0.46), relief=120, ambient=0.09,
                     diffuse=0.52, spec=0.78, shin=90, ao=0.34, ao_radius=26),
    'bronze':   dict(light=(-0.66, -0.48, 0.36), relief=230, ambient=0.13,
                     diffuse=0.68, spec=0.40, shin=52, ao=0.68, ao_radius=20),
}


def hero_illum(h, w, *, edge_angle, edge_at, slot, slot_w, soft, vert=True):
    """
    The architectural light: most of the wall in shadow, one hard-ish edge
    where the opening falls, and a narrow slot of daylight.
    """
    sh = shadow_edge(h, w, angle_deg=edge_angle, at=edge_at, penumbra=soft)
    glow = raking_light(h, w, angle_deg=edge_angle, softness=0.55, origin=edge_at - 0.10)
    slot_l = aperture(h, w, centre=slot, width=slot_w, soft=0.055, vertical=vert)
    base = 0.14 + 0.52 * sh + 0.34 * glow * sh
    return np.clip(base + slot_l * 0.95 * (0.35 + 0.65 * sh), 0, 1.6)


def build():
    print('plates:')

    # ---- 01 hero. A plaster wall, one opening off-frame left, one slot of
    # daylight. Warm neutral and mostly dark, so the red mark is the only
    # colour in the opening frame.
    compose('hero-wide', 1125, 2000, surface_plaster, PALETTES['pand'],
            illum=hero_illum(1125, 2000, edge_angle=24, edge_at=0.30,
                             slot=0.735, slot_w=0.012, soft=0.045),
            material=MAT['plaster'], seed=1041, vig=0.36, warm=0.014,
            gamma=1.10, stands_for='IMG 01 — hero. Architectural interior, raking daylight.')

    # Mobile is composed, not squeezed: the slot moves into frame and the
    # shadow edge turns to run across rather than down.
    compose('hero-tall', 1600, 1000, surface_plaster, PALETTES['pand'],
            illum=hero_illum(1600, 1000, edge_angle=66, edge_at=0.34,
                             slot=0.63, slot_w=0.022, soft=0.050),
            material=MAT['plaster'], seed=1041, vig=0.30, warm=0.014,
            gamma=1.06, stands_for='IMG 01m — hero, mobile composition.')

    # ---- 02 the group. A cut stone face, top-lit, no drama.
    compose('group-tall', 1500, 1200, surface_stone, PALETTES['group'],
            illum=np.clip(0.12 + 0.88 * raking_light(1500, 1200, angle_deg=72,
                                                     softness=0.46, origin=0.26), 0, 1),
            material=MAT['stone'], seed=2207, vig=0.16, warm=0.010, gamma=0.88,
            stands_for='IMG 02 — the group. Cut stone, material detail.')

    # ---- 03 the portfolio. One material, one light, one palette each.
    biz = [
        ('powxd', surface_lacquer, 'lacquer', 3301,
         'Lacquer. Deep burgundy, hard specular.',
         dict(edge_angle=30, edge_at=0.26, slot=0.78, slot_w=0.009, soft=0.070),
         dict(vig=0.34, gamma=1.06)),
        ('crafted', surface_textile, 'silk', 3407,
         'Linen. Sage, gold in the highlight.',
         dict(edge_angle=50, edge_at=0.24, slot=0.30, slot_w=0.016, soft=0.085, vert=False),
         dict(vig=0.26, gamma=0.96, warm=0.018)),
        ('nexus', surface_caustics, 'water', 3511,
         'Water. Refracted light over a dark floor.',
         dict(edge_angle=12, edge_at=0.18, slot=0.78, slot_w=0.022, soft=0.110, vert=False),
         dict(vig=0.36, gamma=1.10)),
        ('atelier', surface_patina, 'bronze', 3617,
         'Patinated bronze. Oxidised, mineral.',
         dict(edge_angle=64, edge_at=0.28, slot=0.70, slot_w=0.011, soft=0.075),
         dict(vig=0.32, gamma=1.30, warm=0.010)),
    ]
    for key, surf, mat, seed, desc, lit, kw in biz:
        compose(f'{key}-wide', 1000, 1600, surf, PALETTES[key],
                illum=hero_illum(1000, 1600, **lit), material=MAT[mat], seed=seed,
                stands_for=f'{key} panel — {desc}', **kw)
        compose(f'{key}-tall', 1500, 1200, surf, PALETTES[key],
                illum=hero_illum(1500, 1200, **{**lit, 'edge_angle': lit['edge_angle'] + 26}),
                material=MAT[mat], seed=seed,
                stands_for=f'{key} panel, portrait — {desc}', **kw)

    # Blueprint is ink on paper, not a lit surface, so it is composed flat.
    for suffix, (ph, pw) in (('wide', (1000, 1600)), ('tall', (1500, 1200))):
        compose(f'blueprint-{suffix}', ph, pw, surface_cyanotype, PALETTES['blueprint'],
                illum=raking_light(ph, pw, angle_deg=40, softness=0.90, origin=0.05),
                ink=cyanotype_ink(ph, pw, 3723) * 0.30, material=MAT['plaster'],
                direct=True, seed=3723, vig=0.22, gamma=0.92, grain=0.012,
                stands_for='blueprint panel — Cyanotype. Drafted geometry on paper.')

    # ---- 03b the ethos plate. The one architectural interior in the set.
    for name, (ph, pw) in (('hall-wide', (1125, 2000)), ('hall-tall', (1600, 1050))):
        compose(name, ph, pw, plate_hall,
                [(0.0, '#070706'), (0.30, '#262120'), (0.62, '#7d7265'),
                 (0.86, '#cfc4b3'), (1.0, '#fbf7f0')],
                material=MAT['plaster'], direct=True, seed=5107,
                vig=0.34, warm=0.014, gamma=1.06, grain=0.015,
                stands_for='IMG 07 — ethos. Architectural interior, daylight between piers.')

    # ---- the constructed rooms. Warm ramps throughout: the previous set was
    # handsome and cold, and cold was the note.
    STUDIO = [(0.0, '#090706'), (0.24, '#2a1f17'), (0.54, '#7d6346'),
              (0.80, '#d3bb94'), (1.0, '#fdf7ec')]
    WALLP = [(0.0, '#100d0a'), (0.30, '#3a3028'), (0.62, '#9a8a74'),
             (0.86, '#ded2bd'), (1.0, '#fcf8f1')]
    DAWN = [(0.0, '#0b0906'), (0.22, '#2e2318'), (0.50, '#8a6a42'),
            (0.74, '#dcb882'), (0.90, '#f6e2c2'), (1.0, '#fffaf2')]

    for name, (ph, pw), fn, pal, seed in (
        ('studio-wide', (1125, 2000), plate_studio, STUDIO, 6101),
        ('studio-tall', (1600, 1050), plate_studio, STUDIO, 6101),
        ('wall-tall', (1500, 1200), plate_wall, WALLP, 6203),
        ('wall-wide', (1000, 1600), plate_wall, WALLP, 6203),
        ('dawn-wide', (1125, 2000), plate_dawn, DAWN, 6307),
        ('dawn-tall', (1600, 1050), plate_dawn, DAWN, 6307),
    ):
        compose(name, ph, pw, fn, pal, material=MAT['plaster'], direct=True,
                seed=seed, vig=0.30, warm=0.022, gamma=1.0, grain=0.014,
                stands_for=f'{name} — constructed room, temporary.')

    # ---- 04 contact. Near-dark, one slow sweep. Almost nothing in it.
    compose('close-wide', 900, 2000, surface_plaster,
            [(0.0, '#070707'), (0.46, '#17140f'), (0.80, '#3f372d'), (1.0, '#766a5a')],
            illum=np.clip(0.06 + 0.94 * raking_light(900, 2000, angle_deg=16,
                                                     softness=0.88, origin=0.34), 0, 1),
            material=MAT['plaster'], seed=4801, vig=0.44, grain=0.013, gamma=1.22,
            stands_for='IMG 09 — closing band. Near-dark, single light.')

    with open(os.path.join(OUT, 'register.json'), 'w') as f:
        json.dump(PLATES, f, indent=2)
    total = sum(p['kb'] for p in PLATES)
    print(f'\n  {len(PLATES)} plates, {total} KB total')


if __name__ == '__main__':
    build()
