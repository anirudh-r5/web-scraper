const movieScraper = require('./movieScraper')

async function scrapeAll (browserInstance, url) {
  let browser
  console.log(url)
  try {
    browser = await browserInstance
    const movies = await movieScraper(browser, url)
    return movies
  } catch (err) {
    console.log('Could not resolve the browser instance => ', err)
  }
}

module.exports = (browserInstance, url) => scrapeAll(browserInstance, url)
