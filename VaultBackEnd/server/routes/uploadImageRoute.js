const express = require('express');
const router = express.Router();
const { uploadImageController } = require('../controllers/uploadImageController');
const { uploadUserImage } = require('../middleware/multer');
const { authenticateToken } = require('../middleware/authenticateToken');

// Route definition
router.post('/uploadImage', authenticateToken, uploadUserImage(), uploadImageController);

// Error-handling middleware should be defined after the route it's meant to handle errors for
router.use((error, req, res, next) => {
    console.error("Error status:", error.status || 500);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    res.status(error.status || 500).json({ message: error.message || "File upload error" });
});

module.exports = router;