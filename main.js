// Declares and initializes country url
const countryURL = "https://xc-ajax-demo.herokuapp.com/api/countries/";



// Fetches the countries from the api and populates the countries
// into the dropdown
fetch (countryURL).then(response => {
    if (response.ok) {
        return response.json(); 
    }
    throw new Error("Request failed!"); 
}, networkError => console.log(networkError.message)).then(data => {
    populateCountryDropdown(data); 
}); 

// Populates data argument into dropdown
function populateCountryDropdown(countriesJSON) {
    const countryDropdownElement = document.getElementById("countryDropdown"); 
    for (let i = 0; i < countriesJSON.length; i++) {
        console.log(countriesJSON[i].name); 
        var optionNode = document.createElement("option"); 
        optionNode.setAttribute("value", countriesJSON[i].code); 
        optionNode.innerHTML = countriesJSON[i].name; 
        countryDropdownElement.appendChild(optionNode);
    }
}

// Fetches the states from the chosen country and populates the states
// into the dropdown
function fetchAndUpdateStates() {
    const countryDropdownElement = document.getElementById('countryDropdown'); 
    const statesDropdownElement = document.getElementById('statesDropdown'); 
    var countryCode = countryDropdownElement.value; 
    if (countryCode !== "default")
    {
        unpopulateDropdown(statesDropdownElement); 
        statesDropdownElement.removeAttribute("disabled"); 
        stateURL = `https://xc-ajax-demo.herokuapp.com/api/countries/${countryCode}/states/`; 
        fetch(stateURL).then(response => {
            if (response.ok) {
                return response.json(); 
            }
            throw new Error("Request failed!"); 
        }, networkError => console.log(networkError.message)).then(data => {
            data.sort(statesCompare); 
            console.log(data); 
            populateStatesDropdown(data); 
        })
    }
    else
    {
        unpopulateDropdown(statesDropdownElement); 
        statesDropdownElement.setAttribute("disabled", "disabled"); 
    }
}

// Populates states dropdown given JSON data argument
function populateStatesDropdown(statesJSON) {
    const statesDropdownElement = document.getElementById("statesDropdown"); 
    for (let i = 0; i < statesJSON.length; i++) {
        var optionNode = document.createElement("option"); 
        optionNode.setAttribute("value", statesJSON[i].code); 
        optionNode.innerHTML = statesJSON[i].name; 
        statesDropdownElement.appendChild(optionNode); 
    }
} 

// Unpopulates states dropdown
function unpopulateDropdown(dropdown) {
    dropdown.innerHTML = '<option value="default">Choose a state</option>'; 
}

// Compare function for states JSON objects
function statesCompare(a, b)
{
    return a.name.localeCompare(b.name); 
}