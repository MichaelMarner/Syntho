# Syntho - An HTML5 Synthesizer

Written by Michael Marner <michael@20papercups.net>

MIT License

## Building
We are using Grunt to build Syntho from CoffeeScript and Sass. You will need
a build system...

### Build System

1. Install Node

1. Install Grunt 
    `npm install -g grunt-cli`

1. Install Bower
    `npm install -g bower`

1. Install CoffeeScript
    `npm install -g coffee-script`
    
1. Install Sass 
    `sudo gem install sass`

### Libraries
Now we can install the bower libraries and Grunt plugins Syntho uses...

1. Install the Grunt plugins
    `npm install`

1. Install the Bower libraries
    `bower install`

### Actually Building
After all that, won't you give this thing a try:

`grunt build`

That will give you a build directory containing the generated files. This can
be uploaded to the web server of your choice. Since it's all client side,
nginx works fine, as does Apache, etc.

### Test Server

If you want to test locally, you can do this:

`grunt serve`

This will create a local web server listening on port 4000. So you can navigate
to http://localhost:4000 and get the sweet, sweet sounds.

