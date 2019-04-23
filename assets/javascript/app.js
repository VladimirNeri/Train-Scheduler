$(document).ready(function() {
  
// Initialize Firebase

var firebaseConfig = {
    apiKey: "AIzaSyBbBhxAjgVFyyFsYYBbwWYVxzGY3JFlhhI",
    authDomain: "train-scheduler-481f2.firebaseapp.com",
    databaseURL: "https://train-scheduler-481f2.firebaseio.com",
    projectId: "train-scheduler-481f2",
    storageBucket: "train-scheduler-481f2.appspot.com",
    messagingSenderId: "130221245398"
};

  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  $("#submit-btn").click(function() {
    event.preventDefault();

    // Code in the logic for storing and retrieving the most recent user.
    // Don't forget to provide initial data to your Firebase database.
    var tName = $("#train-input").val().trim();
    var tDestination = $("#destination-input").val().trim();
    var fTrain = $("#first-input").val().trim();
    var tFrequency = $("#frequency-input").val().trim();
      console.log("Train Name: " + tName);
      console.log("Destination: " + tDestination);
      console.log("First Train: " + fTrain);
      console.log("Frequency: " + tFrequency);

    // Local object for train data
    var newTrain = {
      trainName: tName,
      destination: tDestination,
      firstTrain: fTrain,
      frequency: tFrequency
  };

  database.ref().push(newTrain);
    // // Code for the push new train database 
    // database.ref().push( {
    //     trainName: tName,
    //     destination: tDestination,
    //     firstTrain: fTrain,
    //     frequency: tFrequency,
    // });

    alert("Train added");
    //Clear Input Fields
    $("#train-input").val("");
    $("#destination-input").val("");
    $("#first-input").val("");
    $("#frequency-input").val("");

});

// Activity 17
// Create Firebase event for adding new train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var tName = childSnapshot.val().trainName;
    var tDestination = childSnapshot.val().destination;
    var fTrain = childSnapshot.val().firstTrain;
    var tFrequency = childSnapshot.val().frequency;

    
// Train Info
    console.log(tName);
    console.log(tDestination);
    console.log(fTrain);
    console.log(tFrequency);

// Activity 21 
  var firstTimeConverted = moment(fTrain, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

  var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

  var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

  var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  
    // Activity 19 JQUERY DUMP
  var newRow = $("<tr>").append(
      $("<td>").text(tName),
      $("<td>").text(tDestination),
      $("<td>").text(tFrequency),
      $("<td>").text(fTrain),
      $("<td>").text(nextTrain),
      $("<td>").text(tMinutesTillTrain),
  );
  
    $("#tbody").append(newRow);

    // Handle the errors Activity 19
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);

  });
  
});
  

  