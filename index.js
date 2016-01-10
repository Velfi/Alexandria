"use strict";
localStorage.clear();
// Eventually, this section will test whether or not the user's
// browser accepts local storage
// localStorage.setItem('Test', 'Test');
// if(typeof(Storage) !== "undefined") {
//     console.log("No storage");
// } else {
//     console.log("Yes storage");
// }
// imports
$.ajaxSetup({
  async: false
});
var scene_files = $.getJSON('scenes.json');
var help_files = $.getJSON('help.json');

// config stuff
var can_load_stories = true;
// displays initial scene
// typer(scene_files.responseJSON.scenes.scene0.scene_text);
var current_scene = "scene0";
var last_scene = "";
var current_story = "scene_files"; // genius loci eventually
var player_inventory = {};
var player_tags = {};
var in_menu = false;
setScene("scene0");
// var typer_is_on = false

// # Functions # //
// submit the users input on enter keypress
$(".submit-on-enter").keydown(function(event) {
  if (event.keyCode == 13) {
    event.preventDefault();
    var last_command = $(".submit-on-enter").val();
    $(".submit-on-enter").val("");
    console.log("Last command input: " + inputSanitizer(last_command));
    parser(inputSanitizer(last_command));
  }
});

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

function inputSanitizer(command_input) {
  return command_input.toLowerCase().split(" ");
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

function setPlaceholder(string) {
  $(".submit-on-enter").attr("placeholder", string);
}

function setDisplay(html_to_render) {
  $(".display-container").html(html_to_render);
}

function setScene(scene) {
  setDisplay(scene_files.responseJSON.scenes[scene].scene_text);
  last_scene = current_scene;
  current_scene = scene;
  console.log("setScene loaded scene: " + scene)
}

function typer(typer_content) {
  $(".display-container").typed({
    strings: [typer_content],
    typeSpeed: 30,
    showCursor: false
  });
}

function parser(strings_to_parse) {
  // if (current_scene === "main_menu" && strings_to_parse === ["say", "yes"]) {
  //   loadStory("story.json");
  // }
  switch (strings_to_parse[0]) {
    case "help": // open the help page
      help.show();
      break;
    case "load": // load a story file
      loadStory(strings_to_parse[1]);
      break;
    case "go": // move about
    case "move":
    case "walk":
    case "run":
      moveTo(strings_to_parse[1]);
      break;
    case "look": // look at something
      look();
      break;
    case "use": // use an object
      use();
      break;
    case "take": // take an object
    case "get":
      take();
      break;
    case "talk": // talk to an NPC
      talk();
      break;
      // case "theme":
      //   console.log(inputSanitizer(stringsToParse)[1]);
      //   themeSwitcher(inputSanitizer(stringsToParse)[1]);
      //   break;
    case "options": // show game options
      options();
      break;
    case "back": // back out of in-game menus
      if (in_menu === true) {
        setScene(last_scene);
        setPlaceholder("")
        break;
      }
    default:
      setPlaceholder("I didn't catch that.");
  }
}

// * In-game commands * //
var help = new function() {
  // display the help screen
  this.show = function() {
    $(".display-container").load("help.html");
    $(document).ready(function() {
      $('#help_info').attr('style', 'display:block');
    });
    in_menu = true;
    setPlaceholder("What exactly would you like to know?");
  }
  this.toggler = function(x) {
    var info_div = ("#" + $(x).attr('id') + "_info");
    $('.command_info').attr('style', 'display:none');
    $('.commands ul li').removeClass('active')
    $(x).addClass('active');
    $(info_div).attr('style', 'display:block');
  }
}

function options() {

}

function loadStory(story) {
  story = story + ".json";
  if (can_load_stories === true) {
    scene_files = $.ajax({
      type: "GET",
      url: story,
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
    setScene("scene0");
    can_load_stories = false;
  } else {
    setPlaceholder("I'm afraid i can't do that right now.");
  }
}

function moveTo(scene) {
  if (hasProperty("moves", scene)) {
    setScene(search("moves", scene));
  } else {
    setPlaceholder("I'm not sure I understand where it is you'd like to go.");
  }
}

function look()
console.log("you have successfully entered the look command.");
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
