"use strict";
localStorage.clear();
// imports
var scenes = $.ajax({
  type: "GET",
  url: "scenes.json",
  async: false,
  beforeSend: function(x) {
    if (x && x.overrideMimeType) {
      x.overrideMimeType("application/j-son;charset=UTF-8");
    }
  },
  dataType: "json",
  success: function(data) {
    return data;
  }
});
var help_files = $.ajax({
  type: "GET",
  url: "help.json",
  async: false,
  beforeSend: function(x) {
    if (x && x.overrideMimeType) {
      x.overrideMimeType("application/j-son;charset=UTF-8");
    }
  },
  dataType: "json",
  success: function(data) {
    return data;
  }
});
// displays initial scene.
$("div.display-container").html(scenes.responseJSON.scene0.scene_text);
var currentScene = "scene0";
// # Functions # //
// submit the users input on enter keypress
$(".submit-on-enter").keydown(function(event) {
  if (event.keyCode == 13) {
    event.preventDefault();
    var lastCommand = $(".submit-on-enter").val();
    $(".submit-on-enter").val("");
    console.log("Last command input: " + inputSanitizer(lastCommand));
    parser(lastCommand);
  }
});

function inputSanitizer(commandInput) {
  return commandInput.toLowerCase().split(" ");
}
function failedCommand(){
  $(".submit-on-enter").attr("placeholder", "I'm not sure what you mean by that.");
}

function parser(stringsToParse) {
  $(".submit-on-enter").attr("placeholder", "Last Command: " + stringsToParse);
  switch (inputSanitizer(stringsToParse)[0]) {
    case "help":
      help();
      break;
    case "load":
      loadStory();
      break;
    case "go":
      moveTo(inputSanitizer(stringsToParse)[1]);
      break;
    case "look":
      look();
      break;
    case "use":
      use();
      break;
    case "take":
      take();
      break;
    case "talk":
      talk();
      break;
      // case "theme":
      //   console.log(inputSanitizer(stringsToParse)[1]);
      //   themeSwitcher(inputSanitizer(stringsToParse)[1]);
      //   break;
    default:
      failedCommand();
  }
}

// * In-game commands * //
function help() {
  // display the help screen
  $(".display-container").html(help_files.responseJSON.help.topic_content);
}

function loadStory(story) {
  if (currentScene === scene0) {
    // put in code for loading different story files.
    return true;
    // scenes.responseJSON.scene0.scene_text
  } else {
    console.log("You can only load levels from the main screen.");
  }
}

function moveTo(scene) {
  if (scenes.responseJSON[currentScene].moves.hasOwnProperty(scene)) {
    var move_target = scenes.responseJSON[currentScene].moves[scene];
    $(".display-container").html(scenes.responseJSON[move_target].scene_text);
  }
  else {
    failedCommand();
  }
}

function look() {
  console.log("you have successfully entered the look command.");
  currentScene
}

function use() {
  console.log("you have successfully entered the use command.");
}

function take() {
  console.log("you have successfully entered the take command.");
}

function talk() {
  console.log("you have successfully entered the talk command.");
}

// couldn"t get it to work, I"ll come back later.
// function themeSwitcher() {
//   $("body").css("background-color", "$base2");
//   $("input").css("background-color", "$base2");
// }
