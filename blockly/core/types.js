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

goog.provide('Blockly.Types');

goog.require('Blockly.Type');


/** Create the types as instantiated objects on this name space. */
Blockly.Types.TEXT = new Blockly.Type({
  typeName: 'Text',
  languageKeyword: 'Text',
  basicType: Blockly.Type.BasicTypes.TEXT,
  compatibleTypes: [],
});

/** Single character. */
Blockly.Types.CHARACTER = new Blockly.Type({
  typeName: 'Character',
  languageKeyword: 'Character',
  basicType: Blockly.Type.BasicTypes.TEXT,
  compatibleTypes: [],
});

/** Boolean. */
Blockly.Types.BOOLEAN = new Blockly.Type({
  typeName: 'Boolean',
  languageKeyword: 'Boolean',
  basicType: Blockly.Type.BasicTypes.BOOLEAN,
  compatibleTypes: [Blockly.Type.BasicTypes.NUMBER],
});

/** Integer number. */
Blockly.Types.NUMBER = new Blockly.Type({
  typeName: 'Number',
  languageKeyword: 'Number',
  basicType: Blockly.Type.BasicTypes.NUMBER,
  compatibleTypes: [Blockly.Type.BasicTypes.CHARACTER, 
                    Blockly.Type.BasicTypes.DECIMAL],
});

/** Decimal number. */
Blockly.Types.DECIMAL = new Blockly.Type({
  typeName: 'Decimal',
  languageKeyword: 'Decimal',
  basicType: Blockly.Type.BasicTypes.DECIMAL,
  compatibleTypes: [Blockly.Type.NUMBER],
});

/** Decimal number. */
Blockly.Types.ARRAY = new Blockly.Type({
  typeName: 'Array',
  languageKeyword: 'Array',
  basicType: Blockly.Type.BasicTypes.ARRAY,
  compatibleTypes: [],
});

/** Null indicate there is no type. */
Blockly.Types.NULL = new Blockly.Type({
  typeName: 'Null',
  languageKeyword: 'Null',
  basicType: Blockly.Type.BasicTypes.NULL,
  compatibleTypes: [],
});

/** Type not defined, or not yet defined. */
Blockly.Types.UNDEF = new Blockly.Type({
  typeName: 'Undefined',
  languageKeyword: 'Undefined',
  basicType: Blockly.Type.BasicTypes.UNDEF,
  compatibleTypes: [],
});

/** Set when no child block (meant to define the variable type) is connected. */
Blockly.Types.CHILD_BLOCK_MISSING = new Blockly.Type({
  typeName: 'ChildBlockMissing',
  languageKeyword: 'ChildBlockMissing',
  basicType: Blockly.Type.BasicTypes.UNDEF,
  compatibleTypes: [],
});


/**
 * Adds another type to the Blockly.Types collection.
 * @param {string} typeName_ Identifiable name of the type.
 * @param {string} languageKeyword_ Language specific keyword for the type.
 * @param {Blockly.Type.BasicTypes} basicType_ Defines the basic type
 *     name this type refers to.
 * @param {Array<Blockly.Type.BasicTypes>} compatibleTypes_ List of
 *     other basic types this Type is compatible with.
 */
Blockly.Types.addType =
    function(typeName_, languageKeyword_, basicType_, compatibleTypes_) {
  // The name is used as the key from the value pair in the BlocklyTypes object
  var key = typeName.toUpperCase();
  if (Blockly.Types[key] !== undefined) {
    throw 'The Blockly type ' + key + ' already exists.';
  }
  Blockly.Types[key] = new Blockly.Type({
    typeName: typeName_,
    languageKeyword: languageKeyword_,
    basicType: basicType_,
    compatibleTypes: compatibleTypes_,
  });
};

/**
 * Converts the static types dictionary in to a an array with 2-item arrays.
 * This array only contains the valid types, excluding any error or temp types.
 * @return {!array<array<string>>} Blockly types in the format described above.
 */
Blockly.Types.getValidTypeArray = function() {
  var typesArray = [];
  for (var typeKey in Blockly.Types) {
    if ((typeKey !== 'UNDEF') && (typeKey !== 'CHILD_BLOCK_MISSING') && 
        (typeKey !== 'NULL') && (typeKey !== 'ARRAY') &&
        (typeof Blockly.Types[typeKey] !== 'function')) {
      typesArray.push([Blockly.Types[typeKey].typeName, typeKey]);
    }
  }
  return typesArray;
};
