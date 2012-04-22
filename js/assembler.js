

// Takes test subleq assembly language input and 
// returns compiled binary array
function assemble(input) {
  var assembledInput = []
  lines = input.split('\n');
  for (var i = 0; i < lines.length; i++) {
    var instruction = lexer(lines[i]);
    console.log(instruction);
    if (lexer === undefined) {
      return undefined;
    } else {
      var parsedInstruction = parse(instruction);
      console.log(parsedInstruction);
      assembledInput = assembledInput.concat(parsedInstruction); 
    }
  }
  return assembledInput;
}

function lexer(line) {
  // remove extra whitespace
  line = line.replace(/\s+/g,' ').replace(/^\s/,'');
  console.log(line);
  var regex = /(\w+:)?\s*(\w+)\s+(\d+)\s*(?:,\s*)?(\d+)?\s*(?:,\s*)?(\d+)?(?:;.*)?/;
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

function parse(instruction) {
  var parsedInstruction = []
  if (instruction.operation === 'SUBLEQ') {
    parsedInstruction.push(parseInt(instruction.operand1));
    parsedInstruction.push(parseInt(instruction.operand2));
    parsedInstruction.push(parseInt(instruction.operand3));
  } else if (instruction.operation === 'DATA') {
    parsedInstruction.push(parseInt(instruction.operand1));
  }
  return parsedInstruction;
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





