const express = require("express");

const rickAndMortyController = require("../controllers/rickAndMortyController");
const router = express.Router();

router.get("/", rickAndMortyController.getInfo, rickAndMortyController.toCSV);
module.exports = router;
