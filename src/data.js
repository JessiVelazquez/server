'use strict';

const DataModel = require('./item-model.js');

const Data = {};

Data.addAnItem = async(req,res,next) => {
  try {
    const data = req.body;
    const item = new DataModel(data);
    console.log('item', item);
    await item.save();
    res.status(200).send(item);
  } catch(e) { next(e.message); }
}

//----------------
Data.updateOneItem = async(req, res) => {
  const id = req.params.id;
  const data = req.body;
  const item = await DataModel.findByIdAndUpdate(id, data, {new:true, useFindAndModify:false});
  res.status(200).json(item);
}

//-------------------
Data.getAllItems = async(req, res) => {
  const items = await DataModel.find({});
  res.status(200).send(items);
}

Data.getOneItem = async(req, res) => {
  const id = req.params.id;
  const items = await DataModel.find({_id:id});
  res.status(200).json(items[0]);
}

Data.deleteOneItem = async(req, res) => {
  const id = req.params.id;
  await DataModel.deleteOne({_id:id});
  res.status(200).send(`Deleted ID ${id}`);
}


module.exports = Data;
