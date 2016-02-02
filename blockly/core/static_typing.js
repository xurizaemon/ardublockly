/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Object that defines static objects and methods to assign
 *     Blockly types to Blockly blocks. These can then be converted to language
 *     specific types in each language generator.
 */
'use strict';

goog.provide('Blockly.StaticTyping');

goog.require('Blockly.Block');
goog.require('Blockly.Type');
goog.require('Blockly.Types');
goog.require('Blockly.Workspace');
goog.require('goog.asserts');

/**
 * Class for a Static Typing.
 * @param {string} name Language name of this generator.
 * @constructor
 */
Blockly.StaticTyping = function() {
  this.varTypeDict = Object.create(null);
  this.varUndefBlockDict = Object.create(null);
};

/**
 * Navigates through all the blocks, collecting all variables and getting
 * their type into an associative array with the variable names as the keys and
 * the type as the values.
 * @param {Blockly.Workspace} workspace Blockly Workspace to collect variables.
 * @return {Array<Blockly.StaticTyping.Type>} Associative array with the 
 *     variable names as the keys and the type as the values.
 */
Blockly.StaticTyping.prototype.getAllVarsWithTypes = function(workspace) {
  this.varTypeDict = Object.create(null);
  this.varUndefBlockDict = Object.create(null);
  var blocks = Blockly.StaticTyping.getAllStatementsOrdered(workspace);
  for (var i = 0; i < blocks.length; i++) {
    blocks[i].select();    // for step debugging, highlights block in workspace
    // Each statement block iterates through its input children collecting vars
    var blockVarAndTypes = Blockly.StaticTyping.getBlockVars(blocks[i]);
    for (var j = 0; j < blockVarAndTypes.length; j++) {
      var varName = blockVarAndTypes[j][0];
      var varType = blockVarAndTypes[j][1];
      //this.manageVarTypeDict(blocks[i], varName, varType);

      if (goog.isArray(varType)) {
        if (this.varTypeDict[varType[1]]){
          varType = this.varTypeDict[varType[1]];
        } else {
          varType = Blockly.Types.UNDEF;
        }
      }
      switch (this.varTypeDict[varName]) {
        // First time variable is encountered, so set type and callback list
        case undefined:
          this.varTypeDict[varName] = varType;
          this.varUndefBlockDict[varName] = [];
          break;
        // Variable encountered before with undefined type, set it now
        case Blockly.Types.UNDEF:
          this.varTypeDict[varName] = varType;
          break;
        // Variable with valid type already registered
        default:
          Blockly.StaticTyping.manageTypeWarning(
              blocks[i], varType, varName, this.varTypeDict[varName]);
          break;
      }
    }
  }
  return this.varTypeDict;
};

/**
 * Navigates through each top level block in the workspace to collect all
 * statement blocks, in order from top left.
 * @param {Blockly.Workspace} workspace Blockly Workspace to collect blocks.
 * @return {Array<Blockly.Block>} Array containing all workspace statement
 *     blocks.
 */
Blockly.StaticTyping.getAllStatementsOrdered = function(workspace) {
  if (!workspace.getTopBlocks) {
    throw 'Not a valid workspace: ' + workspace;
  }

  /**
   * Navigates through each continuous block to collect all statement blocks.
   * Function required to use recursion for block input statements.
   * @param {Blockly.Block} startBlock Block to start iterating from..
   * @return {Array<Blockly.Block>} Array containing all continuous statement
   *     blocks.
   */
  var getAllContinuousStatements = function(startBlock) {
    var block = startBlock;
    var nextBlock = null;
    var connections = null;
    var blockNextConnection = null;
    var blocks = [];
    do {
      block.select();    // for step debugging, highlights block in workspace
      blocks.push(block);
      blockNextConnection = block.nextConnection;
      connections = block.getConnections_();
      block = null;
      for (var j = 0; j < connections.length; j++) {
        if (connections[j].type == Blockly.NEXT_STATEMENT) {
          nextBlock = connections[j].targetBlock();
          if (nextBlock) {
            // If it is the next connection select it and move to the next block
            if (connections[j] === blockNextConnection) {
              block = nextBlock;
            } else {
              // Recursion as block children can have their own input statements
              blocks = blocks.concat(getAllContinuousStatements(nextBlock));
            }
          }
        }
      }
    } while (block);

    return blocks;
  };

  var allStatementBlocks = [];
  var topBlocks = workspace.getTopBlocks(true);
  for (var i = 0; i < topBlocks.length; i++) {
    allStatementBlocks = allStatementBlocks.concat(
        getAllContinuousStatements(topBlocks[i]));
  }

  return allStatementBlocks;
};

/**
  * Retrieves the input argument block variables with their set type.
  * @param {Blockly.Block} block Block to retrieve variables from.
  * @return {Array<Array<String, Blockly.StaticTyping.Type>>} Two dimensional
  *     array with the block variable as the first item pair and variable type
  *     as the second.
  */
Blockly.StaticTyping.getBlockVars = function(block) {
  var blockVarAndTypes = [];
  var getVars = block.getVars;
  if (getVars) {
    var blockVariables = getVars.call(block);
    // Iterate through the variables used in this block
    for (var i = 0; i < blockVariables.length; i++) {
      var varName = blockVariables[i];
      var getVarType = block.getVarType;
      if (getVarType) {
        var varType = getVarType.call(block, varName);
        blockVarAndTypes.push([varName, varType]);
      } else {
        blockVarAndTypes.push([varName, Blockly.Types.NULL]);
      }
    }
  } // else: !(block.getVars), block does not define variables, so do nothing
  return blockVarAndTypes;
};

/**
 * Manages the associative array of variables with their type.
 * @param {Blockly.Block} block Blockly providing the variable to manage.
 * @param {string} varName Name of the variable to manage.
 * @param {Blockly.StaticTyping.Type} varType Type assigned by current block.
 * @param {Array<Blockly.StaticTyping.Type>} varsWithTypes Associative array
 *     containing the currently processed variables, with the variable names as
 *     the keys and the type as the values.
 * @param {Array<Blockly.Block>} varUndefBlockList Associative array of blocks
 *     to call back with a type for the variables (used as the key) that they
 *     contain currently undefined.
 */
Blockly.StaticTyping.prototype.manageVarTypeDict =
    function(block, varName, varType) {
  switch (this.varTypeDict[varName]) {
    // First time variable is encountered, so set type and callback list
    case undefined:
      this.varTypeDict[varName] = varType;
      this.varUndefBlockDict[varName] = [];
      //if (block.setBlockType) {
      //  if (varType == Blockly.Types.UNDEF) {
      //    // This block needs to know its type in the future
      //    this.varUndefBlockDict[varName].push(block);
      //  } else {
      //    block.setBlockType(varType);
      //  }
      //}
      break;

    // Variable encountered before with undefined type, set it now
    case Blockly.Types.UNDEF:
      if (varType == Blockly.Types.UNDEF)
      this.varTypeDict[varName] = varType;
      // If this block type is UNDEF, it will need to know its type
      //if (varType == Blockly.Types.UNDEF) {
      //  if (block.setBlockType) {
      //    this.varUndefBlockDict[varName].push(block);
      //  }
      //} else {
      //  // Valid type added, so update all waiting blocks
      //  for (var i = 0; i < this.varUndefBlockDict[varName].length; i++) {
      //    this.varUndefBlockDict[varName][i].setBlockType(varType);
      //  }
      //}
      break;

    // Variable with valid type already registered
    default:
      Blockly.StaticTyping.manageTypeWarning(
          block, varType, varName, this.varTypeDict[varName]);
      // If this block type is undefined it might need to get its type
      if ((varType == Blockly.Types.UNDEF) &&
          (block.setBlockType)) {
        block.setBlockType(this.varTypeDict[varName]);
      }
      break;
  }
};

/**
 * When a block uses a variable this function can compare its type with the
 * variable type and set a warning if they are not the same or compatible.
 * @param {!Blockly.Block} block The block to manage its warning.
 * @param {!Blockly.StaticTyping.Type} bType The type of this block.
 * @param {!string} vName The variable name.
 * @param {!Blockly.StaticTyping.Type} vType The type of the variable.
 */
Blockly.StaticTyping.manageTypeWarning = function(block, bType, vName, vType) {
  if ((bType == Blockly.Types.CHILD_BLOCK_MISSING) ||
      (vType == Blockly.Types.CHILD_BLOCK_MISSING)) {
    // User still has to attach a block to this variable or its first
    // declaration, so for now do not display any warning
    block.setWarningText(null, 'varType');
  } else if ((vType !== bType) &&
             (bType !== Blockly.Types.UNDEF)) {
    block.setWarningText('The variable ' + vName +' has been first assigned' +
        'to the type "' + vType.typeName + '"\nand this block needs it to be ' +
        'set to the type "' + bType.typeName + '" !', 'varType');
  } else {
    block.setWarningText(null, 'varType');
  }
};

/**
 * Iterates through the list of top level blocks and sets the function arguments
 * types.
 * @param {Blockly.Workspace} workspace Blockly Workspace to collect variables.
 * @param {Array<Blockly.StaticTyping.Type>} Associative array with the variable
 *     names as the keys and the type as the values.
 */
Blockly.StaticTyping.prototype.setProcedureArgs = function(workspace) {
  var blocks = workspace.getTopBlocks();
  for (var i = 0, length_ = blocks.length; i < length_; i++) {
    var setArgsType = blocks[i].setArgsType;
    if (setArgsType) {
      setArgsType.call(blocks[i], this.varTypeDict);
    }
  }
};

/**
 * Navigates through the child blocks of the input block to get the block type.
 * @param {!Blockly.Block} block Block to navigate through children.
 * @return {Blockly.StaticTyping.Type} Type of the input block.
 */
Blockly.StaticTyping.getChildBlockType = function(block) {
  var blockType = null;
  var nextBlock = [block];
  // TODO: Currently only checking the first of any child blocks, so leftmost
  // block decides type. Incoherences between several input types dealt at a
  // per-block level with their own block warnings
  while ((nextBlock[0].getBlockType === undefined) &&
         (nextBlock[0].getChildren().length > 0)) {
    nextBlock = nextBlock[0].getChildren();
  }
  if (nextBlock[0] === block) {
    // Set variable block is empty, so no type yet
    blockType = Blockly.Types.CHILD_BLOCK_MISSING;
  } else {
    var func = nextBlock[0].getBlockType;
    if (func) {
      blockType = nextBlock[0].getBlockType();
      if (blockType == Blockly.Types.UNDEF) {
        // The child block needs to find its type, if already defined, get it
        if (nextBlock[0].getVars && nextBlock[0].setBlockType) {
          var previouslySetType = this.varTypeDict[nextBlock[0].getVars()[0]];
          if (previouslySetType!== undefined) {
            nextBlock[0].setBlockType(previouslySetType);
            blockType = previouslySetType;
          }
          
        }
      }
    } else {
      // Most inner block, supposed to define a type, is missing getBlockType()
      blockType = Blockly.Types.NULL;
    }
  }
  return blockType;
};

/**
 * Regular expression objects to do Number type recognition between an integer
 * and decimal.
 * @private
 */
Blockly.StaticTyping.regExpInt_ = new RegExp(/^\d+$/);
Blockly.StaticTyping.regExpFloat_ = new RegExp(/^[0-9]*[.][0-9]+$/);

/**
 * Uses regular expressions to identify if the input number is an integer or a
 * floating point.
 * @param {string} numberString String of the number to identify.
 * @return {!Blockly.StaticTyping.BlocklyType} Blockly type.
 */
Blockly.StaticTyping.identifyNumber = function(numberString) {
    if (Blockly.StaticTyping.regExpInt_.test(numberString)) {
      return Blockly.Types.NUMBER;
    } else if (Blockly.StaticTyping.regExpFloat_.test(numberString)) {
      return Blockly.Types.DECIMAL;
    }
    return Blockly.Types.NULL;
};

/**
 * Converts the static types dictionary in to a an array with 2-item arrays.
 * This array only contains the valid types, excluding any error or temp types.
 * @return {!array<array<string>>} Blockly types in the format described above.
 */
Blockly.StaticTyping.blocklyValidTypeArray = function() {
  var typesArray = [];
  for (var typeKey in Blockly.Types) {
    if ((typeKey !== 'UNDEF') && (typeKey !== 'NULL') &&
        (typeKey !== 'CHILD_BLOCK_MISSING') && (typeKey !== 'ARRAY')) {
      typesArray.push([Blockly.Types[typeKey].typeName, typeKey]);
    }
  }
  return typesArray;
};
