const puppeteer = require('puppeteer');
const products = require('./products.json');
const fs = require('fs');

async function login(page) {
    await page.goto('https://www.saucedemo.com/');
        await page.type('#user-name', 'standard_user');
        await page.type('#password', 'secret_sauce');
        await page.click('input[type="submit"]');
}


async function addAllProductsToCart() {
    const productNameDivs = await page.$$('div.inventory_item_name');
    for (const productNameDiv of productNameDivs) {
        await page.click('button.btn.btn_primary.btn_small.btn_inventory');
    }
}

describe('Add product', () => {

    beforeEach(async () => {
        browser = await puppeteer.launch({ headless: false });
        page = await browser.newPage();
        await login(page);
    });

    // afterEach(async () => {
    //     await browser.close();
    // });

    it('Add a product to the shopping cart', async () => {
        const text = await page.$eval('span.title', el => el.textContent);
        expect(text).toBe('Products');
        await page.click('#add-to-cart-sauce-labs-backpack')
        const elements = await page.$$('a.shopping_cart_link');
        expect(elements.length).toBeGreaterThan(0);

        
        await browser.close();
    }, 10000)

    it('Add a product to the shopping cart', async () => {
        await addAllProductsToCart();
        

        
        //await browser.close();
    }, 10000)
    

});
