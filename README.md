# Local web crawler [![npm version](https://badge.fury.io/js/local-web-crawler.svg)](https://badge.fury.io/js/local-web-crawler)

- Simple web crawler for crawling pages on selected domains.
- You can search for elements using XPaths.
- You can generate map of your web, or you can looking for specific elements, like a links, inputs, etc..

## Return values
Output datastructure is array:
```javascript
[URL, {xpaths results, neibers}]
```
## Parameters
Parameters are specified in constructor
* url of home server (like a
* max pages for crawle (for unlimited use -1)
* array of xpath for look

## Example usage

```javascript
const Crawler = require('./crawler')

const lookFor = ['//input', '//select']
const deep = -1
const homePage = 'http://oks.kiv.zcu.cz'

const crwlIns = new Crawler(homePage, deep, lookFor)

crwlIns.crawle()

console.log(crwlIns.getUrls()) // [string:url, json:output]
```

What next?
What about filter only outputs whits contains some ``` lookFor ``` values?
(I prefer standard way, like this)
```javascript
let crawlerOut = crwlIns.getUrls()
let filtered = [];
for (let i = 0; i < crawlerOut.length; i++) {
	let tmp = crawlerOut[i]
	if (tmp[1].input || tmp[1].select) {
		filtered.push(tmp[0])
	}
}
```
(I prefer standard way, like this)
Output of example:
```javascript
 [ 'http://oks.kiv.zcu.cz',
  { input: false,
    select: false,
    neibor: '["http://oks.kiv.zcu.cz/Prevodnik/Uvod","http://oks.kiv.zcu.cz/Forum/Uvod","http://oks.kiv.zcu.cz/OsobniCislo/Uvod"]' } ]
[ 'http://oks.kiv.zcu.cz/Prevodnik/Uvod',
  { input: false,
    select: false,
    neibor: '["http://oks.kiv.zcu.cz/Prevodnik/Uvod","http://oks.kiv.zcu.cz/Prevodnik/Prevodnik","http://oks.kiv.zcu.cz/Prevodnik/Napoveda"]' } ]
[ 'http://oks.kiv.zcu.cz/Forum/Uvod',
  { input: false,
    select: false,
    neibor: '["http://oks.kiv.zcu.cz/Forum/Uvod","http://oks.kiv.zcu.cz/Forum/Registrace","http://oks.kiv.zcu.cz/Forum/Napoveda"]' } ]
[ 'http://oks.kiv.zcu.cz/OsobniCislo/Uvod',
  { input: false,
    select: false,
    neibor: '["http://oks.kiv.zcu.cz/OsobniCislo/Uvod","http://oks.kiv.zcu.cz/OsobniCislo/Generovani","http://oks.kiv.zcu.cz/OsobniCislo/Napoveda"]' } ]
[ 'http://oks.kiv.zcu.cz/Prevodnik/Prevodnik',
  { input: true,
    select: true,
    neibor: '["http://oks.kiv.zcu.cz/Prevodnik/Uvod","http://oks.kiv.zcu.cz/Prevodnik/Prevodnik","http://oks.kiv.zcu.cz/Prevodnik/Napoveda"]' } ]
[ 'http://oks.kiv.zcu.cz/Prevodnik/Napoveda',
  { input: false,
    select: false,
    neibor: '["http://oks.kiv.zcu.cz/Prevodnik/Uvod","http://oks.kiv.zcu.cz/Prevodnik/Prevodnik","http://oks.kiv.zcu.cz/Prevodnik/Napoveda"]' } ]
[ 'http://oks.kiv.zcu.cz/Forum/Registrace',
  { input: true,
    select: true,
    neibor: '["http://oks.kiv.zcu.cz/Forum/Uvod","http://oks.kiv.zcu.cz/Forum/Registrace","http://oks.kiv.zcu.cz/Forum/Napoveda"]' } ]
[ 'http://oks.kiv.zcu.cz/Forum/Napoveda',
  { input: false,
    select: false,
    neibor: '["http://oks.kiv.zcu.cz/Forum/Uvod","http://oks.kiv.zcu.cz/Forum/Registrace","http://oks.kiv.zcu.cz/Forum/Napoveda"]' } ]
[ 'http://oks.kiv.zcu.cz/OsobniCislo/Generovani',
  { input: true,
    select: true,
    neibor: '["http://oks.kiv.zcu.cz/OsobniCislo/Uvod","http://oks.kiv.zcu.cz/OsobniCislo/Generovani","http://oks.kiv.zcu.cz/OsobniCislo/Napoveda"]' } ]
[ 'http://oks.kiv.zcu.cz/OsobniCislo/Napoveda',
  { input: false,
    select: false,
    neibor: '["http://oks.kiv.zcu.cz/OsobniCislo/Uvod","http://oks.kiv.zcu.cz/OsobniCislo/Generovani","http://oks.kiv.zcu.cz/OsobniCislo/Napoveda"]' } ]
[ [ 'http://oks.kiv.zcu.cz',
    { input: false,
      select: false,
      neibor: '["http://oks.kiv.zcu.cz/Prevodnik/Uvod","http://oks.kiv.zcu.cz/Forum/Uvod","http://oks.kiv.zcu.cz/OsobniCislo/Uvod"]' } ],
  [ 'http://oks.kiv.zcu.cz/Prevodnik/Uvod',
    { input: false,
      select: false,
      neibor: '["http://oks.kiv.zcu.cz/Prevodnik/Uvod","http://oks.kiv.zcu.cz/Prevodnik/Prevodnik","http://oks.kiv.zcu.cz/Prevodnik/Napoveda"]' } ],
  [ 'http://oks.kiv.zcu.cz/Forum/Uvod',
    { input: false,
      select: false,
      neibor: '["http://oks.kiv.zcu.cz/Forum/Uvod","http://oks.kiv.zcu.cz/Forum/Registrace","http://oks.kiv.zcu.cz/Forum/Napoveda"]' } ],
  [ 'http://oks.kiv.zcu.cz/OsobniCislo/Uvod',
    { input: false,
      select: false,
      neibor: '["http://oks.kiv.zcu.cz/OsobniCislo/Uvod","http://oks.kiv.zcu.cz/OsobniCislo/Generovani","http://oks.kiv.zcu.cz/OsobniCislo/Napoveda"]' } ],
  [ 'http://oks.kiv.zcu.cz/Prevodnik/Prevodnik',
    { input: true,
      select: true,
      neibor: '["http://oks.kiv.zcu.cz/Prevodnik/Uvod","http://oks.kiv.zcu.cz/Prevodnik/Prevodnik","http://oks.kiv.zcu.cz/Prevodnik/Napoveda"]' } ],
  [ 'http://oks.kiv.zcu.cz/Prevodnik/Napoveda',
    { input: false,
      select: false,
      neibor: '["http://oks.kiv.zcu.cz/Prevodnik/Uvod","http://oks.kiv.zcu.cz/Prevodnik/Prevodnik","http://oks.kiv.zcu.cz/Prevodnik/Napoveda"]' } ],
  [ 'http://oks.kiv.zcu.cz/Forum/Registrace',
    { input: true,
      select: true,
      neibor: '["http://oks.kiv.zcu.cz/Forum/Uvod","http://oks.kiv.zcu.cz/Forum/Registrace","http://oks.kiv.zcu.cz/Forum/Napoveda"]' } ],
  [ 'http://oks.kiv.zcu.cz/Forum/Napoveda',
    { input: false,
      select: false,
      neibor: '["http://oks.kiv.zcu.cz/Forum/Uvod","http://oks.kiv.zcu.cz/Forum/Registrace","http://oks.kiv.zcu.cz/Forum/Napoveda"]' } ],
  [ 'http://oks.kiv.zcu.cz/OsobniCislo/Generovani',
    { input: true,
      select: true,
      neibor: '["http://oks.kiv.zcu.cz/OsobniCislo/Uvod","http://oks.kiv.zcu.cz/OsobniCislo/Generovani","http://oks.kiv.zcu.cz/OsobniCislo/Napoveda"]' } ],
  [ 'http://oks.kiv.zcu.cz/OsobniCislo/Napoveda',
    { input: false,
      select: false,
      neibor: '["http://oks.kiv.zcu.cz/OsobniCislo/Uvod","http://oks.kiv.zcu.cz/OsobniCislo/Generovani","http://oks.kiv.zcu.cz/OsobniCislo/Napoveda"]' } ] ]
```