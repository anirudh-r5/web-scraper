async function movieScraper (browser, url) {
  try {
    const page = await browser.newPage()
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1
    })
    console.log(`Navigating to ${url}...`)
    await page.goto(url)
    await page.waitForSelector('#search')
    await page.$eval('#searchBar', (e) => { e.value = 'hulk' })
    await page.click('#searchBtn')
    await page.waitForTimeout(410)
    await page.waitForSelector('.column')
    const results = await page.$$eval('#pages > li', e => e.length)
    const movies = []
    for (let i = 0; i < results; i++) {
      const temp = await page.$$eval('.box > .content > p', (e) => {
        // e = e.filter((curr, index) => (index + 1) % 2 === 0)
        return e.map((ele) => ele.innerHTML.replace(ele.querySelector('strong').outerHTML, ''))
      })
      console.log(`Page ${i + 1}:\n${temp}`)
      movies.push(temp)
      if (i + 2 > results) { break }
      await page.click(`#pages > li:nth-of-type(${i + 2})`)
      await page.waitForTimeout(410)
    }
    return movies
  } catch (err) {
    console.log(`Something went wrong:\n${err}`)
  }
}

module.exports = (browser, url) => movieScraper(browser, url)
