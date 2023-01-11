var currentDayEl = $("#currentDay");
var timeBlockEl = $(".time-block");


$(function () {

  // save button handler: saves text input to local storage using the time-block id as the key
  function handleSaveEvent(event) {
    var key = $(this).parent().attr("id");
    var input = $(this).siblings(".description").val();

    localStorage.setItem(key, input);
  };
  
  // save button listener
  timeBlockEl.on("click", ".saveBtn", handleSaveEvent);

  // for each time-block:
  timeBlockEl.each(function() {
    var key = $(this).attr("id");
    // pulls the time-block's key from local storage
    var eventInput = localStorage.getItem(key);

    // if it exists, the last saved text input for the key is inserted into the html
    if(eventInput) {
      $(this).children(".description").text(eventInput);
    }

    var currentHour = dayjs().hour();
    var hourNum = key.slice(5);

    // the time-block's id is compared to the current hour to determine past, present, or future class styling.
    if(hourNum == currentHour) {
      $(this).attr("class", "row time-block present");
    } else if (hourNum > currentHour) {
      $(this).attr("class", "row time-block future");
    } else {
      $(this).attr("class", "row time-block past");
    }
  });
  
  // displays the current date in the header of the page.
  function displayDate() {
    var today = dayjs().format('dddd, MMMM D');
    currentDayEl.text(today);
  }

  // calls displayDate on page load, then every second
  displayDate();
  setInterval(displayDate, 1000);
});

