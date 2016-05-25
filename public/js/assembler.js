// Takes test subleq assembly language input and 
// returns compiled binary array
function assemble(input) {
  var assembledInput = [];
  lines = input.split('\n');

  var symbolTable = buildSymbolTable(lines);
  if (symbolTable === undefined) {
    return undefined;
  }

  var position = 0;
  for (var i = 0; i < lines.length; i++) {
    var instruction = lexer(lines[i]);
    console.log(instruction);
    if (lexer === undefined) {
      return undefined;
    } else {
      var parsedInstruction = parse(instruction,symbolTable,position);
      console.log(parsedInstruction);
      assembledInput = assembledInput.concat(parsedInstruction); 
    }
    position += getInstructionSize(instruction);
  }
  return assembledInput;
}

function buildSymbolTable(lines) {
  var location = 0;
  var symbolTable = {};
  for (var i = 0; i < lines.length; i++) {
    var instruction = lexer(lines[i]);
    if (instruction.label !== undefined) {
      var symbol = instruction.label.replace(':','');
      if (symbolTable[symbol] === undefined) {
        symbolTable[symbol] = location;
      } else {
        // error - symbol already defined
        return undefined;
      }
    }
    var size = getInstructionSize(instruction);
    location += size; 
  }
  return symbolTable;
}

function getInstructionSize(instruction) {
  var size = 0;
  if (instruction.operation === 'SUBLEQ') {
    size = 3;
  } else if (instruction.operation === 'DATA') {
    size = 1;
  }
  return size;
}

function lexer(line) {
  // strip comments
  line = line.replace(/;.*$/,'');
  // convert comma to whitespace
  line = line.replace(/,/g,' ')
  // remove extra whitespace
  line = line.replace(/\s+/g,' ').replace(/^\s/,'').replace(/\s+$/,'');
  console.log(line);
  var regex = /(\w+:)?\s*(\w+)?\s*(\w+)?\s*(\w+)?\s*(\w+)?/;
  var match = regex.exec(line);
  console.log(match);
  if (match === undefined || match === null) {
    return {};
  } else {
    var label       = match[1];
    var operation   = match[2];
    if (operation !== undefined) {
      operation = operation.toUpperCase();
    }
    var operand1    = match[3];
    var operand2    = match[4];
    var operand3    = match[5];
    return {
      label:       label,
      operation:   operation,
      operand1:    operand1,
      operand2:    operand2,
      operand3:    operand3
    };
  }
}

function parse(instruction, symbolTable, position) {
  var parsedInstruction = []
  if (instruction.operation === 'SUBLEQ') {
    parsedInstruction.push(operandValue(instruction.operand1,symbolTable));
    parsedInstruction.push(operandValue(instruction.operand2,symbolTable));
    if (instruction.operand3 !== undefined) {
      parsedInstruction.push(operandValue(instruction.operand3,symbolTable)); 
    } else {
      // assume next instruction
      parsedInstruction.push(position + getInstructionSize(instruction));
    }
  } else if (instruction.operation === 'DATA') {
    parsedInstruction.push(operandValue(instruction.operand1,symbolTable));
  }
  return parsedInstruction;
}

function operandValue(operand, symbolTable) {
  if (operand === undefined) {
    return null;
  }
  var value = parseInt(operand);
  if (isNaN(value)) {
    console.log('Looking up ' + operand + ' in symbol table');
    if (symbolTable[operand] !== undefined) {
      value = symbolTable[operand];
      console.log('Value is ' + value);
    } else {
     console.log('Could not find ' + operand);
     return undefined;
    }
  }
  return value;
}
