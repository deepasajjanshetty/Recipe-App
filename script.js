// global variables
let configApiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?";
let totalData = [];
let inputText;
let resultDiv = document.getElementById("results-div");

//search() function
function search(){
  if(document.getElementById("txtSearch").value !== ""){
    inputText = document.getElementById("txtSearch").value;
    let fetchURL = configApiUrl + "s=" + inputText;  // Updated query parameter for TheMealDB

    fetch(fetchURL)
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      console.log(data);
      if(data.meals && data.meals.length > 0) {
        totalData = data.meals;
        buildDOM();
      } else {
        resultDiv.innerHTML = "Sorry, no recipes found!";
      }
    })
    .catch(function(error){
      console.error("Error fetching data:", error);
      resultDiv.innerHTML = "There was an error fetching the recipes.";
    });
  } else {
    resultDiv.innerHTML = "Please enter a recipe name!";
  }
}

// buildDOM() function
function buildDOM(){
  resultDiv.innerHTML = ""; // Clear previous results
  for(let i = 0; i < totalData.length; i++){
    let div = document.createElement('div');
    div.setAttribute("class", "col-sm-3");

    // Image
    let img = document.createElement("img");
    img.classList.add("img-fluid");
    img.src = totalData[i].strMealThumb;
    div.appendChild(img);

    // Title and link
    let title = document.createElement("h3");
    let link = document.createElement("a");
    link.href = totalData[i].strSource; // Direct URL to source
    link.target = "_blank"; // Open in new tab
    link.textContent = totalData[i].strMeal;
    title.appendChild(link);
    div.appendChild(title);

    resultDiv.appendChild(div);
  }
}

// Optional: If you want to open the meal details page directly, you can use this function.
function goToSourceURL(id) {
  const mealDetailURL = `https://www.themealdb.com/meal.php?c=${id}`;
  window.open(mealDetailURL, "_blank");
}
