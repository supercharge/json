<div align="center">
  <a href="https://superchargejs.com">
    <img width="471" style="max-width:100%;" src="https://superchargejs.com/images/supercharge-text.svg" />
  </a>
  <br/>
  <br/>
  <p>
    <h3>JSON</h3>
  </p>
  <p>
    Secure drop-in replacement for the global `JSON` object with prototype pollution protection
  </p>
  <br/>
  <p>
    <a href="#installation"><strong>Installation</strong></a> ·
    <a href="#usage"><strong>Usage</strong></a>
  </p>
  <br/>
  <br/>
  <p>
    <a href="https://www.npmjs.com/package/@supercharge/json"><img src="https://img.shields.io/npm/v/@supercharge/json.svg" alt="Latest Version"></a>
    <a href="https://www.npmjs.com/package/@supercharge/json"><img src="https://img.shields.io/npm/dm/@supercharge/json.svg" alt="Monthly downloads"></a>
  </p>
  <p>
    <em>Follow <a href="http://twitter.com/marcuspoehls">@marcuspoehls</a> and <a href="http://twitter.com/superchargejs">@superchargejs</a> for updates!</em>
  </p>
</div>

---

## Introduction
The `@supercharge/json` package is a drop-in replacement for the global `JSON` object. It protects JSON parsing against protoype pollution attacks.


## Installation

```
npm i @supercharge/json
```


## Usage
Using `@supercharge/json` is pretty straightforward. Use it the same way as you would use the `JSON` object:

```js
const JSON = require('@supercharge/json')

const user = JSON.parse('{"name":"Supercharge"}')
// { name: 'Supercharge' }

const user = JSON.parse('{"name":"Supercharge", "__proto__": { "x": 1 }, "constructor": {"prototype": {"bar": "baz"} } }')
// { name: 'Supercharge' }


const json = JSON.stringify({ name: 'Supercharge' })
// '{"name":"Supercharge"}'
```


## Contributing
Do you miss a function? We very much appreciate your contribution! Please send in a pull request 😊

1.  Create a fork
2.  Create your feature branch: `git checkout -b my-feature`
3.  Commit your changes: `git commit -am 'Add some feature'`
4.  Push to the branch: `git push origin my-new-feature`
5.  Submit a pull request 🚀


## License
MIT © [Supercharge](https://superchargejs.com)

---

> [superchargejs.com](https://superchargejs.com) &nbsp;&middot;&nbsp;
> GitHub [@supercharge](https://github.com/supercharge) &nbsp;&middot;&nbsp;
> Twitter [@superchargejs](https://twitter.com/superchargejs)
