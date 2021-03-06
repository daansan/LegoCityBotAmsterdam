"use strict";

let moment = require("moment"),
    ml = require("./multilingual"),
    numeral = require("numeral");

 var price={"ferrarif40":1250.99,"volkswagent1campervan":1399.99,"volkswagenbeetle":1250.99,"minicooper":1400.10,"caterhamseven620r":2019.87};
 var commlinks={ferrarif40:process.env.COMMUNITY_FERRARI_F40,
    volkswagent1campervan:process.env.COMMUNITY_VOLKSWAGEN_T1_CAMPER_VAN,
    volkswagenbeetle:process.env.COMMUNITY_VOLKSWAGEN_BEETLE,
    caterhamseven620r:process.env.COMMUNITY_CATERHAM_SEVEN_620R,
    minicooper:process.env.COMMUNITY_MINI_COOPER};


exports.greeting = response => {
    return {
        //"text":ml.get("hello",response.first_name),
        "text":ml.get("hello","Rachel"),
    }
};
exports.carChoice = () =>{
  return {
      "text":ml.get("which"),
      "quick_replies":[
        {
          "content_type":"text",
          "title":"Ferrari F40",
          "payload":"ferrari-f40"
        },
        {
          "content_type":"text",
          "title":"Caterham Seven 620r",
          "payload":"caterham-seven-620r"
        },
        {
          "content_type":"text",
          "title":"Mini Cooper",
          "payload":"mini-cooper"
        },
        {
          "content_type":"text",
          "title":"Volkswagen Beetle",
          "payload":"volkswagen-beetle"
        },
        {
          "content_type":"text",
          "title":"Volkswagen T1 Camper Van",
          "payload":"volkswagen-t1-camper-van"
        }
      ]
  }
}

exports.information = response => {
  //  console.log('onBoard2');
    return {
        "text":ml.get("infos")
      }
};

exports.mapCarLabelToType = (label) => {
    //converts einstein labels to car types, helps to load images
    if(label.toLowerCase().includes("ferrari")) {
        return "Ferrari-F40";
    } else if(label.toLowerCase().includes("caterham")) {
        return "Caterham-Seven-620r";
    } else if(label.toLowerCase().includes("mini")) {
        return "Mini-Cooper";
    } else if(label.toLowerCase().includes("beetle")) {
        return "Volkswagen-Beetle";
    } else if(label.toLowerCase().includes("van")) {
        return "Volkswagen-T1-Camper-Van";
    } else {
        return "unknown";
    }
}

exports.ficheinfo = (carType) => {
    console.log("in ficheinfo, carType=" + carType);
    console.log("carType after processing: " + carType.replace(/-/g,'').replace(/ /g,'').toLowerCase());
    let elements = [];
        elements.push(
            {
                title: carType,
                "image_url": 'https://' + process.env.HEROKU_APP_NAME  + '.herokuapp.com/'+carType.replace(' ','').toLowerCase()+'.png?'+process.env.HEROKU_RELEASE_VERSION,
                "buttons": [
                    {
                        "type": "postback",
                        "title": ml.get("specs"),
                        "payload": "fiche,"+carType
                    },
                    {
                        "type":"web_url",
                        "title":ml.get("qna"),
                        "url": "https://"+process.env.COMMUNITY_URL+commlinks[carType.replace(/-/g,'').replace(/ /g,'').toLowerCase()]+"?"+process.env.HEROKU_RELEASE_VERSION,
                        "webview_height_ratio": "full",
                        "messenger_extensions": false
                    }
                ]
            }
        );
    console.log("button",elements[0]);
    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": elements
            }
        }
    };
};

exports.fiche = carType => {
    return {
        "attachment": {
            "type": "image",
            "payload": {
                "url": 'https://' + process.env.HEROKU_APP_NAME + '.herokuapp.com/'+carType.replace(' ','').toLowerCase()+'-specs-'+process.env.LANGUAGE+'.png?'+process.env.HEROKU_RELEASE_VERSION
            }
        }
    };
};

exports.feedback = pUrl => {
    
        let elements = [];
            elements.push(
                {
                    title: 'What is the right car?',
                    "image_url": pUrl,
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "Ferrari F40",
                            "payload": "feedback,ferrari-f40;"+pUrl
                        },
                        {
                            "type": "postback",
                            "title": "Caterham Seven 620r",
                            "payload": "feedback,caterham-seven-620r;"+pUrl
                        },
                        {
                            "type": "postback",
                            "title": "Mini Cooper",
                            "payload": "feedback,mini-cooper;"+pUrl
                        }/*,
                        {
                            "type": "postback",
                            "title": "Volkswagen Beetle",
                            "payload": "feedback,volkswagen-beetle;"+pUrl
                        },
                        {
                            "type": "postback",
                            "title": "Volkswagen T1 Camper Van",
                            "payload": "feedback,volkswagen-t1-camper-van;"+pUrl
                        }*/
                    ]
                }
            );
    // console.log("bouton",elements[0].buttons[2]);
        return {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": elements
                }
            }
        };
    };