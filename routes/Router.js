const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello");
});
const {
  getNoblePrizeByYear,
  PrizeByYearAndCateg,
  sorting,
  searchByName,
} = require("../controllers/noblePrizeController");
router.get("/search-by-name", searchByName);
router.get("/nobal-prize-by-year", getNoblePrizeByYear);
router.get("/nobal-prize-by-year-and-category", PrizeByYearAndCateg);
router.get("/sorting-by-name", sorting);
module.exports = router;
