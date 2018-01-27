require('chromedriver')

const request = require('request')
const webdriver = require('selenium-webdriver')
const { By } = require('selenium-webdriver')

const CHROME_OPTIONS = {
	'args': [
		'--headless', '--test-type', 'disable-web-security', '--log-level=3', '--silent', '--no-sandbox', '--disable-gpu','--log-path=NUL',
	],
	'prefs': {
		'profile.managed_default_content_settings.images': 2,
	},
}

const DEFAULT_FAIL_CREDITS = 10

module.exports = class WebDriver {

	constructor() {
		this.failCredits = 1
		this.driver = null
		this._init()
	}

	async _init() {
		this.failCredits = DEFAULT_FAIL_CREDITS
		let chromeCapabilities = webdriver.Capabilities.chrome()
		chromeCapabilities.set('chromeOptions', CHROME_OPTIONS)

		this.driver = new webdriver.Builder()
			.forBrowser('chrome')
			.withCapabilities(chromeCapabilities)
			.build()

		// this.driver.manage().logs().get('browser')
		// 	.then((entries) => {
		// 		entries.forEach((entry) => {
		// 			console.log('[%s] %s', entry.level.name, entry.message)
		// 		})
		// 	})
		this.driver.manage().timeouts().implicitlyWait(5)
		this.driver.manage().timeouts().pageLoadTimeout(5000)
	}

	async goTo(url) {
		if (this.failCredits === 0) {
			console.error(['CRAWLER ERROR ON', url].join(' '))
			return
		}
		this.failCredits--
		try {
			const fire = () => {
				return new Promise(resolve => {
					request({
						url: url,
						method: 'HEAD',
					}, (error, response) => {
						let isHtml = false
						if (error) resolve()
						if (response.headers['content-type']
							&& response.headers['content-type'].includes('text/html')) {
							isHtml = true
						}

						if (isHtml) {
							let state = false;
							(async () => {
								// console.log(url)
								try {
									await this.driver.get(url)
								} catch (error) {
									this._restartDriver()
									this.goTo(url)
								}
								state = true
							})()

							require('deasync').loopWhile(() => { return !state })
						}
						resolve()
					})
				})
			}
			await fire()

		} catch (err) {
			this._restartDriver()
		}
		this._restartCredits()
	}

	async closeDriver() {
		await this.driver.quit()
	}

	async extractAllLinks() {
		let res
		await this.driver.executeAsyncScript(() => {
			let callback = arguments[arguments.length - 1]

			let data = []
			for (let i = 0; i < window.frames.length; i++) {
				let tmp = window.frames[i].document.getElementsByTagName('a')
				for (let j = 0; j < tmp.length; j++) {
					data.push(tmp[j].href)
				}
			}
			callback(data)
		}).catch(() => { res = [] }).then(data => res = data)
		return res
	}

	async lookForXPath(xPath) {
		let res = true
		await this.driver.findElement(By.xpath(xPath))
			.catch(() => res = false)
		return res
	}

	_restartCredits() {
		this.failCredits = DEFAULT_FAIL_CREDITS
	}

	_restartDriver() {
		this.closeDriver()
		this._init()
	}
}