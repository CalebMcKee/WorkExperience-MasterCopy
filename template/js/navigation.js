
  $().ready(function(){

    hideErrorAlerts();

    $("#personalLink a").click(function(){
      showPersonalDetails(); 
      return false;
    });

    $("#carLink a").click(function(){
      showCarDetails(); 
      return false;
    });

    $("#quoteLink a").click(function(){
      showQuoteDetails(); 
      return false;
    });
  });

  function showCarDetails() {
    hideErrorAlerts();

    var emptyFields = validateFields("dvPersonalDetails");

    if(emptyFields > 0) {
      $("#dvPersonalDetailsAlert").show();
    }
    else { 
      // Hide personal details
      $("#dvPersonalDetails").hide();
      $("#dvQuoteDetails").hide();
      // Proceed to car details step of process
      $("#dvCarDetails").show();
      setActiveNavigation("carLink");
    }         
  }

  function showPersonalDetails() {
      // Hide personal details
      $("#dvCarDetails").hide();
      $("#dvQuoteDetails").hide();
      hideErrorAlerts();

      // Proceed to car details step of process
      $("#dvPersonalDetails").show();
      setActiveNavigation("personalLink");
  }

  function showQuoteDetails() {
    hideErrorAlerts();

    var emptyFields = validateFields("dvPersonalDetails") + validateFields("dvCarDetails") + validateFields("dvQuoteDetails");

    if (emptyFields === 0)
    {
      $("#dvCarDetails").hide();
      $("#dvPersonalDetails").hide();

       $("#dvQuoteDetails").show();
       setActiveNavigation("quoteLink");
    }
    else
    {
      $("#dvQuoteDetailsAlert").show();
    }
  }

  function hideErrorAlerts()
  {
    $("#dvPersonalDetailsAlert").hide();
    $("#dvCarDetailsAlert").hide();
    $("#dvQuoteDetailsAlert").hide();
  }

  function setActiveNavigation(activeTab) {
    $(".nav li").removeClass("active");

    $("#" + activeTab).addClass("active");
  }

  function validateFields(sectionToValidate) {

    var emptyFields = 0;
    var textBoxes = $("#" + sectionToValidate + " input:text");

    //Check text boxes for content
    for (var index = 0; index < textBoxes.length; index++) {
      if(textBoxes[index].value == "") {
        // Increment counter
        emptyFields++;
      }
    }

    //Check number boxes for content
    if ($('#' + sectionToValidate + ' input[type="number"]').val() === "")
      emptyFields++;

    return emptyFields;
  }

  function getQuote() {
    //reset error message
    $("#dvCarDetailsAlert").hide();

    var emptyFields = validateFields("dvCarDetails");

    if (emptyFields === 0)
    {
      var gender = $("#dvPersonalDetails input:radio[name=rdoSex]:checked").val();
      var age = $("#txtAge").val();
      var yearsNoClaims = $("#ddlNCB option:selected").val();
      var costOfCar = $("#txtModelEstValue").val();
      var carStorage = $("#ddlModelStorage option:selected").val();

      $.ajax({
          type: "POST",
          url: "http://localhost:53753/api/rating/CalculateRates",
          data: {gender:gender, age:age, noClaimsBonus:yearsNoClaims, costOfCar:costOfCar, insuranceDuration:'12', carStorage:carStorage}
        }).done(function(msg) {
          $("#txtQuote").text(msg);
          showQuoteDetails();
      });
    }
    else
    {
      $("#dvCarDetailsAlert").show();
    }
  }
