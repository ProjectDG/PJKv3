
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
  
  $(document).ready(function(){

    d3.select("body").append("div").attr("id", "topNav");
    d3.select("#topNav").append("button").text("Cocktails").attr("class", "button nav-buttons").attr("id", "cocktails");
    d3.select("#topNav").append("button").text("Originals").attr("class", "button nav-buttons").attr("id", "originals");


    d3.select("body").append("div").attr("id", "mainContainer");

    let list = data[0].drinks;

    list.map(x => {
      if(x.section === "cocktails"){
        d3.select("#mainContainer").append("button").text(x.name).attr("class", "button drink-buttons").attr("id", x.name);
      }
    })


    d3.select("body").append("div").attr("id", "bottomNav");
    d3.select("#bottomNav").append("button").text("Search Drinks").attr("class", "button nav-buttons").attr("id", "searchDrinks");
  

    $('body').on('click','button', function(){
      openFullscreen();
      $("#mainContainer").empty();

      // console.log(this.id);

      if(this.id === "searchDrinks"){
          d3.select("#mainContainer").append("div").attr("id", "searchDiv");
          d3.select("#searchDiv").append("input").attr("id", "searchInput").attr("placeholder", "search...");
          d3.select("#searchDiv").append("button").attr("id", "clearButton").text("Clear");
        }

      list.map(x => {

        if(this.id === x.section){
          d3.select("#mainContainer").append("button").text(x.name).attr("class", "button drink-buttons").attr("id", x.name);
        }

        

        if(this.id === x.name){
          console.log(x.name);
          console.log(x.photo);
          
          // Main Container
          d3.select("#mainContainer").append("div").attr("id", "drinkInfoContainer");
          
          // Title Card
          d3.select("#drinkInfoContainer").append("div").attr("id", "cardTitle").text(x.name);

          // Info Container for Each Section 
          d3.select("#drinkInfoContainer").append("div").attr("id", "drinkInfo");

          // Photo Section Div
          d3.select("#drinkInfo").append("div").attr("class", "info-divs").attr("id", "drinkPhoto");

          // Retrieves Photo
          // d3.select("#drinkPhoto").append("img").attr("class", "drink-photo").attr("src", "./images/" + x.photo + ".png");

          if(x.photo !== null){
            d3.select("#drinkPhoto").append("img").attr("class", "drink-photo").attr("src", "./images/" + x.photo + ".png")
          } else{
            // d3.select("#drinkPhoto").append("img").attr("class", "drink-photo").attr("src", "./images/noPhoto.png").style("max-width", "40%")
            d3.select("#drinkPhoto").append("p").text("Please Upload Photo").style("color", "antiquewhite").style("font-size", "3vh")
          }

          // Recipe Section Div
          d3.select("#drinkInfo").append("div").attr("class", "info-divs").attr("id", "drinkRecipeDiv");

          d3.select("#drinkRecipeDiv").append("div").attr("class", "recipe-div").attr("id", "glassTitle");
          d3.select("#glassTitle").append("div").attr("class", "recipe-title-div").attr("id", "glass");
          d3.select("#glass").append("p").attr("class", "recipe-title").text("Glass: ");
          d3.select("#glass").append("div").attr("class", "drink-recipe").attr("id", "glassRecipe");
          d3.select("#glassRecipe").append("p").attr("class", "recipe").text(x.glass);

          if(x.rim !== null){
            d3.select("#drinkRecipeDiv").append("div").attr("class", "recipe-div").attr("id", "rimTitle");
            d3.select("#rimTitle").append("div").attr("class", "recipe-title-div").attr("id", "rim");
            d3.select("#rim").append("p").attr("class", "recipe-title").text("Rim:");
            d3.select("#rim").append("div").attr("class", "drink-recipe").attr("id", "rimRecipe");
            d3.select("#rimRecipe").append("p").attr("class", "recipe").text(x.rim);
          }

          if(x.liquor !== null){
            d3.select("#drinkRecipeDiv").append("div").attr("class", "recipe-div").attr("id", "liquorTitle");
            d3.select("#liquorTitle").append("div").attr("class", "recipe-title-div").attr("id", "liquor");
            d3.select("#liquor").append("p").attr("class", "recipe-title").text("Liquor:");
            d3.select("#liquor").append("div").attr("class", "drink-recipe").attr("id", "liquorRecipe");


            let liquors = x.liquor;
            console.log(liquors);
            liquors.map(l => {
              d3.select("#liquorRecipe").append("p").attr("class", "recipe").text(l);
            })
          }

          if(x.liqeuer !== null){
            d3.select("#drinkRecipeDiv").append("div").attr("class", "recipe-div").attr("id", "liqeuerTitle");
            d3.select("#liqeuerTitle").append("div").attr("class", "recipe-title-div").attr("id", "liqeuer");
            d3.select("#liqeuer").append("p").attr("class", "recipe-title").text("Liqeuer:");
            d3.select("#liqeuer").append("div").attr("class", "drink-recipe").attr("id", "liqeuerRecipe");


            let liqeuers = x.liqeuer;
            console.log(liqeuers);
            liqeuers.map(l => {
              d3.select("#liqeuerRecipe").append("p").attr("class", "recipe").text(l);
            })
          }

          if(x.mixers !== null){
            d3.select("#drinkRecipeDiv").append("div").attr("class", "recipe-div").attr("id", "mixersTitle");
            d3.select("#mixersTitle").append("div").attr("class", "recipe-title-div").attr("id", "mixers");
            d3.select("#mixers").append("p").attr("class", "recipe-title").text("Mixers: ");
            d3.select("#mixers").append("div").attr("class", "drink-recipe").attr("id", "mixersRecipe");


            let mixers = x.mixers;
            console.log(mixers);
            mixers.map(l => {
              d3.select("#mixersRecipe").append("p").attr("class", "recipe").text(l);
            })
          }

          if(x.garnish !== null){
            d3.select("#drinkRecipeDiv").append("div").attr("class", "recipe-div").attr("id", "garnishTitle");
            d3.select("#garnishTitle").append("div").attr("class", "recipe-title-div").attr("id", "garnish");
            d3.select("#garnish").append("p").attr("class", "recipe-title").text("Garnish: ");
            d3.select("#garnish").append("div").attr("class", "drink-recipe").attr("id", "garnishRecipe");


            let garnish = x.garnish;
            console.log(garnish);
            garnish.map(l => {
              d3.select("#garnishRecipe").append("p").attr("class", "recipe").text(l);
            })
          }
         

          d3.select("#drinkInfo").append("div").attr("class", "info-divs").attr("id", "drinkInstructionsDiv");

          if(x.instructions !== null){
            d3.select("#drinkInstructionsDiv").append("div").attr("class", "instructions-title").attr("id", "drinkInstructionsTitle").text("Instructions");
            
            let instructions = x.instructions;

            console.log(instructions);
            instructions.map(l => {
              d3.select("#drinkInstructionsDiv").append("li").attr("class", "instructions").text(l);
            })
          }

        }

      })



    });







  }); // End of jQuery

})

.catch(error => {
  console.error('There was a problem fetching the mainSections:', error);
});

