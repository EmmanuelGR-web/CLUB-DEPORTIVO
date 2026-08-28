# Sports Club - Website

## Integrantes
- Emmanuel Gonzalez Rojas

## Descripción breve
Sitio web institucional del Club Deportivo, desarrollado como Trabajo Práctico
de la materia Programación IV (UTN FRT). El sitio presenta la información del club,
sus categorías deportivas, noticias, inscripción de socios y un formulario de contacto.


## Tecnologías utilizadas
- HTML5 semántico
- CSS3 (Flexbox, Grid, variables CSS, Media Queries)
- Git y GitHub para el control de versiones

## FLEXBOX
- En la barra del **ENCABEZADO** (`.barra-header`), para alinear el logo, el
  título y el menú en una misma fila.
- En el **MENU DE NAVEGACION** (`.lista-menu`), para distribuir los enlaces uno
  al lado del otro.
- En la sección de **NOTICIAS** (`.fila-tarjetas`), donde las tarjetas se
  acomodan y se envuelven (`flex-wrap`) según el ancho disponible.
- En el **FORMULARIO DE CONTACTO** (`.formulario`), en columna, para apilar las
  etiquetas y los campos.
- En el **PIE DE PAGINA** (`.contenido-footer`), para centrar el texto y los
  enlaces a redes sociales.

## GRID
- En la sección de **ACTIVIDADES** (`.grilla-tarjetas`),
  usando `grid-template-columns: repeat(4, 1fr)` para mostrar las 4 disciplinas
  en columnas iguales, que se reducen a 2 y luego a 1 columna en pantallas
  más chicas.

## ¿Qué variables CSS creamos?
Definidas en `:root` dentro de `style.css`, con nombres simples y directos:
- **Colores**: `--color-rojo`, `--color-rojo-oscuro`, `--color-negro`,
  `--color-blanco`, `--color-gris-fondo`, `--color-texto`, `--color-texto-claro`.
- **Tipografía**: `--fuente`.
- **Espaciados**: `--espacio-chico`, `--espacio-mediano`, `--espacio-grande`,
  `--espacio-muy-grande`, `--espacio-extra`.
- **Bordes y sombras**: `--borde-radio`, `--sombra`.


## ¿Cómo implementamos el Responsive Design?
- Meta `viewport` en el `<head>` para que el sitio escale bien en los celulares.
- Unidades relativas (`rem`, `%`, `vh`, `fr`) en lugar de valores fijos en píxeles.
- Dos **media queries**:
  - `max-width: 768px`: la grilla de actividades pasa de 4 a 2 columnas.
  - `max-width: 480px`: aparece el botón hamburguesa, el menú se oculta por defecto, la grilla pasa a 1 columna y el hero se achica.
- `flex-wrap` en las tarjetas de noticias, para que se acomoden solas sin
  necesitar una media query extra.

## Estrategias SEO

1. **Palabras clave**: el `<title>`, los `<h1>`/`<h2>` y los textos incluyen
   términos que la gente realmente busca, como "Club Deportivo Tucuman",
   "futbol", "basquetbol", "voley" y "asociate", en vez de frases genéricas
   como "Bienvenidos a nuestro sitio".

2. **Contenido de calidad**: los textos de "Nosotros" y "Actividades" dan
   información concreta y útil (historia del club, días de entrenamiento,
   beneficios de asociarse) en vez de frases vacías.

3. **Optimización de títulos y etiquetas HTML**: `<title>` y
   `<meta name="description">` describen específicamente de qué trata cada
   página, pensados para que el usuario entienda el contenido antes de
   hacer clic.

4. **Optimización de imágenes**:
   (`logo.png`, `banner.jpg`) instead of generic names like `IMG001.jpg`, plus the `alt` attribute in each image.
   
5. **Diseño responsive**: el sitio se adapta a celular, tablet y computadora
   mediante media queries (ver sección de arriba), algo que Google tiene en
   cuenta para el posicionamiento.

6. **Velocidad de carga**: `loading="lazy"` en la imagen del banner, `width`/`height` definidos en las imágenes para
   evitar saltos de layout, y `rel="preconnect"` para acelerar la carga de
   las fuentes de Google Fonts.

7. **Enlaces internos**: Menú de navegación y enlaces que conectan secciones entre sí (por ejemplo, desde
   "Nosotros" hacia "Actividades" e "Inscripción", o desde una noticia hacia
   "Contacto"), ayudando a los usuarios y a los buscadores a recorrer el sitio.

8. **Enlace externo hacia un sitio confiable**: en la sección de
   Contacto se linkea a la Secretaría de Estado de Deportes de Tucumán


## Estructura del proyecto
```
CLUB-DEPORTIVO/
├── img/
├── style.css
├── index.html
└── README.md