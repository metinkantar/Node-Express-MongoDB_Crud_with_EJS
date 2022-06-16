const express = require("express");
const router = express.Router();
const user = require('../controllers/user');

router.route("/users").post(user.postUser);
router.route("/users").get(user.getUser);
router.route("/users/:id").put(user.putUser);
router.route("/users/:id").delete(user.deleteUser);

module.exports = router;