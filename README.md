![Logo](https://user-images.githubusercontent.com/5076458/110127198-666fac00-7dd6-11eb-9822-ccc973f41ee6.png)

WebDevSynergy is a simple and highly reconfigurable web development environment that will make coding easier and faster for both novice and experienced developers. All that is needed for the environment to work is an installed [**NodeJS**](https://nodejs.org). The main features of this environment:
1. **Independence from any IDE** (but nothing interferes, and it is even recommended, to use this environment in conjunction with your preferred IDE).
2. **High degree of customization** (you can either disable/remove existing modules, or connect new ones according to a given template).

In this example, only the following features are implemented:
1. A "live server" for testing the application in a browser based on [Browsersync](https://www.browsersync.io/).
2. Compilation features implemented with [Gulp](https://gulpjs.com/):
   * Typescript -> JavaScript;
   * Pug -> HTML;
   * Stylus -> css.

# What's in stock?
WebDevSynergy consists of two **independent** parts. It is a [Browsersync](https://www.browsersync.io/) (live server) and [Gulp](https://gulpjs.com/) (task manager). If you only want a [Browsersync](https://www.browsersync.io/) and you are using only javascript + html + css, there is no need to install [Gulp](https://gulpjs.com/). In this case, for cleanliness, after downloading and unpack, you can:
1. Delete the gulpfile.js folder.
2. In _devDependencies_ of the package.json file, leave only the line with _browser-sync_.
3. In _scripts_ of the package.json file, delete _rfw_ and _all_ tasks.

# How to install and configure.
Step|Description|Screenshot
:-:|-|-
1| Download and install [NodeJS](https://nodejs.org/en/) (see instructions on the NodeJS website).| ![NodeJS](https://nodejs.org/static/images/logo-light.svg)
2| [Download](https://github.com/IPcorps/WebDevSynergy/archive/main.zip) and unpack this repository to a place convenient for you (or you can use git commands).|![02](https://user-images.githubusercontent.com/5076458/110133984-fa914180-7ddd-11eb-8e98-b14a93e539de.jpg)
3| If you only need a [Browsersync](https://www.browsersync.io/), use the information in the [What's in stock?](https://github.com/IPcorps/WebDevSynergy/blob/main/README.md#whats-in-stock) section above.
4| Open your console and **navigate to the unzipped folder**, where run the command  _**npm install**_ to initialize the environment and load the necessary modules.|![04](https://user-images.githubusercontent.com/5076458/110135037-1c3ef880-7ddf-11eb-9054-96694d3ed05b.jpg)
5| To get started, you can run the entire environment with the **npm run all** command, or separately, depending on what you need:<br>&nbsp;&nbsp;&nbsp;* Run the live server with **npm run rls** command.<br>&nbsp;&nbsp;&nbsp;* Run the translation typescript -> javascript, pug -> html, etc. with the **npm run rfw** command.|![05](https://user-images.githubusercontent.com/5076458/110136489-ccf9c780-7de0-11eb-8f44-238394d84fcd.jpg)

And yes, that's all! 🤠 Your development application will be located in the app folder. Now open, for example, in notepad the _main.ts_ file from the _app_ folder, change it and save it. You will see how the page in the browser refreshes and displays the changes.

# Under the hood.

 How it works. Saving files with _.ts_, _.pug_, and _.styl_ extensions is tracked by [Gulp](https://gulpjs.com/) and immediately translated to _.js_, _.​​html_ and _.css_, respectively. In turn, changes in the files with the _.js_, _.html_ and _.css_ extensions are monitored by [Browsersync](https://www.browsersync.io/), which will immediately refresh the page in the browser. You can organize your files into separate folders within _app_. [Gulp](https://gulpjs.com/) will always create a final file next to the original. It's simple, isn't it? 🤓

# And as an addition.

Using the features of [Gulp](https://gulpjs.com/), you can add any functionality you need. It shouldn't be difficult to understand the structure of the code in the gulpfile.js folder. [Browsersync](https://www.browsersync.io/) and [Gulp](https://gulpjs.com/) are much more powerful than the capabilities used here. But that's another story, which you can learn more about on their official pages.

This environment does not depend on the IDE, and you can write the code in any text editor. But it is much more convenient and efficient to use the IDE for this, and it does not matter which one. Consider working with [Visual Studio Code](https://code.visualstudio.com/) as an example in the next section.

# Let's make friends [Visual Studio Code](https://code.visualstudio.com/) and [WebDevSynergy](https://github.com/IPcorps/WebDevSynergy).
Step|Description|Screenshot
:-:|-|-
1| Download and install [NodeJS](https://nodejs.org/en/) (see instructions on the NodeJS website).| ![NodeJS](https://nodejs.org/static/images/logo-light.svg)
2| [Download](https://github.com/IPcorps/WebDevSynergy/archive/main.zip) and unpack this repository to a place convenient for you (or you can use git commands).|![02](https://user-images.githubusercontent.com/5076458/110133984-fa914180-7ddd-11eb-8e98-b14a93e539de.jpg)
3| If you only need a [Browsersync](https://www.browsersync.io/), use the information in the [What's in stock?](https://github.com/IPcorps/WebDevSynergy/blob/main/README.md#whats-in-stock) section above.
4| Launch VSC and open a folder in it.|![14](https://user-images.githubusercontent.com/5076458/110156516-1c97bd80-7df8-11eb-9602-70e8b44bc8bc.jpg)
5| You can use the built-in terminal to initialize the environment and download the required packages by running the _npm install_ command in it.|![15](https://user-images.githubusercontent.com/5076458/110157093-d858ed00-7df8-11eb-9920-d6671448655d.jpg)
6| In the lower left corner, in the _NPM SCRIP_ tab, you can see the available commands that can be used to run the "live server" [Browsersync](https://www.browsersync.io/) (_rls_) and [Gulp](https://gulpjs.com/) compilation scripts (_rfw_) separately, or all together (_all_). You can also change the names to more readable ones in the _package.json_ settings file in the _scripts_ section.|![16](https://user-images.githubusercontent.com/5076458/110157378-24a42d00-7df9-11eb-89c9-7ce0831c268d.jpg)

But that's not all. For more convenience, you can do the following:

Step|Description
:-:|-
7| Add start and stop tasks. To do this, create a _.vscode_ folder and a _tasks.json_ file in it. Add the following to it:
	{
		"version": "2.0.0",
		"tasks": [
			{
				"label": "Run live server",
				"type": "npm",
				"script": "rls",
				"problemMatcher": [],
				"presentation": {
					"group": "dev"
				}
			},
			{
				"label": "Run files watcher",
				"type": "npm",
				"script": "rfw",
				"problemMatcher": [],
				"presentation": {
					"group": "dev"
				}
			},
			{
				"label": "Run DevEnv",
				"problemMatcher": [],
				"dependsOn": [
					"Run live server",
					"Run files watcher"
				]
			}
		]
	}
![17](https://user-images.githubusercontent.com/5076458/110157688-8b294b00-7df9-11eb-9a0a-567974996d69.jpg)
Step|Description|Screenshot
:-:|-|-
8| You can run tasks from the control line _Ctrl+P_ and type _>Tasks: Run Task_ and then select the desired task.|![18](https://user-images.githubusercontent.com/5076458/110158846-f1fb3400-7dfa-11eb-807b-efd35758b9fc.gif)
9| You can also install any manager or task explorer and use it.|![19](https://user-images.githubusercontent.com/5076458/110159052-3ab2ed00-7dfb-11eb-9c2a-53c90e1eff1b.jpg)

# As a result, we ended up with something like this. 😎

![Fin](https://user-images.githubusercontent.com/5076458/110161930-1527e280-7dff-11eb-8e3a-f1573de6c26b.gif)