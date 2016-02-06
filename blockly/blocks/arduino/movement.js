/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview Arduino blocks for the movement library.
 *               The Arduino movement functions can be found in
 *               http://arduino.cc/en/reference/movement
 *
 * TODO: Add angle selector instead of block input.
 */
'use strict';

goog.provide('Blockly.Blocks.Arduino.movement');

goog.require('Blockly.Arduino');


Blockly.Blocks.Arduino.movement.HUE = 50;

Blockly.Blocks['set_speed_motor'] = {
  /**
   * Block for writing an angle value into a movement PWM pin.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/movementWrite');
    this.setColour(Blockly.Blocks.Arduino.movement.HUE);
    this.appendDummyInput('')
        .appendField('Set Motor')
        .appendField(
            new Blockly.FieldDropdown(profile.default.direction), 'MOVEMENT_PIN');
    this.setInputsInline(false);
    this.appendValueInput(
        'MOVEMENT_SPEED', Blockly.StaticTyping.blocklyType.NUMBER)
        .setCheck(Blockly.StaticTyping.blocklyType.NUMBER)
        .appendField('at speed');
    this.appendDummyInput('')
        .appendField('(0% to 100%)');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Set a movement to an specified angle');
  }
};

Blockly.Blocks['movement_basic'] = {
  /**
   * Block for writing an angle value into a movement PWM pin.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/movementWrite');
    this.setColour(Blockly.Blocks.Arduino.movement.HUE);
    this.appendDummyInput('')
        .appendField('Set MOTOR')
        .appendField(
            new Blockly.FieldDropdown(profile.default.direction), 'MOVEMENT_PIN');
    this.setInputsInline(false);
    this.appendValueInput(
        'MOVEMENT_SPEED', Blockly.StaticTyping.blocklyType.NUMBER)
        .setCheck(Blockly.StaticTyping.blocklyType.NUMBER)
        .appendField('to speed');
    this.appendDummyInput('')
        .appendField('(-100 to 100)');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Set a movement to an specified angle');
  }
};

Blockly.Blocks['robot_forward'] = {
  /**
   * Block for writing an angle value into a movement PWM pin.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/movementWrite');
    this.setColour(Blockly.Blocks.Arduino.movement.HUE);
    this.appendDummyInput('')
        .appendField('Move FORWARD');
    this.setInputsInline(false);
    this.appendValueInput(
        'MOVEMENT_SPEED', Blockly.StaticTyping.blocklyType.NUMBER)
        .setCheck(Blockly.StaticTyping.blocklyType.NUMBER)
        .appendField('to speed');
    this.appendDummyInput('')
        .appendField(' 0% - 100%');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Set a movement to an specified angle');
  }
};

Blockly.Blocks['robot_backward'] = {
  /**
   * Block for writing an angle value into a movement PWM pin.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/movementWrite');
    this.setColour(Blockly.Blocks.Arduino.movement.HUE);
    this.appendDummyInput('')
        .appendField('Move BACKWARD');
    this.setInputsInline(false);
    this.appendValueInput(
        'MOVEMENT_SPEED', Blockly.StaticTyping.blocklyType.NUMBER)
        .setCheck(Blockly.StaticTyping.blocklyType.NUMBER)
        .appendField('to speed');
    this.appendDummyInput('')
        .appendField(' 0% - 100%');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Set a movement to an specified angle');
  }
};

Blockly.Blocks['robot_rotate_left'] = {
  /**
   * Block for writing an angle value into a movement PWM pin.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/movementWrite');
    this.setColour(Blockly.Blocks.Arduino.movement.HUE);
    this.appendDummyInput('')
        .appendField('Rotate LEFT');
    this.setInputsInline(false);
    this.appendValueInput(
        'MOVEMENT_SPEED', Blockly.StaticTyping.blocklyType.NUMBER)
        .setCheck(Blockly.StaticTyping.blocklyType.NUMBER)
        .appendField('to speed');
    this.appendDummyInput('')
        .appendField(' 0% - 100%');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Set a movement to an specified angle');
  }
};

Blockly.Blocks['robot_rotate_right'] = {
  /**
   * Block for writing an angle value into a movement PWM pin.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/movementWrite');
    this.setColour(Blockly.Blocks.Arduino.movement.HUE);
    this.appendDummyInput('')
        .appendField('Rotate RIGHT');
    this.setInputsInline(false);
    this.appendValueInput(
        'MOVEMENT_SPEED', Blockly.StaticTyping.blocklyType.NUMBER)
        .setCheck(Blockly.StaticTyping.blocklyType.NUMBER)
        .appendField('to speed');
    this.appendDummyInput('')
        .appendField(' 0% - 100%');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Set a movement to an specified angle');
  }
};

Blockly.Blocks['robot_left'] = {
  /**
   * Block for writing an angle value into a movement PWM pin.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/movementWrite');
    this.setColour(Blockly.Blocks.Arduino.movement.HUE);
    this.appendDummyInput('')
        .appendField('Turn LEFT');
    this.setInputsInline(false);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Set a movement to an specified angle');
  }
};

Blockly.Blocks['robot_right'] = {
  /**
   * Block for writing an angle value into a movement PWM pin.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/movementWrite');
    this.setColour(Blockly.Blocks.Arduino.movement.HUE);
    this.appendDummyInput('')
        .appendField('Turn RIGHT');
    this.setInputsInline(false);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Set a movement to an specified angle');
  }
};

Blockly.Blocks['robot_stop'] = {
  /**
   * Block for writing an angle value into a movement PWM pin.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/movementWrite');
    this.setColour(Blockly.Blocks.Arduino.movement.HUE);
    this.appendDummyInput('')
        .appendField('Stop Robot');
    this.setInputsInline(false);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Set a movement to an specified angle');
  }
};
