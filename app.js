const puppeteer = require('puppeteer');
const fs = require('fs');
const chromeXPath = '//*[@id="knowledge-finance-wholepage__entity-summary"]/div[3]/g-card-section/div/g-card-section/div[2]/div[1]/span[1]/span/span[1]';
const tickets = ['ITSA4','PETR4','BBAS3'];

async function run()
{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    var currentdate = new Date(); 
    var datetime = "---- " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds() + " ---- \n";
    
    fs.appendFile('history.txt', datetime, err => {
        if (err) {
          console.error(err);
        }
    });
    for (var i=0; i < tickets.length; i++){
        await page.goto('https://www.google.com/search?q='+tickets[i]);
        await page.waitForSelector('xpath/'+chromeXPath);
        let element = await page.$('xpath/'+chromeXPath)
        let value = await page.evaluate(el => el.textContent, element)
        console.log(`"${tickets[i]}" valor: R$${value}`)
        fs.appendFile('history.txt', `"${tickets[i]}" valor: R$${value}\n`, err => {
            if (err) {
              console.error(err);
            }
        });
    }    
    
    // await page.screenshot({path: 'test.png', fullPage: true});
    await browser.close();
}

run();