
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