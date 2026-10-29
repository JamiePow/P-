"""
Trace the P& lockups into SVG paths.

Source: the artwork embedded in the Crafted Studio proposal (image plus soft mask,
recombined). Ink is traced as one path filled with currentColor so a single file
serves both the black and the white lockups.
"""

import subprocess
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

OUT = Path(sys.argv[1])
OUT.mkdir(parents=True, exist_ok=True)
SRC = Path(sys.argv[2])


def trace(png: Path, name: str, scale: int = 4) -> None:
    im = Image.open(png).convert('RGBA')
    a = np.asarray(im).astype(float)
    # Alpha is the artwork; the RGB underneath is a flat ink colour.
    alpha = Image.fromarray(a[..., 3].astype('uint8'), 'L')
    alpha = alpha.resize((alpha.width * scale, alpha.height * scale), Image.LANCZOS)
    alpha = alpha.filter(ImageFilter.GaussianBlur(scale * 0.35))
    mask = np.asarray(alpha) > 120

    ys, xs = np.where(mask)
    pad = scale
    c = mask[
        max(ys.min() - pad, 0): ys.max() + pad + 1,
        max(xs.min() - pad, 0): xs.max() + pad + 1,
    ]
    h, w = c.shape

    pbm = OUT / f'{name}.pbm'
    Image.fromarray(np.where(c, 0, 255).astype('uint8'), 'L').convert('1').save(pbm)
    svgfile = OUT / f'{name}.raw.svg'
    subprocess.run(
        ['potrace', str(pbm), '-s', '-o', str(svgfile), '--flat',
         '-a', '1.2', '-O', '0.4', '-t', str(scale * 2), '-u', '8'],
        check=True,
    )
    text = svgfile.read_text()
    body = text[text.index('<g'): text.rindex('</g>') + 4].replace(
        'fill="#000000"', 'fill="currentColor"'
    )
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}">' + body + '</svg>'
    )
    (OUT / f'{name}.svg').write_text(svg)
    pbm.unlink()
    svgfile.unlink()
    print(f'{name}: {w}x{h}, {len(svg) // 1024}kb')


trace(SRC / 'wordmark.png', 'horizontal')
trace(SRC / 'monogram.png', 'monogram')
