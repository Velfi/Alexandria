"use strict";
localStorage.clear();
// imports
$.ajaxSetup({
  async: false
});
var scene_files = $.getJSON('scenes.json');
var help_files = $.getJSON('help.json');
// displays initial scene.
typer(scene_files.responseJSON.scenes.scene0.scene_text);
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

function setPlaceholder(string) {
  $(".submit-on-enter").attr("placeholder", string);
}

function parser(strings_to_parse) {
  setPlaceholder("Last Command: " + strings_to_parse);
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
      setPlaceholder("I didn't catch that.");
  }
}

function search(search_in, search_for) {
  switch (search_in) {
    case "moves":
      search_in = scene_files.responseJSON.scenes[current_scene].moves
      break;
    case "scenes":
      search_in = Object.getOwnPropertyNames(scene_files.responseJSON.scenes)
      break;
  }
  var search_result = [];
  if (search_in instanceof Array) {
    for (i = 0; i < search_in.length; i++) {
      if (search_in[i] === search_for) {
        search_result = search_in[i];
      }
    }
  } else {
    for (var i in search_in) {
      if (!search_in.hasOwnProperty(i)) continue;
      if (typeof search_in[i] == 'object') {
        search_result = search_result.concat(search(search_in[i], search_for));
      } else if (i == search_for) {
        search_result.push(search_in[i]);
      }
    }
  }
  return search_result;
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
    // scene_files.responseJSON.scene0.scene_text
  } else {
    setPlaceholder("You can only load levels from the main screen.");
  }
}

function moveTo(scene) {
  if (scene_files.responseJSON[current_scene].moves.hasOwnProperty(scene)) {
    var move_target = scene_files.responseJSON[current_scene].moves[scene];
    $(".display-container").html(scene_files.responseJSON[move_target].scene_text);
    current_scene = [move_target];
  } else {
    setPlaceholder("I'm not sure I understand where it is you'd like to go.");
  }
}

function look() {
  console.log("you have successfully entered the look command.");
  current_scene
}

function use() {
  console.log("you have successfully entered the use command.");
}

function take() {
  console.log("you have successfully entered the take command.");
}

function talk(talk_option) {
  console.log("you have successfully entered the talk command.");
  if (scene_files.responseJSON[current_scene].moves.hasOwnProperty(scene)) {
    var move_target = scene_files.responseJSON[current_scene].moves[scene];
    $(".display-container").html(scene_files.responseJSON[move_target].scene_text);
    current_scene = [move_target];
  } else {
    setPlaceholder("Who did you want to talk to?");
  }
}

// couldn"t get it to work, I"ll come back later.
// function themeSwitcher() {
//   $("body").css("background-color", "$base2");
//   $("input").css("background-color", "$base2");
// }
