module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				separator: ';',
				stripBanners: true,
      			banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
			},
			jquery_plugins: {
				src: [
					'<%= pkg.path.plugin %>/jquery.navigate.js', 
					'<%= pkg.path.plugin %>/jquery.dotdotdot.js', 
					'<%= pkg.path.plugin %>/jquery.form.js', 
					'<%= pkg.path.plugin %>/jquery.validate.js'
				],
				dest: '<%= pkg.path.plugin %>/jquery.plugin.pkg.js'
			},
			dist : {
				src: [
					'<%= pkg.path.jrx %>/jrx.js',
					'<%= pkg.path.jrx %>/jrx.extend.js',
					'<%= pkg.path.jrx %>/jrx.init.js'
				],
				dest: '<%= pkg.path.jrx %>/jrx.full.js'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				report: 'min'
			},
			jrx: {
				options:{
					sourceMap : true,
					sourceMapName:'<%= pkg.path.jrx %>/jrx.full.min.map'
				},
				files : {
					'<%= pkg.path.jrx %>/jrx.full.min.js' : [
						'<%= pkg.path.jrx %>/jrx.full.js'
					]
				}
			},
			form: {
				src: '<%= pkg.path.plugin %>/jquery.form.js',
				dest: '<%= pkg.path.plugin %>/jquery.form.min.js'
			},
			layer: {
				src: '<%= pkg.path.plugin %>/jquery.layer.js',
				dest: '<%= pkg.path.plugin %>/jquery.layer.min.js'
			},
			jquery_plugins : {
				files : {
					'<%= pkg.path.plugin %>/jquery.plugin.pkg.min.js' : [
						'<%= pkg.path.plugin %>/jquery.plugin.pkg.js'
					]
				}
			}
		},
		jsdoc : {
			dist : {
				src : ['<%= pkg.path.plugin %>/jquery.plugin.sample.js'],
				// src : ['<%= pkg.path.plugin %>/jquery.plugin.sample.js', 'scripts/jquery/jquery.utils.js'],
				options : {destination : 'doc'}
			}
		},
		less : {
			development: {
				options: {
					paths: ["assets/css"]
				},
				files: {
					"styles/default.less.css": "styles/default.less"
				}
			}
		}
		
	});
	
	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-jsdoc');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-concat');
	
	// Default task(s).
	grunt.registerTask('default', ['concat', 'uglify', 'jsdoc']);
	
	grunt.registerTask('doc', ['jsdoc']);
	
	grunt.registerTask('min', ['concat', 'uglify']);
	
	// grunt.registerTask('concat', ['concat']);
	
	// grunt.registerTask('less', ['less']);
};