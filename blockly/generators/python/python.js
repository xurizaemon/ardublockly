/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview Code generator Arduino Digital and Analogue input/output
 *               blocks. The Arduino built in functions syntax can be found at:
 *               http://arduino.cc/en/Reference/HomePage
 */
'use strict';

goog.provide('Blockly.Arduino.python');

goog.require('Blockly.Arduino');

Blockly.Python['python_raw'] = function(block) {
  var text_python_code = block.getFieldValue('PYTHON_CODE');
  // TODO: Assemble Python into code variable.
  var code = ''+text_python_code+'\n';
  return code;
};
