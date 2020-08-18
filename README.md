# Project: Travel App

## Project Description
Build a web tool that allows users to enter the location they are traveling to and the date they are leaving and get the current (if depaturure date is within one week) or a predicted weather forecast

## Prerequisites Summary
* Webserver - Node
* Web application framework for routing - Express
* Build tool - Webpack with dev and prod environments
* Webpack Loaders - babel, style, CSS, sass, MiniCssExtract
* Webpack Plugins - HtmlWebPack, CleanWebpack,OptimizeCssWebPack, TerserWebpack
* Service Worker
* Unit Test - Jest

## Install Prerequisites
1. Install NPM or upgrade NPM if you already have it installed 
        
        npm install  
        npm install -g npm@latest

2. Install Node package

        npm install express
        npm install body-parser
        npm install cors

3. Install webpack and the command line instructions (CLI) tool using npm

        npm i webpack webpack-cli

4. Install Webpack Dev Server
    
        npm i -D webpack-dev-server

5. Install loaders and plugins

        npm i -D @babel/core @babel/preset-env babel-loader
        npm i -D style-loader node-sass css-loader sass-loader
        npm i -D clean-webpack-plugin
        npm i -D html-webpack-plugin
        npm i -D mini-css-extract-plugin
        npm i -D optimize-css-assets-webpack-plugin terser-webpack-plugin

6. Install Service Worker (not installed yet)
        
        npm install workbox-webpack-plugin --save-dev

7. Install Jest (not installed yet)

        npm install --save-dev jest

## Run the code
1. How to run development environment of the Application

* Open one terminal and run below code

        npm run build-dev

* Open second terminal and start Node server with below commmand

        npm run start

* The website will be running with an automatically opened broswer at http://localhost:8080/

2. How to run production environment of the Application
* Build scripts and run Node server:

        npm run build-prod
        npm run start
* Check the website running at http://localhost:3000/

3. How to run unit test

        npm run test

4. How to test Service Worker is working:
* Open project in Production environment (reference #2 in "Run the code" section)
* Open browser at http://localhost:3000/
* Close Node server (`Ctrl +  C` in terminal)
* Refresh browser page at http://localhost:3000/
* Page is still available




## Other tools installed during development


## List of third-party resources
* [Webpack courses](www.udacity.com) from Udacity

## Addtional Notes




