# SoftDocLinker ![CI](https://github.com/pascal-zarrad/softdoclinker/workflows/CI/badge.svg?branch=develop)

SoftDocLinker (Software Documentation Linker) is a place where all relevant software documentation can be linked together.
It can be hard to maintain dozens of documentation for different projects while providing a central place to view them.
SoftDocLinker aims to solve this problem with a huge simplicity. It has been build to make it as easy as possible to have a
dynamic page for your documentations on GitHub Pages without any external service.

## Current state of development
SoftDocLinker v2.0.0 is currently in development. That's why this README is that empty. 
But don't worry, the working versions of v1 are still available as release!

The target of v2.0.0 is to use modern technologies and improvements which includes:
 - Vue
 - TypeScript
 - Less
 - Better QA

The README will change from time to time, so stay tuned!

## Local development environment
To simplify the setup of the project and provide a uniform environment for everyone.
So, please ensure that you have Docker and docker-compose installed on your system.

### Installing dependencies
As yarn is the package manager used in this project, you first have to install
the JS dependencies of the project before you first start the development 
web server.
```
docker-compose run node yarn install
```

### Starting the development web server
Simply starting the Docker stack will launch the development web server
that automatically re-compiles changed files.
```
docker-compose up -d
```

### Compiling and minifying for production
```
docker-compose run node yarn build
```

### Running unit tests
```
docker-compose run node yarn test:unit
```

### Linting and fixing files
```
docker-compose run node yarn lint
```

## Contributing

You are welcome to contribute to SoftDocLinker if you have improvements or bug fixes.
Refer to [Contributing](/CONTRIBUTING.md) if you want to be a contributor or simply create an issue.
