"use strict";

let messenger = require('./messenger'),
formatter = require('./formatter'),
einstein = require('./einstein'),
nodeGeocoder = require('node-geocoder'),
ml = require("./multilingual"),
Redis = require('ioredis');
var redis = new Redis(process.env.REDIS_URL);

//require('./vision-service-mock')
var options = {
  provider: 'google'
};

//var geocoder = nodeGeocoder(options);
exports.doAct = async(sender, carType) => {
  messenger.send({text: ml.get("carchoice",carType)}, sender);
  //let returnUrl="https://sdo-demo-main-141e22218df-14-15950af6391.secure.force.com/Public/ingenico_PostCheckout?lang="+process.env.LANGUAGE+"&sender="+sender+"&shipType="+shipType.replace('-','').replace(' ','').toLowerCase();

  //let redirecturl = await ingenico.createCheckout(returnUrl,shipType);
  //console.log('ingenico',redirecturl);
  //if(redirecturl!==null)
  messenger.send(formatter.ficheinfo(carType), sender);//,redirecturl), sender);

};


exports.processUpload = async(sender, attachments) => {
  if (attachments.length > 0) {
    let attachment = attachments[0];
    if (attachment.type === "image") {
      messenger.send({text: ml.get("einstein")}, sender);
      setTimeout(function () {messenger.writingIcon(sender);}, 50)
      redis.set(sender, attachment.payload.url);
      let carType = await einstein.classify(attachment.payload.url);
      console.log('classification defined:',carType);
      if(carType.probability<0.4){
        console.log("probability too low",carType.probability);
        messenger.send({text: ml.get("norec")}, sender);
      }
      else{
            this.doAct(sender,formatter.mapCarLabelToType(carType.label));
          }

    }else if (attachment.type === "location") {
/*
      messenger.getUserInfo(sender).then(response => {
        messenger.send(formatter.renderRooms(response), sender);
      });

      console.log('attachment.payload.coordinates.lat: ', attachment.payload.coordinates.lat);
      console.log('attachment.payload.coordinates.long: ', attachment.payload.coordinates.long);
      console.log('geocoder: ', geocoder);

      geocoder.reverse({lat: attachment.payload.coordinates.lat, lon: attachment.payload.coordinates.long}).then(function(res) {
        console.log('result: ', res);
        console.log('ZIPCODE!: ', res[0].zipcode);

        messenger.setZip(res[0].zipcode);

        /*
        messenger.getSuggestion(res[0].zipcode, '2').then(response => {
        messenger.send({text: `${response.service_plan}`}, sender);
      });
      */
/*
    }).catch(function(err) {
      console.log('err: ', err);
    });
*/


  } else {
    messenger.send({text: 'This type of attachment is not supported'}, sender);
  }
}
};
