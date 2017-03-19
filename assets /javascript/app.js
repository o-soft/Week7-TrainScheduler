// Initialize Firebase
var config = {
apiKey: "AIzaSyDCx9CFIqJK7ohWk6Ssn9X5fiY-0qZ6xak",
authDomain: "train-scheduler-967e9.firebaseapp.com",
databaseURL: "https://train-scheduler-967e9.firebaseio.com",
storageBucket: "train-scheduler-967e9.appspot.com",
messagingSenderId: "899376305132"
};
firebase.initializeApp(config);

// VARIABLES
var database = firebase.database();

var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = 0;


// FUNCTIONS + EVENTS
$("#addTrain").on("click", function() {

  trainName = $('#nameInput').val().trim();
  destination = $('#destinationInput').val().trim();
  firstTrainTime = $('#firstTrainInput').val().trim();
  frequency = $('#frequencyInput').val().trim();

  console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);

  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency
  });

    return false;
});


// MAIN PROCESS + INITIAL CODE
database.ref().on("child_added", function(snapshot) {
  console.log(snapshot.val());

  // update the variable with data from the database
  trainName = snapshot.val().trainName;
  destination = snapshot.val().destination;
  firstTrainTime = snapshot.val().firstTrainTime;
  frequency = snapshot.val().frequency;


  var firstTrainMoment = moment(firstTrainTime, 'HH:mm');
  var nowMoment = moment(); 

  var minutesSinceFirstArrival = nowMoment.diff(firstTrainMoment, 'minutes');
  var minutesSinceLastArrival = minutesSinceFirstArrival % frequency;
  var minutesAway = frequency - minutesSinceLastArrival;

  var nextArrival = nowMoment.add(minutesAway, 'minutes');
  var formatNextArrival = nextArrival.format("HH:mm");


  // add table
  var table = $('<tr>');
  var td1 = $('<td>');
  var td2 = $('<td>');
  var td3 = $('<td>');
  var td4 = $('<td>');
  var td5 = $('<td>');
  td1.append(trainName);
  td2.append(destination);
  td3.append(frequency);
  td4.append(formatNextArrival);
  td5.append(minutesAway);
  table.append(td1).append(td2).append(td3).append(td4).append(td5);
  $('#newTrains').append(table);


  }, function (errorObject) {

  // In case of error this will print the error
    console.log("The read failed: " + errorObject.code);

});
