const propertyData = [
  {
    id: 1,
    title: "Premium Duplex Property",
    price: "$ 16,000/month",
    type: "Rent",
    category: "Apartment",
    state: "New York",
    city: "Buffalo",
    description: "Mckinley Hill is situated inside Fort Bonifacio which is a 50 hectares owne ...",
    img: "img/property_img/1.webp",
    bedrooms: 2,
    bathrooms: 2,
    sqrt: "150",
  },
  {
    id: 2,
    title: "Luxury 6 Bed Mansion in Reno",
    type: "Sales",
    price: "$349,870",
    category: "Villa",
    state: "California",
    city: "Sacramento",
    img: "img/property_img/sale1.webp",
    description: "Mineral Reserves: 2008 core drilling and testing (on just 60 of the 1,100 a ...",
    bedrooms: 4,
    bathrooms: 3,
    sqrt: "250",
  },
  {
    id: 3,
    title: "Attractive Private Pool Penthouse",
    type: "Sales",
    price: "$ 149,870",
    category: "Duplex",
    state: "Texas",
    city: "Austin",
    description: "Beautiful, updated, ground level Co-op apartment in the desirable Bay Terra ...",
    img: "img/property_img/sale2.webp",
    bedrooms: 5,
    bathrooms: 3,
    sqrt: "372",
  },
  {
    id: 4,
    title: "Apartment in West Reno",
    price: "$ 500/month",
    type: "Rent",
    category: "Apartment",
    state: "California",
    description: "Downtown Frederick hot spot. Top location for local entertainment. All fixt ...",
    city: "LosAngeles",
    img: "img/property_img/2.jpeg",
    bedrooms: 3,
    bathrooms: 2,
    sqrt: "1,300",
  }

];

// Function to get cities by state
function getCitiesByState(state) {
  const citiesByState = {
    "New York": ["New York City", "Buffalo", "Albany", "Rochester"],
    "California": ["Los Angeles", "San Francisco", "San Diego", "Sacramento"],
    "Texas": ["Houston", "Austin", "Dallas", "San Antonio"],
  }
  return citiesByState[state] || [];
}

// Function to populate cities based on selected state
function populateCities() {
  const stateDropdown = document.getElementById("state");
  const cityDropdown = document.getElementById("city");
  const selectedState = stateDropdown.value;
  // Clear previous city options
  cityDropdown.innerHTML = '<option value="all">All</option>';
  if (selectedState !== "all") {
    const cities = getCitiesByState(selectedState);
    console.log(cities);
    if (cities && cities.length > 0) {
      cities.forEach((city) => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        cityDropdown.appendChild(option);
      });
    }
  }
}
const itemsPerPage = 6; // Number of products per page
let currentPage = 1; // Current page
// Function to filter properties based on user input
function filterProperties() {
  const propertyType = document.getElementById("Type").value;
  const propertyCategory = document.getElementById("PropertyCategories").value;
  const state = document.getElementById("state").value;
  const city = document.getElementById("city").value;
  const bedrooms = document.getElementById("bedrooms").value;
  const bathrooms = document.getElementById("bathrooms").value;
  console.log(propertyType, propertyCategory, state, city
    , bedrooms, bathrooms);
  const filteredProperties = propertyData.filter((property) => {


    return (
      (propertyType == "all" || property.type == propertyType) &&
      (propertyCategory == "all" || property.category == propertyCategory) &&
      (state == "all" || property.state == state) &&
      (city == "all" || property.city == city) &&
      (bedrooms == "all" || property.bedrooms >= parseInt(bedrooms)) &&
      (bathrooms == "all" || property.bathrooms >= parseInt(bathrooms)));
  });
  const totalItems = filteredProperties.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  // Disable/Enable previous and next buttons based on the current page
  const prevButton = document.getElementById("prevPage");
  const nextButton = document.getElementById("nextPage");

  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;
  // Slice the products to display only the items for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productsForCurrentPage = filteredProperties.slice(startIndex, endIndex);
  displayProperties(productsForCurrentPage);
}
// Event listener for previous and next buttons
document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 1) {
      currentPage--;
      filterProperties();
  }
});
document.getElementById("nextPage").addEventListener("click", () => {
  const totalItems = propertyData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (currentPage < totalPages) {
      currentPage++;
      filterProperties();
  }
});


// Function to display filtered properties

function displayProperties(properties) {
  console.log(properties);

  const propertyListings = document.getElementById("propertyListings");
  propertyListings.innerHTML = "";
  if (properties.length === 0) {
    propertyListings.innerHTML = "<p>No properties match your criteria.</p>";

  }

  else {

    const propertyCard = document.createElement("div");
    propertyCard.classList.add("row");
    propertyCard.classList.add("mt-4");
    properties.forEach((property) => {

      const col = document.createElement("div");
      col.classList.add("col-md-6");
      col.classList.add("col-lg-4");
      col.classList.add("mt-4");
      col.innerHTML = `
   
   <div class="listing_img">
    
     <a href="#">
   
       <img src="${property.img}" alt=""   class="lazyload  list_img img-thumbnail " loading="lazy"/></a>
     <div class="tag_type">${property.type}</div>
     <div class="tag_location">${property.city}</div>

   </div>
   <div class="listing_unit_price  pt-2">
    ${property.price}
   </div>
   <h4 class=" listing_heading">
     <a href="#" class="mt-0">${property.title}</a>
   </h4>
   <div class="listing_details" style="display:block">
  <a href="#">
 ${property.description}
  </a></div>
   <div class="property_listing_details mr-0">
     <div class="property_listing_details_item mt-2">
       <div class="icon_label"><img src="img/icons/bed.svg"><span>${property.bedrooms}</span></div>
     </div>

     <div class="property_listing_details_item mt-2">
       <div class="icon_label"><img
           src="img/icons/bath.svg"><span>${property.bathrooms}</span></div>
     </div>
     <div class="property_listing_details_item mt-2" >
       <div class="icon_label"><img src="img/icons/size-.svg">
         <span style="margin-left: -19px;">${property.sqrt} ft<sup>2</sup></span>
       </div>
     </div>
    
   </div>

   `
      propertyCard.appendChild(col);

    });
    propertyListings.appendChild(propertyCard);
  }
}

// Function to reset filters
function resetFilters() {

  document.getElementById("Type").value = "all";
  document.getElementById("PropertyCategories").value = "all";
  document.getElementById("state").value = "all";
  document.getElementById("city").value = "all";
  document.getElementById("bedrooms").value = "all";
  document.getElementById("bathrooms").value = "all";
  filterProperties();
}
// Event listeners
document.getElementById("state").addEventListener("change", populateCities);
document.getElementById("search").addEventListener("click", filterProperties);
document.getElementById("reset-filters").addEventListener("click", resetFilters);
// Initial display of all properties

displayProperties(propertyData);






















// // logic for selecting city by state
// const citiesByState = {
//   "New York": ["New York City", "Buffalo", "Albany", "Rochester"],
//   "California": ["Los Angeles", "San Francisco", "San Diego", "Sacramento"],
//   "Texas": ["Houston", "Austin", "Dallas", "San Antonio"],


// };

// function populateCities() {
//   const stateDropdown = document.getElementById("state");
//   const cityDropdown = document.getElementById("city");
//   const selectedState = stateDropdown.value;
//    // Clear previous city options
//    cityDropdown.innerHTML = '<option value="">Select a city</option>';
//    if (selectedState !== "") {
//     const cities = citiesByState[selectedState];
//     if (cities && cities.length > 0) {
//       cities.forEach(city => {
//         const option = document.createElement("option");
//         option.value = city;
//         option.textContent = city;
//         cityDropdown.appendChild(option);

//       });
//       cityDropdown.removeAttribute("disabled");
//     }
//   }
// }
// // Event listener for state dropdown change
// const stateDropdown = document.getElementById("state");
// stateDropdown.addEventListener("change", populateCities);

// //code for reset all selection


// gsap code for animation

const tl = gsap.timeline();
tl.from(".fadeInUp h1,#propertyListing,.type,.PropertyCategories,.state,.city,.bedrooms,.bathrooms", {
  y: 100,
  duration: 1,
  delay: 1,
  opacity: 0,
  stagger: 0.1,
});

