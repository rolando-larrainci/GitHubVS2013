// Gruntfile.js

module.exports = function (grunt) {

    grunt.initConfig({

        // get the configuration info from package.json ----------------------------
        pkg: grunt.file.readJSON('package.json'),

       jshint: {
            options: {
                reporter: require('jshint-stylish') 
            },
            build: ['Grunfile.js', 'app/**/*.js']
        },
        ngAnnotate: {
            options: {
                singleQuotes: true,
            },
            gen: {
                files: [{
                             expand: true,
                             src: ['../smarttuition/**/app.js',
                                   '../smarttuition/**/*Controller.js',
                                   '../smarttuition/**/*Service.js'],
                  
                         }]
            },

        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['../smarttuition/**/app.js',
                           '../smarttuition/**/*Controller.js',
                           '../smarttuition/**/*Service.js'],
                dest: '../dist/js/smartition.min.js'
            }
        },
        uglify: {//when uglify run as a result we have all the application minified in the smartition.min.js file 
            options: {
                banner: '\n/* <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %>*/\n'
            },
            build: {
                files: {
                    '../dist/js/smartition.min.js': ['../smarttuition/**/app.js',
                                                    '../smarttuition/**/*Controller.js',
                                                    '../smarttuition/**/*Service.js']
                }
            }
        },

        //css 
        less: {
            build: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: 'styles/bootstrap/docs/dist/css/bootstrap.css.map',
                    sourceMapFilename: 'dist/css/bootstrap.css.map'
                },
                files: {
                    'dist/css/bootstrap.css': 'styles/content/less/bootstrap.less'
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: [
                  'Android 2.3',
                  'Android >= 4',
                  'Chrome >= 20',
                  'Firefox >= 24', // Firefox 24 is the latest ESR
                  'Explorer >= 8',
                  'iOS >= 6',
                  'Opera >= 12',
                  'Safari >= 6'
                ]
            },
            core: {
                options: {
                    map: true
                },
                src: 'dist/css/bootstrap.css'
            },
        },
        usebanner: {
            options: {
                position: 'top',
                banner: '<%= banner %>'
            },
            files: {
                src: 'dist/css/*.css'
            }
        },
        csscomb: {
            options: {
                config: 'styles/content/less/.csscomb.json'
            },
            dist: {
                expand: true,
                cwd: 'dist/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'dist/css/'
            }
        },



    });

    // LOAD GRUNT
    
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-csscomb');
    grunt.loadNpmTasks('grunt-banner');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ng-annotate');
   
    grunt.registerTask('default', ['jshint', 'uglify', 'less', 'autoprefixer', 'usebanner', 'csscomb']);
    grunt.registerTask('test', ['ngAnnotate', 'concat']);
    grunt.registerTask('dist-css', ['less', 'autoprefixer', 'usebanner', 'csscomb']);


};