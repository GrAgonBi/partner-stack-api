const router = require("express").Router();
const {
  getPartners,
  getPartner,
  getComments,
  postComment,
  deleteComment,
} = require("../controllers/partner-controller");

router.get("/", getPartners);

router.get("/:id", getPartner);
router.route("/:partnerId/comments").get(getComments).post(postComment);
router.delete("/:partnerId/comments/:commentId", deleteComment);

module.exports = router;
