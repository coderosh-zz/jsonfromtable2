# GENERATE JSON FROM HTML TABLE

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) 

## Usage

```js
const jsonFromTable = require('jsonfromtable2')

jsonFromTable({
  url: 'https://example.com',
  selector: '.wikitable', // default => table
}).then(data => console.log(data))

// OR

jsonFromTable({
  html: '<html>...</html>',
  selector: '.wikitable', // default => table
}).then(data => console.log(data))

```


## Custom Headers

Custom headers can be provided in array. But make sure that length of headers provided must be equal to the length of headers in table.

```js
jsonFromTable({
  html: '<html>...</html>',
  customHeaders: ['header1', 'header2', '...']
}).then(data => console.log(data))
```

## Options

### headerIndex

By default first row (0 index) is taken as header. In case the header isn't in first row the output may not be as expected. In such case `headerIndex` can be provided.

```js
jsonFromTable({
    html: '<html>...</html>',
    options: {
        headerIndex: 1, // default => 0
    },
}).then(data => console.log(data))
```

If you have customHeaders then `headerIndex` will have no effect on output.

### bodyStart

By default body starts from 2nd row (1 index). If you provided headerIndex, then bodyStart is 1 greater than headerIndex. You can also provide it on your own.

```js
jsonFromTable({
    html: '<html>...</html>',
    options: {
        headerIndex: 1,
        bodyStart: 3 // default => headerIndex + 1
    },
}).then(data => console.log(data))
```

## License
MIT