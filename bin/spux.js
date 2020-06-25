#!/usr/bin/env node

// IMPORTS
var shell = require('shelljs')
var fs = require('fs')
var argv = require('minimist')(process.argv.slice(2))

// MODEL
globalThis.data = {
  inputURI: null,
  view: null,
  cdn: 'https://unpkg.com/spux-rocks',
  css: null
}

// FUNCTIONS
function validURL (str) {
  var pattern = new RegExp(
    '^(https?:\\/\\/)', // protocol
    'i'
  )
  return !!pattern.test(str)
}

// INIT
data.inputURI = argv._[0] || data.inputURI
data.view = argv.view || data.view
data.css = argv.css || data.css
var css = data.css
  ? `<link href="${data.css}" rel="stylesheet" />
`
  : ''

if (data.view && !validURL(data.view)) {
  data.view = data.cdn + '/' + data.view + '.js'
}

// console.log('process.stdin.isTTY', process.stdin.isTTY)

// MAIN
// console.error(`reading file ${data.inputURI}`)

if (process.stdin.isTTY) {
  if (data.inputURI) {
    data.input = fs.readFileSync(data.inputURI)
  } else {
    data.input = ''
  }
  processData()
} else {
  data.input = ''
  process.stdin.setEncoding('utf-8')

  process.stdin.on('readable', function () {
    var chunk
    while ((chunk = process.stdin.read())) {
      data.input += chunk
    }
  })

  process.stdin.on('end', function () {
    // There will be a trailing \n from the user hitting enter. Get rid of it.
    data.input = data.input.replace(/\n$/, '')
    processData()
  })
}

function processData () {
  var viewAttribute = data.view ? ` view="${data.view}"` : ``
  var html = `${css}<script type="application/ld+json" id="data"${viewAttribute}>
  ${data.input.toString()}</script>
  <script type="module" src="https://unpkg.com/spux-shim/web_modules/spux-shim.js"></script>`

  console.log(html)
}
