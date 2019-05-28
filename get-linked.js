const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');

const PACKAGES_GLOB = '{@*/*,[^@]*}/';
const NODE_MODULES = 'node_modules';

/**
 * Returns a list of the listed packages in the directory
 * @param {String} [cwd] Node modules directory - Defaults to process directory
 */
function getLinked(cwd = path.join(process.cwd(), NODE_MODULES)) {
    return glob.sync(PACKAGES_GLOB, {cwd})
        .map(match => match.slice(0, -1))
        .filter(file => {
            const stat = fs.lstatSync(path.join(cwd, file));
            return stat.isSymbolicLink();
        });
}

module.exports = {
    getLinked,
};