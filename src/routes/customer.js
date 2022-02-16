const express = require("express");
const router = express.Router();
const customenController = require("../controllers/customerController");

router.get("/", customenController.list);
router.post('/add', customenController.save);
router.get('/delete/:id', customenController.delete);
router.get('/update/:id', customenController.edit);
router.post('/update/:id', customenController.update);
module.exports = router;
