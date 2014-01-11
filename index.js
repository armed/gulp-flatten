var path = require('path');
var through = require('through');
var PluginError = require('gulp-util').PluginError;

module.exports = function(opts) {
  opts = opts || {};
  opts.newPath = opts.newPath || '';

  return through(function(file) {
    try {
      file.path = path.join(file.base, opts.newPath, path.basename(file.path));
      this.queue(file);
    } catch (e) {
      this.emit('error', new PluginError('gulp-flatten', e));
    }
  });
};
