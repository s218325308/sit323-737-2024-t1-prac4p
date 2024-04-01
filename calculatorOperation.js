// Add an event listener to the calculator form to handle form submission
document.getElementById('calculatorForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Get the values of input fields and selected operation from the form
    const value1 = document.getElementById('value1').value;
    const value2 = document.getElementById('value2').value;
    const operation = document.getElementById('operation').value;

    // Construct the URL for the appropriate endpoint based on the selected operation and input values
    const url = `/${operation}?n1=${value1}&n2=${value2}`;

    // Send a fetch request to the server with the constructed URL
    fetch(url)
    .then(response => {
        // Check if the response status is not ok (i.e., an error occurred)
        if (!response.ok) {
            // Parse the error message from the response and display it
            return response.json().then(error => {
                document.getElementById('result').innerText = error.msg;
                throw new Error('Network response was not ok');
            });  
        }
        // If the response is ok, parse the JSON data from the response
        return response.json();
    })
    .then(data => {
        // Display the result obtained from the server
        document.getElementById('result').innerText = `Result: ${data.data}`;
    });
});

// This script listens for form submissions from the HTML form with id "calculatorForm".
// It extracts the input values and operation selected by the user, constructs a URL with these values,
// and sends a fetch request to the appropriate server endpoint based on the selected operation.
// The server processes the request, performs the calculation, and returns the result.
// The result or error message returned by the server is then displayed on the web page.


// http://localhost:3040/index.html

