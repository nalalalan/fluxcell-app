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
Y_LAYER = (249, 231, 166)
X_LAYER = (206, 226, 244)
DIM = (172, 52, 48)


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
    # Fork prongs terminate flush at the inside face of the carrier bar.
    renderer.add_box((0.46 + x_shift, -0.42, lower_gap_z), (1.04, 0.11, 0.14), DARK_STEEL)
    renderer.add_box((0.46 + x_shift, 0.42, lower_gap_z), (1.04, 0.11, 0.14), DARK_STEEL)
    renderer.add_box((-1.15 - x_shift, 0, lower_gap_z), (0.14, 1.22, 0.22), CARRIER)
    renderer.add_box((1.15 + x_shift, 0, lower_gap_z), (0.14, 1.22, 0.22), CARRIER)

    # Y-axis upper layer: front/back motion.
    y_shift = 0.34 if exploded else 0.0
    renderer.add_box((0.0, -0.48 - y_shift, upper_gap_z), (0.22, 1.22, 0.16), DARK_STEEL)
    # Fork prongs terminate flush at the inside face of the carrier bar.
    renderer.add_box((-0.42, 0.46 + y_shift, upper_gap_z), (0.11, 1.04, 0.14), DARK_STEEL)
    renderer.add_box((0.42, 0.46 + y_shift, upper_gap_z), (0.11, 1.04, 0.14), DARK_STEEL)
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


def render_state_views() -> Image.Image:
    image = Image.new("RGBA", (1700, 860), BG + (255,))
    draw = ImageDraw.Draw(image)
    draw.text((42, 30), "Two-layer magnetic layout: expanded and contracted", fill=INK, font=font(32, True))
    draw.text(
        (42, 72),
        "Both panels show the X and Y layers together. Orange rods are Alnico; blue rods are NdFeB.",
        fill=MUTED,
        font=font(18),
    )

    legend_y = 114
    draw_rod_symbol(draw, (56, legend_y), ALNICO, "Alnico")
    draw_rod_symbol(draw, (180, legend_y), NDFEB, "NdFeB")

    draw_state_panel(draw, (52, 150, 810, 800), expanded=True)
    draw_state_panel(draw, (890, 150, 1648, 800), expanded=False)
    return image.convert("RGB")


def draw_rod_symbol(
    draw: ImageDraw.ImageDraw,
    center: tuple[int, int],
    color: tuple[int, int, int],
    label: str,
) -> None:
    x, y = center
    draw.ellipse((x - 14, y - 14, x + 14, y + 14), fill=color, outline=shade(color, 0.65), width=4)
    draw.text((x + 24, y - 12), label, fill=INK, font=font(17, True))


def draw_state_panel(
    draw: ImageDraw.ImageDraw,
    bounds: tuple[int, int, int, int],
    expanded: bool,
) -> None:
    x0, y0, x1, y1 = bounds
    panel_bg = (255, 255, 252, 255)
    draw.rounded_rectangle(bounds, radius=14, fill=panel_bg, outline=(213, 207, 198), width=2)

    title = "Expanded / off" if expanded else "Contracted / on"
    span = 3.0 if expanded else 1.5
    overlap = "low keeper overlap" if expanded else "high keeper overlap"
    draw.text((x0 + 28, y0 + 24), title, fill=INK, font=font(28, True))
    draw.text((x0 + 28, y0 + 62), f'{span:.1f}" span, {overlap}', fill=MUTED, font=font(18))

    cx = (x0 + x1) / 2
    cy = y0 + 374
    scale = 166

    def pt(x: float, y: float) -> tuple[int, int]:
        return int(cx + x * scale), int(cy - y * scale)

    def box(
        rect: tuple[float, float, float, float],
        fill: tuple[int, int, int],
        outline: tuple[int, int, int] = LINE,
        alpha: int = 255,
        shadow: bool = False,
    ) -> None:
        a, b, c, d = rect
        pts = [pt(a, b), pt(c, b), pt(c, d), pt(a, d)]
        if shadow:
            off = [(px + 8, py + 8) for px, py in pts]
            draw.polygon(off, fill=(0, 0, 0, 24))
        draw.polygon(pts, fill=fill + (alpha,), outline=outline)

    def rod(x: float, y: float, color: tuple[int, int, int], letter: str) -> None:
        px, py = pt(x, y)
        r = max(13, int(0.125 * scale))
        draw.ellipse((px - r - 4, py - r - 4, px + r + 4, py + r + 4), fill=(255, 255, 252, 235))
        draw.ellipse((px - r, py - r, px + r, py + r), fill=color + (255,), outline=shade(color, 0.55), width=4)
        draw.text((px - 7, py - 13), letter, fill=(20, 20, 18), font=font(23, True))

    # Layer plates: the two orthogonal magnetic gaps share the same footprint, so
    # the schematic offsets them slightly in drawing space while preserving scale.
    ox = 0.11
    oy = -0.11
    box((-0.625 + ox, -0.625 + oy, 0.625 + ox, 0.625 + oy), X_LAYER, (64, 93, 119), 210, True)
    box((-0.625 - ox, -0.625 - oy, 0.625 - ox, 0.625 - oy), Y_LAYER, (132, 112, 45), 210, False)
    draw.text(pt(-0.69, 0.67), "Y", fill=(106, 89, 34), font=font(18, True))
    draw.text(pt(0.59, -0.76), "X", fill=(47, 78, 105), font=font(18, True))

    carrier_t = 0.14
    prong_w = 0.10
    tongue_w = 0.22
    if expanded:
        carrier_outer = 1.50
        keeper_inner = 0.50
    else:
        carrier_outer = 0.75
        keeper_inner = -0.25

    carrier_inner = carrier_outer - carrier_t
    left_inner = -carrier_inner
    right_inner = carrier_inner
    top_inner = carrier_inner
    bottom_inner = -carrier_inner

    # X layer, lower plate level: left center tongue, right fork prongs.
    box((-carrier_outer, -0.58, left_inner, 0.58), CARRIER, (37, 82, 116), 255, True)
    box((right_inner, -0.58, carrier_outer, 0.58), CARRIER, (37, 82, 116), 255, True)
    box((left_inner, -tongue_w / 2, -keeper_inner, tongue_w / 2), DARK_STEEL, (22, 23, 22), 255)
    box((keeper_inner, 0.33, right_inner, 0.33 + prong_w), DARK_STEEL, (22, 23, 22), 255)
    box((keeper_inner, -0.33 - prong_w, right_inner, -0.33), DARK_STEEL, (22, 23, 22), 255)

    # Y layer, upper plate level: top fork prongs, bottom center tongue.
    box((-0.58, top_inner, 0.58, carrier_outer), CARRIER, (37, 82, 116), 255, True)
    box((-0.58, -carrier_outer, 0.58, bottom_inner), CARRIER, (37, 82, 116), 255, True)
    box((-0.34 - prong_w, keeper_inner, -0.34, top_inner), DARK_STEEL, (22, 23, 22), 255)
    box((0.34, keeper_inner, 0.34 + prong_w, top_inner), DARK_STEEL, (22, 23, 22), 255)
    box((-tongue_w / 2, bottom_inner, tongue_w / 2, -keeper_inner), DARK_STEEL, (22, 23, 22), 255)

    # Magnet rods. Two pairs are shown because a full two-axis cell has one
    # Alnico/NdFeB pair per axis.
    rod(-0.23, 0.17, ALNICO, "A")
    rod(0.23, 0.17, NDFEB, "N")
    rod(-0.17, -0.25, ALNICO, "A")
    rod(0.17, -0.25, NDFEB, "N")

    # Dimension line.
    dim_y = y0 + 112
    left = pt(-span / 2, -1.03)[0]
    right = pt(span / 2, -1.03)[0]
    draw.line((left, dim_y, right, dim_y), fill=DIM, width=3)
    draw.line((left, dim_y - 8, left, dim_y + 8), fill=DIM, width=3)
    draw.line((right, dim_y - 8, right, dim_y + 8), fill=DIM, width=3)
    dim_label = f'{span:.1f}"'
    dim_font = font(22, True)
    dim_box = draw.textbbox((0, 0), dim_label, font=dim_font)
    label_x = int((left + right - (dim_box[2] - dim_box[0])) / 2)
    label_y = dim_y - 36
    draw.rounded_rectangle(
        (label_x - 8, label_y - 3, label_x + dim_box[2] - dim_box[0] + 8, label_y + dim_box[3] - dim_box[1] + 5),
        radius=5,
        fill=(255, 255, 252, 245),
    )
    draw.text((label_x, label_y), dim_label, fill=DIM, font=dim_font)



def render_exploded() -> Image.Image:
    image = Image.new("RGBA", (1200, 980), BG + (255,))
    draw = ImageDraw.Draw(image)
    draw.text((42, 34), "Exploded top-down construction view", fill=INK, font=font(32, True))
    draw.text(
        (42, 76),
        "Top-down view. The single center tongue is between Alnico/NdFeB; the fork prongs are outside.",
        fill=MUTED,
        font=font(18),
    )

    cx = 600
    draw_plate_topdown(draw, cx, 176, "top pole plate")
    draw_layer_topdown(draw, cx, 346, "Y layer", "front/back axis", "y")
    draw_plate_topdown(draw, cx, 516, "shared center plate")
    draw_layer_topdown(draw, cx, 684, "X layer", "left/right axis", "x")
    draw_plate_topdown(draw, cx, 852, "bottom pole plate")

    draw_stack_guides(draw, cx)
    return image.convert("RGB")


def draw_plate_topdown(draw: ImageDraw.ImageDraw, cx: int, cy: int, label: str) -> None:
    half = 72
    depth = (12, 10)
    rect = (cx - half, cy - half, cx + half, cy + half)
    shadow = tuple(value + offset for value, offset in zip(rect, depth * 2))
    draw.rounded_rectangle(shadow, radius=3, fill=(0, 0, 0, 24))
    draw.rectangle(rect, fill=STEEL + (255,), outline=LINE, width=2)
    draw.rectangle((cx - half, cy - half, cx + half, cy - half + 18), fill=shade(STEEL, 1.12) + (255,), outline=None)
    label_x = cx + 104
    label_y = cy - 14
    draw.line((cx + half, cy, label_x - 10, label_y + 12), fill=(124, 116, 106), width=1)
    draw_label(draw, (label_x, label_y), label)


def draw_layer_topdown(
    draw: ImageDraw.ImageDraw,
    cx: int,
    cy: int,
    layer: str,
    subtitle: str,
    axis: str,
) -> None:
    layer_color = Y_LAYER if axis == "y" else X_LAYER
    outline = (132, 112, 45) if axis == "y" else (64, 93, 119)
    half = 82
    plate = (cx - half, cy - half, cx + half, cy + half)
    draw.rounded_rectangle((plate[0] + 9, plate[1] + 9, plate[2] + 9, plate[3] + 9), radius=4, fill=(0, 0, 0, 18))
    draw.rectangle(plate, fill=layer_color + (245,), outline=outline, width=2)
    draw.text((cx - 320, cy - 96), layer, fill=INK, font=font(23, True))
    draw.text((cx - 320, cy - 68), subtitle, fill=MUTED, font=font(15, True))

    if axis == "y":
        # Lane order: fork | Alnico | center tongue | NdFeB | fork.
        draw_carrier(draw, (cx - 110, cy - 132, cx + 110, cy - 110))
        draw_carrier(draw, (cx - 110, cy + 110, cx + 110, cy + 132))
        draw_bar(draw, (cx - 62, cy - 110, cx - 44, cy - 14))
        draw_bar(draw, (cx + 44, cy - 110, cx + 62, cy - 14))
        draw_bar(draw, (cx - 12, cy + 14, cx + 12, cy + 110))
        draw_magnet_disc(draw, (cx - 34, cy), ALNICO, "A")
        draw_magnet_disc(draw, (cx + 34, cy), NDFEB, "N")
        draw_part_callout(draw, (cx, cy + 52), (cx + 170, cy + 74), "single center tongue\nbetween A and N")
        draw_part_callout(draw, (cx + 52, cy - 72), (cx + 170, cy - 86), "fork prongs outside\nA/N pair")
    else:
        # Same lane order, rotated 90 degrees.
        draw_carrier(draw, (cx - 132, cy - 110, cx - 110, cy + 110))
        draw_carrier(draw, (cx + 110, cy - 110, cx + 132, cy + 110))
        draw_bar(draw, (cx - 110, cy - 12, cx - 14, cy + 12))
        draw_bar(draw, (cx + 14, cy - 62, cx + 110, cy - 44))
        draw_bar(draw, (cx + 14, cy + 44, cx + 110, cy + 62))
        draw_magnet_disc(draw, (cx, cy - 34), ALNICO, "A")
        draw_magnet_disc(draw, (cx, cy + 34), NDFEB, "N")
        draw_part_callout(draw, (cx - 54, cy), (cx - 404, cy - 28), "single center tongue\nbetween A and N")
        draw_part_callout(draw, (cx + 72, cy + 52), (cx + 170, cy + 68), "fork prongs outside\nA/N pair")


def draw_carrier(draw: ImageDraw.ImageDraw, rect: tuple[int, int, int, int]) -> None:
    x0, y0, x1, y1 = rect
    draw.rectangle((x0 + 6, y0 + 6, x1 + 6, y1 + 6), fill=(0, 0, 0, 26))
    draw.rectangle(rect, fill=CARRIER + (255,), outline=(37, 82, 116), width=2)


def draw_bar(draw: ImageDraw.ImageDraw, rect: tuple[int, int, int, int]) -> None:
    draw.rectangle(rect, fill=DARK_STEEL + (255,), outline=(22, 23, 22), width=2)


def draw_magnet_disc(
    draw: ImageDraw.ImageDraw,
    center: tuple[int, int],
    color: tuple[int, int, int],
    letter: str,
) -> None:
    x, y = center
    radius = 23
    draw.ellipse((x - radius - 5, y - radius - 5, x + radius + 5, y + radius + 5), fill=(255, 255, 252, 245))
    draw.ellipse((x - radius, y - radius, x + radius, y + radius), fill=color + (255,), outline=shade(color, 0.55), width=4)
    draw.text((x - 8, y - 14), letter, fill=(20, 20, 18), font=font(24, True))


def draw_part_callout(
    draw: ImageDraw.ImageDraw,
    anchor: tuple[int, int],
    label_pos: tuple[int, int],
    text: str,
) -> None:
    draw.line((anchor[0], anchor[1], label_pos[0] - 12, label_pos[1] + 16), fill=(124, 116, 106), width=1)
    draw_label(draw, label_pos, text)


def draw_label(draw: ImageDraw.ImageDraw, pos: tuple[int, int], text: str) -> None:
    label_font = font(17, True)
    lines = text.split("\n")
    widths = [draw.textbbox((0, 0), line, font=label_font)[2] for line in lines]
    line_h = draw.textbbox((0, 0), "Ag", font=label_font)[3] + 3
    x, y = pos
    pad_x = 8
    pad_y = 5
    draw.rounded_rectangle(
        (x - pad_x, y - pad_y, x + max(widths) + pad_x, y + line_h * len(lines) + pad_y),
        radius=5,
        fill=(255, 255, 255, 245),
        outline=(211, 204, 194),
        width=1,
    )
    for index, line in enumerate(lines):
        draw.text((x, y + index * line_h), line, fill=INK, font=label_font)


def draw_stack_guides(draw: ImageDraw.ImageDraw, cx: int) -> None:
    for x in (cx - 82, cx + 82):
        draw.line((x, 254, x, 778), fill=(159, 149, 138), width=1)
        for y in range(254, 778, 16):
            draw.line((x, y, x, y + 6), fill=(159, 149, 138), width=2)


def save_all() -> None:
    assets = {
        "cell-3d-states.png": render_state_views(),
        "cell-3d-assembled.png": render_assembled(),
        "cell-3d-exploded.png": render_exploded(),
    }
    for directory in FIGURE_DIRS:
        directory.mkdir(parents=True, exist_ok=True)
        for name, image in assets.items():
            image.save(directory / name, optimize=True)


if __name__ == "__main__":
    save_all()
