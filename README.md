# Techfolio Client

A client for painless editing of your techfolio built with Electron and React with Semantic-UI zaz.
You can learn more about Techfolios [here](https://techfolios.github.io).

![alt text](https://github.com/techfolios/electron-adam/raw/master/images/bio-top-large.JPG "")
![alt text](https://github.com/techfolios/electron-adam/raw/master/images/bio-bottom-large.JPG "")
![alt text](https://github.com/techfolios/electron-adam/raw/master/images/bio-bottom-small.JPG "")
![alt text](https://github.com/techfolios/electron-adam/raw/master/images/bio-projects.JPG "")

## Download

You can download this project [here](https://github.com/techfolios/electron-adam/archive/master.zip).
Extract the zip file.

## Install

You will need [Node.js](https://nodejs.org).

Open a terminal and `cd` to the contents of the extracted zip file.

Use the command `npm install` to download all the necessary files to run the program.

## Run

Use the command `npm start` to start the techfolios application.

The app will begin cloning the [techfolios template](https://github.com/techfolios/template) which can be found in the current directory at .techfolios.  This can take a while, so please be patient.  If you decide to close the application before it has finished loading, please delete the .techfolios directory manually before starting the application again.

## Functionality

Almost all fields of the bio.json can be added, edited, and removed.  Fields that cannot be edited are those presented as dropdown fields.

All files within the .techfolios directory can be commited using the green save button or pressing enter in any field.

A rudamentary routing system is available as a left menu bar.

The upload button is also in the menu bar. Under ideal conditions it will push changes to the users github.io.  Currently the username is statically set to push to this repo.

The application is responsive, thanks to [Semantic-UI](https://react.semantic-ui.com).