var File_System = require('fs');

var Config = function() {};

Config.prototype.regex = /__(.*?)__/gi;

Config.prototype.config_load = function(file, type) {
	if (!type) {
		type = 'ascii';
	}
	try {
		return this.config_replace(File_System.readFileSync(file, type));
	}
	catch(err) {
		console.error("Unable to load " + file + "\n" + err);
		process.exit(0);
	}
};

Config.prototype.config_replace = function(text) {
	return text.replace(this.regex, function($0, $1) {
		var val = process.env[$1];
		return val ? val : "";
	});
};

Config.prototype.load_config_files = function() {
  this.configuration = {};
  for(var key in this.config_files) {
    try {
      this.configuration[key] = JSON.parse(this.config_load(this.config_files[key], 'utf8'));
    }
    catch(err) {
      console.error("Unable to load " + this.config_files[key] + ": " + err);
      process.exit(0);
    }
  }
};

module.exports = Config;
