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
