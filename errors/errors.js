const _ = {};

// psql error handlers
_.errorHandler400 = (err, req, res, next) => {
  const codes = ["22P02", "42703", "23502", "400"];
  if (codes.includes(err.code) || codes.includes(err.status)) {
    res.status(400).send({ msg: "Bad request" });
  } else {
    next(err);
  }
};

_.errorHandler404 = (err, req, res, next) => {
  const codes = ["404"];
  if (codes.includes(err.code) || codes.includes(err.status)) {
    res.status(404).send({ msg: "Page does not exist" });
  } else {
    next(err);
  }
};

_.errorHandler422 = (err, req, res, next) => {
  const codes = ["23503"];
  if (codes.includes(err.code)) {
    res.status(422).send({ msg: "Unprocessable entity" });
  } else {
    next(err);
  }
};

_.errorHandler500 = (err, req, res, next) => {
  res.status(500).send({ msg: "Server error" });
};

// controller for 405 invalid methods
_.errorHandler405 = (req, res, next) => {
  res.status(405).send({ msg: "Method not allowed" });
};

module.exports = _;
