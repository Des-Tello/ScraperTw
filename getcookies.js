const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Navegar a la página de inicio de sesión de Twitter
    await page.goto('https://twitter.com/login', { waitUntil: 'networkidle2' });

    // Inicio de sesión manual

    // Esperar a que se complete el inicio de sesión
    await page.waitForNavigation();

    // Guardar las cookies en un archivo después del inicio de sesión
    const cookies = await page.cookies();
    fs.writeFileSync('cookies.json', JSON.stringify(cookies));

    console.log('Cookies guardadas');

    await browser.close();
})();
