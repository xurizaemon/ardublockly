/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Arduino blocks for the Servo library.
 *     The Arduino Servo functions can be found in
 *     http://arduino.cc/en/reference/servo
 *
 * TODO: Add angle selector instead of block input.
 */
'use strict';

goog.provide('Blockly.Blocks.servo');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.servo.HUE = 60;

Blockly.Blocks['servo_write'] = {
  /**
   * Block for writing an angle value into a servo PWM pin.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/ServoWrite');
    this.setColour(Blockly.Blocks.servo.HUE);
    this.appendDummyInput()
        .appendField('Set SERVO from Pin')
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.pwmPins), 'SERVO_PIN');
    this.setInputsInline(false);
    this.appendValueInput('SERVO_ANGLE')
        .setCheck(Blockly.Types.NUMBER.compatibles())
        .appendField('to');
    this.appendDummyInput()
        .appendField('Degrees (0-180)');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Set a Servo to an specified angle');
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SERVO_PIN', 'pwmPins');
  }
};

Blockly.Blocks['servo_read'] = {
  /**
   * Block for reading an angle value of a servo PWM pin.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/ServoRead');
    this.setColour(Blockly.Blocks.servo.HUE);
    this.appendDummyInput()
        .appendField('Read SERVO from PIN#')
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.pwmPins), 'SERVO_PIN');
    this.setOutput(true, Blockly.Types.NUMBER.basicType);
    this.setTooltip('Read a Servo angle');
  },
  /** @return {string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SERVO_PIN', 'pwmPins');
  }
};

// Added in TiddlyBot only?
Blockly.Blocks['servo_callibration'] = {
  /**
   * Block for writing an angle value into a movement PWM pin.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/movementWrite');
    this.setColour(Blockly.Blocks.Arduino.movement.HUE);
    this.appendDummyInput('')
        .appendField('Run Motor Calibration');
    this.setInputsInline(false);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Set a movement to an specified angle');
  }
};
