// Gruntfile.js

module.exports = function (grunt) {

    grunt.initConfig({

        // get the configuration info from package.json ----------------------------
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
            },

            // when this task is run, lint the Gruntfile and all js files in src
            build: ['Grunfile.js', 'app/**/*.js']
        },
        uglify: {
            options: {
                banner: '\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %>\n'
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

    // LOAD GRUNT PLUGINS ========================================================
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

};