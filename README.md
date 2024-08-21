### Generar cookies para poder navegar en la aplicación
Utilizar el codigo `getcookies.js` para poder abrir un navegador e iniciar sesión. Posteriormente se generará un archivo `cookies.json` que utilizaremos más adelante
### Web Scraping que recolecta usuarios en base a alguna palabra o grupos de palabras en tweets
El codigo `scraperCookies.js` hace uso del json obtenido anteriormente, navega y scrollea por tweets resultantes de hacer una busqueda en twitter, el critero para esta busqueda es hasta que no existan mas resultados o hasta que pase un tiempo definido en el codigo.
```js
    if (newHeight === previousHeight || (Date.now() - startTime) > 10000) {
        break; 
    }
```
Finalmente obtendremos otro json `unique_users.json` donde tendremos todos los usuarios que entrega twitter para la busqueda.
