const express = require('express');
const router = express.Router();
const { addClinic, getClinics } = require('../controllers/clinicController'); // ✅ Check this line
const protectAdmin = require('../middleware/adminAuthMiddleware');
const adminAuth = require('../middleware/adminAuthMiddleware');
router.post('/add', adminAuth, addClinic);
router.get('/list', adminAuth, getClinics); // 🔍 This is probably where the error is

module.exports = router;