const puppeteer = require('puppeteer');

describe('Login test', () => {
    it('TC1 | successfully login', async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://www.saucedemo.com/');

    await page.type('#user-name', 'standard_user');
    await page.type('#password', 'secret_sauce');
    await page.click('input[type="submit"]');
    const text = await page.$eval('span.title', el => el.textContent);
    expect(text).toBe('Products');   

    await browser.close();
    }, 10000)

    it('TC2 | locked user', async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://www.saucedemo.com/');

    await page.type('#user-name', 'locked_out_user');
    await page.type('#password', 'secret_sauce');
    await page.click('input[type="submit"]');
    const text = await page.$eval('div.error-message-container.error', el => el.textContent);
    expect(text).toBe('Epic sadface: Sorry, this user has been locked out.');  

    await browser.close();
    }, 10000)

    it('TC3 | empty user and password', async () => {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
    
        await page.goto('https://www.saucedemo.com/');

        await page.click('input[type="submit"]');
        const text = await page.$eval('div.error-message-container.error', el => el.textContent);
        expect(text).toBe('Epic sadface: Username is required'); 
    
        await browser.close();
    }, 10000)

    it('TC4 | incorrect user or password', async () => {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

    
        await page.goto('https://www.saucedemo.com/');

        await page.type('#user-name', 'incorrectUser');
        await page.type('#password', 'incorrectPassword');
        await page.click('input[type="submit"]');
        const text = await page.$eval('div.error-message-container.error', el => el.textContent);
        expect(text).toBe('Epic sadface: Username and password do not match any user in this service');
    
        await browser.close();
        }, 10000)
        
        

});