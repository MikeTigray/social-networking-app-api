const router = require("express").Router();
const {
  getAllThoughts,
  createThought,
  getSingleThought,
  updateThought,
  removeThought,
  createReaction,
  removeReaction,
} = require("../../controllers/thoughtsController");

router.route("/").get(getAllThoughts).post(createThought);

router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(removeThought);

router.post("/:thoughtId/reactions", createReaction);

router.delete("/:thoughtId/reactions/:reactionId", removeReaction);
module.exports = router;
