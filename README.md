# SoftDocLinker

SoftDocLinker (Software Documentation Linker) is a place where all relevant software documentation can be linked.
It can be hard to maintain dozens of documentation for different projects while providing a central place to view them.

SoftDocLinker aims to solve this problem with a huge simplicity. It has been build to make it as easy as possible to have a
dynamic page for your documentations on GitHub Pages without any external service.

### Q & A

Q: Is it possible to use SoftDocLinker on an external Webserver which does not run on GitHub Pages?

A: Yes, it is! Look at "Install on a Webserver" for further information.

Q: How is it possible to have a dynamic page on GitHub Pages without a backend?

A: We're using a JSon file to store the required Meta-Data which is then requested using a AJAX request.
So you just have to modify the JSon file and push your changes to GitHub to update anything.

### Install on GitHub Pages

 1. Download the latest release (under "releases") or clone this repo and compile it using NodeJS & NPM with the command ```npm run release``` and use the content of the ```dist/``` folder.
 2. If you downloaded the latest release add it to the GitHub repository of your GitHub pages repository.
 3. Edit the ```cfg/cfg.json``` and ```cfg/docs.json``` to fit your requirements. Additional info can be found under the paragraph "Customization"!
 4. Upload the Page onto your Web-Server!
 
### Install on a Webserver

 1. Download the latest release (under "releases") or clone this repo and compile it using NodeJS & NPM with the command ```npm run release``` and use the content of the ```dist/``` folder.
 2. Edit the ```cfg/cfg.json``` and ```cfg/docs.json``` to fit your requirements. Additional info can be found under the paragraph "Customization"!
 4. Push the page.
 5. Just edit the ```cfg/docs.json``` at any time and push your changes to update your page!

### Customization

You can change the favicon by replacing the favicon at ```img/icon.png```.
You can customize a lot of things in the ```cfg.json``` located at ```cfg/cfg.json```.

**List of all available configuration options in ```cfg.json```:**

Option | Description
------------ | -------------
pageTitle | Change the text displayed in the tab next to the favicon
navbarBrand | The text displayed in the navigation bar as brand
navbarButtons | Can be used to create custom links in the navigation bar. By default a "Back to Home" link that can also be removed is configured. There's no limit on how many buttons you can create. All buttons follow the JSon scheme: ```{"displayText": "Back to Home", "icon": "fa-home", "target: "https://github.com/PlayerForceHD/SoftDocLinker"}```. ```displayText``` is the text displayed to the user. ```icon``` is the icon at the left side of the button, you can simply set the value to ```none``` or fully remove it to set no icon. ```target``` is the URL where the button will point to.

**The ```docs.json``` and it's content**

Just look into the docs.json. All available arguments are self-explaining.
Simply add another object to the JSon array as normally.
You can add an unlimited amount of documentations.

### Building the project

To build this project, you must have installed NPM.
Simply run ```npm run build``` (or ```yarn run build```, if you're using yarn).
It will (re)build the app.js that provides the required logic for SoftDocLinker to run.
After running the build command, your required files are located in the ```dist/``` folder!

### I want to make SoftDocLinker better!

SoftDocLinker is a simple project, so just make your changes, create a pull request.
When your changes are nice, they will be merged.

You can add anything you want or what you think that should be implemented.
There's only one restriction: Everything needs to be compatible to GitHub Pages.
