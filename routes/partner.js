const router = require("express").Router();
const { getPartners } = require("../controllers/partner-controller");

router.get("/", getPartners);

module.exports = router;
