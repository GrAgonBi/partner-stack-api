const router = require("express").Router();
const {
  getPartners,
  getPartner,
  getComments,
  postComment,
} = require("../controllers/partner-controller");

router.get("/", getPartners);

router.get("/:id", getPartner);
router.route("/:partnerId/comments").get(getComments).post(postComment);
router.delete("/:partnerId/comments/:commentID", getPartner);

module.exports = router;
