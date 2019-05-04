# Grunt Assemble Website Boilerplate

The goal of this project is to represent a highly optimized static website build using [Assemble](http://assemble.io) for page generation, [Bootstrap](https://getbootstrap/) as a front-end framework, [grunt-webfont](https://github.com/sapegin/grunt-webfont) for custom webfont generation, and [grunt-real-favicon](https://github.com/RealFaviconGenerator/grunt-real-favicon) for favicon generation.

## Prerequisites

This project relies on [Node](https://nodejs.org/) and [NVM](http://nvm.sh) to ensure the correct version of Node is used.

Install [NVM](http://nvm.sh), and follow the instructions for adding to your shell. (Skip this step if you already have NVM installed).

    $ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

Install a default LTS version of Node and [avn](https://github.com/wbyoung/avn) for automatic node version switching.

    $ nvm install 10
    $ npm install -g avn avn-nvm
    $ avn setup

**Grunt** is a Node module used to run JavaScript tasks relating to the build. Note that installing grunt-cli does not install the Grunt task runner! The job of the Grunt CLI is simple: run the version of Grunt which has been installed next to a Gruntfile. This allows multiple versions of Grunt to be installed on the same machine simultaneously.

    $ npm install -g grunt-cli

**ttfautohint 1.2** is required by `grunt-webfont` to auto-hint the custom icon fonts used in this project. Packages can be [downloaded here](http://www.freetype.org/ttfautohint/#download).

Before installing ttfautohint on a Mac, you will need to download and install [XQuartz](http://xquartz.macosforge.org/landing/).

On a Mac with [Brew](http://brew.sh) installed, ttfautohint can be installed via the following command:

    $ brew install ttfautohint

### AWS Credentials

To perform a deployment to S3 and Cloudfront invalidation, you'll need to have the correct credentials in your `~/.aws/credentials` file. [aws-mfa](https://github.com/broamski/aws-mfa) can automate this process for you.

    $ brew install python3
    $ pip3 install aws-mfa
    $ aws-mfa

## Getting Started

Once everything is installed you can check out the source and install required local node modules and bower components.

    $ mkdir assemble-website-boilerplate && cd $_
    $ git clone https://github.com/loganbussey/assemble-website-boilerplate.git --origin upstream .
    $ npm ci

Start the local development server

    $ grunt serve

Build the site into the dist directory

    $ grunt build

Build and view the site in your browser

    $ grunt serve:dist

## Favicon Generation

Favicons are generated from the file `assets/icon.svg` and because this process takes quit a while, it is only initiated if `assets/icon.svg` is edited, or can be manually run with the following command:

     $ grunt realFavicon

## Troubleshooting

If you receive the following error:

    Running "postcss:dist" (postcss) task
    [BS] File changed: .tmp/styles/main.css
    Fatal error: Bad argument

The PhantomJS module needs fixing, you can fix this by running

    $ npm run fix
