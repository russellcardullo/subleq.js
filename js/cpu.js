
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




function CPU() {
  var programCounter = 0;
  //memory:         [14,12,3,12,13,6,12,12,9,12,12,0,0,0,2],
  var memory = [10,9,3,9,11,6,9,9,-1,0,3,4];
  this.run = function() {
    var halt = false;
    while (halt === false) {
      halt = this.step();
    }
  };
  this.step = function() {
    var halt = false;
    if (programCounter >= 0 && programCounter < memory.length) {
      a = memory[programCounter];
      b = memory[programCounter+1];
      c = memory[programCounter+2];
      if (a < 0 || b < 0) {
        programCounter = -1;
      } else {
        memory[b] = memory[b] - memory[a];
        if (memory[b] > 0) {
          programCounter = programCounter + 3;
        } else {
          programCounter = c;
        }
      }
      console.log('pc: ' + programCounter + '   a: ' + a + '   b: ' + b + '   c: ' + c + '   mem[a]: ' + memory[a] + '   mem[b]: ' + memory[b]);
    } else {
      halt = true;
    }
    this.dumpMemory();
    return halt;
  };
  this.dumpMemory = function() {
    var i = 0;
    var outstr = i + ':  ';
    for (i = 0; i < memory.length; i++) {
      outstr += memory[i] + '  ';
      if (i > 0 && i % 16 === 0) {
        console.log(outstr);
        outstr = i + ':  ';
      }
    }
    console.log(outstr);
  };
}

//var cpu = new CPU();
//cpu.run();

