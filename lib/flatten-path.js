var path = require('path');

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

/**
 * Flatten the path to the desired depth
 *
 * @param {File} file - vinyl file
 * @param {Object} options
 * @return {String}
 */
function flattenPath(file, opts) {
  var topLevels;
  var bottomLevels = 0;
  var dirs;
  var topPath = [];
  var bottomPath = [];
  var newPath = [];
  var fileName = path.basename(file.path);
    var excludedFolders = opts.excludedFolders;

  if (!opts.includeParents) {
    return fileName;
  }

  opts = opts.includeParents;
  if (Array.isArray(opts)) {
    topLevels = Math.abs(opts[0]);
    bottomLevels = Math.abs(opts[1]);
  } else if (opts >= 0) {
    topLevels = opts;
  } else {
    bottomLevels = Math.abs(opts);
  }

  dirs = path.dirname(file.relative).split(path.sep);

  excludedFolders.forEach(function (folder) {
    dirs.remove(folder);
  });

  if (topLevels + bottomLevels > dirs.length) {
    return path.join.apply(path, dirs.push(fileName));
  }

  while (topLevels > 0) {
    topPath.push(dirs.shift());
    topLevels--;
  }
  while (bottomLevels > 0) {
    bottomPath.unshift(dirs.pop());
    bottomLevels--;
  }
  newPath = topPath.concat(bottomPath);
  newPath.push(fileName);

  return path.join.apply(path, newPath);
}


module.exports = flattenPath
