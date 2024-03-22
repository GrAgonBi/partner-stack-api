const fs = require("fs");
const uniqid = require("uniqid");

const JSON_FILE_PATH = "./data/partners.json";

const getAllPartners = () => {
  const partners = JSON.parse(fs.readFileSync(JSON_FILE_PATH));
  return partners;
};

const setAllPartners = (partners) => {
  const partnersJson = JSON.stringify(partners);
  fs.writeFileSync(JSON_FILE_PATH, partnersJson);
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
  const partner = allPartners.find((partner) => {
    return partner.id === id;
  });

  if (!partner) {
    return res.status(404).json("Message: No such partner");
  }

  return res.status(200).json(partner);
};

const getComments = (req, res) => {
  const { partnerId } = req.params;

  const allPartners = getAllPartners();
  const partner = allPartners.find((partner) => {
    return partner.id === partnerId;
  });

  if (!partner) {
    return res.status(404).json("Message: No such partner");
  }

  const comments = partner.comments;
  res.status(200).json(comments);
};

const postComment = (req, res) => {
  const { name, comment } = req.body;
  const partnerId = req.params.partnerId;

  if (!name || !comment) {
    return res.status(400).json("Message: Please enter the required fields");
  }

  const newComment = { id: uniqid(), name, comment };

  const allPartners = getAllPartners();
  const partner = allPartners.find((partner) => {
    return partner.id === partnerId;
  });

  if (!partner) {
    return res.status(404).json("Message: No such partner");
  }

  const comments = [...partner.comments];
  comments.unshift(newComment);

  const updatedParters = allPartners.map((partner) => {
    if (partner.id === partnerId) {
      return { ...partner, comments };
    }
    return partner;
  });

  setAllPartners(updatedParters);
  res.status(201).json(newComment);
};

const deleteComment = (req, res) => {
  const { partnerId, commentId } = req.params;

  const allPartners = getAllPartners();
  const partner = allPartners.find((partner) => {
    return partner.id === partnerId;
  });

  if (!partner) {
    return res.status(404).json("Message: No such partner");
  }

  const comments = [...partner.comments];

  const foundCommentIndex = comments.findIndex(
    (comment) => comment.id === commentId
  );

  if (foundCommentIndex === -1) {
    return res.status(404).json("Message: no such comment");
  }

  const deletedComment = comments.splice(foundCommentIndex, 1);

  const updatedParters = allPartners.map((partner) => {
    if (partner.id === partnerId) {
      return { ...partner, comments };
    }
    return partner;
  });

  setAllPartners(updatedParters);

  res.status(200).json(deletedComment);
};

module.exports = {
  getPartners,
  getPartner,
  getComments,
  postComment,
  deleteComment,
};
