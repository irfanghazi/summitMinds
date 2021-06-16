const data = require("../prize.json");

// 1. Search a Nobel prize winner by name

const concatFirstAndLastName = (data, name) => {
  const result = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].laureates.length; j++) {
      data[i].laureates[j]["name"] =
        data[i].laureates[j]["firstname"] +
        " " +
        data[i].laureates[j]["surname"];
      if (data[i].laureates[j]["name"].search(new RegExp(name, "i")) !== -1) {
        result.push(data[i].laureates[j]);
      }
    }
  }
  return result;
};
const searchByName = (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      throw new Error("Name is required");
    }
    let prizes = data.prizes;
    prizes = concatFirstAndLastName(prizes, name);

    res.json({ prizes, message: "data search successfully" });
  } catch (error) {
    res.json(error.message);
  }
};

// 2. Find out Nobel prize winner in a year input by him

const getNoblePrizeByYear = (req, res) => {
  try {
    const { year } = req.query;
    if (!year) {
      throw new Error("year is required");
    }
    const resp = [];
    const prizes = data.prizes;
    for (let i = 0; i < prizes.length; i++) {
      const prizeObj = prizes[i];
      if (prizeObj.year === year) {
        resp.push(prizeObj);
      }
    }
    res.json({ resp, message: "data fetch successfully" });
  } catch (err) {
    res.json(err.message);
  }
};

// 3. Search Prize winner based on the year and category (Peace/Chemistry/Physics etc...)
const PrizeByYearAndCateg = (req, res) => {
  try {
    const { year, category } = req.query;
    if (!year || !category) {
      throw new Error("year and category is required");
    }
    const resp = [];
    const prizes = data.prizes;
    for (let i = 0; i < prizes.length; i++) {
      const prizeObj = prizes[i];
      if (prizeObj.year === year && prizeObj.category === category) {
        resp.push(prizeObj);
      }
    }
    res.json({ resp, message: "data fetch successfully" });
  } catch (error) {
    res.json(error.message);
  }
};

// 4. Show a list of all Winners in Alphabetical order (With year and category against the name)

function compareStrings(a, b) {
  a = a.toLowerCase();
  b = b.toLowerCase();

  return a < b ? -1 : a > b ? 1 : 0;
}

const getLaureates = (data) => {
  const laurantYearAndCat = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].laureates.length; j++) {
      data[i].laureates[j]["name"] =
        data[i].laureates[j]["firstname"] +
        " " +
        data[i].laureates[j]["surname"];
      data[i].laureates[j]["year"] = data[i].year;
      data[i].laureates[j]["category"] = data[i].category;
      delete data[i].laureates[j].id;
      delete data[i].laureates[j].motivation;
      delete data[i].laureates[j].share;
      delete data[i].laureates[j].firstname;
      delete data[i].laureates[j].surname;

      laurantYearAndCat.push(data[i].laureates[j]);
    }
  }
  return laurantYearAndCat;
};
const sorting = (req, res) => {
  try {
    const prizes = data.prizes;
    const laurantYearAndCat = getLaureates(prizes);
    laurantYearAndCat.sort(function (a, b) {
      return compareStrings(a.name, b.name);
    });

    res.json({ laurantYearAndCat, message: "data fetch successfully" });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  getNoblePrizeByYear,
  PrizeByYearAndCateg,
  sorting,
  searchByName,
};
