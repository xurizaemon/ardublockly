/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview Blocks for the Arduino serial communication functions.
 *               The Arduino built in functions syntax can be found at:
 *               http://arduino.cc/en/Reference/HomePage
 *
 * TODO: There are more function that can be added:
 *       http://arduino.cc/en/Reference/Serial
 */
'use strict';

goog.provide('Blockly.Blocks.Arduino.sensor');

goog.require('Blockly.Arduino');


Blockly.Blocks.Arduino.sensor.HUE = 160;

Blockly.Blocks['sensor_on_line'] = {
  /**
   * Block for creating a 'read pin'.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/DigitalRead');
    this.setColour(Blockly.Blocks.Arduino.io.HUE);
    this.appendDummyInput('')
        .appendField('Robot On Line?');
    this.setOutput(true, Blockly.StaticTyping.blocklyType.BOOLEAN);
    this.setTooltip('Reads the digital value of a pin.');
  },
  /**
   * Retrieves the type of return value for the block, in this case an integer.
   */
  getType: function() {
    return Blockly.StaticTyping.blocklyType.INTEGER;
  }
};

Blockly.Blocks['sensor_button_pressed'] = {
  /**
   * Block for creating a 'read pin'.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/DigitalRead');
    this.setColour(Blockly.Blocks.Arduino.io.HUE);
    this.appendDummyInput('')
        .appendField('Button Pressed?');
    this.setOutput(true, Blockly.StaticTyping.blocklyType.BOOLEAN);
    this.setTooltip('Reads the digital value of a pin.');
  },
  /**
   * Retrieves the type of return value for the block, in this case an integer.
   */
  getType: function() {
    return Blockly.StaticTyping.blocklyType.INTEGER;
  }
};

Blockly.Blocks['sensor_ultrasound_distance'] = {
  /**
   * Elapsed time in milliseconds block definition
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/Millis');
    this.setColour(Blockly.Blocks.Arduino.io.HUE);
    this.appendDummyInput('')
        .appendField('Get Ultrasound Distance (0-100)');
    this.setOutput(true, Blockly.StaticTyping.blocklyType.NUMBER);
    this.setTooltip('Returns the number of milliseconds since the Arduino ' +
                    'board began running the current program.');
  },
  /**
   * Retrieves the type of the block, should be a long (32bit), but  for for
   * now an int.
   */
  getType: function() {
    return Blockly.StaticTyping.blocklyType.INTEGER;
  }
};
