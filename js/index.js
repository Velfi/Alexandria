console.log("Index.js loaded");
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
$("body").on("keydown", function(event) {
  if (event.which == 9) {
    event.preventDefault();
    console.log("focused key pressed");
    $(".submit-on-enter").focus();
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
      break;
    default:
      return false;
  }
}

function search(search_in, search_for) {
  switch (search_in) {
    case "moves":
      search_in = scene_files.responseJSON.scenes[current_scene].moves;
      break;
    case "scenes":
      search_in = Object.getOwnPropertyNames(scene_files.responseJSON.scenes);
      break;
  }
  var search_result = [];
  if (search_in instanceof Array) {
    for (var i = 0; i < search_in.length; i++) {
      if (search_in[i] === search_for) {
        search_result = search_in[i];
      }
    }
  } else {
    for (var j in search_in) {
      if (!search_in.hasOwnProperty(j)) continue;
      if (typeof search_in[j] == 'object') {
        search_result = search_result.concat(search(search_in[j], search_for));
      } else if (j == search_for) {
        search_result.push(search_in[j]);
      }
    }
  }
  return search_result;
}

function inputSanitizer(command_input) {
  return command_input.toLowerCase().split(" ");
}

function setPlaceholder(string) {
  $(".submit-on-enter").attr("placeholder", string);
}

function setDisplay(data) {
  $(".display-container").html(data);
}

function setScene(scene) {
  setDisplay(scene_files.responseJSON.scenes[scene].scene_text);
  last_scene = current_scene;
  console.log(last_scene);
  current_scene = scene;
  console.log("setScene loaded scene: " + scene);
}

function typer(typer_content) {
  $(".display-container").typed({
    strings: [typer_content],
    typeSpeed: 30,
    showCursor: false
  });
}
var main_menu = {
  show_menu: function() {
    $.ajax({
      url: "html/main_menu.html",
      type: "get",
      dataType: "html",
      cache: false,
      success: setDisplay,
      async: true,
    });
    in_menu = true;
    setPlaceholder("What's next for our hero?");
    console.log("main_menu.show_menu() has loaded the main menu.");
  },
  load_savefile: function() {
    console.log("you tried to save.");
  }
};

var options = {
  // display the options screen
  show_menu: function() {
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
  show_menu: function() {
    var help = $.ajax({
      url: "html/help.html",
      type: "get",
      dataType: "html",
      cache: false,
      success: function(data) {
        setDisplay(data);
        $("#help_info").attr('style', 'display:block');
      },
      async: true,
    });
    in_menu = true;
    setPlaceholder("What exactly would you like to know?");
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

function parser(strings_to_parse) {
  switch (strings_to_parse[0]) {
    case "help": // open the help page
      help.show_menu();
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
    case "say":
      talk();
      break;
      // case "theme":
      //   console.log(inputSanitizer(stringsToParse)[1]);
      //   themeSwitcher(inputSanitizer(stringsToParse)[1]);
      //   break;
    case "options": // show game options
      options.show_menu();
      break;
    case "back": // back out of in-game menus
      if (in_menu === true) {
        console.log(last_scene);
        if (last_scene == "main_menu") {
          main_menu.show_menu();
        } else {
          setScene(last_scene);
          setPlaceholder("");
        }
      }
      break;
    default:
      setPlaceholder("I didn't catch that.");
  }
}

// * In-game commands * //

function moveTo(scene) {
  if (hasProperty("moves", scene)) {
    setScene(search("moves", scene));
  } else {
    setPlaceholder("I'm not sure I understand where it is you'd like to go.");
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
