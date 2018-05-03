/* global moment firebase */

// Initialize Firebase


// Initialize Firebase
var config = {
    apiKey: "AIzaSyAdFCBBC6e9f6dPAA0aYBuzbYKAmqrQjtA",
    authDomain: "train-schedule-d3589.firebaseapp.com",
    databaseURL: "https://train-schedule-d3589.firebaseio.com",
    projectId: "train-schedule-d3589",
    storageBucket: "",
    messagingSenderId: "889004411283"
};
firebase.initializeApp(config);


// Create a variable to reference the database
var database = firebase.database();

// Initial Values
var trainName;
var destination;
var arrivalTime;
var frequency;
var minutesAway;

// --------------------------------------------------------------

// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.
database.ref().on("value", function (snapshot) {

    // If Firebase has a highPrice and highBidder stored, update our client-side variables
    if (snapshot.child("trainName").exists() && snapshot.child("destination").exists() && snapshot.child("arrivalTime").exists() && snapshot.child("frequency").exists() && snapshot.child("minutesAway").exists()) {
        // variables set equal to highest value
        // for strings
        trainName = snapshot.val().trainName;
        destination = snapshot.val().destination;
        // for integers
        arrivalTime = parseInt(snapshot.val().arrivalTime);
        frequency = parseInt(snapshot.val().frequency);
        

    }

    // If Firebase does not have highPrice and highBidder values stored, they remain the same as the
    // values we set when we initialized the variables.
    // In either case, we want to log the values to console and display them on the page.
    console.log(trainName);
    console.log(destination);
    console.log(arrivalTime);
    console.log(frequency);
    


    $("#train-name").text(trainName);
    $("#destination").text(destination);
    $("#arrival-time").text(arrivalTime);
    $("#highest-price").text(highPrice);
    

    // If any errors are experienced, log them to console.
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

// --------------------------------------------------------------

// Whenever a user clicks the submit-bid

$("#submit-bid").on("click", function (event) {
    event.preventDefault();
    // Get the input values
    var bidderName = $("#bidder-name").val().trim();
    var bidderPrice = parseInt($("#bidder-price").val().trim());

    // Log the Bidder and Price (Even if not the highest)
    console.log(bidderName);
    console.log(bidderPrice);

    if (bidderPrice > highPrice) {

        // Alert
        alert("You are now the highest bidder.");

        // Save the new price in Firebase. This will cause our "value" callback above to fire and update
        // the UI.
        database.ref().set({
            highBidder: bidderName,
            highPrice: bidderPrice
        });

        // Log the new High Price
        console.log("New High Price!");
        console.log(bidderName);
        console.log(bidderPrice);
    } else {

        // Alert
        alert("Sorry that bid is too low. Try again.");
    }
});