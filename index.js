var transpiler = require('es6-transpiler');

var createTranspilerPreprocessor = function(args, config, logger, helper) {
  config = config || {};

  var log = logger.create('preprocessor.es6-transpiler');
  var defaultOptions = {
    disallowUnknownReferences: false
  };

  var options = helper.merge(defaultOptions, args.options || {}, config.options || {});

  return function(content, file, done) {
    log.debug('Processing "%s".', file.originalPath);

    var result = transpiler.run(helper.merge({}, options, {
      src: content
    }));

    result.errors.forEach(function(error) {
      log.error(error);
    });

    if (result.errors.length) {
      return done(1);
    } else {
      return done(result.src);
    }
  };
};

createTranspilerPreprocessor.$inject = ['args', 'config.es6Transpiler', 'logger', 'helper'];

module.exports = {
  'preprocessor:es6-transpiler': ['factory', createTranspilerPreprocessor]
};