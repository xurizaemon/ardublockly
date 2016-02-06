/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview Code generator Arduino Digital and Analogue input/output
 *               blocks. The Arduino built in functions syntax can be found at:
 *               http://arduino.cc/en/Reference/HomePage
 */
'use strict';

goog.provide('Blockly.Arduino.sensor');

goog.require('Blockly.Arduino');


Blockly.Python['sensor_ultrasound_distance'] = function(block) {

  Blockly.Python.definitions_['define_usound'] = 'from discovery_bot import Ultrasound';
  Blockly.Python.definitions_['global_ultrasound_'] = 'usound = Ultrasound()';

  var code = 'usound.read_normalized()';

  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['sensor_on_line'] = function(block) {

  Blockly.Python.definitions_['define_ir'] = 'from discovery_bot import Infrared';
  Blockly.Python.definitions_['global_ir_'] = 'ir = Infrared()';

  var code = 'ir.on_line()';

  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['sensor_button_pressed'] = function(block) {

  Blockly.Python.definitions_['define_button'] = 'from discovery_bot import Button';
  Blockly.Python.definitions_['global_button_'] = 'b = Button()';

  var code = 'b.button_pressed()';

  return [code, Blockly.Python.ORDER_ATOMIC];
};

