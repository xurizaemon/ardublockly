/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview Blocks for Arduino Time functions.
 *               The arduino built in functions syntax can be found in
 *               http://arduino.cc/en/Reference/HomePage
 */
'use strict';

goog.provide('Blockly.Blocks.Arduino.python');

goog.require('Blockly.Arduino');


Blockly.Blocks.Arduino.python.HUE = 290;

Blockly.Blocks['python_raw'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Python code")
        .appendField(new Blockly.FieldTextInput("#code here"), "PYTHON_CODE");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.Arduino.python.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
