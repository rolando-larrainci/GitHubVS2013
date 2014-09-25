// Gruntfile.js

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

        grunt.initConfig({

            // get the configuration info from package.json ----------------------------
            pkg: grunt.file.readJSON('package.json'),

            jshint: {
                options: {
                    reporter: require('jshint-stylish')
                },
                build: ['Grunfile.js', 'app/**/*.js']
            },
            concat: {
                dist: {
                    src: [
                        '../smarttuition/**/app.js',
                        '../smarttuition/**/*Controller.js',
                        '../smarttuition/**/*Service.js'
                    ],
                    dest: '../smarttuition/dist/js/smarttuition.js'
                },
                postBuild: {
                    src: [
                        '../smarttuition/app/libs/j*.min.js',
                        '../smarttuition/app/libs/angular.min.js',
                        '../smarttuition/app/libs/angular-*.min.js',
                        '../smarttuition/dist/js/.temp/smarttuition.temp.min.js'
                    ],
                    dest: '../smarttuition/dist/js/smarttuition.min.js'
                }
            },
            ngAnnotate: {
                options: {
                    singleQuotes: true,
                },
                gen: {
                    files: [
                        {
                            expand: true,
                            src: ['../smarttuition/dist/js/smarttuition.js']
                        }
                    ]
                },

            },
            uglify: {
                options: {
                    banner: '\n/* <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd hh:MM") %>*/\n'
                },
                build: {
                    files: {
                        '../smarttuition/dist/js/.temp/smarttuition.temp.min.js': ['../smarttuition/dist/js/smarttuition.js']
                    }
                }
            },
            templates: {
                css: '<link href="${file}" rel="stylesheet"/>',
                js: '<script src="${file}"></script>'
            },
             fileblocks: {
                dev: {
                    src: 'index.html',
                    blocks: { /* block definitions */  }
                },
                prod: {
                    /* or multiple source files per target. */
                    files: [
                        { src: 'index.html', blocks: {} },
                        { src: 'app/app.ts', blocks: {} }
                    ]
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
   
    grunt.registerTask('default', ['jshint', 'uglify', 'less', 'autoprefixer', 'usebanner', 'csscomb']);

    grunt.registerTask('dev', ['jshint',
                               'less',
                               'autoprefixer',
                               'usebanner',
                               'csscomb'
                              ]);

    grunt.registerTask('prod', ['jshint',
                               'less',
                               'autoprefixer',
                               'usebanner',
                               'csscomb',
                               'concat:dist',
                               'ngAnnotate',
                               'uglify',
                               'concat:postBuild'
                               ]);

};