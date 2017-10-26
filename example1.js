const Crawler = require('./crawler')

const lookFor = ['//input', '//select']
const deep = -1;
const homePage = 'http://oks.kiv.zcu.cz'

const crwlIns = new Crawler(homePage, deep, lookFor)

crwlIns.crawle()

console.log(crwlIns.getUrls())


