# Setup for Windows

Download the [Node.JS Windows Installer](https://nodejs.org/en/download/) from the Node.JS downloads page. Run the installer and then restart your computer.

To see if Node is installed, open the Windows Command Prompt, Powershell or a similar command line tool, and type:
```
node -v
```

This should report the version number, which should be v4.0.0.

Now test NPM by typing:
```
npm -v
```

This should be v2.14.2.

If you numbers are close but not exact, don't worry. As long as you have Node v4 and NPM v2, you should be OK.

## Install Git

Download and [install Git](http://git-scm.com/download/win) from the official Git website.

We will use Git to access code examples. The demo code repository is hosted on GitHub. If you don't have an account yet, [sign up for one](https://github.com/join).

## Install Atom

[Atom](https://github.com/atom/atom/releases/latest) is a free text editor designed by GitHub. Although, you can use any text editor to follow along on with the examples, I recommend you download and install Atom. I am going to configure a couple plugins to help us debug our code.

After you have installed Atom, open the program, then open it's program drop-down menu and select "Install Shell Commands":

![](img/atom_install.png)

After the shell commands have installed, we can add a few useful plugins to Atom. Open a new Terminal window and run:

```
apm install atom-beautify atom-handlebars jshint react
```

## Install RoboMongo

[RoboMongo](http://robomongo.org/) is a cross-platform GUI client for MongoDB. It will help you see what you are doing in the database section.
