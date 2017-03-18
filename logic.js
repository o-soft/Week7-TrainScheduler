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

var newTrainName = "";
var newDestination = "";
var firstTrainTime = "";
var newfrequency = 0;


// ON CLICK EVENT
$("#addTrain").on("click", function() {
//USER INPUT STORED IN VARIABLES
  newTrainName = $('#trainInput').val().trim();
  newDestination = $('#destinationInput').val().trim();
  firstTrainTime = $('#train-timeInput').val().trim();
  newFrequency = $('#frequencyInput').val().trim();

  console.log(newTrainName);
  console.log(newDestination);
  console.log(firstTrainTime);
  console.log(newFrequency);

//STORE DATA IN FIREBASE
  database.ref().push({
    newTrainName: newTrainName,
    newDestination: newDestination,
    firstTrainTime: firstTrainTime,
    newFrequency: newFrequency
  });

    return false;
});


// CORE LOGIC
database.ref().on("child_added", function(snapshot) {
  console.log(snapshot.val());

  // UPDATE VARIABLE WITH FIREBASE INFO
  tnewTrainName = snapshot.val().newTrainName;
  newDestination = snapshot.val().newDestination;
  firstTrainTime = snapshot.val().firstTrainTime;
  newFrequency = snapshot.val().newFrequency;


  // MOMENT.JS METHOD CALCULATIONS
  var firstTrainInstance = moment(firstTrainTime, 'HH:mm');
  var currentMoment = moment(); 

  var firstArrivalDifference = currentMoment.diff(firstTrainInstance, 'minutes');
  var lastArrivalDifference = firstArrivalDifference % newFrequency;
  var waitTime = frequency - lastArrivalDifference;

  var nextTrainArrival = currentMoment.add(waitTime, 'minutes');
  var NextArrivalHM = nextTrainArrival.format("HH:mm");


  // add table
  var tr = $('<tr>');
  var td1 = $('<td>');
  var td2 = $('<td>');
  var td3 = $('<td>');
  var td4 = $('<td>');
  var td5 = $('<td>');
  td1.append(newTrainName);
  td2.append(newDestination);
  td3.append(newFrequency);
  td4.append(NextArrivalHM);
  td5.append(waitTime);
  tr.append(td1).append(td2).append(td3).append(td4).append(td5);
  $('#newTrainData').append(tr);


  }, function (errorObject) {

  // In case of error this will print the error
    console.log("The read failed: " + errorObject.code);

});
