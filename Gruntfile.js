module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-sass');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    builddir: 'src',
    banner: '/*!\n' +
            ' * SCARS Bootstrap Theme v<%= pkg.version %>\n' +
            '*/\n',
    clean: {
      build: {
        src: ['src/build.scss', 'src/*.css']
      }
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: false
      },
      dist: {
        src: [],
        dest: ''
      }
    },
    copy: {
      vendor: {
        files: [
          {expand: true, cwd: 'node_modules/jquery', src: ['dist/**'], dest: 'docs/_vendor/jquery/'},
          {expand: true, cwd: 'node_modules/bootstrap', src: ['dist/**'], dest: 'docs/_vendor/bootstrap/'},
          {expand: true, cwd: 'node_modules/popper.js', src: ['dist/**'], dest: 'docs/_vendor/popper.js/'}
        ]
      },
      css: {
        files: [
          {expand: true, cwd: 'src', src: ['**/*.css', '**/*.scss'], dest: 'docs/theme/'},
        ]
      },
      gem_assets: {
        files: [
          {expand: true, cwd: 'docs/theme/images', src: ['**/*'], dest: 'lib/assets/'},
        ]
      }
    },
    exec: {
      postcss: {
        command: 'npm run postcss'
      }
    },
    watch: {
      files: ['src/*/_variables.scss', 'src/*/_theme.scss'],
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

  grunt.registerTask('none', function() {});

  grunt.registerTask('build', 'build a regular theme from scss', function(theme, compress) {
    theme = ''
    compress = compress === undefined ? true : compress;

    var concatSrc;
    var concatDest;
    var scssDest;
    var scssSrc;
    var files = {};
    var dist = {};
    concatSrc = 'build/scss/build.scss';
    concatDest = 'src/build.scss';
    scssSrc = 'src/build.scss';
    scssDest = '<%=builddir%>/bootstrap.css';

    dist = {src: concatSrc, dest: concatDest};
    grunt.config('concat.dist', dist);
    files = {};
    files[scssDest] = scssSrc;
    grunt.config('sass.dist.files', files);
    grunt.config('sass.dist.options.outputStyle', 'expanded');

    grunt.task.run(['concat', 'sass:dist', 'postcss', 'clean:build',
      compress ? 'compress:' + scssDest + ':' + '<%=builddir%>/bootstrap.min.css' : 'none',
      'copy:css']);
  });

  grunt.registerTask('compress', 'compress a generic css with sass', function(fileSrc, fileDst) {
    var files = {}; files[fileDst] = fileSrc;
    grunt.log.writeln('compressing file ' + fileSrc);

    grunt.config('sass.dist.files', files);
    grunt.config('sass.dist.options.outputStyle', 'compressed');
    grunt.task.run(['sass:dist']);
  });

  grunt.registerMultiTask('swatch', 'build a theme', function() {
    var t = this.target;
    grunt.task.run('build:'+t);
  });

  grunt.registerTask('swatch', 'build a theme from scss ', function (theme) {
    var t = theme;
    if (!t) {
      for (t in grunt.config('swatch')) {
        grunt.task.run('build:' + t);
      }
    } else {
      grunt.task.run('build:' + t);
    }
  });

  grunt.registerTask('vendor', 'copy:vendor');

  grunt.registerTask('postcss', 'exec:postcss');

  grunt.registerTask('server', 'connect:keepalive');

  grunt.registerTask('default', ['connect:base', 'watch']);
};
