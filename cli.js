#!/usr/bin/env node
'use strict'
const path = require('path')
const cac = require('cac')
const tinify = require('tinify')
const suffix = require('suffix')
const Configstore = require('configstore')
const Spin = require('io-spin')

// utilities
const spin = new Spin('Box1', 'Processing')
const extRe = /(\.jpe?g|\.png)$/
const cwd = fp => path.resolve(process.cwd(), fp)
const validExt = filename => extRe.test(filename)
const stderr = msg => {
  console.log(msg)
  process.exit(1)
}

// init cli
const cli = cac(`
  Usage:
    tinypic <input> [output] [options]

  Options:
    -v, --version       Output version number
    -h, --help          Output help (You are here!)
`)

const config = new Configstore(cli.pkg.name, {})

// set api key
cli.command('use', function () {
  const key = this.input[1]
  if (!key) stderr('No key provided!')
  config.set('apiKey', key)
  console.log('OK!')
})

// main
cli.command('*', function () {
  // confirm key
  const apiKey = config.get('apiKey')
  if (!apiKey) stderr(`
Set an API Key first, eg: tinypic use $KEY.
If you don't have one, please visit: https://tinypng.com/developers
`.trim())

  tinify.key = apiKey

  // get input filename
  const input = this.input[0]
  if (!input) stderr('Expected an input file.')
  if (!validExt(input)) stderr('Invalid image extension, only .jp(e)g and .png are supported!')

  // get output filename
  const output = this.input[1] || suffix(input, '.min')

  // compress
  spin.start()
  tinify.fromFile(cwd(input)).toFile(cwd(output), err => {
    spin.stop()
    if (err) {
      console.log(err.stack)
    } else {
      console.log('Done!')
    }
  })
})

// bootstrap cli
cli.parse()
