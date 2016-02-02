var RiseVision = RiseVision || {};
RiseVision.JobBoard = {};

RiseVision.JobBoard = (function() {
  "use strict";

var jobs = [];
var counter = 0;
var $mainContainer = $("#target-data")
// var $directoryList = $(".directory-list")

  /*
   *  Private Methods
   */

  /* Return total number of columns in data. */
  function getNumColumns(cells) {
    var len = cells.length,
      currentRow = 0,
      previousRow = 0,
      totalCols = 0;

    for (var i = 0; i <= len; i++) {
      currentRow = parseInt(cells[i].gs$cell.row, 10);

      if (i === 0) {
        previousRow = currentRow;
      }

      if (currentRow === previousRow) {
        totalCols++;
      }
      else {
        break;
      }
    }

    return totalCols;
  }

  /* Return a single cell of data. */
  function getCell(index, cells) {
    return cells[index] ? cells[index].gs$cell.$t : "";
  }

  /* Return an individual event as an object. */
  function getJob(index, numCols, cells) {
    var individualJob = {};

    individualJob.description = getCell(index, cells);
    // individualSuite.suiteName = getCell(++index, cells);
    // individualSuite.doctorName = getCell(++index, cells);

    return individualJob;
  }

  /* Add each event to the events array. */
  function addJobs(cells) {
    counter = 0;
    jobs = [];
    var numCols = getNumColumns(cells),
      len = cells.length,
      individualJob;

    // Skip header and start at first cell of data.
    for (var i = numCols; i < len; i += numCols) {
      individualJob = getJob(i, numCols, cells);
      jobs.push(individualJob);
    }
  }

  /* Display the events. */
  function displayJobs() {

    var jobEntry = null,
      job = null,
      jobDescription = null,
      numEvents = jobs.length;

      $mainContainer.empty();

      for (var i = 0; i < numEvents; i++) {

        jobDescription = document.createElement("p");
        jobDescription.setAttribute("id", "job-description");
        jobDescription.textContent = jobs[i].description;


        // suiteEntry.innerHTML = "<h2 class='suite'>Suite " + suite.textContent + "<h2>" + "<ul class='details'>"+"<li class = 'suite-name'>" + suiteName.textContent + "</li>" + "<li class='doctor-name'>"+ doctorName.textContent +"</li>"+"</ul>"

        $mainContainer.append(jobDescription);
      }
    }

  /*
   *  Public Methods
   */
  function init() {
    var googleSheet = document.getElementById("googleSheet");
    googleSheet.addEventListener("rise-google-sheet-response", function(e) {
      addJobs(e.detail.cells);
      displayJobs();
    });
    googleSheet.go();
  }

  return {
    "init": init
  };
})();