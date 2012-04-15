

// Takes test subleq assembly language input and 
// returns compiled binary array
function assemble(input) {
  lines = input.split('\n');
  for (var i = 0; i < lines.length; i++) {
    // remove extra whitespace
    var line = lines[i].replace(/\s+/g,' ').replace(/^\s/,'');
    console.log(line);
    var regex = /\b(\w+)\s+(\d+)\s*,\s*(\d+)\s*(?:,\s*)?(\d+)?/;
    var match = regex.exec(line);
    var instruction = match[1];
    var operand1    = match[2];
    var operand2    = match[3];
    var operand3    = match[4];
    console.log('ins: ' + instruction);
    console.log('op1: ' + operand1);
    console.log('op2: ' + operand2);
    console.log('op3: ' + operand3);
  }
}

input = "subleq 0,0,0 \n \
         subleq 1,1,1";

console.log(assemble(input));

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





