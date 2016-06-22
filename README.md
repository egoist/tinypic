# tinypic [![NPM version](https://img.shields.io/npm/v/tinypic.svg)](https://npmjs.com/package/tinypic) [![NPM downloads](https://img.shields.io/npm/dm/tinypic.svg)](https://npmjs.com/package/tinypic)

> Compress JPG or PNG file in command line.

## Install

```bash
$ npm install -g tinypic
```

## Usage

Get an API Key first: https://tinypng.com/developers/

```bash
# Set API Key before use
$ tinypic use $API_KEY

# Compress an image
$ tinypic example.jpg
# it writes to example.min.jpg

# Custom destination
$ tinypic example.jpg ../output.foo.jpg
```

## License

MIT © [EGOIST](https://github.com/egoist)
