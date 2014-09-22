// Gruntfile.js

module.exports = function (grunt) {

    grunt.initConfig({

        // get the configuration info from package.json ----------------------------
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            main: {
                files: [{ src: 'node_modules/bootstrap/fonts', dest: 'styles/fonts' },
                        { src: 'node_modules/bootstrap/less', dest: 'styles/content/less' },
                        { src: 'node_modules/bootstrap/dist/js/', dest: 'libs/' }]
            }
        },
        jshint: {
            options: {
                reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
            },

            // when this task is run, lint the Gruntfile and all js files in the app
            build: ['Grunfile.js', 'app/**/*.js']
        },
        uglify: {//when uglify run as a result we have all the application minified in the smartition.min.js file 
            options: {
                banner: '\n/* <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %>*/\n'
            },
            build: {
                files: {
                    'dist/js/smartition.min.js': ['app.js',
                                                   'accounts/**/*Controller.js',
                                                   'accounts/**/*Services.js',
                                                   'products/**/*Service.js',
                                                   'products/**/*Controller.js',
                                                   'GruntFile.js']
                }
            }
        }


    });

    // LOAD GRUNT PLUGINS
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

};