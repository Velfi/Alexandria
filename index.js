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
typer(scenes.responseJSON.scene0.scene_text);
var current_scene = "scene0";
// # Functions # //
// submit the users input on enter keypress
$(".submit-on-enter").keydown(function(event) {
  if (event.keyCode == 13) {
    event.preventDefault();
    var last_command = $(".submit-on-enter").val();
    $(".submit-on-enter").val("");
    console.log("Last command input: " + inputSanitizer(last_command));
    parser(last_command);
  }
});

function typer(typer_content) {
  $(".display-container").typed({
    strings: [typer_content],
    typeSpeed: 30,
    showCursor: false
  });
}

function inputSanitizer(command_input) {
  return command_input.toLowerCase().split(" ");
}

function failedCommand(string) {
  if (string === undefined) {
    string = "I'm not sure what you mean by that.";
  }
  $(".submit-on-enter").attr("placeholder", string);
}

function parser(strings_to_parse) {
  $(".submit-on-enter").attr("placeholder", "Last Command: " + strings_to_parse);
  switch (inputSanitizer(strings_to_parse)[0]) {
    case "help":
      help();
      break;
    case "load":
      loadStory();
      break;
    case "go":
      moveTo(inputSanitizer(strings_to_parse)[1]);
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
  if (current_scene === "scene0") {
    // put in code for loading different story files.
    return true;
    // scenes.responseJSON.scene0.scene_text
  } else {
    failedCommand("You can only load levels from the main screen.");
  }
}

function moveTo(scene) {
  if (scenes.responseJSON[current_scene].moves.hasOwnProperty(scene)) {
    var move_target = scenes.responseJSON[current_scene].moves[scene];
    $(".display-container").html(scenes.responseJSON[move_target].scene_text);
    currentScene = [move_target];
  } else {
    failedCommand("I'm not sure I understand where it is you'd like to go.");
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

function talk(talk_option) {
  console.log("you have successfully entered the talk command.");
  if (scenes.responseJSON[currentScene].moves.hasOwnProperty(scene)) {
    var move_target = scenes.responseJSON[currentScene].moves[scene];
    $(".display-container").html(scenes.responseJSON[move_target].scene_text);
    currentScene = [move_target];
  } else {
    failedCommand("I'm not sure I understand where it is you'd like to go.");
  }
}

// couldn"t get it to work, I"ll come back later.
// function themeSwitcher() {
//   $("body").css("background-color", "$base2");
//   $("input").css("background-color", "$base2");
// }
