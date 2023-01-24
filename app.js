const puppeteer = require('puppeteer');
const fs = require('fs');
const chromeXPath = '//*[@id="knowledge-finance-wholepage__entity-summary"]/div[3]/g-card-section/div/g-card-section/div[2]/div[1]/span[1]/span/span[1]';
const tickers = ['AMER3','PETR4','BBAS3'];

async function run()
{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    var datetime = new Date(); 
    var currentdate = "---- " + datetime.getDate() + "/"
                + (datetime.getMonth()+1)  + "/" 
                + datetime.getFullYear() + " "  
                + datetime.getHours() + ":"  
                + datetime.getMinutes() + ":" 
                + datetime.getSeconds() + " ----";
    
    fs.appendFile('history.txt', currentdate+'\n', err => {
        if (err) {
          console.error(err);
        }
    });
    console.log('\n'+currentdate);
    for (var i=0; i < tickers.length; i++){
        await page.goto('https://www.google.com/search?q='+tickers[i]);
        await page.waitForSelector('xpath/'+chromeXPath);
        let element = await page.$('xpath/'+chromeXPath)
        let value = await page.evaluate(el => el.textContent, element)
        console.log(`"${tickers[i]}" valor: R$${value}`)
        fs.appendFile('history.txt', `"${tickers[i]}" valor: R$${value}\n`, err => {
            if (err) {
              console.error(err);
            }
        });
    }    
    
    // await page.screenshot({path: 'test.png', fullPage: true});
    // await browser.close();
    await sleep(60000*5); // 5 minutes
    run();
  }

run();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}