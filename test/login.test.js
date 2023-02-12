const puppeteer = require('puppeteer');

describe('Login test', () => {
    it('TC1 | successfully login', async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://www.saucedemo.com/');

    await page.type('#user-name', 'standard_user');
    await page.type('#password', 'secret_sauce');
    await page.click('input[type="submit"]'); 

    await browser.close();
    })

    it('TC2 | locked user', async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://www.saucedemo.com/');

    await page.type('#user-name', 'locked_out_user');
    await page.type('#password', 'secret_sauce');
    await page.click('input[type="submit"]'); 

    await browser.close();
    })

    it('TC3 | empty user and password', async () => {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
    
        await page.goto('https://www.saucedemo.com/');
        await page.click('input[type="submit"]'); 
    
        await browser.close();
        })

});