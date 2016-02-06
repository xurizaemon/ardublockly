/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Helper functions for generating Python for blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Python');

goog.require('Blockly.Generator');


/**
 * Python code generator.
 * @type !Blockly.Generator
 */
Blockly.Python = new Blockly.Generator('Python');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.Python.addReservedWords(
    // import keyword
    // print ','.join(keyword.kwlist)
    // http://docs.python.org/reference/lexical_analysis.html#keywords
    'and,as,assert,break,class,continue,def,del,elif,else,except,exec,finally,for,from,global,if,import,in,is,lambda,not,or,pass,print,raise,return,try,while,with,yield,' +
    //http://docs.python.org/library/constants.html
    'True,False,None,NotImplemented,Ellipsis,__debug__,quit,exit,copyright,license,credits,' +
    // http://docs.python.org/library/functions.html
    'abs,divmod,input,open,staticmethod,all,enumerate,int,ord,str,any,eval,isinstance,pow,sum,basestring,execfile,issubclass,print,super,bin,file,iter,property,tuple,bool,filter,len,range,type,bytearray,float,list,raw_input,unichr,callable,format,locals,reduce,unicode,chr,frozenset,long,reload,vars,classmethod,getattr,map,repr,xrange,cmp,globals,max,reversed,zip,compile,hasattr,memoryview,round,__import__,complex,hash,min,set,apply,delattr,help,next,setattr,buffer,dict,hex,object,slice,coerce,dir,id,oct,sorted,intern');

/**
 * Order of operation ENUMs.
 * http://docs.python.org/reference/expressions.html#summary
 */
Blockly.Python.ORDER_ATOMIC = 0;            // 0 "" ...
Blockly.Python.ORDER_COLLECTION = 1;        // tuples, lists, dictionaries
Blockly.Python.ORDER_STRING_CONVERSION = 1; // `expression...`
Blockly.Python.ORDER_MEMBER = 2;            // . []
Blockly.Python.ORDER_FUNCTION_CALL = 2;     // ()
Blockly.Python.ORDER_EXPONENTIATION = 3;    // **
Blockly.Python.ORDER_UNARY_SIGN = 4;        // + -
Blockly.Python.ORDER_BITWISE_NOT = 4;       // ~
Blockly.Python.ORDER_MULTIPLICATIVE = 5;    // * / // %
Blockly.Python.ORDER_ADDITIVE = 6;          // + -
Blockly.Python.ORDER_BITWISE_SHIFT = 7;     // << >>
Blockly.Python.ORDER_BITWISE_AND = 8;       // &
Blockly.Python.ORDER_BITWISE_XOR = 9;       // ^
Blockly.Python.ORDER_BITWISE_OR = 10;       // |
Blockly.Python.ORDER_RELATIONAL = 11;       // in, not in, is, is not,
                                            //     <, <=, >, >=, <>, !=, ==
Blockly.Python.ORDER_LOGICAL_NOT = 12;      // not
Blockly.Python.ORDER_LOGICAL_AND = 13;      // and
Blockly.Python.ORDER_LOGICAL_OR = 14;       // or
Blockly.Python.ORDER_CONDITIONAL = 15;      // if else
Blockly.Python.ORDER_LAMBDA = 16;           // lambda
Blockly.Python.ORDER_NONE = 99;             // (...)


/**
 * Arduino Board profiles
 */
var profile = {
  arduino: {
    name: 'Arduino Uno ',
    description: 'Arduino Uno standard-compatible board',
    motor: [['forward', 'forward'], ['backward', 'backward'], ['left', 'turn_left'], ['right', 'turn_right'], ['rotate_right', 'rotate_right'], ['rotate_left', 'rotate_left'], ['stop', 'stop']],
    direction: [['left', 'SERVO_LEFT_MOTOR'], ['right', 'SERVO_RIGHT_MOTOR']],
    digital : [['BUZZER', '4'], ['LED_RED', '1'], ['LED_BLUE', '2'], ['LED_GREEN', '3']],
    digital_in : [['BUTTON', '4'], ['USOUND', '1']],
    analog : [['A0', 'A0'], ['A1', 'A1'], ['A2', 'A2'], ['A3', 'A3'],
              ['A4', 'A4'], ['A5', 'A5']],
    pwm : [['1', 'SERVO2'], ['2', 'SERVO3']],
    interrupt: [['Int_1', '1'], ['Int_2', '2'], ['Int_3', '3'], ['Int_4', '4'],
                ['Int_5', '5']],
    serial : [['serial', 'Serial']],
    serial_speed : [['300', '300'], ['600', '600'], ['1200', '1200'],
                    ['2400', '2400'], ['4800', '4800'], ['9600', '9600'],
                    ['14400', '14400'], ['19200', '19200'], ['28800', '28800'],
                    ['31250', '31250'], ['38400', '38400'],['57600', '57600'],
                    ['115200', '115200']],
    builtin_led: [['red', 'red'], ['green', 'green'], ['blue', 'blue']],
    builtin_buzzer: [['BUZZER1', '1']],
    pin_types: { INPUT: 'INPUT', OUTPUT: 'OUTPUT', PWM: 'PWM', SERVO: 'SERVO',
                 STEPPER: 'STEPPER', SPI: 'SPI' },
    types : [['void', 'void'], ['Boolean', 'boolean'], ['Character', 'char'],
             ['Unsigned Character', 'unsigned char'], ['Byte', 'byte'],
             ['Integer', 'int'], ['Unsigned Integer', 'unsigned int'],
             ['Word', 'word'], ['Long', 'long'],
             ['Unsigned Long', 'unsigned long'], ['Short', 'short'],
             ['Float', 'float'], ['Double', 'double'], ['String', 'String']],
    spi_clock_divide: [['2 (8MHz)', 'SPI_CLOCK_DIV2'],
                       ['4 (4MHz)', 'SPI_CLOCK_DIV4'],
                       ['8 (2MHz)', 'SPI_CLOCK_DIV8'],
                       ['16 (1MHz)', 'SPI_CLOCK_DIV16'],
                       ['32 (500KHz)', 'SPI_CLOCK_DIV32'],
                       ['64 (250KHz)', 'SPI_CLOCK_DIV64'],
                       ['128 (125KHz)', 'SPI_CLOCK_DIV128']],
    spi_pins: [['MOSI', '11'], ['MISO', '12'], ['SCK', '13']]
  },
  arduino_mega:{
    description: 'Arduino Mega-compatible board'
    //53 digital
    //15 analog
    //6 interrupts
    //4 serials
    //same serial_types
    //same types
  },
  arduino_leonardo:{
    description: 'Arduino Leonardo-compatible board'
    //18 digital
    //6 analog
    //5 interrupts
    //same serial
    //same types
  }
};

// Set default profile to arduino standard-compatible board
profile['default'] = profile['arduino'];

/**
 * Empty loops or conditionals are not allowed in Python.
 */
Blockly.Python.PASS = '  pass\n';

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.Python.init = function(workspace) {
  // Create a dictionary of definitions to be printed before the code.
  Blockly.Python.definitions_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  Blockly.Python.functionNames_ = Object.create(null);

  // Create a dictionary of pins to check if their use conflicts
  Blockly.Python.pins_ = Object.create(null);

  if (!Blockly.Python.variableDB_) {
    Blockly.Python.variableDB_ =
        new Blockly.Names(Blockly.Python.RESERVED_WORDS_);
  } else {
    Blockly.Python.variableDB_.reset();
  }

  var defvars = [];
  var variables = Blockly.Variables.allVariables(workspace);
  for (var x = 0; x < variables.length; x++) {
    defvars[x] = Blockly.Python.variableDB_.getName(variables[x],
        Blockly.Variables.NAME_TYPE) + ' = None';
  }
  Blockly.Python.definitions_['variables'] = defvars.join('\n');
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.Python.finish = function(code) {
  // Convert the definitions dictionary into a list.
  var imports = [];
  var definitions = [];
  for (var name in Blockly.Python.definitions_) {
    var def = Blockly.Python.definitions_[name];
    if (def.match(/^(from\s+\S+\s+)?import\s+\S+/)) {
      imports.push(def);
    } else {
      definitions.push(def);
    }
  }
  var allDefs = imports.join('\n') + '\n\n' + definitions.join('\n\n');
  return allDefs.replace(/\n\n+/g, '\n\n').replace(/\n*$/, '\n\n\n') + code;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.Python.scrubNakedValue = function(line) {
  return line + '\n';
};

/**
 * Encode a string as a properly escaped Python string, complete with quotes.
 * @param {string} string Text to encode.
 * @return {string} Python string.
 * @private
 */
Blockly.Python.quote_ = function(string) {
  // TODO: This is a quick hack.  Replace with goog.string.quote
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n')
                 .replace(/\%/g, '\\%')
                 .replace(/'/g, '\\\'');
  return '\'' + string + '\'';
};

/**
 * Common tasks for generating Python from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The Python code created for this block.
 * @return {string} Python code with comments and subsequent blocks added.
 * @private
 */
Blockly.Python.scrub_ = function(block, code) {
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    if (comment) {
      commentCode += Blockly.Python.prefixLines(comment, '# ') + '\n';
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var x = 0; x < block.inputList.length; x++) {
      if (block.inputList[x].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[x].connection.targetBlock();
        if (childBlock) {
          var comment = Blockly.Python.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.Python.prefixLines(comment, '# ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = Blockly.Python.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};
