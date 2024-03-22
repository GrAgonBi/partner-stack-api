const fs = require("fs");

const JSON_FILE_PATH = "./data/partners.json";

const getAllPartners = () => {
  const partners = JSON.parse(fs.readFileSync(JSON_FILE_PATH));
  return partners;
};

const getPartners = (req, res) => {
  const { industry, category, market_area } = req.query;
  // console.log(industry, category, market_area);
  const allPartners = getAllPartners();
  const partners = allPartners.filter((partner) => {
    return (
      (industry ? partner.industry === industry : true) &&
      (category ? partner.category === category : true) &&
      (market_area ? partner.market_area === market_area : true)
    );
  });
  // console.log("selectedpartners:", partners);
  return res.status(200).json(partners);
};

const getPartner = (req, res) => {
  const { id } = req.params;
  const allPartners = getAllPartners();
  const partner = allPartners.filter((partner) => {
    return partner.id === id;
  });

  if (partner.length === 0) {
    return res.status(404).json("Message: No such partner");
  }

  return res.status(200).json(partner[0]);
};

module.exports = { getPartners, getPartner };
