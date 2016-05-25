SUBLEQ.JS
=========

subleq.js is an implementation of the one instruction language subleq (subtract and branch if less than equal to zero).

Live Demo
---------

http://subleqjs.herokuapp.com/

Usage
-----

    npm install -d
    node app.js
    browse to http://localhost:3000

Routes
------

    localhost:3000              Start with a new program
    localhost:3000/program/:id  Load program with given ID from the DB

Files
-----

* cpu.js is the main program.  This takes an integer array which represents the program.
* assembler.js is an assembler.  This takes assembly language and produces an integer array.
* io.js handles input and output with an HTML page.
* index.html is a static page which hosts the application.
