module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-file-append');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-sass');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    builddir: 'docs/theme',
    banner: '/*!\n' +
            ' * SCARS Bootstrap Theme v<%= pkg.version %>\n' +
            '*/\n',
    file_append: {
      default_options: {
        files: [
          {
            append: '@import "scars-bootstrap-theme";',
            input: 'build/bootstrap/bootstrap.scss'
          }
        ]
      }
    },
    clean: {
      build: {
        src: ['build/**/*']
      }
    },
    copy: {
      prebuild: {
        files: [
          // dependencies for development website
          {expand: true, cwd: 'node_modules/jquery', src: ['dist/**'], dest: 'docs/_vendor/jquery/'},
          {expand: true, cwd: 'node_modules/popper.js', src: ['dist/**'], dest: 'docs/_vendor/popper.js/'},
          // Bootstrap & theme
          {expand: true, cwd: 'node_modules/bootstrap/scss', src: ['**/*'], dest: 'build/bootstrap'},
          {expand: true, cwd: 'docs/theme', src: '*.scss', dest: 'build/bootstrap'},
        ]
      },
      postbuild: {
        files: [
          {expand: true, cwd: 'build', src: 'scars-bootstrap.css', dest: 'docs/theme'}
        ]
      },
      gem_assets: {
        files: [
          {expand: true, cwd: 'build/bootstrap', src: ['**/*'], dest: 'lib/assets/stylesheets'},
          {expand: true, cwd: 'docs/theme/images', src: '*', dest: 'lib/assets/images'},
          {expand: true, cwd: 'docs/_vendor/bootstrap/dist/js', src: 'bootstrap.js', dest: 'lib/assets/javascripts'},
          {expand: true, cwd: 'docs/_vendor/popper.js/dist/umd', src: ['popper.js', 'popper-utils.js'], dest: 'lib/assets/javascripts'}
        ]
      }
    },
    replace: {
      example: {
        src: ['build/bootstrap/bootstrap.scss'],
        overwrite: true,
        replacements: [
          {
            from: "@import \"variables\";\n",
            to: "@import \"scars-bootstrap-variables\";\n@import \"variables\";\n"
          }
        ]
      }
    },
    watch: {
      files: ['docs/theme/*.scss'],
      tasks: 'build',
      options: {
        livereload: true,
        nospawn: true
      }
    },
    connect: {
      base: {
        options: {
          base: 'docs',
          port: 3001,
          livereload: true,
          open: true
        }
      },
      keepalive: {
        options: {
          port: 3001,
          livereload: true,
          keepalive: true,
          open: true
        }
      }
    }
  });

  grunt.registerTask('build', 'build the theme', function(theme, compress) {
    var src         = 'build/bootstrap/bootstrap.scss';
    var scssDest    = 'build/scars-bootstrap.css';
    var files       = {};
    files[scssDest] = src;

    grunt.config('sass.dist.files', files);
    grunt.config('sass.dist.options.outputStyle', 'expanded');

    grunt.task.run(['copy:prebuild', 'file_append', 'replace', 'sass:dist',
                    'copy:postbuild', 'copy:gem_assets', 'clean']);
  });

  grunt.registerTask('vendor', 'copy:vendor');

  grunt.registerTask('server', 'connect:keepalive');

  grunt.registerTask('default', ['connect:base', 'watch']);
};
