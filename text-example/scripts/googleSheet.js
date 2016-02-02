var RiseVision = RiseVision || {};
RiseVision.Directory = {};

RiseVision.Directory = (function() {
  "use strict";

  var text = [];
  var counter = 0;
  var $mainContainer = $("#wrapper");
  var $secondContainer = $('#secondContainer');

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
  function getText(index, numCols, cells) {
    var exampleText = {};

    exampleText.text = getCell(index, cells);
    exampleText.image = getCell(++index, cells);


    return exampleText;
  }

  /* Add each event to the events array. */
  function addText(cells) {
    counter = 0;
    text = [];
    var numCols = getNumColumns(cells),
      len = cells.length,
      exampleText;

    // Skip header and start at first cell of data.
    for (var i = numCols; i < len; i += numCols) {
      exampleText = getText(i, numCols, cells);
      text.push(exampleText);
    }
  }

  /* Display the events. */
  function displayText() {



    var textEntryLight = null,
      textEntryDark = null,
      imageContainer = null,
      textLine = null,
      doctorName = null,
      eventSlides = null,
      numEvents = text.length;

      for (var i = 0; i < numEvents; i++) {

        imageContainer = document.getElementById("mainImage");
        $(imageContainer).attr('src',text[i].image);
        $secondContainer.append(imageContainer);

        textEntryDark = document.getElementById("scrollerDark");
        textEntryDark.className = "scroller";

        textEntryDark.innerHTML = "<span class='scrollingText dark'>" + text[i].text + " " + "</span>" + "<span class='scrollingText dark'>" + text[i].text + " " + "</span>"

        $mainContainer.append(textEntryDark);


        textEntryLight = document.getElementById("scrollerLight");
        textEntryLight.className = "scroller front";

        textEntryLight.innerHTML = "<span class='scrollingText light'>" + text[i].text + " " + " </span>" + "<span class='scrollingText light'>" + text[i].text + " " + "</span>"

        $secondContainer.append(textEntryLight);
      }
    }

  /*
   *  Public Methods
   */
  function init() {
    var googleSheet = document.getElementById("googleSheet");
    googleSheet.addEventListener("rise-google-sheet-response", function(e) {
      addText(e.detail.cells);
      displayText();
      // _getScrollEl();
    });
    googleSheet.go();
  }
// alert('test');


  return {
    "init": init
  };
})();