module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd hh:mm:ss") %> */\n',

    targethtml: {
      dev: {
        files: {
          '200.html': 'html/200.src.html'
        }
      },
      prod: {
        files: {
          '200.html': 'html/200.src.html'
        }
      }
    },
    import: {
      options: {},
      all: {
        src: '200.html',
        dest: '200.html',
      }
    },
    htmlmin: {
      prod: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          '200.html': '200.html'
        }
      }
    },
    handlebars: {
      options: {
        namespace: 'Templates',
        processName: function(filePath) {
          return filePath.replace(/^templates\//, '').replace(/\.hbs$/, '');
        }
      },
      all: {
        files: {
          "build/js/templates.js": ["templates/**/*.hbs"]
        }
      }
    },
    sass: {
      dev: {
        options: {
          outputStyle: 'nested',
          sourceMap: true,
          sourceMapContents: true
        },
        files: {
          'build/css/app.css': 'scss/app.scss'
        }
      },
      prod: {
        options: {
          outputStyle: 'compressed',
          sourceMap: false,
          sourceMapContents: false
        },
        files: {
          'build/css/app.min.css': 'scss/app.scss'
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['ie >= 9']
      },
      dev: {
        files: {
          'build/css/app.css': 'build/css/app.css'
        }
      },
      prod: {
        files: {
          'build/css/app.min.css': 'build/css/app.min.css'
        }
      }
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      files: {
        src: ['js/app.js']
      }
    },
    clean: {
      build: ['build/'],
      css: ['build/css'],
      js: ['build/js'],
      html: ['build/html']
    },
    uglify: {
      app: {
        files: {
          'build/js/app.min.js': [
            'js/vendor/imagesloaded.pkgd.js',
            'js/vendor/handlebars.runtime.js',
            'build/js/templates.js',
            'js/helpers.js',
            'js/itembrowser.js',
            'js/data.js',
            'js/app.js'
          ]
        }
      }
    },
    watch: {
      grunt: {
        options: {
          reload: true
        },
        files: ['Gruntfile.js'],
        tasks: ['build-dev']
      },
      html: {
        files: ['html/200.src.html'],
        options: {
          livereload: true
        },
        tasks: ['build-dev']
      },
      styles: {
        files: ['scss/**/*.scss'],
        tasks: ['clean:css', 'sass:dev', 'autoprefixer:dev'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['js/**/*.js'],
        tasks: ['compilejsdev'],
        options: {
          livereload: true
        }
      },
      templates: {
        files: ['templates/**/*.hbs'],
        tasks: ['handlebars'],
        options: {
          livereload: true
        }
      }
    }
  });

  // replaces individual calls to grunt.loadNpmTask()
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('compilejsdev', ['jshint', 'clean:js', 'handlebars'])
  grunt.registerTask('compilejs', ['compilejsdev', 'uglify:app']);
  grunt.registerTask('build-dev', ['clean:css', 'sass:dev', 'autoprefixer:dev', 'handlebars', 'clean:html', 'targethtml:dev', 'import']);
  grunt.registerTask('build-prod', ['clean:css', 'sass:prod', 'autoprefixer:prod', 'compilejs', 'clean:html', 'targethtml:prod', 'import', 'htmlmin']);
  grunt.registerTask('default', ['build-dev', 'watch']);
}
