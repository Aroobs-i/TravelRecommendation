let travelData = [];

// Fetch data from JSON
fetch("travel_recommendation_api.json")
  .then(response => response.json())
  .then(data => {
    travelData = data;
    console.log("Data loaded:", data); // Debugging
  })
  .catch(error => console.error("Error loading data:", error));

// Search function
function searchRecommendation() {
  let keyword = document.getElementById("searchInput").value.toLowerCase().trim();
  let resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (!keyword) {
    resultsDiv.innerHTML = "<p>Please enter a keyword (beach, temple, country).</p>";
    return;
  }

  let results = [];

  if (keyword.includes("beach")) {
    results = travelData.beaches;
  } else if (keyword.includes("temple")) {
    results = travelData.temples;
  } else if (keyword.includes("country")) {
    travelData.countries.forEach(country => {
      results = results.concat(country.cities);
    });
  }

  if (results.length === 0) {
    resultsDiv.innerHTML = "<p>No results found.</p>";
    return;
  }

  results.forEach(item => {
    let card = `
      <div class="card">
        <h3>${item.name}</h3>
        <img src="${item.imageUrl}" alt="${item.name}">
        <p>${item.description}</p>
      </div>
    `;
    resultsDiv.innerHTML += card;
  });
}

// Clear results
function clearResults() {
  document.getElementById("searchInput").value = "";
  document.getElementById("results").innerHTML = "";
}
