const router = require("express").Router();
const {
  getPartners,
  getPartner,
} = require("../controllers/partner-controller");

router.get("/", getPartners);

router.get("/:id", getPartner);

module.exports = router;
