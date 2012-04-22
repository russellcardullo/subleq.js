

// Takes test subleq assembly language input and 
// returns compiled binary array
function assemble(input) {
  var assembledInput = [];
  lines = input.split('\n');
  var symbolTable = buildSymbolTable(lines);
  if (symbolTable === undefined) {
    return undefined;
  }
  for (var i = 0; i < lines.length; i++) {
    var instruction = lexer(lines[i]);
    console.log(instruction);
    if (lexer === undefined) {
      return undefined;
    } else {
      var parsedInstruction = parse(instruction,symbolTable);
      console.log(parsedInstruction);
      assembledInput = assembledInput.concat(parsedInstruction); 
    }
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
  console.log(symbolTable);
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
  // remove extra whitespace
  line = line.replace(/\s+/g,' ').replace(/^\s/,'');
  console.log(line);
  var regex = /(\w+:)?\s*(\w+)\s+(\w+)\s*(?:,\s*)?(\w+)?\s*(?:,\s*)?(\w+)?(?:;.*)?/;
  var match = regex.exec(line);
  console.log(match);
  if (match === undefined || match === null) {
    return {};
  } else {
    var label       = match[1];
    var operation   = match[2];
    var operand1    = match[3];
    var operand2    = match[4];
    var operand3    = match[5];
    return {
      label:       label,
      operation:   operation.toUpperCase(),
      operand1:    operand1,
      operand2:    operand2,
      operand3:    operand3
    };
  }
}

function parse(instruction,symbolTable) {
  var parsedInstruction = []
  if (instruction.operation === 'SUBLEQ') {
    parsedInstruction.push(operandValue(instruction.operand1,symbolTable));
    parsedInstruction.push(operandValue(instruction.operand2,symbolTable));
    parsedInstruction.push(operandValue(instruction.operand3,symbolTable));
  } else if (instruction.operation === 'DATA') {
    parsedInstruction.push(operandValue(instruction.operand1,symbolTable));
  }
  return parsedInstruction;
}

function operandValue(operand,symbolTable) {
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

//input = "subleq 0,0,0 \n \
//         subleq 1,1,1";

//console.log(assemble(input));

// ADD a, b == subleq a,Z
//             subleq Z,b
//             subleq Z,Z

//0  ADD 3, 4 == subleq a,Z (10,9,3)
//3              subleq Z,b (9,11,6)
//6              subleq Z,Z (9,9,-1)
//9  Z           0
//10 a           3
//11 b           4

//memory = [10,9,3,9,11,6,9,9,-1,0,3,4]

// start
//0 ADD 2,A   == subleq 2,Z (14,12,3)
//3           == subleq Z,A (12,13,6)
//6           == subleq Z,Z (12,12,9)
//9 JMP start == subleq Z,Z,start (12,12,0)
//12 Z          (0)
//13 A          (0)
//14 2          (2)

//memory = [14,12,3,12,13,6,12,12,9,12,12,0,0,0,2]





