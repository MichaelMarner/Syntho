module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015'],
            },
            files: {
                expand: true,
                src: ['src/scripts/*.es6'],
                ext: '-compiled.js',
                dest: 'build'
            }
        },
        bower_concat: {
            all: {
                dest: 'build/bower.js',
                cssDest: 'build/bower.css',
                mainFiles: {
                    bootstrap: [ 'dist/css/bootstrap.min.css', 'dist/js/bootstrap.min.js' ]
                }
            },
        },
        clean: {
            build: {
                src: ['build'],
            },
        },
        cssmin: {
            target: {
                files: {
                    'build/application.css': ['build/bower.css','build/css/*.css']
                }
            }
        },
        qunit: {
            files: ['test/**/*.html'],
        },
        sass: {
            build: {
                expand: true,
                cwd: 'src',
                src: '**/*.scss',
                dest: 'build',
                ext: '.css',
            },
        },
        uglify: {
            build: {
                options: {
                    mangle: false,
                    beautify: false,
                    sourceMap: true,
                }
                ,
                files: {
                    'build/application.js' : [ 'build/bower.js', 'build/scripts/**/*.js', 'build/src/**/*.js' ]
                },
            }
        },
        watch: {
            styles: {
                files: ['src/**/*.scss'],
                tasks: ['sass','cssmin'],
            },
            scripts: {
                files: ['src/**/*.es6'],
                tasks: ['compilescripts'],
            },
            templates: {
              files: ['src/**/*.hbs'],
              tasks: ['assemble']
            },
        },
        connect: {
            server: {
                options: {
                    port: 4000,
                    base: 'build',
                    keepalive: false,
                }
            }
        },
        assemble: {
            options: {
                assets: "path/to/assets",
                data:   "path/to/config.json",
                partials: ["src/templates/partials/**/*.hbs"],
                flatten: true,
            },
            syntho: {
                src: ["src/templates/index.hbs"],
                dest: 'build/',
            }
        }
    });

    grunt.registerTask(
      'compilescripts',
      ['babel','uglify']
    );
    grunt.registerTask(
        'build',
        'Compile all the things',
        ['assemble','bower_concat','sass','cssmin','babel','uglify']
    );
    grunt.registerTask(
        'clean',
        'Remove build',
        ['clean']
    );
    grunt.registerTask(
        'serve',
        'Compile all the things and make them visible',
        ['connect', 'watch']
    );


    grunt.loadNpmTasks('grunt-assemble');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-qunit');


};
