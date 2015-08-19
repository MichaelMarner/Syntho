module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        bower_concat: {
            all: {
                dest: 'build/bower.js',
                cssDest: 'build/bower.css',
            },
        },
            
        copy: {
            build: {
                cwd: 'src',
                src: ['**', '!**/*.coffee'],
                dest: 'build',
                expand: true
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
                }
                ,
                files: {
                    'build/application.js' : [ 'build/**/*.js' ]
                },
            }
        },
        watch: {
            build: {
                files: ['src/**'],
                tasks: ['build'],
            }
        },
        connect: {
            server: {
                options: {
                    port: 4000,
                    base: 'build',
                }
            }
        }
    });

    grunt.registerTask(
        'build',
        'Compile all the things',
        ['clean','copy','bower_concat','sass','coffee', 'uglify']
    );
    grunt.registerTask(
        'serve',
        'Compile all the things and make them visible',
        ['build', 'connect', 'watch']
    );


    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-bower-concat');


};

