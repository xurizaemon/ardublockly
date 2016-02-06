/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview Arduino code generator for the Servo library blocks.
 *               The Arduino Servo functions syntax can be found in
 *               http://arduino.cc/en/reference/servo
 *
 * TODO: If angle selector added to blocks edit code here.
 */
'use strict';

goog.provide('Blockly.Python.servo');

goog.require('Blockly.Python');


/**
 * Code generator to set an angle (Y) value to a servo PWM pin (X).
 * Arduino code: #include <Servo.h>
 *               Servo myServo_X;
 *               setup { myServo_X.attach(X); }
 *               loop  { myServo_X.write(Y);  }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Python['servo_write'] = function(block) {
  var pinKey = block.getFieldValue('SERVO_PIN');
  var pinType = profile.default.pin_types.SERVO;
  var servoAngle = Blockly.Python.valueToCode(block, 'SERVO_ANGLE', Blockly.Python.ORDER_ATOMIC) || '90';

  var servoName = 'my_' + pinKey;
  var code = servoName + '.set(' + servoAngle + ')\n';

  // Maintain the setup regardless of pin conflict, warning should be enough
  Blockly.Python.definitions_['define_pins'] = 'from discovery_bot import pins\n';
  Blockly.Python.definitions_['define_servo'] = 'from discovery_bot import Servo\n';
  Blockly.Python.definitions_['global_servo_' + pinKey] = servoName + ' = Servo(pins.' + pinKey + ')';
  //Blockly.Python.setups_['setup_servo_' + pinKey] = servoName + '.attach(' + pinKey + ');';

  // If the IO has been configured already set a block warning for the user
  /*if (pinKey in Blockly.Python.pins_) {
     if (Blockly.Python.pins_[pinKey] != pinType) {
       block.setWarningText('Pin already used as ' + Blockly.Python.pins_[pinKey]);
     } else {
       block.setWarningText(null);
     }
  } else {
    // First time this IO pin is used, so configure it
    Blockly.Python.pins_[pinKey] = pinType;
    block.setWarningText(null);
  }*/

  return code;
};


Blockly.Python['servo_callibration'] = function(block) {
  var code = 'c_left.set_normalized(0.5)\nc_right.set_normalized(0.5)';

  // Maintain the setup regardless of pin conflict, warning should be enough
  Blockly.Python.definitions_['define_pins'] = 'from discovery_bot import pins\n';
  Blockly.Python.definitions_['define_servo'] = 'from discovery_bot import Servo\n';
  Blockly.Python.definitions_['global_servo_left'] = 'c_left = Servo(pins.SERVO_LEFT_MOTOR)';
  Blockly.Python.definitions_['global_servo_right'] = 'c_right = Servo(pins.SERVO_LEFT_MOTOR)';

  return code;
};
