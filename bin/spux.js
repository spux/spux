#!/usr/bin/env node

// IMPORTS
var shell = require('shelljs')
var fs = require('fs')
var argv = require('minimist')(process.argv.slice(2))

// MODEL
globalThis.data = {
  inputURI: 'package.json',
  view: null
}

// INIT
data.inputURI = argv._[0] || data.inputURI
data.view = argv.view || data.view

// MAIN
// console.error(`reading file ${data.inputURI}`)
data.input = fs.readFileSync(data.inputURI)

var viewAttribute = data.view ? ` view="${data.view}"` : ``
var html = `<script type="application/ld+json" id="data"${viewAttribute}>
${data.input.toString()}</script>
<script type="module" src="https://unpkg.com/spux-shim/web_modules/spux-shim.js"></script>`

console.log(html)
