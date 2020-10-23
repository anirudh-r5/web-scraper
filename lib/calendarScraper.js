async function calendarScraper (browser, url) {
  console.log(`Inside calendar-scraper: ${browser}, ${url}`)
  return '25-10-2020'
}

module.exports = (browser, url) => calendarScraper(browser, url)
