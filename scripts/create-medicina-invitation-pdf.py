"""Genera una tarjeta PDF de una página, con enlace en toda la superficie."""
from pathlib import Path
from io import BytesIO
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
URL = 'https://momentlyevents.vercel.app/eventos/graduacion-medicina'
OUT = ROOT / 'public/downloads'
OUT.mkdir(exist_ok=True)
image = Image.open(ROOT / 'public/images/events/graduacion-medicina/hero-gala.png').convert('RGB').resize((1200, 1800), Image.Resampling.LANCZOS)
draw = ImageDraw.Draw(image)
GOLD = '#D9BC78'
IVORY = '#FFF7E5'
def font(name, size):
    return ImageFont.truetype(str(ROOT / 'public/fonts' / name), size)
def centered(text, y, size, color=IVORY, serif=False):
    face = font('cormorant-garamond.ttf' if serif else 'manrope.ttf', size)
    draw.text((600, y), text, font=face, fill=color, anchor='mt', stroke_width=0)

# El fondo existente ya contiene birrete, diploma, estetoscopio y follaje dorado.
draw.rectangle((35,35,1165,1765), outline='#B79A5D', width=2)
centered('F I E S T A  D E  G A L A', 265, 28, GOLD)
centered('MEDICINA', 330, 112, IVORY, True)
centered('G E N E R A C I Ó N  X V I I I', 468, 25, GOLD)
draw.line((455,540,745,540), fill=GOLD, width=2)
centered('Viernes 11 de diciembre de 2026', 585, 30)
centered('6:00 p. m.', 634, 26, GOLD)
centered('Salón Las Flores', 690, 36, IVORY, True)
centered('Comitán de Domínguez, Chiapas', 740, 24)
draw.rounded_rectangle((285,810,915,904), radius=6, fill='#D9BC78', outline='#F1DBA8', width=2)
centered('ABRIR INVITACIÓN', 840, 27, '#211B12')
centered('Toca la tarjeta para ver todos los detalles', 930, 21, IVORY)
centered('UNA NOCHE PARA CELEBRAR LO LOGRADO', 1698, 18, IVORY)
image.save(OUT / 'graduacion-medicina-tarjeta.jpg', quality=93, optimize=True)
stream = BytesIO()
image.save(stream, format='JPEG', quality=93, optimize=True)
jpeg = stream.getvalue()
# PDF nativo con imagen de alta resolución y anotación URI: todo el documento se puede tocar.
objects = []
def add(data):
    objects.append(data if isinstance(data, bytes) else data.encode('ascii'))
add('<< /Type /Catalog /Pages 2 0 R >>')
add('<< /Type /Pages /Kids [3 0 R] /Count 1 >>')
add('<< /Type /Page /Parent 2 0 R /MediaBox [0 0 600 900] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R /Annots [6 0 R] >>')
add(f'<< /Type /XObject /Subtype /Image /Width 1200 /Height 1800 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length {len(jpeg)} >>\nstream\n'.encode() + jpeg + b'\nendstream')
content = b'q\n600 0 0 900 0 0 cm\n/Im0 Do\nQ\n'
add(f'<< /Length {len(content)} >>\nstream\n'.encode() + content + b'endstream')
add(f'<< /Type /Annot /Subtype /Link /Rect [0 0 600 900] /Border [0 0 0] /A << /S /URI /URI ({URL}) >> >>')
add('<< /Title (Medicina GEN XVIII - Invitacion de gala) /Author (Momently Events) /Subject (11 de diciembre de 2026) >>')
pdf = bytearray(b'%PDF-1.4\n%\xe2\xe3\xcf\xd3\n')
offsets = [0]
for i, obj in enumerate(objects, 1):
    offsets.append(len(pdf))
    pdf += f'{i} 0 obj\n'.encode() + obj + b'\nendobj\n'
xref = len(pdf)
pdf += f'xref\n0 {len(objects)+1}\n0000000000 65535 f \n'.encode()
for offset in offsets[1:]:
    pdf += f'{offset:010d} 00000 n \n'.encode()
pdf += f'trailer\n<< /Size {len(objects)+1} /Root 1 0 R /Info 7 0 R >>\nstartxref\n{xref}\n%%EOF\n'.encode()
path = OUT / 'graduacion-medicina-invitacion.pdf'
path.write_bytes(pdf)
assert b'/Subtype /Link' in pdf and URL.encode() in pdf
assert b'/Rect [0 0 600 900]' in pdf
for i, offset in enumerate(offsets[1:], 1):
    assert pdf[offset:].startswith(f'{i} 0 obj'.encode())
print(f'PDF creado: {path} ({len(pdf)//1024} KB). Enlace de página completa verificado: {URL}')
