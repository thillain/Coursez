module.exports=function(grunt){
	// Project configuration.
	grunt.initConfig({
		// This line makes the node configuration available for use.
		pkg: grunt.file.readJSON('package.json'),
		// This is where we configure JSHint
		jshint:{
			// You get to make the name
			// The paths tell JSHint which files to validate
			files:['Gruntfile.js','js/*.js','**/**/*.js'],
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
watch: {
	scripts: {
		files: ['**/*.js'],
		tasks: ['jshint'],
		options: {
			spawn: false,
		},
	},
}
});
	// Each plugin must be loaded following this pattern
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['jshint']);

};