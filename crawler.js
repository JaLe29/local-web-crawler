const WebDriver = require('./WebDriver')
const sleep = require('system-sleep')

module.exports = class Crawler {

	constructor(home, maxPage, lookFor) {
		this.maxPage = (maxPage === -1 ? Number.MAX_SAFE_INTEGER : maxPage)
		this.home = home
		this.lookFor = lookFor

		this.isDown = false
		this.webDriver = new WebDriver()
		this.urls = new Array()
		this.crawlerOutput = new Array()
	}

	_wasCrawled(input) {
		for (let i = 0; i < this.urls.length; i++) {
			if (this.urls[i][0] === input) {
				return true
			}
		}
		return false
	}

	_getUnvisited() {
		for (let i = 0; i < this.urls.length; i++) {
			if (!this.urls[i][0]) {
				return this.urls[i]
			}
		}
		return null
	}

	_setHasWritable(url) {
		for (let i = 0; i < this.urls.length; i++) {
			if (this.urls[i][1] === url) {
				this.urls[i][2] = true
			}
		}
	}

	crawle() {
		let state = false;

		(async () => {
			if (this.isDown) {
				throw ('Error: Driver is closed...')
			}
			let iterator = 0

			let url = [false, this.home, null]
			await this.webDriver.goTo(url[1])

			while (url !== null) {
				if (iterator > this.maxPage) {
					break
				}

				await this.webDriver.goTo(url[1])
				await this._crawleLocalPage(url)

				this._setUrlVisited(url[1])
				url = this._getUnvisited()
				iterator++
			}
			await this._shutDown()
			state = true
		})()

		while (!state) {
			sleep(1000)
		}
	}

	async _crawleLocalPage(url) {
		let lastLinkst = Array.from(new Set(await this.webDriver.extractAllLinks()))
		for (let i = 0; i < lastLinkst.length; i++) {
			let value = lastLinkst[i]
			let tmp = url[1]

			if (value === tmp || this._isInQueue(value)) {
				continue
			}

			if (!this._wasCrawled(value) && this._isLocal(value)) {
				this.urls.push([false, value])
			}
		}

		let data = new Object()

		for (let item of this.lookFor) {
			data[item.replace(/\W/g, '')] = await this.webDriver.lookForXPath(item)
		}
		data['neibor'] = JSON.stringify(this._filterLocalUrl(lastLinkst))
		this.crawlerOutput.push([url[1], data])
	}

	async _shutDown() {
		await this.webDriver.closeDriver()
		this.isDown = true
	}

	_isLocal(url) {
		return url.startsWith(this.home)
	}

	_filterLocalUrl(array) {
		let out = []
		array.forEach((item) => {
			if (this._isLocal(item)) {
				out.push(item)
			}
		})
		return out
	}

	_setUrlVisited(url) {
		for (let i = 0; i < this.urls.length; i++) {
			if (this.urls[i][1] === url) {
				this.urls[i][0] = true
				return
			}
		}
	}

	_isInQueue(url) {
		for (let i = 0; i < this.urls.length; i++) {
			if (this.urls[i][1] === url) {
				return true
			}
		}
		return false
	}

	getUrls() {
		return this.crawlerOutput
	}
}