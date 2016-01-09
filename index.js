"use strict";
localStorage.clear();
// imports
$.ajaxSetup({
  async: false
});
var scene_files = $.getJSON('scenes.json');
var help_files = $.getJSON('help.json');

// config stuff
var can_load_stories = true;
// displays initial scene.
// typer(scene_files.responseJSON.scenes.scene0.scene_text);
$(".display-container").html(scene_files.responseJSON.scenes.scene0.scene_text);
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

function setScene(scene){
  $(".display-container").html(scene_files.responseJSON.scenes[scene].scene_text);
  current_scene = scene;
}
function loadStory(story) {
  if (can_load_stories === true) {
    var scene_files = $.getJSON(story);
    setScene("scene0");
  } else {
    setPlaceholder("I'm afraid i can't do that right now.");
  }
}

function moveTo(scene) {
  if (hasProperty("moves",scene)) {
    setScene(search("moves",scene));
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
}

// couldn"t get it to work, I"ll come back later.
// function themeSwitcher() {
//   $("body").css("background-color", "$base2");
//   $("input").css("background-color", "$base2");
// }

function hasProperty(search_in, search_for) {
  switch (search_in) {
    case "moves":
      if (scene_files.responseJSON.scenes[current_scene].moves.hasOwnProperty(search_for)) {
        return true;
      } else {
        return false;
      }
      break;
    case "scenes":
      if (scene_files.responseJSON.scenes.hasOwnProperty(search_for)) {
        return true;
      } else {
        return false;
      }
    default:
      return false;
  }
}
