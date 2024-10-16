#!/usr/bin/env node

const generateDts = require('./scripts/generate-dts.cjs');
const wrapeDts = require('./scripts/wrap-dts.cjs');

console.log('Hello from build-utils CLI!');

console.log('Running type generation scripts...');

// TODO: config 파일 받아쓰기

// Run prebuild:types
generateDts();

// // Run build:types
wrapeDts();

console.log('Type generation complete.');
