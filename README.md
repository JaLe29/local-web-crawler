# Local web crawler
Simple web crawler for crawling pages on selected domains.
You can search for elements using XPaths.
You can generate map of your web, or you can looking for specific elements, like a links, inputs, etc..

## Return values
Output is array:
```bash
[URL, {xpaths results, neibers}]
```
## Parameters
Parameters are specified in constructor
* url of home server
* max pages for crawle
* array of xpath for look

## Usage

```bash
const Crawler = require('local-web-crawler')

const lookFor = ['//input', '//select']
const deep = -1
const homePage = 'http://oks.kiv.zcu.cz'

const crwlIns = new Crawler(homePage, deep, lookFor)

crwlIns.crawle()

console.log(crwlIns.getUrls())
```

Output of simple example
```bash
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