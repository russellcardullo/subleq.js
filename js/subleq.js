
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




cpu = {
  programCounter: 0,
  //memory:         [14,12,3,12,13,6,12,12,9,12,12,0,0,0,2],
  memory:         [10,9,3,9,11,6,9,9,-1,0,3,4],
  run:            function() {
    while (this.programCounter >= 0 && this.programCounter < this.memory.length) {
      a = this.memory[this.programCounter];
      b = this.memory[this.programCounter+1];
      c = this.memory[this.programCounter+2];
      if (a < 0 || b < 0) {
        this.programCounter = -1;
      } else {
        this.memory[b] = this.memory[b] - this.memory[a];
        if (this.memory[b] > 0) {
          this.programCounter = this.programCounter + 3;
        } else {
          this.programCounter = c;
        }
      }
      console.log('pc: ' + this.programCounter + ' a: ' + a + ' b: ' + b + ' c: ' + c + ' mem[a]: ' + this.memory[a] + ' mem[b]: ' + this.memory[b]);
    }
    this.dumpMemory();
  },
  dumpMemory:  function() {
    console.log(this.memory);
  }
}

cpu.run();

