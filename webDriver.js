require('chromedriver')
const webdriver = require('selenium-webdriver')
const { By } = require('selenium-webdriver')

const CHROME_OPTIONS = {
	'args': [
		'--headless', '--test-type', 'disable-web-security', '--log-level=3', '--silent',
	],
	'prefs': {
		'profile.managed_default_content_settings.images': 2,
	},
}

module.exports = class WebDriver {

	constructor() {
		this.driver = null
		this._init()
	}

	_init() {
		let chromeCapabilities = webdriver.Capabilities.chrome()
		chromeCapabilities.set('chromeOptions', CHROME_OPTIONS)

		this.driver = new webdriver.Builder()
			.forBrowser('chrome')
			.withCapabilities(chromeCapabilities)
			.build()
		this.driver.manage().timeouts().implicitlyWait(1)
	}

	async goTo(url) {
		await this.driver.get(url)
	}

	async closeDriver() {
		await this.driver.quit()
	}

	async extractAllLinks() {
		let res
		await this.driver.executeAsyncScript(() => {
			let callback = arguments[arguments.length - 1]

			let data = [], l = document.links
			for (let i = 0; i < l.length; i++) {
				data.push(l[i].href)
			}
			callback(data)
		}).then(data => res = data)
		return res
	}

	async lookForXPath(xPath) {
		let res = true
		await this.driver.findElement(By.xpath(xPath))
			.catch(() => res = false)
		return res
	}
}