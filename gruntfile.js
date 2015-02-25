module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            modules: ''
        },
        clean: {
            logs: 'logs/karma'
        },
        jshint: {
            files: ['gruntfile.js', 'src/**/*.js', 'tests/**/*.spec.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        less: {
            dev: {
                files: {
                    'dist/assets/css/main.css': 'less/main.less',
                    'dist/assets/css/bootstrap.css': 'bower_components/bootstrap/less/bootstrap.less',
                    'dist/assets/css/font-awesome.css': 'bower_components/font-awesome/less/font-awesome.less'
                }
            }
        },
        concat: {
            app: {
                options: {
                    banner: '<%= meta.modules %>\n'
                },
                src: 'src/**/*.js',
                dest: 'dist/assets/js/app.js'
            },
            angular: {
                src: [
                    'bower_components/angular/angular.js',
                    'bower_components/angular-route/angular-route.js',
                    'bower_components/angular-resource/angular-resource.js',
                    'bower_components/angular-sanitize/angular-sanitize.js',
                    'bower_components/angular-touch/angular-touch.js',
                    'bower_components/angular-bootstrap/ui-bootstrap-tpls.js'
                ],
                dest: 'dist/assets/js/angular.js'
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        filter: 'isFile',
                        src: [ 'bower_components/font-awesome/fonts/**' ],
                        dest: 'dist/assets/fonts'
                    }
                ]
            },
            templates: {
                files: [
                    {
                        expand: true,
                        filter: 'isFile',
                        cwd: 'src',
                        src: [ '**/*.html' ],
                        dest: 'dist/templates'
                    }
                ]
            }
        },
        express: {
            options: {
                port: 1337
            },
            dev: {
                options: {
                    script: './server.js'
                }
            }
        },
        karma: {
            unit: {
                plugins: [
                    'karma-jasmine',
                    'karma-phantomjs-launcher',
                    'karma-coverage-0.11',
                    'karma-spec-reporter'
                ],
                basePath: '.',
                frameworks: ['jasmine'],
                files: [
                    { src: ['bower_components/angular/angular.js'], watched: false },
                    { src: ['bower_components/angular-mocks/angular-mocks.js'], watched: false },
                    { src: ['bower_components/angular-resource/angular-resource.js'], watched: false },
                    { src: ['bower_components/angular-route/angular-route.js'], watched: false },
                    { src: ['bower_components/angular-sanitize/angular-sanitize.js'], watched: false },
                    { src: ['bower_components/angular-touch/angular-touch.js'], watched: false },
                    { src: ['bower_components/angular-bootstrap/angular-bootstrap.js'], watched: false },
                    { src: ['src/**/*.js'] },
                    { src: ['tests/**/*.spec.js'] }
                ],
                browsers: ['PhantomJS'],
                logLevel: 'INFO',
                runnerPort: 9999,
                singleRun: true,
                reporters: ['spec', 'coverage'],
                preprocessors: { 'src/**/*.js': ['coverage'] },
                coverageReporter: {
                    type: 'lcov',
                    dir: 'logs/karma'
                }
            }
        },
        watch: {
            configFiles: {
                files: [ 'server.js' ],
                tasks:  [ 'express:dev' ],
                options: {
                    livereload: true,
                    reload: true
                }
            },
            tests: {
                files: [ 'tests/**/*.spec.js' ],
                tasks: [ 'jshint', 'karma:unit' ]
            },
            script: {
                files: [ 'src/**/*.js' ],
                tasks: [ 'jshint', 'karma:unit', 'concat:app' ],
                options: {
                    livereload: true
                }
            },
            templates: {
                files: [ 'src/**/*.html', 'design/html/**/*' ],
                tasks: [ 'copy:templates' ],
                options: {
                    livereload: true
                }
            },
            css: {
                files: 'less/**/*.less',
                tasks: [ 'less:dev' ],
                options: {
                    livereload: true
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });

    grunt.registerTask('test', ['clean', 'karma:unit']);

    grunt.registerTask('default', ['jshint', 'concat', 'less:dev', 'copy', 'test', 'express:dev', 'watch']);
};
