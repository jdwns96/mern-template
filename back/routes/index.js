const express = require("express");

const auth = require("./auth");
const user = require("./user");
const test = require("./test");

const router = express.Router();

router.use(auth);
router.use(user);
router.use(test);

module.exports = router;
