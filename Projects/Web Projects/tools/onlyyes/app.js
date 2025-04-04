const buttonParent = document.getElementById("buttonParent");

function noHandler() {
  if (buttonParent.style.cssText.includes("column-reverse")) {
    buttonParent.style.cssText = "flex-direction: column";
  } else {
    buttonParent.style.cssText = "flex-direction: column-reverse";
  }
}


// Define the phone number variable
let phoneNumber = "9079982271";

// Define the message text (URL-encoded)
let messageText = "hi, I like you";

// Construct the URL with the variable
let url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(messageText)}`;

function messageHandler(){
    window.open(url)
}