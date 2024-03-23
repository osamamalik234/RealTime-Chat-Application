const form = document.querySelector(".login form"),
continueBtn = form.querySelector(".button input"),
errorText = form.querySelector(".error-text");

// Prevent the form from submitting normally when the submit button is clicked
form.onsubmit = (e)=>{
  // Prevent the default form submission behavior
  e.preventDefault();
}

// Set up a click event listener for the continue button
continueBtn.onclick = ()=>{
  // Create a new XMLHttpRequest object to send a POST request to the "php/login.php" URL
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "php/login.php", true); // Set the request method to POST, the URL to "php/login.php", and enable asynchronous processing

  xhr.onload = ()=>{
      // Check if the request is complete
      if(xhr.readyState === XMLHttpRequest.DONE){
          // Check if the HTTP status code is 200 (OK)
          if(xhr.status === 200){
              // Get the response from the server
              let data = xhr.response;
              
              // If the response is "success", redirect the user to "users.php"
              if(data === "success"){
                  location.href = "users.php";
              } else {
                  // If the response is not "success", display the error message
                  errorText.style.display = "block";
                  errorText.textContent = data;
              }
          }
      }
  }

  // Create a new FormData object from the form element to send the form data in the request body
  let formData = new FormData(form);
  xhr.send(formData); // Send the request with the form data
}