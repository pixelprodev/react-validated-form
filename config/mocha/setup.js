require('jsdom-global/register')
require('@babel/register')
require('@babel/polyfill')
global.expect = require('expect')
window.Date = Date