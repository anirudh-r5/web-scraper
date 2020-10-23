async function restaurantScraper (browser, url) {
  console.log(`Inside restaurant-scraper: ${browser}, ${url}`)
  return '8:00 PM'
}

module.exports = (browser, url) => restaurantScraper(browser, url)
