// from data.js
const tableData = data;
//const tbody = d3.select("tbody");


// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
};

// 1. Create a variable to keep track of all the filters as an object.
var filters = {};

// 3. Use this function to update the filters. 
function updateFilters() {

  let changedElement = d3.select(this);

  let elementValue = changedElement.property("value");
  console.log(elementValue);

  let filterId = changedElement.attr("id");
  console.log(filterId);

  if (elementValue) {
    filters[filterId] = elementValue;
  }
  else {
    delete filters[filterId];
  }

  // updateFilters();

  filterTable();
  
}
  
  // 7. Use this function to filter the table when data is entered.
function filterTable() {

  // 8. Set the filtered data to the tableData.
  var filteredData = tableData;

  // 9. Loop through all of the filters and keep any data that
  // matches the filter values
  Object.entries(filters).forEach(([key, value]) => {
    filteredData = filteredData.filter(row => row[key] === value);
  }
  );
// 10. Finally, rebuild the table using the filtered data
  buildTable(filteredData);
}
 
function handleClick() {
  // Grab the datetime value from the filter
  let date = d3.select("#datetime").property("value");
  let city = d3.select("#city").property("value");
  let state = d3.select("#state").property("value");
  let country = d3.select("#country").property("value");
  let shape = d3.select("#shape").property("value");

  let filteredData = tableData;

  // Check to see if a date was entered and filter the
  // data using that date.
  if (date) {
    // Apply `filter` to the table data to only keep the
    // rows where the `datetime` value matches the filter value
    filteredData = filteredData.filter(row => row.datetime === date);
  };

  //check city
  if (city) {
    // Apply `filter` to the table data to only keep the
    // rows where the `datetime` value matches the filter value
    filteredData = filteredData.filter(row => row.city === city);
  };

  //check state
  if (state) {
    // Apply `filter` to the table data to only keep the
    // rows where the `datetime` value matches the filter value
    filteredData = filteredData.filter(row => row.state === state);
  };

  //check country
  if (country) {
    // Apply `filter` to the table data to only keep the
    // rows where the `datetime` value matches the filter value
    filteredData = filteredData.filter(row => row.country === country);
  };

  //check shape
  if (shape) {
    // Apply `filter` to the table data to only keep the
    // rows where the `datetime` value matches the filter value
    filteredData = filteredData.filter(row => row.shape === shape);
  };

  // Rebuild the table using the filtered data
  // If no date was entered, then filteredData will just be the original tableData.
  // 10. Finally, rebuild the table using the filtered data
  //buildTable(filteredData);

};

// 2. Attach an event to listen for changes to each filter
d3.selectAll("input").on("change", updateFilters);
d3.selectAll("#filter-btn").on("click", handleClick);


// Build the table when the page loads
buildTable(tableData);



