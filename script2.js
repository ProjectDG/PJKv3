
// Fetch the JSON data
fetch('data.json')
.then(response => {
  // Check if the response is ok, else throw an error
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
})

.then(data => {

  // Full Screen Function
  var elem = document.getElementsByTagName("BODY")[0];
  function openFullscreen() {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  }

  // Full Screen on Button Click
  $('body').on('click', 'button',function(){
    openFullscreen();
  });

  
  $(document).ready(function(){

    // Main Page Structure Initialization ------------------------------------------------------------------------
    function initialize(){
      d3.select("body").append("div").attr("id", "topNav");
      d3.select("#topNav").append("button").text("Cocktails").attr("class", "button nav-buttons").attr("id", "cocktails");
      d3.select("#topNav").append("button").text("Originals").attr("class", "button nav-buttons").attr("id", "originals");
      d3.select("body").append("div").attr("id", "mainContainer");
      d3.select("body").append("div").attr("id", "bottomNav");
      d3.select("#bottomNav").append("button").text("Search Drinks").attr("class", "button nav-buttons").attr("id", "searchDrinks");
    };

    initialize();
    
    // Variables -------------------------------------------------------------------------------------------------

    // Drink Recipe Database --------------------------------------
    let drinkInfo = data[0].drinks;
    // console.log(drinkInfo);

    // Inventory Database -----------------------------------------
    let inventory = data[0].inventory[0].items;
    // console.log(inventory);

    // Placeholder for inventory Converted to Camel Case ----------
    let camelCaseInventory = "";


    // To Camel Case Function -----------------------------------------------------------------------------------------------------
    function toCamelCase(str) {
      return str.toLowerCase().split(' ').map(function(word, index) {
        return index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1);
      }).join('');
    }; // -----------------------------------------------------------------------------------------------------------------------


    // Inventory o Camel Case Function --------------------------------------------------------------------------------------------
    inventory.map(x => {
      camelCaseInventory = toCamelCase(x);
      // console.log(camelCaseInventory);
    }); // -----------------------------------------------------------------------------------------------------------------------


    // Create Drink Recipe Buttons ------------------------------------------------------------------------------------------------
    function createButtons(navID){
        console.log(navID);                                          // This is where to start for the missing ingredient function <------------------
        
        drinkInfo.map(x => {
          // console.log(x.liquor);
          console.log(x.liquor + "----------------");
          
          inventory.map(i =>{
            // console.log(i);
          });

          if(navID === "searchDrinks" && x.section === "searchDrinks"){
            // console.log(x.liquor);
            d3.select("#searchListDiv").append("button").text(x.name).attr("class", "button drink-buttons").attr("id", x.name);
          } else if(navID === x.section && navID !== "searchDrinks"){
            d3.select("#mainContainer").append("button").text(x.name).attr("class", "button drink-buttons").attr("id", x.name);
          }
        });
    }; // -----------------------------------------------------------------------------------------------------------------------


    // Populate Main Screen Buttons ----------------------------------------------------------------------------------------------
    createButtons("cocktails");


    // Navigation Button Functions ------------------------------------------------------------------------------------------------

    // Cocktails & Originals Buttons
    $('body').on('click', '#cocktails, #originals',function(){
      $("#mainContainer").empty();
      let navID = this.id;
      createButtons(navID);
    }); // -----------------------------------------------------------------------------------------------------------------------

    //Search Drinks Button
    $('#searchDrinks').on('click', function(){
      $("#mainContainer").empty();

      d3.select("#mainContainer").append("div").attr("id", "searchDiv");
      d3.select("#searchDiv").append("input").attr("id", "searchInput").attr("placeholder", "search...");
      d3.select("#searchDiv").append("button").attr("id", "clearButton").text("Clear");
      d3.select("#mainContainer").append("div").attr("id", "searchListDiv");

      let navID = this.id;
      createButtons(navID);
    }); // -----------------------------------------------------------------------------------------------------------------------


    // Drink Button Function -----------------------------------------------------------------------------------------------------
    $('body').on('click', '.drink-buttons',function(){
      $("#mainContainer").empty();
      let drinkID = this.id;
      console.log("%cNAME: " + drinkID, "color: orange");

      drinkInfo.map(x => {
        if(this.id === x.name){
          // Main Container
          d3.select("#mainContainer").append("div").attr("id", "drinkInfoContainer");
          
          // Title Card
          d3.select("#drinkInfoContainer").append("div").attr("id", "cardTitle").text(x.name);

          // Info Container for Each Section 
          d3.select("#drinkInfoContainer").append("div").attr("id", "drinkInfo");

          // Photo Section Div
          d3.select("#drinkInfo").append("div").attr("class", "info-divs").attr("id", "drinkPhoto");

          // Applies Photo
          if(x.photo !== null){
            d3.select("#drinkPhoto").append("img").attr("class", "drink-photo").attr("src", "./images/" + x.photo + ".png")
          } else{
            d3.select("#drinkPhoto").append("p").text("Please Upload Photo").style("color", "antiquewhite").style("font-size", "3vh").style("margin","3%");
          }

          // Creates Recipe & Instructions Sections -------------------------------------------------------------------------------
          let keys = Object.keys(x);
          // console.log(keys);

          // Creates Recipe Div 
          d3.select("#drinkInfo").append("div").attr("class", "info-divs").attr("id", "drinkRecipeDiv");

          // Creates Instructions Div
          d3.select("#drinkInfo").append("div").attr("class", "info-divs").attr("id", "drinkInstructionsDiv");

          // Recipes & Instructions------------------------------------------------------------------------------------------------
          keys.map(key => {
            // console.log(key);

            if(["instructions", "batch", "alt. batch"].includes(key)){
              // console.log(x[key]);
              if(x[key] !== null){
                d3.select("#drinkInstructionsDiv").append("div").attr("class", "instructions-title").attr("id", "drinkInstructionsTitle").text(key.toUpperCase());
                x[key].map(instructionsList => {
                  d3.select("#drinkInstructionsDiv").append("li").attr("class", "instructions").text(instructionsList);
                })
              };
            }


            if(["name", "section", "photo", "instructions", "batch", "alt. batch"].includes(key)){
              return;
            } else{
              if(x[key] !== null){
                d3.select("#drinkRecipeDiv").append("div").attr("class", "recipe-div").attr("id", key + "Title");
                d3.select("#" + key + "Title").append("div").attr("class", "recipe-title-div").attr("id", key);
                d3.select("#" + key).append("p").attr("class", "recipe-title").text(key.toLocaleUpperCase() + ":");
                d3.select("#" + key).append("div").attr("class", "drink-recipe").attr("id", key + "Recipe");

                let currentValue = x[key];
                // console.log(currentValue);
                currentValue.map(val => {
                  d3.select("#" + key + "Recipe").append("p").attr("id", val).attr("class", "recipe").text(val);
                })
                console.log(key.toLocaleUpperCase() + ": " + x[key]);
              }
            };


          }); // -----------------------------------------------------------------------------------------------------------------
        };
      });
    }); // End of Drink Button Function ------------------------------------------------------------------------------------------



    // Search Input --------------------------------------------------------------------------------------------------------------
    document.addEventListener("input", (e) => {
      let value = e.target.value;

      if (value && value.trim().length > 0) {
          value = value.trim().toLowerCase().replace(/[^\w\s]/gi, ""); // Remove punctuation
          $("#searchListDiv").empty(); // Clear the current list

          // Filter drinks based on the sanitized search query
          let filteredDrinks = drinkInfo.filter(x => 
              x.name.toLowerCase().replace(/[^\w\s]/gi, "").includes(value)
          );

          if (filteredDrinks.length > 0) {
              filteredDrinks.forEach(x => {
                  d3.select("#searchListDiv")
                      .append("button")
                      .text(x.name)
                      .attr("class", "button drink-buttons")
                      .attr("id", x.name);
              });
          } else {
              // Display an error message if no drinks match the search
              d3.select("#searchListDiv")
                  .append("p")
                  .text("...No drinks found...")
                  .attr("class", "error-message");
          }
      } else {
          // If input is empty, repopulate with all drinks in the "searchDrinks" section
          $("#searchListDiv").empty();
          drinkInfo.forEach(x => {
              if (x.section === "searchDrinks") {
                  d3.select("#searchListDiv")
                      .append("button")
                      .text(x.name)
                      .attr("class", "button drink-buttons")
                      .attr("id", x.name);
              }
          });
      }
    }); // -----------------------------------------------------------------------------------------------------------------------


    // Clear Button Function -----------------------------------------------------------------------------------------------------
    $('body').on('click', '#clearButton', function(){

      $("#searchInput").val("");
      $("#searchListDiv").empty();

      drinkInfo.map(x => {
        if(x.section === "searchDrinks"){
          d3.select("#searchListDiv").append("button").text(x.name).attr("class", "button drink-buttons").attr("id", x.name);
        }
      });


    });  // End of Clear Button --------------------------------------------------------------------------------------------------


    // Recipe Modal Function -----------------------------------------------------------------------------------------------------
    $("body").on("click", ".recipe", function(){

      let thisID = this.id.toLowerCase();
      console.log(thisID);

      inventory.map(i => {
        let a = thisID.replace(/[^a-zA-Z]|oz|float|dashes|\d/gi, ' ');
        let b = i.toLowerCase().replace(/[^a-zA-Z]|oz|float|dashes|\d/gi, ' ');
        
        const camelCaseStringA = toCamelCase(a);
        const camelCaseStringB = toCamelCase(b);

        console.log(camelCaseStringA);
        console.log(camelCaseStringB);

        if(camelCaseStringA === camelCaseStringB){

          d3.select("body").append("div").attr("id", "modalBG");
          d3.select("#modalBG").append("div").attr("id", "modalContent");
          d3.select("#modalContent").append("img").attr("class", "inventory-photo").attr("src", "./images/" + camelCaseStringA + ".png")
        }
      });
    }); // -----------------------------------------------------------------------------------------------------------------------


    // Remove Modal Function -----------------------------------------------------------------------------------------------------
    $('body').on('click', '#modalBG', function(){
      $("#modalBG").remove();
    }); // -----------------------------------------------------------------------------------------------------------------------





  }); // End of jQuery ------------------------------------------------------------------------------------------------------------------------------------

})

.catch(error => {
  console.error('There was a problem fetching the mainSections:', error);
});