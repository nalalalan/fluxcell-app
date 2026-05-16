from __future__ import annotations

import math
from dataclasses import dataclass
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
FIGURE_DIRS = [
    ROOT / "paper" / "figures",
    ROOT / "public" / "paper" / "figures",
]

STEEL = (118, 121, 119)
DARK_STEEL = (42, 43, 42)
CARRIER = (211, 232, 250)
ALNICO = (216, 126, 43)
NDFEB = (48, 135, 197)
INK = (34, 31, 28)
MUTED = (102, 94, 84)
LINE = (57, 57, 56)
BG = (250, 249, 245)


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    names = ["segouib.ttf", "segoeuib.ttf"] if bold else ["segoeui.ttf", "arial.ttf"]
    for name in names:
        path = Path("C:/Windows/Fonts") / name
        if path.exists():
            return ImageFont.truetype(str(path), size)
    return ImageFont.load_default()


def shade(color: tuple[int, int, int], factor: float) -> tuple[int, int, int]:
    return tuple(max(0, min(255, int(channel * factor))) for channel in color)


@dataclass
class Face:
    points: list[tuple[float, float, float]]
    color: tuple[int, int, int]
    outline: tuple[int, int, int] = LINE


class IsoRenderer:
    def __init__(
        self,
        width: int,
        height: int,
        yaw: float = 38,
        pitch: float = 24,
        scale: float = 220,
        origin: tuple[int, int] = (0, 0),
    ):
        self.width = width
        self.height = height
        self.yaw = math.radians(yaw)
        self.pitch = math.radians(pitch)
        self.scale = scale
        self.origin = origin
        self.faces: list[Face] = []
        self.labels: list[tuple[tuple[float, float, float], str, tuple[int, int], tuple[int, int, int]]] = []

    def rotate(self, point: tuple[float, float, float]) -> tuple[float, float, float]:
        x, y, z = point
        cy, sy = math.cos(self.yaw), math.sin(self.yaw)
        x1 = cy * x - sy * y
        y1 = sy * x + cy * y
        cp, sp = math.cos(self.pitch), math.sin(self.pitch)
        y2 = cp * y1 - sp * z
        z2 = sp * y1 + cp * z
        return x1, y2, z2

    def project(self, point: tuple[float, float, float]) -> tuple[float, float]:
        x, _depth, z = self.rotate(point)
        return self.width / 2 + self.origin[0] + x * self.scale, self.height / 2 + self.origin[1] - z * self.scale

    def depth(self, point: tuple[float, float, float]) -> float:
        return self.rotate(point)[1]

    def add_box(
        self,
        center: tuple[float, float, float],
        size: tuple[float, float, float],
        color: tuple[int, int, int],
        outline: tuple[int, int, int] = LINE,
    ) -> None:
        cx, cy, cz = center
        sx, sy, sz = (value / 2 for value in size)
        corners = {
            "000": (cx - sx, cy - sy, cz - sz),
            "001": (cx - sx, cy - sy, cz + sz),
            "010": (cx - sx, cy + sy, cz - sz),
            "011": (cx - sx, cy + sy, cz + sz),
            "100": (cx + sx, cy - sy, cz - sz),
            "101": (cx + sx, cy - sy, cz + sz),
            "110": (cx + sx, cy + sy, cz - sz),
            "111": (cx + sx, cy + sy, cz + sz),
        }
        faces = [
            (["000", "100", "110", "010"], 0.78),
            (["001", "011", "111", "101"], 1.10),
            (["000", "001", "101", "100"], 0.93),
            (["010", "110", "111", "011"], 0.86),
            (["000", "010", "011", "001"], 0.82),
            (["100", "101", "111", "110"], 0.98),
        ]
        for keys, factor in faces:
            self.faces.append(Face([corners[key] for key in keys], shade(color, factor), outline))

    def add_cylinder_z(
        self,
        center: tuple[float, float, float],
        radius: float,
        height: float,
        color: tuple[int, int, int],
        segments: int = 28,
        outline: tuple[int, int, int] = LINE,
    ) -> None:
        cx, cy, cz = center
        bottom = cz - height / 2
        top = cz + height / 2
        lower = []
        upper = []
        for i in range(segments):
            angle = 2 * math.pi * i / segments
            x = cx + radius * math.cos(angle)
            y = cy + radius * math.sin(angle)
            lower.append((x, y, bottom))
            upper.append((x, y, top))
        for i in range(segments):
            nxt = (i + 1) % segments
            factor = 0.82 + 0.22 * max(0, math.cos(2 * math.pi * i / segments - self.yaw))
            self.faces.append(Face([lower[i], lower[nxt], upper[nxt], upper[i]], shade(color, factor), outline))
        self.faces.append(Face(upper, shade(color, 1.12), outline))
        self.faces.append(Face(list(reversed(lower)), shade(color, 0.76), outline))

    def label(
        self,
        anchor: tuple[float, float, float],
        text: str,
        offset: tuple[int, int],
        color: tuple[int, int, int] = INK,
    ) -> None:
        self.labels.append((anchor, text, offset, color))

    def render(self, title: str | None = None, subtitle: str | None = None) -> Image.Image:
        aa = 3
        canvas = Image.new("RGB", (self.width * aa, self.height * aa), BG)
        draw = ImageDraw.Draw(canvas)

        sorted_faces = sorted(
            self.faces,
            key=lambda face: sum(self.depth(point) for point in face.points) / len(face.points),
        )
        for face in sorted_faces:
            pts = [(x * aa, y * aa) for x, y in [self.project(point) for point in face.points]]
            draw.polygon(pts, fill=face.color)
            draw.line(pts + [pts[0]], fill=face.outline, width=max(1, aa))

        if title:
            draw.text((36 * aa, 30 * aa), title, fill=INK, font=font(28 * aa, True))
        if subtitle:
            draw.text((36 * aa, 68 * aa), subtitle, fill=MUTED, font=font(15 * aa))

        small = font(16 * aa, True)
        for anchor, text, offset, color in self.labels:
            x, y = self.project(anchor)
            tx = x + offset[0]
            ty = y + offset[1]
            box = draw.textbbox((tx * aa, ty * aa), text, font=small)
            pad = 6 * aa
            rect = (box[0] - pad, box[1] - pad // 2, box[2] + pad, box[3] + pad // 2)
            draw.rounded_rectangle(rect, radius=5 * aa, fill=(255, 255, 255), outline=(211, 204, 194), width=aa)
            draw.line([(x * aa, y * aa), (tx * aa, ty * aa)], fill=(124, 116, 106), width=aa)
            draw.text((tx * aa, ty * aa), text, fill=color, font=small)

        return canvas.resize((self.width, self.height), Image.Resampling.LANCZOS)


def add_two_axis_cell(renderer: IsoRenderer, exploded: bool = False) -> None:
    plate_size = (1.25, 1.25, 0.25)
    lower_gap_z = 0.4375
    upper_gap_z = 1.3125
    plate_z = [0.0, 0.875, 1.75]

    if exploded:
        plate_z = [-0.65, 0.85, 2.35]
        lower_gap_z = 0.05
        upper_gap_z = 1.55

    for z in plate_z:
        renderer.add_box((0, 0, z), plate_size, STEEL)

    # X-axis lower layer: left/right motion.
    x_shift = 0.34 if exploded else 0.0
    renderer.add_box((-0.48 - x_shift, 0.0, lower_gap_z), (1.22, 0.22, 0.16), DARK_STEEL)
    renderer.add_box((0.52 + x_shift, -0.42, lower_gap_z), (1.18, 0.11, 0.14), DARK_STEEL)
    renderer.add_box((0.52 + x_shift, 0.42, lower_gap_z), (1.18, 0.11, 0.14), DARK_STEEL)
    renderer.add_box((-1.15 - x_shift, 0, lower_gap_z), (0.14, 1.22, 0.22), CARRIER)
    renderer.add_box((1.15 + x_shift, 0, lower_gap_z), (0.14, 1.22, 0.22), CARRIER)

    # Y-axis upper layer: front/back motion.
    y_shift = 0.34 if exploded else 0.0
    renderer.add_box((0.0, -0.48 - y_shift, upper_gap_z), (0.22, 1.22, 0.16), DARK_STEEL)
    renderer.add_box((-0.42, 0.52 + y_shift, upper_gap_z), (0.11, 1.18, 0.14), DARK_STEEL)
    renderer.add_box((0.42, 0.52 + y_shift, upper_gap_z), (0.11, 1.18, 0.14), DARK_STEEL)
    renderer.add_box((0, -1.15 - y_shift, upper_gap_z), (1.22, 0.14, 0.22), CARRIER)
    renderer.add_box((0, 1.15 + y_shift, upper_gap_z), (1.22, 0.14, 0.22), CARRIER)

    if exploded:
        # Lower X-layer magnet pair.
        renderer.add_cylinder_z((0, -0.20, lower_gap_z), 0.125, 0.625, ALNICO)
        renderer.add_cylinder_z((0, 0.20, lower_gap_z), 0.125, 0.625, NDFEB)
        # Upper Y-layer magnet pair.
        renderer.add_cylinder_z((-0.20, 0, upper_gap_z), 0.125, 0.625, ALNICO)
        renderer.add_cylinder_z((0.20, 0, upper_gap_z), 0.125, 0.625, NDFEB)
        renderer.label((0.48, 0.48, plate_z[2] + 0.14), "top pole plate", (72, -32))
        renderer.label((0.50, -0.50, plate_z[1] + 0.14), "shared center plate", (72, 10))
        renderer.label((0.48, 0.48, plate_z[0] + 0.14), "bottom pole plate", (72, 34))
        renderer.label((-0.20, 0, upper_gap_z + 0.32), "Alnico", (-136, -42), ALNICO)
        renderer.label((0.20, 0, upper_gap_z + 0.32), "NdFeB", (48, -46), NDFEB)
        renderer.label((0.0, 1.28 + y_shift, upper_gap_z), "Y-layer fork prongs", (-182, -54))
        renderer.label((-1.18 - x_shift, 0, lower_gap_z), "X-layer center tongue", (-222, 26))


def add_opaque_exterior(renderer: IsoRenderer) -> None:
    # Exterior view only: the paper's opaque view shows the top plate, carriers,
    # and protruding steel keepers. Magnets and internal gaps stay hidden.
    z = 0.0
    renderer.add_box((0, 0, z + 0.26), (1.25, 1.25, 0.25), STEEL)

    renderer.add_box((0, 1.08, z + 0.04), (1.42, 0.16, 0.16), CARRIER)
    renderer.add_box((0, -1.08, z + 0.04), (1.42, 0.16, 0.16), CARRIER)
    renderer.add_box((1.08, 0, z + 0.02), (0.16, 1.42, 0.16), CARRIER)
    renderer.add_box((-1.08, 0, z + 0.02), (0.16, 1.42, 0.16), CARRIER)

    renderer.add_box((0, -0.80, z + 0.18), (0.16, 0.74, 0.14), DARK_STEEL)
    renderer.add_box((-0.38, 0.80, z + 0.20), (0.10, 0.70, 0.12), DARK_STEEL)
    renderer.add_box((0.38, 0.80, z + 0.20), (0.10, 0.70, 0.12), DARK_STEEL)
    renderer.add_box((-0.80, 0, z + 0.16), (0.74, 0.16, 0.12), DARK_STEEL)
    renderer.add_box((0.80, -0.38, z + 0.14), (0.70, 0.10, 0.12), DARK_STEEL)
    renderer.add_box((0.80, 0.38, z + 0.14), (0.70, 0.10, 0.12), DARK_STEEL)

    renderer.label((0.45, 0.42, z + 0.36), "top pole plate", (84, -44))
    renderer.label((1.18, 0.18, z + 0.18), "carrier bars", (76, 12))
    renderer.label((-0.82, 0, z + 0.24), "steel keepers", (-198, 20))


def render_assembled() -> Image.Image:
    image = Image.new("RGB", (1600, 760), BG)
    draw = ImageDraw.Draw(image)
    draw.text((42, 34), "FluxCell two-axis cell: assembled exterior", fill=INK, font=font(32, True))
    draw.text(
        (42, 74),
        "Opaque 3D schematic of the visible object: top pole plate, carrier bars, and protruding steel keepers.",
        fill=MUTED,
        font=font(17),
    )

    scale = 225
    cx, cy = 800, 420
    depth = (18, -14)

    def xy(x: float, y: float) -> tuple[int, int]:
        return int(cx + x * scale), int(cy - y * scale)

    def rect_points(rect: tuple[float, float, float, float]) -> list[tuple[int, int]]:
        x0, y0, x1, y1 = rect
        return [xy(x0, y0), xy(x1, y0), xy(x1, y1), xy(x0, y1)]

    def draw_prism(rect: tuple[float, float, float, float], color: tuple[int, int, int]) -> None:
        pts = rect_points(rect)
        off = [(x + depth[0], y + depth[1]) for x, y in pts]
        draw.polygon([pts[1], off[1], off[2], pts[2]], fill=shade(color, 0.78), outline=LINE)
        draw.polygon([pts[2], off[2], off[3], pts[3]], fill=shade(color, 0.88), outline=LINE)
        draw.polygon(pts, fill=color, outline=LINE)

    # Carrier bars.
    draw_prism((-0.72, 1.02, 0.72, 1.14), CARRIER)
    draw_prism((-0.72, -1.14, 0.72, -1.02), CARRIER)
    draw_prism((1.02, -0.72, 1.14, 0.72), CARRIER)
    draw_prism((-1.14, -0.72, -1.02, 0.72), CARRIER)

    # Protruding steel keepers.
    draw_prism((-0.08, -1.03, 0.08, -0.16), DARK_STEEL)
    draw_prism((-0.45, 0.16, -0.35, 1.03), DARK_STEEL)
    draw_prism((0.35, 0.16, 0.45, 1.03), DARK_STEEL)
    draw_prism((-1.03, -0.08, -0.16, 0.08), DARK_STEEL)
    draw_prism((0.16, -0.45, 1.03, -0.35), DARK_STEEL)
    draw_prism((0.16, 0.35, 1.03, 0.45), DARK_STEEL)

    # Opaque top pole plate, drawn last because it hides the internal magnetic gap.
    draw_prism((-0.625, -0.625, 0.625, 0.625), STEEL)

    label_font = font(18, True)

    def callout(start: tuple[int, int], text_pos: tuple[int, int], text: str) -> None:
        draw.line([start, text_pos], fill=(124, 116, 106), width=1)
        box = draw.textbbox(text_pos, text, font=label_font)
        pad = 7
        draw.rounded_rectangle(
            (box[0] - pad, box[1] - 4, box[2] + pad, box[3] + 4),
            radius=6,
            fill=(255, 255, 255),
            outline=(211, 204, 194),
        )
        draw.text(text_pos, text, fill=INK, font=label_font)

    callout(xy(0.46, 0.48), (1010, 252), "top pole plate")
    callout(xy(1.10, 0.48), (1110, 354), "carrier bars")
    callout(xy(-0.80, 0), (416, 444), "steel keepers")
    return image


def render_exploded() -> Image.Image:
    renderer = IsoRenderer(1600, 920, yaw=39, pitch=24, scale=165, origin=(0, 96))
    add_two_axis_cell(renderer, exploded=True)
    return renderer.render(
        "FluxCell two-axis cell: exploded 3D schematic",
        "Top, shared center, and bottom pole plates are separated so the two magnetic layers are visible.",
    )


def save_all() -> None:
    assets = {
        "cell-3d-assembled.png": render_assembled(),
        "cell-3d-exploded.png": render_exploded(),
    }
    for directory in FIGURE_DIRS:
        directory.mkdir(parents=True, exist_ok=True)
        for name, image in assets.items():
            image.save(directory / name, optimize=True)


if __name__ == "__main__":
    save_all()
