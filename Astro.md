# Fundamentos de Astro

El contenido escrito en el frontmatter (dentro de `---`) es exclusivo para el servidor (Server Only). Esto significa que no se mostrará ni reaccionará en el cliente cuando la aplicación esté desplegada.

Cuando despliegas una página en Astro, por defecto no se carga JavaScript en el cliente. Por lo tanto, si necesitas ejecutar código JavaScript en el lado del cliente, es necesario hacerlo utilizando la etiqueta `<script></script>`. De lo contrario, el código no se ejecutará en tiempo real.

Ejemplo
En el siguiente ejemplo, queremos mostrar la hora actual. En la primera parte del código, el JavaScript está directamente incrustado en el HTML, lo cual funcionará correctamente en el servidor, pero dejará de funcionar una vez la página esté desplegada. Por otro lado, el código dentro de la etiqueta `<script>` seguirá funcionando sin problemas en el entorno de producción.

```html
<p> Momento actual: {new Date().toLocaleTimeString()} </p>
<p id="current-time"> Momento actual real:</p>


<script>
      const currentTime: string = new Date().toLocaleTimeString();
      const currentTimeElement = document.querySelector(
        "#current-time"
      ) as HTMLParagraphElement;
      currentTimeElement.innerText = `Momento actual real: ${currentTime}`;
</script>
```

Al desplegar la aplicación, observarás que el primer fragmento de código (Server Only) ya no actualiza en tiempo real, mientras que el segundo fragmento (Client-side Rendering) continúa renderizando correctamente en el cliente.

![alt text](image.png)