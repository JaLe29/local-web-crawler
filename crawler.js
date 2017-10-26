const WebDriver = require('./WebDriver')

module.exports = class Crawler {

	constructor(home, maxPage, lookFor) {
		this.maxPage = (maxPage === -1 ? Number.MAX_SAFE_INTEGER : maxPage)
		this.home = home
		this.lookFor = lookFor

		this.isDown = false
		this.webDriver = new WebDriver()
		this.urls = new Array()
		this.crawlerOutput = new Array()

		// this.urls.push([false, home, null])
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
		if (this.isDown) {
			throw ('Error: Driver is closed...')
		}
		let iterator = 0
		//get one unvisited url from array

		let url = [false, this.home, null]
		this.webDriver.goTo(url[1])
		// this._crawleLocalPage(url)

		while (url !== null) {
			if (iterator > this.maxPage) {
				break
			}

			this.webDriver.goTo(url[1])
			this._crawleLocalPage(url)

			this._setUrlVisited(url[1])
			url = this._getUnvisited()
			iterator++
		}
		this._shutDown()
	}

	_crawleLocalPage(url) {
		let lastLinkst = Array.from(new Set(this.webDriver.extractAllLinks()))

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
		this.lookFor.forEach((item) => {
			data[item.replace(/\W/g, '')] = this.webDriver.lookForXPath(item)
		})
		data['neibor'] = JSON.stringify(this._filterLocalUrl(lastLinkst))
		console.log([url[1], data])
		this.crawlerOutput.push([url[1], data])
	}

	_shutDown() {
		this.webDriver.closeDriver()
		this.isDown = true
	}

	_isLocal(url) {
		let tmp = url.startsWith(this.home)
		return tmp
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