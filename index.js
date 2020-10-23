const browserObject = require('./lib/browser')
const scraperController = require('./lib/pageController')
const path = require('path')
const Koa = require('koa')
const Router = require('koa-router')
const serve = require('koa-static')
let results

const app = new Koa()
const router = new Router()
let scraped = false

const main = async () => {
  const site = process.argv.slice(2)[0].toString()
  console.log(site)
  const browserInstance = await browserObject.startBrowser()
  results = await scraperController(browserInstance, site)
  scraped = true
}
app.use(serve('./public'))


app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(8000)
