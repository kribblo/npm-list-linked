# npm-list-linked

List linked npm packages in a project; also recursively for chains of dependencies. 

    $ npm-list-linked
    Linked packages in /home/user/projects/some-project/
        @prefix/package 0.2.7
            other-package 0.1.2
    
## Use globally

    npm i -g npm-list-linked
    npm-list-linked [path to project root, default cwd]

## Use in a project

    npm i --save-dev npm-list-linked

**package.json:**

    "scripts": {
        "linked": "npm-list-linked"
    }

Run script:

    npm run linked

## Using as a module

    const {getLinked} = require('npm-list-linked');
    console.log(getLinked());
