
function resetMachineState() {
  document.getElementById('inputPC').value = 0;
  document.getElementById('machineMemory').value = '';
}

function assembleProgram(input) {
  var program = assemble(input);
  if (program !== undefined) {
    var programText = program.join(' ');
    document.getElementById('inputPC').value = 0;
    document.getElementById('machineMemory').value = programText;
  } else {
    alert ('error assembling');
  }
  
}

function stepProgram(inputPC, inputMemory, steps) {
  var cpu = constructCPU(inputPC, inputMemory);
  for (var i = 0; i < steps; i++) {
    cpu.step();
  }
  var outputPC = cpu.getPC();
  var outputMemory = cpu.getMemory().join(' ');
  document.getElementById('inputPC').value = outputPC;
  document.getElementById('machineMemory').value = outputMemory;
}

function constructCPU(inputPC, inputMemory) {
  var PC = parseInt(inputPC);
  var memory = [];
  memStrArray = inputMemory.split(' ');
  for (var i = 0; i < memStrArray.length; i++) {
    memory.push(parseInt(memStrArray[i]));
  }
  var cpu = new CPU(PC,memory);
  return cpu; 
}
