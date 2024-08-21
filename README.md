### Generar cookies para poder navegar en la aplicación
Utilizar el código `getcookies.js` para abrir un navegador e iniciar sesión. Posteriormente, se generará un archivo `cookies.json` que se utilizará más adelante.

### Web Scraping para recolectar usuarios en base a palabras clave o grupos de palabras en tweets

El código `scraperCookies.js` utiliza el archivo JSON obtenido anteriormente para navegar y desplazarse por los tweets resultantes de una búsqueda en Twitter. El criterio de búsqueda se establece hasta que no haya más resultados o hasta que transcurra un tiempo definido en el código.

```js
if (newHeight === previousHeight || (Date.now() - startTime) > 10000) {
    break; 
}
```

Finalmente, se obtendrá otro archivo JSON llamado `unique_users.json`, que contendrá todos los usuarios que Twitter proporciona para la búsqueda.

