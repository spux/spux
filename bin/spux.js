#!/usr/bin/env node

// IMPORTS
var shell = require('shelljs')
var fs = require('fs')

// MODEL
globalThis.data = {
  inputURI: 'package.json'
}

// INIT
data.inputURI = process.argv[2] || data.inputURI

// MAIN
// console.error(`reading file ${data.inputURI}`)
data.input = fs.readFileSync(data.inputURI)

console.log(`<script type="application/ld+json" id="data">
${data.input.toString()}</script>
<script type="module" src="https://cdn.jsdelivr.net/gh/spux/spux-shim/web_modules/spux-shim.js"></script>`)
