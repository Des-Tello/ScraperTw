const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Cargar las cookies desde el archivo cookies.json que se obtiene de ejecutar el script getcookies.js
    const cookies = JSON.parse(fs.readFileSync('cookies.json', 'utf8'));
    await page.setCookie(...cookies);


    const keywords = ["Shopify", "WooCommerce", "Magento", "PrestaShop", "Jumpseller", "Bsale"];
    // const keywords = ["Shopify"];
    const baseUrl = "https://twitter.com/search?q=";
    // const i = 0;
    const uniqueUsers = new Set();

    for (let keyword of keywords) {
        const searchUrl = `${baseUrl}${encodeURIComponent(keyword)}&src=typed_query`;

        await page.goto(searchUrl, { waitUntil: 'networkidle2' });

        // Esperar a que se cargue la página y los tweets
        await page.waitForSelector('#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div > div > div:nth-child(3) > section > div > div > div:nth-child(8)');

        let tweets = [];
        let previousHeight;
        const startTime = Date.now();


        while (true) {
            const newTweets = await page.evaluate(() => {
                const tweetElements = document.querySelectorAll('#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div > div > div:nth-child(3) > section > div > div > div'); //selector
                const tweetData = [];
                tweetElements.forEach(element => {
                    const usernameElement = element.querySelector('div[dir="ltr"] span span');
                    const tweetTextElement = element.querySelector('div[lang]');

                    if (usernameElement && tweetTextElement) {
                        const username = usernameElement.innerText;
                        const tweetText = tweetTextElement.innerText;
                        tweetData.push({ username, tweetText });
                    }
                });
                return tweetData;
            });

            tweets = tweets.concat(newTweets);

            // Sistema de scroll de la pagina
            previousHeight = await page.evaluate('document.body.scrollHeight');
            await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
            await new Promise(resolve => setTimeout(resolve, 2000)); // Esperar 2 segundos para cargar más tweets
            const newHeight = await page.evaluate('document.body.scrollHeight');

            // Salir del bucle si no se cargan más tweets o si han pasado 10 segundos
            if (newHeight === previousHeight || (Date.now() - startTime) > 10000) {
                break; 
            }
        }


        // console.log(`Tweets que mencionan ${keyword}:`);
        tweets.forEach(tweet => {
            // console.log(`Usuario: ${tweet.username}`);
            // console.log(`Tweet: ${tweet.tweetText}`);
            // console.log('---');
            uniqueUsers.add(tweet.username); // Agregar el nombre de usuario al conjunto de usuarios únicos
        });
    }

    const uniqueUsersList = Array.from(uniqueUsers);
    console.log(uniqueUsersList);
    
    fs.writeFileSync('unique_users.json', JSON.stringify(uniqueUsersList, null, 2));

    await browser.close();

})();