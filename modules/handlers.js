"use strict";

let messenger = require('./messenger'),
formatter = require('./formatter'),
uploads = require('./uploads');


exports.orderdone = (req,res) => {
  res.sendStatus(200);
  console.log('Payment Ingenico Done');
  messenger.send(formatter.recu(req.query.shipType), req.query.sender);
};

exports.Greetings = async(sender) => {
  console.log('start',sender);
  if(sender!="822485231243369"){
    let response=await messenger.getUserInfo(sender);
    messenger.send(formatter.bonjour(response), sender);
    setTimeout(function () {
      messenger.writingIcon(sender);
    }, 500)
    setTimeout(function () {
      messenger.send(formatter.information(response), sender);
    }, 2000)
  }
};

exports.InfoCar = (sender,text) => {
  let str=text.replace('-','').replace(' ','').toLowerCase();
  if(str.includes("ferrari")){uploads.doAct(sender,"Ferrari-F40");}
  else if (str.includes("t1")){uploads.doAct(sender,"Volkswagen-T1-Camper-Van");}
  else if (str.includes("beetle")){uploads.doAct(sender,"Volkswagen-Beetle");}
  else if (str.includes("cooper")){uploads.doAct(sender,"Mini-Cooper");}
  else if (str.includes("caterham")){uploads.doAct(sender,"Caterham-Seven-620r");}
  else {messenger.send(formatter.shipChoice(), sender);}
};

exports.information = (sender) => {
  messenger.send(formatter.information(response), sender);
};
