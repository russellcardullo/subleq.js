
function resetMachineState() {
  $('#inputPC').val(0);
  $('#memoryDisplay').html(memoryArrayToTable([]));
  $('#cycles').html('0');
}

function assembleProgram(input) {
  var program = assemble(input);
  if (program !== undefined) {
    var memoryHTML = memoryArrayToTable(program);
    $('#inputPC').val(0);
    $('#memoryDisplay').html(memoryHTML);
    $('#cycles').html('0');
  } else {
    alert ('error assembling');
  }
  
}

function stepProgram(inputPC, inputMemoryId, steps) {
  var cycles = $('#cycles').html();
  var cpu = constructCPU(inputPC, inputMemoryId);
  var halt = false;
  for (var i = 0; i < steps; i++) {
    halt = cpu.step();
    if (! halt) {
      cycles++;
    }
  }
  var outputPC = cpu.getPC();
  var memoryHTML = memoryArrayToTable(cpu.getMemory());
  $('#inputPC').val(outputPC);
  $('#memoryDisplay').html(memoryHTML);
  $('#cycles').html(cycles);
}

function constructCPU(inputPC, inputMemoryId) {
  var PC = parseInt(inputPC);
  var memory = memoryTableToArray(inputMemoryId);
  var cpu = new CPU(PC,memory);
  return cpu; 
}

function loadProgram(program) {
  $('#inputProgram').val(examplePrograms[program]);
}

function memoryArrayToTable(array) {
  outputHTML = "<table class='table table-bordered table-condensed' id='memoryTable'>";
  var columnLength = 8;
  var i = 0;
  for (i = 0; i < array.length; i++) {
    if (i % columnLength === 0) {
      outputHTML += "<tr>";
    }
    outputHTML += "<td>" + array[i] + "</td>";
    if (i % columnLength === (columnLength - 1)) {
      outputHTML += "</tr>";
    } 
  }
  // pad table so that there is an even number of cells
  while (i % columnLength !== 0) {
    outputHTML += "<td></td>"
    if (i % columnLength === (columnLength - 1)) {
      outputHTML += "</tr>";
    }
    i++;
  } 
  outputHTML += "</table>";
  return outputHTML;
}

function memoryTableToArray(tableid) {
  var selector = "table#" + tableid + " tr";
  var memory = [];
  $(selector).each(function() {
    var tableData = $(this).find('td');
    if (tableData.length > 0) {
      tableData.each(function() {
        var val = parseInt($(this).text());
        if (val !== undefined && ! isNaN(val))  {
          memory.push(val);
        }
      });
    }
  });
  return memory;
}

var examplePrograms = {
   'add.subleq': "; Calculates B = A + B\n" +
                 "start:\n" +
                 "SUBLEQ A,Z\n" +
                 "SUBLEQ Z,B\n" +
                 "SUBLEQ Z,Z,end\n" +
                 "Z: DATA 0\n" +
                 "A: DATA 3\n" +
                 "B: DATA 4\n" +
                 "end:\n",
   'sum.subleq': "; Sums numbers 1 through 10\n" +
                 "start:\n" +
                 "; Compute C=C+B\n" +
                 "SUBLEQ B,Z\n" +
                 "SUBLEQ Z,C\n" +
                 "; Compute B=B-A\n" +
                 "SUBLEQ A,B,end\n" +
                 "SUBLEQ Z,Z,start\n" +
                 "Z: DATA 0\n" +
                 "A: DATA 1\n" +
                 "B: DATA 10\n" +
                 "C: DATA 0\n" +
                 "end:\n"
}

              

