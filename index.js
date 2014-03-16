var path = require('path');
var through2 = require('through2');
var PluginError = require('gulp-util').PluginError;

module.exports = function(opts) {
  opts = opts || {};
  opts.newPath = opts.newPath || '';

  return through2.obj(function(file, enc, next) {
    try {
      var topDir = "";

      if(opts.keepTopDir)
      {
        var relPath = path.relative(file.base, file.path);
        topDir = relPath.split(/[\/\\\\]/)[0];
        
        if(topDir == path.basename(file.path))
          topDir = "";
      }

      file.path = path.join(file.base, opts.newPath, topDir, path.basename(file.path));
      this.push(file);
    } catch (e) {
      this.emit('error', new PluginError('gulp-flatten', e));
    }
    next();
  });
};
