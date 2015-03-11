# Assemble Website Boilerplate

The goal of this project is to represent a highly optimized static website build using [Assemble](http://assemble.io) for page generation, [Bootstrap](https://getbootstrap/) as a front-end framework and [grunt-webfont](https://github.com/sapegin/grunt-webfont) for custom webfont generation.

## Prerequisites

This project relies on Node 0.12 which will install a few utilities that are required to build the project.

On a Mac with [Brew](http://brew.sh) installed, Node and NPM can be installed via the following commands:

    $ brew install npm

**Grunt** is a Node module used to run JavaScript tasks relating to the build. Note that installing grunt-cli does not install the Grunt task runner! The job of the Grunt CLI is simple: run the version of Grunt which has been installed next to a Gruntfile. This allows multiple versions of Grunt to be installed on the same machine simultaneously.

    $ npm install -g grunt-cli

**Bower 1.3** is a Node module used to install client-side dependencies.

    $ npm install -g bower@1.3

**ttfautohint 1.2** is required by `grunt-webfont` to auto-hint the custom icon fonts used in this project. Packages can be [downloaded here](http://www.freetype.org/ttfautohint/#download).

Before installing ttfautohint on a Mac, you will need to download and install [XQuartz](http://xquartz.macosforge.org/landing/).

On a Mac with [Brew](http://brew.sh) installed, ttfautohint can be installed via the following command:

    $ brew install ttfautohint

## Getting Started

Once everything is installed you can check out the source and install required local node modules and bower components. Note: `npm install` will call `bower install` so you don't need to call it separately.

    $ mkdir assemble-website-boilerplate && cd $_
    $ git clone https://github.com/lukebussey/assemble-website-boilerplate.git
    $ npm install

Start the local development server

    $ grunt serve

Build the site into the dist directory

    $ grunt build

Build and view the site in your browser

    $ grunt serve:dist
