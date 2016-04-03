'use strict';

const fs = require('fs-extra');

function setDir(options) {
    return function setDirInner(dir) {
        return {
            to: function (location) {
                options.onStart(dir, location);

                fs.copy(dir, location, function(err) {
                    if (err) {
                        options.onError
                    }

                    options.onEnd(location);
                });
            }
        };
    }
}

function generateCopy(options) {
    const onError = options.onError || () => true;
    const onStart = options.onStart || () => true;
    const onEnd = options.onEnd || () => true;

    return {
        dir: setDir(options)
    };
}

module.exports = function (options) {
    return generateCopy(options);
}