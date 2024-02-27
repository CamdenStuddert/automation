const { Builder, Browser, By, Key, until } = require("selenium-webdriver");

let driver;

beforeEach(async () => {
    driver = new Builder().forBrowser(Browser.CHROME).build();
});

afterEach(async () => {
    await driver.quit();
});



test(`Can mark movie as watched`, async () => {
    await driver.get(`http://localhost:3000/`)
    await driver.findElement(By.id(`add-movie-input`)).sendKeys(`The Fall of Beijing`)
    await driver.findElement(By.css(`button[type="submit"]`)).click()
    await driver.findElement(By.css(`input[type="checkbox"]`)).click()
    expect(await driver.findElement(By.id(`message`)).getText()).toContain(`Watched`)
})

test(`Can Delete a movie`, async () => {
    await driver.get(`http://localhost:3000/`)
    await driver.findElement(By.id(`add-movie-input`)).sendKeys(`The Fall of Beijing`)
    await driver.findElement(By.css(`button[type="submit"]`)).click()
    await driver.findElement(By.css(`button[class="delete-btn"]`)).click()
    expect(await driver.findElement(By.id(`message`)).getText()).toContain(`deleted`)
})

test (`Can you add Movies back`, async () => {
    await driver.get(`http://localhost:3000/`)
    await driver.findElement(By.id(`add-movie-input`)).sendKeys(`The Fall of Beijing`)
    await driver.findElement(By.css(`button[type="submit"]`)).click()
    await driver.sleep(1000)
    await driver.findElement(By.css(`input[type="checkbox"]`)).click()
    await driver.sleep(1000)
    await driver.findElement(By.css(`input[type="checkbox"]`)).click()
    expect(await driver.findElement(By.id(`message`)).getText()).toContain(`Added`)
})