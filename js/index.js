// "use strict";
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
$(".modal-button, .modal-kill").click(function() {
  set_display.modalClose();
});
$(document).on("keydown", function(event) {
  if (event.which === 13 && $(".modal").is(':visible')) {
    set_display.modalClose();
  }
});

function inputSanitizer(command_input) { // used in submit-on-enter function
  return command_input.toLowerCase().split(" ");
}

var main_menu = {
  showMenu: function() {
    $.ajax({
      url: "html/main_menu.html",
      type: "get",
      dataType: "html",
      cache: false,
      success: function(data){
        set_display.html(data);
        set_display.placeholder("What's next for our hero?");
        console.log("main_menu.show_menu() has loaded the main menu.");
        in_menu = true;
      },
      async: true,
    });
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
        $("#help_info").attr("style", "display:block");
        in_menu = true;
        set_display.placeholder("What exactly would you like to know?");
        console.log("help.show_menu() has loaded the help screen.");
      },
      async: true,
    });
  },
  toggler: function(x) {
    var info_div = ("#" + $(x).attr("id") + "_info");
    $(".command_info").attr("style", "display:none");
    $(".commands ul li").removeClass("active");
    $(x).addClass("active");
    $(info_div).attr("style", "display:block");
  }
};

function parser(strings_to_parse) {
  switch (strings_to_parse[0]) {
    case "help": // open the help page
      help.showMenu();
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
      look(strings_to_parse[1]);
      break;
    case "use": // use an object
      use(strings_to_parse[1]);
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

function loadStory(story_name) {
  var story_file = story_name + ".json";
  if (can_load_stories === true) {
    scene_file = $.ajax({
      url: "json/" + story_file,
      type: "get",
      dataType: "json",
      cache: false,
      success: [function(data) {
          return data;
        },
        function() {
          set_display.scene("scene0");
          can_load_stories = false;
          current_scene = "scene0";
          last_scene = current_scene;
          in_menu = false;
          set_display.placeholder("And so it begins...");
        }
      ],
      error: function() {
        set_display.placeholder("I'm afraid I don't know that story.");
      },
      async: true,
    });
  } else {
    set_display.placeholder("let me finish this story first before you start asking for another.");
  }
}

var set_display = {
  html: function(html_data) {
    $(".display-container").html(html_data);
  },
  modalOpen: function(html_data) {
    $(".modal-kill").css("visibility", "visible");
    $(".modal").css("visibility", "visible");
    $(".modal-display-container").html(html_data);
    $("main").addClass("blurred");
  },
  modalClose: function() {
    $(".modal-kill").css("visibility", "hidden");
    $(".modal").css("visibility", "hidden");
    $("main").removeClass("blurred");
  },
  placeholder: function(string) {
    $(".submit-on-enter").attr("placeholder", string);
  },
  scene: function(scene) {
    set_display.html(get_scene.html(scene));
    current_scene = scene;
    last_scene = current_scene;
    console.log("set_display.scene has loaded scene: " + scene);
  },
};

// * In-game commands * //
function back() {
  if (in_menu === true) {
    set_display.placeholder("");
    if (last_scene === "main_menu") {
      main_menu.showMenu();
    }
    else {
      set_display.scene(last_scene);
    }
    in_menu = false;
  }
  else {
    set_display.placeholder("Back to where?");
  }
}

function moveTo(scene) {
  if (get_scene.moves(current_scene)[scene]) {
    set_display.scene(get_scene.moves(current_scene)[scene]);
  } else {
    set_display.placeholder("I'm not sure I understand where it is you'd like to go.");
  }
}

function look(object) {
  if (get_scene.objects(current_scene)[object]) {
    set_display.modalOpen(get_scene.objects(current_scene)[object].description);
  } else {
    set_display.placeholder("I can't see that anywhere.");
  }
}

function use(object) {
  if (get_scene.objects(current_scene)[object]) {
    set_display.modalOpen(get_scene.objects(current_scene)[object].on_use);
  } else {
    set_display.placeholder("I don't think you can use that.");
  }
}
