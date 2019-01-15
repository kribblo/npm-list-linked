#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

function getLinked(cwd) {
    return glob.sync('{@*/*,[^@]*}/', {cwd})
        .map(match => match.slice(0, -1))
        .filter(file => {
            const stat = fs.lstatSync(path.join(cwd, file));
            return stat.isSymbolicLink();
        });
}

function printLinked(cwd, level = 1) {
    const modules = path.join(cwd, 'node_modules');
    const indentation = ' '.repeat(level * 4);
    const linked = getLinked(modules);

    if(level === 1) {
        if(linked.length > 0) {
            console.log(`Linked packages in ${cwd}:`);
        } else {
            console.log('No linked packages in', cwd);
        }
    }

    linked.forEach(link => {
        const version = fs.readJsonSync(path.join(modules, link, 'package.json')).version;
        console.log(indentation + link, version);
        printLinked(path.join(modules, link), level + 1);
    });
}

const cwd = process.argv.length > 2 ? process.argv[2] : process.cwd();

printLinked(cwd);
