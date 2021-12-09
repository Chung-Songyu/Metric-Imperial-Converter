function ConvertHandler(initNum, initUnit) {
  // regex for initNum
  this.getNum = (initNum) => {
    let properInitNum = null;
    if(initNum=="") {
      initNum = 1;
    }
    const numRegex = /^\d+(\.\d+)?(\/\d+(\.\d+)?)?$/g;
    if(numRegex.test(initNum)) {
      properInitNum = eval(initNum);
    } else {
      properInitNum = "invalid number";
    }
    return properInitNum;
  };

  // regex for initUnit + short form of initUnit
  this.getUnit = (initUnit) => {
    let properInitUnit = null;
    const unitRegex = /^(gal|gallons|L|liters|lbs|pounds|kg|kilograms|mi|miles|km|kilometers)$/i;
    if(unitRegex.test(initUnit)) {
      if(initUnit=="L" || initUnit=="l") {
        properInitUnit = "L";
      } else {
        properInitUnit = initUnit.toLowerCase();
        switch (properInitUnit) {
          case "gallons":
            properInitUnit = "gal";
            break;
          case "liters":
            properInitUnit = "L";
            break;
          case "pounds":
            properInitUnit = "lbs";
            break;
          case "kilograms":
            properInitUnit = "kg";
            break;
          case "miles":
            properInitUnit = "mi";
            break;
          case "kilometers":
            properInitUnit = "km";
            break;
        };
      };
    } else {
      properInitUnit = "invalid unit";
    }
    return properInitUnit;
  };

  // short form of final unit
  this.getReturnUnit = (properInitUnit) => {
    switch (properInitUnit) {
      case "gal":
        return "L";
        break;
      case "L":
        return "gal";
        break;
      case "lbs":
        return "kg";
        break;
      case "kg":
        return "lbs";
        break;
      case "mi":
        return "km";
        break;
      case "km":
        return "mi";
        break;
    };
  };

  // long form of unit (init/final)
  this.spellOutUnit = (unit) => {
    switch (unit) {
      case "gal":
        return "gallons";
        break;
      case "L":
        return "liters";
        break;
      case "lbs":
        return "pounds";
        break;
      case "kg":
        return "kilograms";
        break;
      case "mi":
        return "miles";
        break;
      case "km":
        return "kilometers";
        break;
    };
  };

  // return final num + unit
  this.convert = (initNum, initUnit) => {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    const properInitNum = this.getNum(initNum);
    const properInitUnit = this.getUnit(initUnit);
    let returnNum = null;

    if(properInitUnit=="gal") {
      returnNum = Number((properInitNum*galToL).toFixed(5));
    } else if(properInitUnit=="L") {
      returnNum = Number((properInitNum/galToL).toFixed(5));
    } else if(properInitUnit=="lbs") {
      returnNum = Number((properInitNum*lbsToKg).toFixed(5));
    } else if(properInitUnit=="kg") {
      returnNum = Number((properInitNum/lbsToKg).toFixed(5));
    } else if(properInitUnit=="mi") {
      returnNum = Number((properInitNum*miToKm).toFixed(5));
    } else if(properInitUnit=="km") {
      returnNum = Number((properInitNum/miToKm).toFixed(5));
    };

    const returnLongFinalUnit = this.spellOutUnit(this.getReturnUnit(this.getUnit(initUnit)));

    return [returnNum, returnLongFinalUnit];
  };

  this.getString = this.getNum(initNum)=="invalid number"&&this.getUnit(initUnit)=="invalid unit"? "invalid number and unit" : this.getNum(initNum)=="invalid number"? "invalid number" : this.getUnit(initUnit)=="invalid unit"? "invalid unit" : {
    "initNum": this.getNum(initNum),
    "initUnit": this.getUnit(initUnit),
    "returnNum": this.convert(initNum, initUnit)[0],
    "returnUnit": this.getReturnUnit(this.getUnit(initUnit)),
    "string": this.getNum(initNum) + " " + this.spellOutUnit(this.getUnit(initUnit)) + " converts to " + this.convert(initNum, initUnit)[0] + " " + this.convert(initNum, initUnit)[1]
  }
};

module.exports = ConvertHandler;
