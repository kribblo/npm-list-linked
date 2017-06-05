# npm-list-linked

List linked npm packages in a project; also recursively for chains of dependencies. 

    $ npm-list-linked
    Linked packages in /home/user/projects/some-project/
        @prefix/package 0.2.7
            other-package 0.1.2
    
## Install

    npm i -g npm-list-linked

## Usage

    npm-list-linked [path to project root, default cwd]
