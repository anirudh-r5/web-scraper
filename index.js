const browserObject = require('./lib/browser')
const scraperController = require('./lib/pageController')

async function main () {
  const site = process.argv.slice(2)[0].toString()
  console.log(site)
  const browserInstance = await browserObject.startBrowser()
  await scraperController(browserInstance, site)
}

main()
