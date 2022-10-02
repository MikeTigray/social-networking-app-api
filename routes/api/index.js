const router = require("express").Router();
const thoughtsRoute = require("./thoughtsRoute");
const usersThoughts = require("./usersRoute");

router.use("/thoughts", thoughtsRoute);
router.use("/users", usersThoughts);

module.exports = router;
