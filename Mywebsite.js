function startRegistration() {
  alert("Welcome, how can I help you?");
  document.getElementById("headline").style.color = "yellow";
  document.getElementById("contactForm").style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const contactMe = document.getElementById("headline");

  const scriptURL = "https://script.google.com/macros/s/AKfycbxZq9GktJL1wiD_6YX9gbxqBCkK3BGRmq1L41OloEsFeBX29QCv5yOaqFacL_yAlmAJ/exec"; // Google Apps Script URL

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(form); // Create FormData from form

      fetch(scriptURL, {
        method: "POST",
        body: formData,
      })
        .then(response => {
          if (response.ok) {
            alert("Your message has been sent successfully!");
            contactMe.style.color = "green";
            askToContactAgain(); // Continue interaction
          } else {
            alert("Failed to send message.");
          }
        })
        .catch((error) => {
          alert("Network error: " + error.message);
          console.error("Error!", error);
        });
    });
  }

  function askToContactAgain() {
    let again;
    do {
      again = prompt("Would you like to contact me again? (yes/no)");
      if (!again) return; // Cancel pressed

      again = again.toLowerCase();

      if (again === "yes") {
        alert("Please register again.");
        form.reset();
        contactMe.style.color = "yellow";
        return;
      } else if (again === "no") {
        alert("Thank you for contacting me!");
        const redirect = prompt("Would you like to go back to the homepage? (yes/no)").toLowerCase();
        if (redirect === "yes") {
          location.href = "Mywebsite.html";
        } else {
          alert("Okay, staying on this page.");
        }
        break;
      } else {
        alert("Invalid input. Type 'yes' or 'no'.");
      }
    } while (again !== "no");
  }
});
