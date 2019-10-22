let path = require('path');
const ROOT = __dirname;
const PUBLIC = path.join(ROOT, 'public');
const UPLOAD = path.join(PUBLIC, 'upload');

module.exports = {
    PUBLIC,
    UPLOAD
}