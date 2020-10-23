require('dotenv').config()
const Koa = require('koa')
const Router = require('koa-router')
const serve = require('koa-static')
const browserObject = require('./lib/browser')
const calendarScraper = require('./lib/calendarScraper')
const movieScraper = require('./lib/movieScraper')
const restaurantScraper = require('./lib/restaurantScraper')

const app = new Koa()
const router = new Router()
let scraped = false

const scrape = async () => {
  const browserInstance = await browserObject.startBrowser()
  const browser = await browserInstance
  const day = await calendarScraper(browser, process.env.CALENDAR_URL)
  const movies = await movieScraper(browser, process.env.MOVIE_URL)
  const time = await restaurantScraper(browser, process.env.RESTAURANT_URL)
  scraped = true
}
app.use(serve('./public'))
scrape()

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(8000)
