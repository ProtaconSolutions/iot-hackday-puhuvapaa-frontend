# What is this?
[![License](http://img.shields.io/:license-mit-blue.svg)](LICENSE)
[![GitHub version](https://badge.fury.io/gh/ProtaconSolutions%2Fbadge-frontend.svg)](https://badge.fury.io/gh/ProtaconSolutions%2Fbadge-frontend)
[![Dependency Status](https://david-dm.org/ProtaconSolutions/badge-frontend.svg)](https://david-dm.org/ProtaconSolutions/badge-frontend)
[![devDependency Status](https://david-dm.org/ProtaconSolutions/badge-frontend/dev-status.svg)](https://david-dm.org/ProtaconSolutions/badge-frontend#info=devDependencies)

Badge frontend application which uses [AngularJS](https://angularjs.org/). 
This frontend uses [badge-backend](https://github.com/ProtaconSolutions/badge-backend).

#  Table of Contents
* [Main points](#main-points)
* [Requirements](#requirements)
* [Installation](#installation)
  * [Configuration](#configuration)
    * [By config.json file](#by-configjson-file)
    * [By ENV variable](#by-env-variable)
* [Development](#development)
* [Production ready build - a.k.a. dist](#production-ready-build---aka-dist)
  * [Running production ready build](#running-production-ready-build)
* [Docker](#docker)
* [Useful resources](#useful-resources)
* [Contributing](#contributing)
* [Author](#author)
* [LICENSE](#license)

## Main points
- [x] Gulp task to help development process
- [ ] Build / deploy process
- [ ] Material design
- [ ] Configuration for each environment and/or developer
- [ ] Configuration for each environment and/or developer
- [ ] And all the _rest_

## Requirements

## Installation
First of all you have to install ```npm``` and ```node.js``` to your box. Installation instructions can
be found [here](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager).

After that you need to install ```bower``` and ```gulp``` main packages to make all  things to happen. 
These can be installed with following commands on your *nix box. 
```
sudo npm install bower -g
sudo npm install gulp -g
```

And when you have ```npm``` and ```node.js``` installed to your box, just navigate yourself to root folder
of the app and run following commands:

```
npm install
```

### Configuration
Currently only configurable value is used backend url address that application needs to make requests. You can
configure this value by two different ways.

#### By config.json file
See ```/src/app/config/config.json_example``` file and copy it to ```/src/app/config/config.json``` file and make
necessary changes to it.
 
#### By ENV variable
Just set ```BADGE_BACKENDURL``` ENV variable and then application will use that within ```gulp serve``` and ```gulp dist``` commands. 

## Development
To start developing in the project run:

```bash
gulp serve
```

Then head to `http://localhost:3000` in your browser.

The `serve` tasks starts a static file server, which serves the AngularJS application, and a watch task which watches 
all files for changes and lints, builds and injects them into the index.html accordingly.

## Production ready build - a.k.a. dist

To make the app ready for deploy to production run:

```bash
gulp dist
```

Now there's a `./dist` folder with all scripts and stylesheets concatenated and minified, also third party libraries 
installed with bower will be concatenated and minified into `vendors.min.js` and `vendors.min.css` respectively.

### Running production ready build

To start production ready build in the project run:

```bash
gulp production
```

Then head to `http://localhost:4000` in your browser

## Docker
This project has also [Docker](https://www.docker.com/) container that you can use. Actual [Dockerfile](Dockerfile) uses [node:4.3](https://github.com/nodejs/docker-node/blob/5934cfb183f13fec7ef17c5d185dbfe444d1da0f/4.3/Dockerfile) as the base image.

You can easily build your own docker image with following command
```
docker build -t yourimage .
```

And after that run that docker image by following command
```
docker run -t -i yourimage
```

With this docker image you can set following ENV variables to specify your database connection:
```
BADGE_BACKENDURL
```

## Useful resources
* [nvm](https://github.com/creationix/nvm) - Node Version Manager - Simple bash script to manage multiple active node.js versions
* [ncu](https://github.com/tjunnone/npm-check-updates) - Find newer versions of package dependencies than what your package.json or bower.json allows
* [mversion](https://github.com/mikaelbr/mversion) - A cross packaging module version bumper. CLI or API for bumping versions of package.json, bower.json, *.jquery.json etc.

## Contributing
Please see the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines.

## Author
[Tarmo Leppänen](https://github.com/tarlepp)

## LICENSE

[The MIT License (MIT)](LICENSE)

Copyright (c) 2016 Protacon Solutions