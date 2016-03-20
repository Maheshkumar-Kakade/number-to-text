/**
 * Grunt file to load upages
 */
module.exports = function (grunt) {

    var watchFiles = {
        serverJS: ['gruntfile.js', 'index.js'],
    };
  
    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            js: {
                files: watchFiles.serverJS,
                tasks: ['browserify'],
                options: {
                    livereload: true
                }
            }
        },
        browserify: {
            standalone: {
                src: ['index.js','./converters/en-us.js', './converters/en-in.js', './converters/de.js'],
                dest: './dist/<%= pkg.name %>.js',
                options: {
                    browserifyOptions: {
                        standalone: 'numberToText'
                    }
                }
            }
        },
        uglify: {
            app: {
                files: {
                    'dist/number-to-text.min.js': ['dist/number-to-text.js']
                }
            }
        }
    });

    // Load the npm installed tasks
    require('load-grunt-tasks')(grunt);

    // The default tasks to run when you type: grunt
    grunt.registerTask('default', ['browserify', 'uglify']);
};