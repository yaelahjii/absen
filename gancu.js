const puppeteer = require('puppeteer');
const readFileSync = require('readline-sync');

(async () => {
  const urlgas = ('https://ksps.co.id/eksternal/site/login');
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: 
    'C:/Program Files/Google/Chrome/Application/chrome.exe'
  });
  const context = browser.defaultBrowserContext();
  context.clearPermissionOverrides();
  context.overridePermissions(urlgas.origin, ['geolocation']);
  const page = await context.newPage();
  //go to url
  await page.goto(urlgas, {waitUntil: 'networkidle2'});
  // Login Form
  const username = readFileSync.question("Username/NIK: ")
  await page.type('#loginform-username', username, {delay: 100});
  const password = readFileSync.question("Password: ")
  await page.type('#loginform-password', password, {delay: 100});
  await page.click('button[type=submit]');
  await page.waitForTimeout(3000);



  await page.click("body > div > div > div > div.card.border-warning.mb-3 > div > a.btn.btn-lg.btn-warning");
  await page.waitForTimeout(3000);
  await page.click("#geocoding_form > div > div > button");
  const granted = await page.evaluate(async () => {
    return (await navigator.permissions.query({name: 'geolocation'})).state;
  });
  console.log('Allow Location:', granted, "/n/");
  console.log('Absen: Masuk/Pulang');

  const absen = readFileSync.question("Absen: ")
  if (absen === 'Masuk') {
    console.log("Memproses absen Masuk . . .")
  
  await page.waitForTimeout(3000);
  await page.keyboard.press('ArrowDown');
  await page.click("#w0 > div:nth-child(4) > button");
  console.log("Sukses Absen Masuk")
  }
  if (absen === 'Pulang') {
    console.log("Memproses absen Pulang . . .")
  }
  await page.waitForTimeout(3000);
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await page.click("#w0 > div:nth-child(4) > button");
  console.log("Sukses Absen Pulang")
  await page.waitForTimeout(3000);

  await browser.close();
})();