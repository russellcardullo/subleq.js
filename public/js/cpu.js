function CPU(programCounterIn, memoryIn) {
  var programCounter = programCounterIn;
  var memory = memoryIn;

  this.getPC = function() {
    return programCounter;
  };

  this.getMemory = function() {
    return memory;
  };

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
