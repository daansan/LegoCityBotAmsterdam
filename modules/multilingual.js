var lang = process.env.LANGUAGE;
var strings={
    "hello":{
        "en":"Hello PLACEHOLDER, and welcome to your MyRetroCar assistant."
    },
    "which":{
        "en":"Which car do you prefer? "
    },
    "specs":{
        "en": "Technical Specs"
    },
    "qna":{
        "en": "Community Knowledge"
    },
    "buy":{
        "en": "Buy online - $PLACEHOLDER"
    },
    "carchoice":{
        "en": "The PLACEHOLDER. Very good choice. Here are its detailed specs:"
    },
    "einstein":{
        "en": "Let me analyse this picture with Einstein Vision..."
    },
    "norec":{
        "en": "I do not recognize this spaceship. Please try again."
    },
    "infos":{
        "en": "You like one of our cars? Send a picture and I'll give you all the details."
    },
    "locale":{
        "en": "en_US"
    },
    "currency":{
        "en": "EUR"
    },
    "shipto":{
        "en": {
            "street_1":"747 Howard St",
            "city":"San Francisco",
            "postal_code":"94103",
            "state":"California",
            "country":"US"
          }
    }

    
};



exports.getLang = () => {
    return lang;
  }

  exports.setLang = (lan) => {
    lang=lan;
  }

  exports.get = (mark,ph=false) => {
      if(ph!==false){
        return strings[mark][lang].replace(/PLACEHOLDER/, ph);  
      }
      else
        return strings[mark][lang];
  }