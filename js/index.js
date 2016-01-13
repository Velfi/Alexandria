console.log("Index.js loaded");
// # Functions # //

// submit the users input on RETURN keypress
$(".submit-on-enter").keypress(function(event) {
  if (event.keyCode == 13) {
    event.preventDefault();
    var last_command = $(".submit-on-enter").val();
    $(".submit-on-enter").val("");
    console.log("Last command input: " + inputSanitizer(last_command));
    parser(inputSanitizer(last_command));
  }
});

function gameStatus() {
  console.log("last_scene = " + last_scene);
  console.log("current_scene = " + current_scene);
}

function inputSanitizer(command_input) { // used in submit-on-enter function
  return command_input.toLowerCase().split(" ");
}

function typer(typer_content) {
  $(".display-container").typed({
    strings: [typer_content],
    typeSpeed: 30,
    showCursor: false
  });
}

var main_menu = {
  showMenu: function() {
    $.ajax({
      url: "html/main_menu.html",
      type: "get",
      dataType: "html",
      cache: false,
      success: set_display.html,
      async: true,
    });
    in_menu = true;
    set_display.placeholder("What's next for our hero?");
    console.log("main_menu.show_menu() has loaded the main menu.");
  },
  loadSavefile: function() {
    console.log("you tried to save.");
  }
};
var options = {
  // display the options screen
  showMenu: function() {
    var help = $.ajax({
      url: "html/options.html",
      type: "get",
      dataType: "html",
      cache: false,
      success: function(data) {
        setDisplay(data);
      },
      async: true,
    });
    in_menu = true;
    setPlaceholder("Go set your settings, setting setter.");
    console.log("options.show_menu() has loaded the options screen.");
  }
};
var help = {
  // display the help screen
  showMenu: function() {
    var help = $.ajax({
      url: "html/help.html",
      type: "get",
      dataType: "html",
      cache: false,
      success: function(data) {
        set_display.html(data);
        $("#help_info").attr('style', 'display:block');
      },
      async: true,
    });
    in_menu = true;
    set_display.placeholder("What exactly would you like to know?");
    console.log("help.show_menu() has loaded the help screen.");
  },
  toggler: function(x) {
    var info_div = ("#" + $(x).attr('id') + "_info");
    $('.command_info').attr('style', 'display:none');
    $('.commands ul li').removeClass('active');
    $(x).addClass('active');
    $(info_div).attr('style', 'display:block');
  }
};

function parser(strings_to_parse) {
  switch (strings_to_parse[0]) {
    case "help": // open the help page
      help.showMenu();
      break;
    case "load": // load a story file
      set_scene.storyFile(strings_to_parse[1]);
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
    case "say":
      talk();
      break;
      // case "theme":
      //   console.log(inputSanitizer(stringsToParse)[1]);
      //   themeSwitcher(inputSanitizer(stringsToParse)[1]);
      //   break;
    case "options": // show game options
      options.showMenu();
      break;
    case "back": // back out of in-game menus
      back();
      break;
    default:
      set_display.placeholder("I didn't catch that.");
  }
}

var get_scene = { //these are for retrieving specific scene data
  //returns HTML
  html: function(scene) {
    return scene_file.responseJSON[scene].html;
  },
  // returns on object
  tag_init: function(scene) {
    return scene_file.responseJSON[scene].tag_init;
  },
  // returns on object
  moves: function(scene) {
    return scene_file.responseJSON[scene].moves;
  },
  // returns on object
  events: function(scene) {
    return scene_file.responseJSON[scene].events;
  },
  // returns on object
  objects: function(scene) {
    return scene_file.responseJSON[scene].objects;
  }
};

var set_scene = { // these are mostly for controlling state
  storyFile: function(story_name) {
    story_file = story_name + ".json";
    if (can_load_stories === true) {
      var scene_file = $.ajax({
        url: "json/" + story_file,
        type: "get",
        dataType: "json",
        cache: false,
        success: function(data) {
          return data;
        },
        async: true,
      });
      set_display.scene("scene0");
      can_load_stories = false;
      set_scene.currentScene = "scene0";
      set_scene.lastScene = current_scene;
      gameStatus();
    } else {
      set_display.placeholder("I'm afraid I can't do that right now.");
    }
  }
};

var set_display = {
  html: function(html_data) {
    $(".display-container").html(html_data);
  },
  scene: function(scene) {
    set_display.html(get_scene.html(scene));
    current_scene = scene;
    last_scene = current_scene;
    console.log("set_display.scene has loaded scene: " + scene);
  },
  placeholder: function(string) {
    $(".submit-on-enter").attr("placeholder", string);
  }
};

// * In-game commands * //
function back() {
  if (in_menu === true) {
    set_display.placeholder("");
    if (last_scene === "main_menu") {
      main_menu.showMenu();
    }
    in_menu = false;
  }
}

function moveTo(scene) {
  if (get_scene.moves(current_scene)[scene]) {
    set_display.scene(get_scene.moves(current_scene)[scene]);
  } else {
    set_display.placeholder("I'm not sure I understand where it is you'd like to go.");
  }
}

function look() {
  console.log("you have successfully entered the look command.");
}

function use() {
  console.log("you have successfully entered the use command.");
}

function take() {
  console.log("you have successfully entered the take command.");
}

function talk(talk_option) {

}

// couldn"t get it to work, I"ll come back later.
// function themeSwitcher() {
//   $("body").css("background-color", "$base2");
//   $("input").css("background-color", "$base2");
// }
