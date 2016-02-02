$(document).ready(function(){

var message = "";

  $("#submit").on('click', function(e){
    // e.preventDefault();
    document.getElementById("target-data-hidden").value = document.getElementById("job-description").innerHTML;
    var testData = document.getElementById("target-data-hidden").value;

    var desiredEmail = document.getElementById("target-email").value;
    var desiredEmailEntered = document.getElementById("cc-email");
    desiredEmailEntered.value = desiredEmail;

    console.log(testData);

   // message = $("#contact_form").serialize();
   //  $.ajax({
   //      url: "//formspree.io/peter@cameroncodes.com",
   //      method: "POST",
   //      data: {message: message},
   //      dataType: "json"
   //  });
   //  alert('Thanks for the email, we\'ll be in touch promptly.');
   //  return false;
});

  $('.search-again').on('click', function(){
    parent.history.back();
    return false;
  });
});
