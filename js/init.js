"esversion: 6";
localStorage.clear();
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
main_menu.showMenu();
