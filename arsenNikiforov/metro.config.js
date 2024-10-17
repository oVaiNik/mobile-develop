const path = require('path');

module.exports = {
    resolver: {
        sourceExts: ['jsx', 'js', 'ts', 'tsx', 'json'],
        assetExts: ['png', 'jpg', 'jpeg', 'svg', 'bmp', 'gif', 'eot', 'ttf', 'woff', 'woff2'],
    },
    watchFolders: [
        path.resolve(__dirname, 'assets'),
    ],
};