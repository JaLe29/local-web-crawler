require('chromedriver')
const sleep = require('system-sleep')
const fs = require('fs');
const webdriver = require('selenium-webdriver'),
	By = webdriver.By,
	until = webdriver.until

const CHROME_OPTIONS = {
	'args': [
		'--headless', '--test-type', 'disable-web-security', '--log-level=3', '--silent',
	],
	'prefs': {
		'profile.managed_default_content_settings.images': 2,
	},
}

const GUARD_LOCK_TIME_MS = 1

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
	}

	goTo(url, guardTime = GUARD_LOCK_TIME_MS) {
		this._simplePromiseGuard(() => this.driver.get(url), guardTime)
	}

	closeDriver() {
		this._simplePromiseGuard(() => this.driver.quit())
	}

	extractAllLinks() {
		return this._simplePromiseGuard(() =>
			this.driver.executeAsyncScript(function () {
				let callback = arguments[arguments.length - 1]

				let data = [], l = document.links
				for (let i = 0; i < l.length; i++) {
					data.push(l[i].href)
				}
				callback(data)
			})
		)
	}

	lookForXPath(xPath) {
		return this._simplePromiseGuard(() =>
			this.driver.executeAsyncScript((xPath) => {

				let callback = arguments[arguments.length - 1]

				function getElementByXpath(path) {
					return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
				}

				callback(getElementByXpath(xPath) !== null)
			}, xPath))
	}

	/**
	 * function execute() {
			YOUR CODE
		}
	 *
	 * @param {*} script
	 * @param {*} guardTime
	 */
	executeScript(script, params, guardTime = GUARD_LOCK_TIME_MS) {
		return this._simplePromiseGuard(() =>
			this.driver.executeAsyncScript((script, params) => {
				let callback = arguments[arguments.length - 1]

				eval(script)
				callback(execute(params))
			}, script, params), guardTime)
	}

	_simplePromiseGuard(fn, sleepTime = GUARD_LOCK_TIME_MS) {
		let returnData
		let state = false
		if (typeof fn === 'function') {
			fn()
				.then((data) => {
					returnData = data
					state = true
				})
		}
		else {
			fn
				.then((data) => {
					returnData = data
					state = true
				})
		}

		while (!state) {
			sleep(sleepTime)
		}
		return returnData
	}
}