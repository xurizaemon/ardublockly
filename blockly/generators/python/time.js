/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview Arduino code generator for the Time blocks.
 *               The arduino built in functions syntax can be found in
 *               http://arduino.cc/en/Reference/HomePage
 */
'use strict';

goog.provide('Blockly.Python.time');

goog.require('Blockly.Arduino');


/**
 * Code generator for the delay Arduino block.
 * Arduino code: loop { delay(X); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
 Blockly.Python['time_delay'] = function(block) {
  Blockly.Python.definitions_['define_time'] = 'import time\n';
  var delayTime = Blockly.Python.valueToCode(
      block, 'DELAY_TIME_MILI', Blockly.Python.ORDER_ATOMIC) || '0';
  var code = 'time.sleep(float(' + delayTime + ') / 1000)\n';
  return code;
};

/**
 * Code generator for the delay Arduino block.
 * Arduino code: loop { delay(X); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
 Blockly.Python['time_delay_seconds'] = function(block) {
  Blockly.Python.definitions_['define_time'] = 'import time\n';
  var delayTime = Blockly.Python.valueToCode(
      block, 'DELAY_TIME_MICRO', Blockly.Python.ORDER_ATOMIC) || '0';
  var code = 'time.sleep(' + delayTime + ')\n';
  return code;
};


/**
 * Code generator for the elapsed time in milliseconds block.
 * Arduino code: loop { millis() }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
 Blockly.Python['time_millis'] = function(block) {
  var code = 'millis()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * Code generator for the elapsed time in microseconds block.
 * Arduino code: loop { micros() }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
 Blockly.Python['time_micros'] = function(block) {
  var code = 'micros()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * Code generator for the wait forever (end of program) block
 * Arduino code: loop { while(true); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
 Blockly.Python['infinite_loop'] = function(block) {
  return 'while(true):';
};
