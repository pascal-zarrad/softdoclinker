# SoftDocLinker

SoftDocLinker (Software Documentation Linker) is a place where all relevant software documentation can be linked.
It can be hard to maintain dozens of documentation for different project while providing a central place to view them.

SoftDocLinker aims to solve this problem with a huge simplicity. It has been build to make it as easy as possible to have a
dynamic page for your documentations on GitHub Pages without any external service.

### Q & A

Q: Is it possible to use SoftDocLinker on an external Webserver which does not run on GitHub Pages?
A: Yes, it is! Look at "Install on a Webserver" for further information.

Q: How is it possible to have a dynamic page on GitHub Pages without a backend?
A: We're using a JSon file to store the required Meta-Data which is then requested using a AJAX request.
So you just have to modify the JSon file and push your changes to GitHub to update anything.

### Install on GitHub Pages

- Tutorial will be added after first version that works is done.

### Install on a Webserver

- Tutorial will be added after first version that works is done.

### Customization

You can change the favicon by replacing the favicon at ```img/icon.png```.
You can customize a lot of things in the ```cfg.json``` located at ```cfg/cfg.json```.

**List of all available configuration options in ```cfg.json```:

Option | Description
------------ | -------------
pageTitle | Change the text displayed in the tab next to the favicon
navbarBrand | The text displayed in the navigation bar as brand
enableCustomNavbarButton | Decide if a custom button should be shown in the navigation bar (Useful as back to homepage button)
customNavbarButtonText | The text that should be displayed in the navigation bar button
customNavbarButtonTarget | The target address where the button will point to (Default is this project page)


### Building the project

To build this project, you must have installed NPM.
Simply run ```npm run build``` (or ```yarn run build```, if you're using yarn).
It will (re)build the app.js that provides the required logic for SoftDocLinker to run.
After running the build command, your required files are located in the ```dist/``` folder!

### I want to make SoftDocLinker better!

SoftDocLinker is a simple project, so just make your changes, create a pull request.
When your changes are nice, they will be merged.

You can add anything you want or what you think that is should be implemented.
There's only one restriction: Everything needs to be compatible to GitHub Pages.