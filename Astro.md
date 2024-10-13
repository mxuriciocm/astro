## Fundamentos de Astro

El contenido escrito en el frontmatter (dentro de `---`) es exclusivo para el servidor (Server Only). Esto significa que no se mostrará ni reaccionará en el cliente cuando la aplicación esté desplegada.

Cuando despliegas una página en Astro, por defecto no se carga JavaScript en el cliente. Por lo tanto, si necesitas ejecutar código JavaScript en el lado del cliente, es necesario hacerlo utilizando la etiqueta `<script></script>`. De lo contrario, el código no se ejecutará en tiempo real.

Ejemplo
En el siguiente ejemplo, queremos mostrar la hora actual. En la primera parte del código, el JavaScript está directamente incrustado en el HTML, lo cual funcionará correctamente en el servidor, pero dejará de funcionar una vez la página esté desplegada. Por otro lado, el código dentro de la etiqueta `<script>` seguirá funcionando sin problemas en el entorno de producción.

```js
<p>Momento actual: {new Date().toLocaleTimeString()}</p>
<p id="current-time">Momento actual real:</p>

<script>
  const currentTime: string = new Date().toLocaleTimeString();
  const currentTimeElement = document.querySelector(
    "#current-time"
  ) as HTMLParagraphElement;
  currentTimeElement.innerText = `Momento actual real: ${currentTime}`;
</script>
```

Al desplegar la aplicación, observarás que el primer fragmento de código (Server Only) ya no actualiza en tiempo real, mientras que el segundo fragmento (Client-side Rendering) continúa renderizando correctamente en el cliente.

## Navegación entre páginas

Astro utiliza enrutamiento basado en archivos para generar las URLs finales según el contenido de la carpeta `src/pages/`.
Astro usa elementos HTML estándar `<a>` para navegar entre rutas.

```js
<nav>
  <a href="/">Home Page</a>
  <a href="/about">About</a>
  <a href="/contact">Contact Page</a>
</nav>
```

## Componentes

Los componentes en Astro son bloques de codigo reutilizables que pueden contener codigo HTML, CSS y JavaScript, para crear un componente tienes que hacer en la ruta `src/components/`.
Para utilizar un componente se importa desde el frontmatter `---` y puedes utilizarlos las veces que sean necesarias

## Props

Las props son una forma de pasar datos desde un componente padre a un componente hijo en Astro. Esto permite que los componentes sean más dinámicos y personalizados.
Para definir y utilizar props en un componente, se hace lo siguiente:

```js
---
const { text, onClick } = Astro.props;
---
<button onClick={onClick}>{text}</button>
```

En este ejemplo, text y onClick son props que se pasan al componente. Luego, al usar el componente, puedes pasarle valores para esas props:

```js
---
import Button from './components/Button.astro';
---

<Button text="Click me" onClick={() => alert('Button clicked!')} />

```

## Layouts

Los layouts en Astro son una forma especial de componentes que proporcionan una estructura común para varias páginas. Por ejemplo, si deseas que todas las páginas de tu sitio compartan la misma cabecera, pie de página, o estilos, puedes definir un layout y aplicarlo a tus páginas.
Para crear un layout, se coloca en `src/layouts/`
Ejemplo
En el siguiente ejemplo, se crea un Layout en el cual se importa un componente 'Navbar' y ademas se definen props para personalizar los componentes hijos.

```js
---
import Navbar from "../components/Navbar.astro";
const { name, title } = Astro.props;
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width" />
    <meta name="generator" content={Astro.generator} />
    <title>{title}</title>
  </head>
  <body>
    <Navbar />
    <h1>{name}</h1>
    <main>
      <slot />
    </main>
  </body>
</html>
```

Luego se puede usar el layout en una pagina.

```js
---
import Layout from '../layouts/Layout.astro'
---

<Layout title="About" name="About">
</Layout>
```

## Estilos

Estilizar un componente en Astro es tan fácil como agregar una etiqueta `<style>` directamente dentro del componente o layout. Astro detectará automáticamente el CSS dentro de esta etiqueta y lo aplicará al componente correspondiente.

Las reglas de CSS dentro de un bloque `<style>` en Astro tienen alcance local de forma predeterminada. Esto significa que los estilos solo se aplicarán a los elementos dentro del mismo componente, evitando que afecten a otros componentes del proyecto.

Si necesitas aplicar estilos globales que afecten a todo el proyecto, puedes usar el atributo `is:global` en la etiqueta `<style>`. Los estilos definidos de esta manera se aplicarán a todos los elementos de la página, independientemente del componente en el que se encuentren.

```js
<style>
  /* Estilos locales, solo aplican al componente */
  .btn {
    background-color: blue;
    color: white;
  }
</style>

<style is:global>
  /* Estilos globales, aplican a todo el proyecto */
  body {
    font-family: Arial, sans-serif;
  }
</style>
```

## View Transitions

Las View transitions son una forma de controlar lo que sucede cuando los visitantes navegan entre páginas en tu sitio. La API de View Transitions de Astro te permite agregar funciones opcionales de navegación, como transiciones suaves entre páginas y animaciones, controlar la pila de historial del navegador de las páginas visitadas y evitar actualizaciones completas de la página para persistir algunos elementos y el estado de la página mientras se actualiza el contenido mostrado.

Para utilizar las view transitions, importa y añade el componente `<ViewTransitions />` al `<head>` de la plantilla de tu página.

```js
<head>
  <meta charset="utf-8" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <meta name="viewport" content="width=device-width" />
  <meta name="generator" content={Astro.generator} />
  <title>{title}</title>
  <ViewTransitions />
</head>
```

Esto permitirá que el sitio utilice transiciones suaves entre páginas, mejorando la experiencia del usuario al navegar.

## Página 404

Para crear una página de error 404 personalizada, puedes crear un archivo `404.astro` o `404.md` en la carpeta `src/pages/`. Esto generará una página `404.html` que la mayoría de los servicios de despliegue encontrarán y utilizarán para manejar errores 404 (página no encontrada).

```js
---
// Ejemplo de contenido para una página 404
---

<h1>404 - Página no encontrada</h1>
<p>Lo sentimos, pero la página que buscas no existe.</p>
<a href="/">Volver al inicio</a>
```

Esto asegurará que los usuarios que intenten acceder a una URL inexistente en el sitio vean una página de error amigable y personalizada.

## Páginas Dinámicas

En Astro, puedes crear una página dinámica utilizando un archivo con el formato `[name].astro` dentro de la carpeta `src/pages/`. Este archivo generará una página que espera un argumento dinámico, como name, desde la URL.

El archivo `[name].astro` dentro de `src/pages/` permitirá capturar el parámetro name de la URL.

Para que Astro pueda generar las rutas dinámicas, es necesario definir y exportar una función `getStaticPaths`. Esta función debe devolver un array de rutas posibles (params) y los datos (props) que se pasarán a la página.

```js
export const getStaticPaths = (async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const { results } = (await response.json()) as PokemonListResponse;

  return results.map(({ name, url }) => ({
    params: { name: name },  // Parámetro dinámico en la URL
    props: { name: name, url: url },  // Propiedades que se pasan a la página
  }));
}) satisfies GetStaticPaths;

```

## Estilos Condicionales (class:list)

Astro proporciona una herramienta útil llamada `class:list`, que permite aplicar clases de forma condicional a los elementos HTML, basado en ciertas condiciones lógicas.

El atributo `class:list` actúa de manera similar al atributo `class`, pero permite condicionar la aplicación de clases en función de tus necesidades:

```js
<span class:list={["capitalize", { "text-3xl": isBig }]}>
  #{id}
  {name}
</span>
```

- "capitalize": Esta clase se aplicará de manera incondicional.

- "text-3xl": isBig: Si la condición isBig se evalúa como true, se aplicará la clase text-3xl.

## View Transitions

Astro proporciona una herramienta útil llamada View Transitions, que permite agregar transiciones suaves y animaciones entre páginas para mejorar la experiencia de navegación.

Para activar las View Transitions en tu proyecto de Astro, debes importar el componente `<ViewTransitions>` y colocarlo dentro de la etiqueta `<head>` en tu archivo principal de HTML. Una vez hecho esto, las transiciones estarán activas de forma automática.

```js
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width" />
    <meta name="generator" content={Astro.generator} />
    <title>{title}</title>
    <ViewTransitions></ViewTransitions>
  </head>
</html>
```

Para definir las animaciones entre vistas, debes utilizar el atributo transition:name={name} en los elementos que deseas animar. Este atributo actúa como una clase con un identificador único, que permite a Astro entender y aplicar correctamente las transiciones.

```js
<img transition:name={`${name}-image`}>
```

### Eventos del ciclo de vida 
El enrutador `<ViewTransition />` proporciona varios eventos en el document durante la navegación. Estos eventos proporcionan hooks en el ciclo de vida de la navegación, permitiéndote realizar acciones como mostrar indicadores de que la nueva página está cargado, sobrescribe el comportamiento predeterminado y restablece el estado mientras se completa la navegación.

El proceso de navegación implica una fase de preparación, cuando el nuevo contenido es cargado; una fase de intercambio de DOM, donde el contenido de la página antigua se sustituye por el de la nueva; y una fase de finalización donde los scripts son ejecutados, la carga se informa como completada y se realiza un trabajo de limpieza.

- `astro:before-preparation`
- `astro:after-preparation`
- `astro:before-swap`
- `astro:after-swap`
- `astro:page-load`

## Paginación Estática (`paginate()`)

Astro proporciona una función útil llamada paginate() que permite dividir grandes conjuntos de datos en páginas más pequeñas y manejables. Esto es especialmente útil para blogs, listas de productos, o cualquier otro contenido que necesite ser paginado.
Para utilizar la función `paginate()`, primero debes importar la función desde el paquete de Astro. Luego, puedes definir la cantidad de elementos por página y pasar el conjunto de datos que deseas paginar.

```js
import { paginate } from "astro:content";

const allPosts = await getCollection("posts");
const { pages } = paginate(allPosts, { pageSize: 10 });
```

## Path Alias

Astro permite definir alias de rutas para simplificar la importación de módulos y componentes en tu proyecto. Esto es especialmente útil para evitar rutas relativas largas y confusas.
Para configurar alias de rutas, debes modificar el archivo `tsconfig.json` o `jsconfig.json` en la raíz de tu proyecto.

```js
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@layouts/*": ["src/layouts/*"],
      "@pages/*": ["src/pages/*"]
    }
  }
}
```

Una vez configurados los alias, puedes utilizarlos en tus archivos de Astro para importar módulos y componentes de manera más sencilla.

```js
---
import Header from '@components/Header.astro';
import Footer from '@components/Footer.astro';
import Layout from '@layouts/Layout.astro';
---

```

## Referencia a la API

`Astro.url`: Un objeto URL construido a partir del valor actual de la string URL Astro.request.url. Útil para interactuar con propiedades individuales de la URL de la solicitud, como la ruta o el origen. Sirve para retornar la pagina actual en la que se encuentra el usuario.

```js
const currentPath = Astro.url.pathname;
```

## Colecciones

Se crear en la ruta `src/` y con nombre reservado `content` es decir la ruta seria `src/content/`