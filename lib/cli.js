#!/usr/bin/env node

const meow = require('meow');
const reactComponentGenerate = require('./index.js');

console.log('test');

const cli = meow(`
Usage
  $ react-component-generate [input]

Options
  --foo  Lorem ipsum. [Default: false]

Examples
  $ react-component-generate
  unicorns
  $ react-component-generate rainbows
  unicorns & rainbows
`);

module.exports = reactComponentGenerate(cli);
