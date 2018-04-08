#!/usr/bin/env node

const meow = require('meow');
const reactComponentBuilder = require('./index.js');

const cli = meow(`
Usage
  $ react-component-builder [input]

Options
  --foo  Lorem ipsum. [Default: false]

Examples
  $ react-component-builder
  unicorns
  $ react-component-builder rainbows
  unicorns & rainbows
`);

module.exports = reactComponentBuilder(cli);
