'use strict';

goog.provide('Blockly.Python.movement');

goog.require('Blockly.Python');


Blockly.Python['movement_basic'] = function(block) {
  var pinKey = block.getFieldValue('MOVEMENT_PIN');
  //var pinType = profile.default.pin_types.SERVO;
  var servoSpeed = Blockly.Python.valueToCode(block, 'MOVEMENT_SPEED', Blockly.Python.ORDER_ATOMIC) || '90';
  servoSpeed = servoSpeed / 100;

  var servoName = 'my_' + pinKey;
  var code = servoName + '.set_normalized(' + servoSpeed + ')\n';

  // Maintain the setup regardless of pin conflict, warning should be enough
  Blockly.Python.definitions_['define_pins'] = 'from discovery_bot import pins';
  Blockly.Python.definitions_['define_servo'] = 'from discovery_bot import Servo';
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

Blockly.Python['set_speed_motor'] = function(block) {
  var pinKey = block.getFieldValue('MOVEMENT_PIN');
  //var pinType = profile.default.pin_types.SERVO;
  var servoSpeed = Blockly.Python.valueToCode(block, 'MOVEMENT_SPEED', Blockly.Python.ORDER_ATOMIC) || '90';

    var code = 'movement.setMotorSpeed(pins.' + pinKey + ',' + servoSpeed + ')\n';

  // Maintain the setup regardless of pin conflict, warning should be enough
  Blockly.Python.definitions_['define_pins'] = 'from discovery_bot import pins';
  Blockly.Python.definitions_['define_movement'] = 'from discovery_bot import Movement';
  Blockly.Python.definitions_['define_movement_inst'] = 'movement = Movement()';
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

Blockly.Python['robot_forward'] = function(block) {
  
  var servoSpeed = Blockly.Python.valueToCode(block, 'MOVEMENT_SPEED', Blockly.Python.ORDER_ATOMIC) || '90';
  var code = 'movement.forward(' + servoSpeed + ')\n';

  // Maintain the setup regardless of pin conflict, warning should be enough
  Blockly.Python.definitions_['define_pins'] = 'from discovery_bot import pins';
  Blockly.Python.definitions_['define_movement'] = 'from discovery_bot import Movement';
  Blockly.Python.definitions_['define_movement_inst'] = 'movement = Movement()';

  return code;
};

Blockly.Python['robot_backward'] = function(block) {
  
  var servoSpeed = Blockly.Python.valueToCode(block, 'MOVEMENT_SPEED', Blockly.Python.ORDER_ATOMIC) || '90';
  var code = 'movement.backward(' + servoSpeed + ')\n';

  // Maintain the setup regardless of pin conflict, warning should be enough
  Blockly.Python.definitions_['define_pins'] = 'from discovery_bot import pins';
  Blockly.Python.definitions_['define_movement'] = 'from discovery_bot import Movement';
  Blockly.Python.definitions_['define_movement_inst'] = 'movement = Movement()';

  return code;
};

Blockly.Python['robot_left'] = function(block) {
  
  var code = 'movement.turn_left()\n';

  // Maintain the setup regardless of pin conflict, warning should be enough
  Blockly.Python.definitions_['define_pins'] = 'from discovery_bot import pins';
  Blockly.Python.definitions_['define_movement'] = 'from discovery_bot import Movement';
  Blockly.Python.definitions_['define_movement_inst'] = 'movement = Movement()';

  return code;
};

Blockly.Python['robot_right'] = function(block) {
  
  var code = 'movement.turn_right()\n';

  // Maintain the setup regardless of pin conflict, warning should be enough
  Blockly.Python.definitions_['define_pins'] = 'from discovery_bot import pins';
  Blockly.Python.definitions_['define_movement'] = 'from discovery_bot import Movement';
  Blockly.Python.definitions_['define_movement_inst'] = 'movement = Movement()';

  return code;
};

Blockly.Python['robot_stop'] = function(block) {

  var code = 'movement.stop()\n';

  // Maintain the setup regardless of pin conflict, warning should be enough
  Blockly.Python.definitions_['define_pins'] = 'from discovery_bot import pins';
  Blockly.Python.definitions_['define_movement'] = 'from discovery_bot import Movement';
  Blockly.Python.definitions_['define_movement_inst'] = 'movement = Movement()';

  return code;
};

Blockly.Python['robot_rotate_left'] = function(block) {
  
  var servoSpeed = Blockly.Python.valueToCode(block, 'MOVEMENT_SPEED', Blockly.Python.ORDER_ATOMIC) || '90';
  var code = 'movement.rotate_left(' + servoSpeed + ')\n';

  // Maintain the setup regardless of pin conflict, warning should be enough
  Blockly.Python.definitions_['define_pins'] = 'from discovery_bot import pins';
  Blockly.Python.definitions_['define_movement'] = 'from discovery_bot import Movement';
  Blockly.Python.definitions_['define_movement_inst'] = 'movement = Movement()';

  return code;
};

Blockly.Python['robot_rotate_right'] = function(block) {
  
  var servoSpeed = Blockly.Python.valueToCode(block, 'MOVEMENT_SPEED', Blockly.Python.ORDER_ATOMIC) || '90';
  var code = 'movement.rotate_right(' + servoSpeed + ')\n';

  // Maintain the setup regardless of pin conflict, warning should be enough
  Blockly.Python.definitions_['define_pins'] = 'from discovery_bot import pins';
  Blockly.Python.definitions_['define_movement'] = 'from discovery_bot import Movement';
  Blockly.Python.definitions_['define_movement_inst'] = 'movement = Movement()';

  return code;
};
