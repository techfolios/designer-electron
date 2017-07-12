# Techfolio Client

A client for painless editing of your techfolio built with Electron and React with Semantic-UI zaz.
You can learn more about Techfolios [here](https://techfolios.github.io).

## Download

You can download this project [here](https://github.com/techfolios/electron-adam/archive/master.zip).
Extract the zip file.

## Install

You will need [Nodejs](https://nodejs.org).

Open a terminal and cd to the contents of the extracted zip file.


Use the command `npm install` to download all the necessary files to run the program.

## Run

Use the command `npm start` to start the techfolios application.

The app will begin cloning the [techfolios template](https://github.com/techfolios/template) which can be found in the current directory at .techfolios.

## Notes

Authenticate and retrieve a token, or init an ssh key.

~~Check if .techfolios exists and .techfolios/.git exists~~

Check if the user has a repo first, then ask if they want to clone it or not.

if new then init repo and 'sync'

Clone `https://github.com/techfolios/template` to .techfolios

set the remote origin master to `https://github.com/${username}/${username}.github.io` or

`git@github.com/${username}/${username}.github.io` for ssh push to origin master

## Bugs/Issues

When user first runs, clones a repo or the template, but is stuck on loading screen. 

Passes null bio object to the Bio class.

How does authentication work with simple-git?

Forgot to add profiles in Bio.

need 'add' button for arrays.

add notifications 

should do pull on startup?
