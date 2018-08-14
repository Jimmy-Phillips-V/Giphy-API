var foods = ["Pizza", "Cake", "Bacon", "Tacos"];

// displayfoodInfo function re-renders the HTML to display the appropriate content
function displayFoodGifs() {
$("#gifsDiv").empty();

  var food = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + food + "&api_key=dc6zaTOxFJmzC&limit=10";

  // Creating an AJAX call for the specific food button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  })
  
  .then(function(response) {

          // storing the data from the AJAX request in the results variable
          var results = response.data;

          // Looping through each result item
          for (var i = 0; i < results.length; i++) {

            // var gifStill = results[i].images.fixed_height_still.url;
            var gifStill = results[i].images.fixed_height_still.url;
            var gifAnimate = results[i].images.fixed_height.url;
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing a div tag
            var foodImage = $("<img class='img-responsive food'>")
            var foodDiv = $("<div>");

            foodImage.attr("src", gifStill);
            foodImage.attr("data-still", gifStill);
            foodImage.attr("data-animate", gifAnimate);
            foodImage.attr("data-state", "still");
            foodImage.attr("alt", "food-image");
            foodDiv.addClass("food-container")

            foodDiv.append(foodImage)
            foodDiv.append(p)

            $("#gifsDiv").prepend(foodDiv)
          }
  }); 
}

$(document).on('click', '.food', function(){
  var state = $(this).attr('data-state');
  var moving = $(this).attr('data-animate');
  var still = $(this).attr('data-still');

  if(state === "still"){
    $(this).attr('src', moving);
    $(this).attr('data-state', 'animate');
  }
  else{
    $(this).attr('src', still);
    $(this).attr('data-state', 'still');
  }
})

// Function for displaying food data

// Function for displaying food data
function renderButtons() {

// Deleting the foods prior to adding new foods
// (this is necessary otherwise you will have repeat buttons)
$("#buttons-view").empty();
$("#food-input").val("");

// Looping through the array of foods
for (var i = 0; i < foods.length; i++) {

  // Then dynamicaly generating buttons for each food in the array
  // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
  var a = $("<button>");
  // Adding a class of food-btn to our button
  a.addClass("gifs-btn btn btn-danger ml-4 mb-3");
  // Adding a data-attribute
  a.attr("data-name", foods[i]);
  // Providing the initial button text
  a.text(foods[i]);
  // Adding the button to the buttons-view div
  $("#buttons-view").append(a);
}
}

// This function handles events where a food button is clicked
$("#add-food").on("click", function(event) {
event.preventDefault();

// This line grabs the input from the textbox
var food = $("#food-input").val().trim();

// Adding food from the textbox to our array

foods.push(food);


// Calling renderButtons which handles the processing of our food array
renderButtons();
});

// Adding a click event listener to all elements with a class of "food-btn"
$(document).on("click", ".gifs-btn", displayFoodGifs);
// Calling the renderButtons function to display the intial buttons
renderButtons();