
function assembleProgram(input) {
  var program = assemble(input);
  var programText = program.join(' ');
  document.getElementById('machineMemory').value = programText;
  
}
