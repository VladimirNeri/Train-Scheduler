
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
    var tdestination = $("#destination-input").val().trim();
    var fTrain = $("#first-input").val().trim();
    var tfrequency = $("#frequency-input").val().trim();
      console.log("Train Name: " + tName);
      console.log("Destination: " + tdestination);
      console.log("First Train: " + fTrain);
      console.log("Frequency: " + tfrequency);

    // Local object for train data
    var newTrain = {
        trainName: tName,
        destination: tdestination,
        firstTrain: fTrain,
        frequency: tfrequency,
    };

    // Code for the push new train
    database.ref().push(newTrain);

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

    var firstTrain = snapshot.val().first;
    var tFrequency = snapshot.val().frequency;

// Activity 21 


  var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
  var currentTime = moment();
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var tRemainder = diffTime % tFrequency;
  var tMinutesTillTrain = tFrequency - tRemainder;
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  
  var newRow = $("<tr>");
      newRow.append("<td>"+ snapshot.val().name +"</td>");
      newRow.append("<td>"+ snapshot.val().destination +"</td>");
      newRow.append("<td>"+ snapshot.val().frequency +"</td>");
      newRow.append("<td>"+ moment(nextTrain).format("HH:mm") +"</td>");
      newRow.append("<td>"+ tMinutesTillTrain +"</td>");

      $("tbody").append(newRow);
  
  // Handle the errors
  }, 
  
  function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
  });