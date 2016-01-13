"use strict";
"esversion: 6";
localStorage.clear();
// Eventually, this section will test whether or not the user's
// browser accepts local storage
// localStorage.setItem("Test", "Test");
// if(typeof(Storage) !== "undefined") {
//     console.log("No storage");
// } else {
//     console.log("Yes storage");
// }
// imports
// $(document).ready(function() {
var scene_file = $.ajax({
  url: "json/story.json",
  type: "get",
  dataType: "json",
  cache: false,
  success: function(data) {
    return data;
  },
  async: true,
});
// config stuff
var can_load_stories = true;
var current_scene = "main_menu";
var last_scene = "main_menu";
var current_story = "scene_files"; // genius loci eventually
var player_inventory;
var player_tags;
var in_menu;
// var typer_is_on = false
// typer(scene_files.responseJSON.scenes.scene0.scene_text);
// displays the main menu
main_menu.showMenu();
// });
