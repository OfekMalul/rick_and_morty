const fs = require("fs");
const API_RICK_MORTY = "https://rickandmortyapi.com/api/character";
let items;

async function getData() {
  const res = await fetch(API_RICK_MORTY);
  const data = await res.json();
  return data.results;
}

//1. check if human, alive, and in earth
async function renderData() {
  const data = await getData();
  let filteredData = data.filter(
    (charcter) =>
      charcter.species === "Human" &&
      charcter.status === "Alive" &&
      charcter.origin.name.split(" ")[0] === "Earth"
  );
  // create a list that only includes name, image, location
  let finalData = filteredData.map((item) => {
    return {
      name: item.name,
      location: item.location.name,
      image: item.image,
    };
  });
  return finalData;
}

// define the csv data
function defineCSVData(arr) {
  const header = Object.keys(arr[0]).join(",") + "\n";
  const data = arr
    .map((item) => {
      return Object.values(item).join(",");
    })
    .join("\n");

  return header + data;
}

// creating CSV file
function MovingDataToCSVFile(data) {
  fs.writeFile("rickAndMorty.csv", data, (err) => {
    if (err) throw err;
    console.log("CSV file has been saved successfully.");
  });
}

exports.getInfo = async (req, res, next) => {
  try {
    items = await renderData();
  } catch (err) {
    console.log(err.message);
  }
  next();
};

exports.toCSV = async (req, res, next) => {
  try {
    let data = await defineCSVData(items);
    await MovingDataToCSVFile(data);
    res.status(200).json({
      status: "success",
      items: items,
      message: "Creating CSV file!",
    });
  } catch (err) {
    console.log(err.message);
  }
  next();
};
