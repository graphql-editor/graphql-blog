---
title: Junior Web Developer environment setup
date: '2019-06-18T14:11:00.284Z'
author: Robert
---

This article will give you a detailed introduction on how to set up your computer as a web developer.  It was created for MacOS cause I mostly work on MacOS, however, you can easily interchange those instructions for Windows. Setting up a web development environment is the first challenge on a road to become a web developer today.  Don't give up, try right away!

There are a few ways you can set up your development environment. You can have everything in one IDE alternatively you can use many lightweight tools to combine them with their purposes. The following short checklist reflects my favourite tools in lightweight combination. In some cases, I prefer to use lightweight tools and for example, for react I use one IDE. Follow me to get more, in the next article I'll cover the basics of React Development Environment. 

#Agenda:
- Homebrew
- Git & GitHub
- Sublime as Editor
- Node and NPM
- iTerm2

#Homebrew

You will need to use the Mac Terminal app to install Homebrew. The Terminal app is located in the Utility folder in the Applications folder.

Homebrew is a package manager for MacOS. Rather than having to download every app from a web, Homebrew enables you to install and control applications from the command line. It’s an excellent tool to get used to the command line at the beginner's journey. You should feel relaxed on the command line as developer thus it makes sense to perform as many tasks as possible there. In addition, Homebrew gives you the ability to manage all of your applications with only one tool. You can get all the necessary instructions for Homebrew on their website. Otherwise, simply type the following command in your command line (terminal) to install Homebrew.

```
ruby -e "$(curl -fsSL
https://raw.githubusercontent.com/Homebrew/install/master/install)" 
```

To verify if the installation was successful type: 

    brew --version

Afterwards, Homebrew should be ready for you. It should be accessible on the command line when you type brew. Whenever you install another tool with Homebrew, type brew update in your command line to update the Homebrew repository with all the recent versions of the packages. Afterwards, you can install the desired tool with brew install <tool> or upgrade it with brew upgrade <tool>.

#Git and GitHub

Git will be your distributed version control system. It manages your local projects on your machine and your remote projects on platforms such as GitHub and GitLab. Sooner or later, you will need it to cooperate on projects with other developers. Git should have been installed along the way with the Homebrew installation. Type git --version to verify that it is there. Otherwise, you can use Homebrew for the first time to install it with the following command on the command line:

    brew install git

To verify if the installation was successful type: 

    git --version

Next, you have to create a GitHub account and connect it from a terminal. GitHub is a web-based hosting service for version control using Git. It offers all of the distributed version control and source code management (SCM) functionality of Git as well as adding its other features. It provides access control and several collaboration features such as bug tracking, feature requests, task management, and wikis for every project. To learn more how to setup GitHub over terminal check this [link](https://help.github.com/en/articles/set-up-git).

#Sublime as Editor

Sublime is one of the top editors for developers. That’s the part where everybody has their own opinion. You can use any editor or IDE of your choices like Visual Studio Code, Atom and VIM.

Unfortunately, Sublime isn’t directly accessible via Homebrew. But you can use Cask to install it. Cask is another package manager within Homebrew for GUI tools. For instance, Chrome could be installed on your machine with Cask as well.  Just type selected commands in a terminal:

    brew install caskroom/cask/brew-cask
    brew tap caskroom/versions
    brew cask install sublime-text

To verify if the installation was successful type: 
    subl -v

#Node and NPM 

If you are working with JavaScript, node and npm is a must. The node package manager is used to install libraries/frameworks (node packages) on the command line to your project.

    brew install node

To verify if the installation was successful type: 
    node -v
    npm -v

#iTerm2

MacOS and other OS’s already come with their own command line terminal tool. Thus, another command line tool is optional, but you might want to install iTerm2 because of various advantages. It comes with powerful integrations, beautiful themes and other useful utility tools that will enrich your daily toolset. Homebrew with Cask helps you to install it, just type: 

    brew cask install iterm2

#Summary

That are all the basic tools you need to set up a development environment. Homebrew is used to install all the tools for you on the command line. Cask is used on top of Homebrew to install graphical user interfaces apps applications such as Chrome, iTerm2 and Sublime. The later stage you can choose any code editor as you want since you'll spend most of the time in it. As a JavaScript developer, there is no way around node and npm and thus you should install them with nvm to manage multiple node versions.  Git and GitHub should be used to handle your projects.


##Would you add anything to my list?