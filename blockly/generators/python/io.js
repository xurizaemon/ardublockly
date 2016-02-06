/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview Code generator Arduino Digital and Analogue input/output
 *               blocks. The Arduino built in functions syntax can be found at:
 *               http://arduino.cc/en/Reference/HomePage
 */
'use strict';

goog.provide('Blockly.Python.IO');

goog.require('Blockly.Python');

/**
 * Function for setting the state (Y) of a built-in LED (X).
 * Arduino code: setup { pinMode(X, OUTPUT); }
 *               loop  { digitalWrite(X, Y); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Python['io_builtin_led'] = function(block) {
  var pinKey = block.getFieldValue('BUILT_IN_LED');
  var pinType = profile.default.pin_types.OUTPUT;
  var stateInput = Blockly.Python.valueToCode(
      block, 'STATE', Blockly.Python.ORDER_ATOMIC) || '0';

  Blockly.Python.definitions_['define_pins'] = 'from discovery_bot import pins';
  Blockly.Python.definitions_['define_light'] = 'from discovery_bot import Light';
  Blockly.Python.definitions_['define_red'] = 'red = Light(pins.LED_RED)';
  Blockly.Python.definitions_['define_green'] = 'green = Light(pins.LED_GREEN)';
  Blockly.Python.definitions_['define_blue'] = 'blue = Light(pins.LED_BLUE)';

  if (stateInput == 'HIGH') {
    var code = pinKey + '.on()\n';
  }
  else {
    var code = pinKey + '.off()\n';
  }

  return code;
};

Blockly.Python['io_builtin_buzzer'] = function(block) {
  var pinKey = block.getFieldValue('BUILT_IN_LED');
  var pinType = profile.default.pin_types.OUTPUT;
  var stateInput = Blockly.Python.valueToCode(
      block, 'STATE', Blockly.Python.ORDER_ATOMIC) || '0';

  Blockly.Python.definitions_['define_pins'] = 'from discovery_bot import pins';
  Blockly.Python.definitions_['define_buzzer'] = 'from discovery_bot import Buzzer';
  Blockly.Python.definitions_['define_buzzer_inst'] = 'buzzer = Buzzer()';

  if (stateInput == 'HIGH') {
    var code = 'buzzer.on()\n';
  }
  else {
    var code = 'buzzer.off()\n';
  }

  return code;
};

/**
 * Value for defining a digital pin state.
 * Arduino code: loop { HIGH / LOW }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Python['io_highlow'] = function(block) {
  // Boolean values HIGH and LOW.
  var code = (block.getFieldValue('STATE') == 'HIGH') ? 'HIGH' : 'LOW';
  return [code, Blockly.Python.ORDER_ATOMIC];
};
