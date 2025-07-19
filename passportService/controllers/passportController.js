const Passport = require('../models/Passport');
const { sendKafkaEvent } = require('../kafka/producer');

//CRUD Operation
//create Battery controller
exports.createPassport = async (req, res) => {   //post route
  try {
    const passport = req.body;
    const { data: { generalInformation: { batteryIdentifier } } } = passport;
  
    const dataExists = await Passport.findOne({  //checking if already exists -> avoid duplication
        'data.generalInformation.batteryIdentifier': batteryIdentifier
      }); 
   
    if(dataExists){    //already exists in db
      return res.status(409).json({ 
        message: "Battery information already exists"
     });
    }
    const BatteryInfo  = await Passport.create(req.body);
    
    await sendKafkaEvent('passport.created', BatteryInfo);
    res.status(201).json({
      message : 'Battery Information created successfully',
      BatteryInfo,
      });
  } 
   catch (err) {    //send the error message 
    res.status(500).json({ 
        message: err.message
     });
  }
};

//get battery information
exports.getPassport = async (req, res) => {      //get route
  try {
    const { data } = await Passport.findById(req.params.id);  //coming from params
    if (!data)  //data not found with provided paramas/ wrong params provided  
     return res.status(404).json({ message: ' Not found Battery info, recheck the id' });
      res.json({
        message :"data fetched successfully",
        data});
  } catch (err) {
    console.log(err)
    res.status(500).json({ 
        message: err.message
     });
  }
};

//update data controller
exports.updatePassport = async (req, res) => {          //put route
  try {
    const updated = await Passport.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated)   //params is not valid / no corresponding data found in db
    return res.status(404).json({ 
       message: 'Not found' 
  });
    await sendKafkaEvent('passport.updated', updated);
    res.json({
      message : 'Product updated successfully',
      updated
    });
  } 
  catch (err) {
    res.status(500).json({ 
        message: err.message
     });
  }
};

//delete info
exports.deletePassport = async (req, res) => {
  try {
    const deleted = await Passport.findByIdAndDelete(req.params.id);
    if (!deleted) // wrong params / battety info not found
    return res.status(404).json({ 
       message: ' Battery Not found '
     });
    await sendKafkaEvent('passport.deleted', deleted);
    res.json({ message: 
      ' Battery Deleted successfully'
     });
  } 
  catch (err) {
    res.status(500).json({ 
        message: err.message
     });
  }
};
