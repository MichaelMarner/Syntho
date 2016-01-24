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
        coffee: {
            build: {
                expand: true,
                cwd: 'src',
                src: '**/*.coffee',
                dest: 'build',
                ext: '.js'
            }
        },
        cssmin: {
            target: {
                files: {
                    'build/application.css': ['build/**/*.css']
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
                files: ['src/**/*.coffee'],
                tasks: ['build'],
            },
            copy: {
                files: ['src/**', '!src/**/*.scss', '!src/**/*.coffee'],
                tasks: ['copy'],
            }
        },
        connect: {
            server: {
                options: {
                    port: 4000,
                    base: 'build',
                    keepalive: true,
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
        'build',
        'Compile all the things',
        ['clean','assemble','bower_concat','sass','cssmin','babel','coffee', 'uglify']
    );
    grunt.registerTask(
        'serve',
        'Compile all the things and make them visible',
        ['build', 'connect']
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
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-qunit');


};
