'use strict';

const drive = require('./src/drive');
const Copy = require('./src/copy');

const path = require('path');

let BASE_DIR;

const copy = Copy({
    onStart: onStart,
    onEnd: onEnd,
    onError: onError
});

function getDateString() {
    return new Date().getDate();
}

function getFolderNames(dr) {
    if (dr !== 'Recovery HD') {
        return {
            in: path.join(path.sep, 'Volumes', dr),
            out: path.join(BASE_DIR, `${dr} - ${getDateString()}`)
        };
    }
}

drive.watch((dr) => {
    const location = getFolderNames();
    console.log(`Found ${location}`);

    if (location) {
        copy.dir(location.in).to(location.out);
    }
});

function onError(error) {
    console.log('ERROR!');
    console.log(error);
}

function onStart(dir, loc) {
    console.log(`Copying ${dir} to ${loc}`);
}

function onEnd(dir, location) {
    console.log(`Copied ${dir} to ${location}`);
}

(function () {
    const dir = process.argv[2];

    if (!dir) {
        console.log('Please include the base location directory when running');
        process.exit(1);
    }

    BASE_DIR = dir;

    console.log(`Copying to base directory ${dir}`);
})();