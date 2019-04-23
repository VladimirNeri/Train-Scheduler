
// Initialize Firebase

var config = {
    apiKey: "AIzaSyBbBhxAjgVFyyFsYYBbwWYVxzGY3JFlhhI",
    authDomain: "train-scheduler-481f2.firebaseapp.com",
    databaseURL: "https://train-scheduler-481f2.firebaseio.com",
    projectId: "train-scheduler-481f2",
    storageBucket: "train-scheduler-481f2.appspot.com",
    messagingSenderId: "130221245398"
};

  firebase.initializeApp(config);

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

    return false; 
});


// Activity 17
// Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(snapshot) {
    console.log(snapshot.val());

    var tName = snapshot.val().trainName;
    var tDestination = snapshot.val().destination;
    var fTrain = snapshot.val().firstTrain;
    var tFrequency = snapshot.val().frequency;

// Train Info
    console.log(tName);
    console.log(tDestination);
    console.log(fTrain);
    console.log(tFrequency);

// Activity 21 

  var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

  var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

  var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  
  var newRow = $("<tr>").append(
      $("<td>").text(tName),
      $("<td>").text(tDestination),
      $("<td>").text(fTrain),
      $("<td>").text(tFrequency),
  );
  
    $("#train-table > tbody").append(newRow);
  
  // Handle the errors

  });

  