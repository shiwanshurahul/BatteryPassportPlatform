const mongoose = require('mongoose');

const passportSchema = new mongoose.Schema({
  data: {
    generalInformation: {
      batteryIdentifier: { 
        type: String,
         unique: true, 
         required: true,
      },
      batteryModel: {
        id: { 
          type:  String,
           unique: true,
           },
        modelName: String,
      },
      batteryMass: Number,
      batteryCategory: String,
      batteryStatus: String,
      manufacturingDate: Date,
      manufacturingPlace: String,
      warrantyPeriod: String,
      manufacturerInformation: {
        manufacturerName: String,
        manufacturerIdentifier: String,
      },
    },
    materialComposition: {
      batteryChemistry: String,
      criticalRawMaterials: [String],
      hazardousSubstances: [{
        substanceName: String,
        chemicalFormula: String,
        casNumber: String,
      }],
    },
    carbonFootprint: {
      totalCarbonFootprint: Number,
      measurementUnit: String,
      methodology: String,
    }
  }
}, { timestamps: true });


module.exports = mongoose.model('Passport', passportSchema);
