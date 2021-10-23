#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const {getLinked} = require('./get-linked');

const NODE_MODULES = 'node_modules';

function printLinked(cwd, level = 1) {
    const indentation = ' '.repeat(level * 4);
    const linked = getLinked(path.join(cwd, NODE_MODULES));

    if(level === 1) {
        if(linked.length > 0) {
            console.log(`Linked packages in ${cwd}:`);
        } else {
            console.log('No linked packages in', cwd);
        }
    }

    linked.forEach(link => {
        const version = fs.readJsonSync(path.join(NODE_MODULES, link, 'package.json')).version;
        console.log(indentation + link, version);
        printLinked(path.join(NODE_MODULES, link), level + 1);
    });
}

const cwd = process.argv.length > 2 ? process.argv[2] : process.cwd();

printLinked(cwd);
