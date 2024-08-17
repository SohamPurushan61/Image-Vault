const multer = require('multer');

const storage = () => multer.memoryStorage(); // store the file data in memory for encryption

const uploadUserImage = () => multer({ storage: storage() }).single('file');

module.exports = { uploadUserImage };