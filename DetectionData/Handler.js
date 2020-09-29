"use strict";

const DetectionDataRepository = require("../DetectionData/DetectionDataRepository");

module.exports = class Handler {
  static addDetectionData(req, res) {
    const detectionData = req.body;
    DetectionDataRepository.addDetectionData(detectionData).then(() => {
      res.send("DetectionData Add Success!");
    });
  }

  static getDetectionDataTermOnly(req, res) {
    let searchTime = {};
    if (req.query.start && req.query.end) {
      searchTime = {
        start: Number(req.query.start),
        end: Number(req.query.end)
      };
    }
    DetectionDataRepository.getDetectionDataTermOnly(searchTime)
      .then(detectionData =>{
        res.send(detectionData);
      });
  }
};
