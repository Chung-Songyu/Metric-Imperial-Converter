const assert = require('chai').assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', () => {
  suite('convertHandler.getNum(initNum)', () => {
    // #1
    test('Read a whole number input', () => {
      assert.equal(convertHandler.getNum("60"), 60);
    });
    // #2
    test('Read a decimal number input', () => {
      assert.equal(convertHandler.getNum("60.5"), 60.5);
    });
    // #3
    test('Read a fractional input', () => {
      assert.equal(convertHandler.getNum("60/40"), 1.5);
    });
    // #4
    test('Read a fractional input with a decimal', () => {
      assert.equal(convertHandler.getNum("60/1.5"), 40);
    });
    // #5
    test('Return an error on a double-fraction', () => {
      assert.equal(convertHandler.getNum("60/40/1.5"), "invalid number");
    });
    // #6
    test('Default to a numerical input of 1 when no numerical input is provided', () => {
      assert.equal(convertHandler.getNum(""), 1);
    });
  });

  suite('convertHandler.getUnit(initUnit)', () => {
    // #7
    test('Read each valid input unit', () => {
      assert.equal(convertHandler.getUnit("gal"), "gal");
    });
    // #8
    test('Return an error for an invalid input uni', () => {
      assert.equal(convertHandler.getUnit("ga"), "invalid unit");
    });
  });

  suite('convertHandler.getReturnUnit(properInitUnit)', () => {
    // #9
    test('Return the correct return unit for each valid input unit', () => {
      assert.equal(convertHandler.getReturnUnit("gal"), "L");
    });
  });

  suite('convertHandler.spellOutUnit(unit)', () => {
    // #10
    test('Correctly return the spelled-out string unit for each valid input unit', () => {
      assert.equal(convertHandler.spellOutUnit("gal"), "gallons");
    });
  });

  suite('convertHandler.convert(initNum, initUnit)', () => {
    // #11
    test('Correctly convert gal to L', () => {
      assert.deepEqual(convertHandler.convert(60, "gal"), [227.1246, "liters"]);
    });
    // #12
    test('Correctly convert L to gal', () => {
      assert.deepEqual(convertHandler.convert(60, "L"), [15.85033, "gallons"]);
    });
    // #13
    test('Correctly convert mi to km', () => {
      assert.deepEqual(convertHandler.convert(60, "mi"), [96.5604, "kilometers"]);
    });
    // #14
    test('Correctly convert km to mi', () => {
      assert.deepEqual(convertHandler.convert(60, "km"), [37.28236, "miles"]);
    });
    // #15
    test('Correctly convert lbs to kg', () => {
      assert.deepEqual(convertHandler.convert(60, "lbs"), [27.21552, "kilograms"]);
    });
    // #16
    test('Correctly convert kg to lbs', () => {
      assert.deepEqual(convertHandler.convert(60, "kg"), [132.27747, "pounds"]);
    });
  });
});
