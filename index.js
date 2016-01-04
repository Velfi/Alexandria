//     if (!Scenes.findOne()) {
//       Scenes.insert({
//         title: "home",
//         setting: "the internet",
//       });
//     }
//     if (!Commands.findOne()) {
//       Commands.insert({
//         command: "look",
//         example: "LOOK AT object",
//         helpText: "Use look to look",
//       });
//       Commands.insert({
//         command: "use",
//         example: "USE object",
//         helpText: "Use use to use",
//       });
//       Commands.insert({
//         command: "take",
//         example: "TAKE object",
//         helpText: "Use take to take",
//       });
//       Commands.insert({
//         command: "talk",
//         example: "TALK TO person",
//         helpText: "Use talk to talk",
//       });
//     }
//   });
// }

$(document).ready(function() {
  $('.display-container').replaceWith("<h2>You look tired. Why don't you come in and have a seat.</h2><p>I wasn't sure I'd have any visitors today.</p>")
  $('.submit-on-enter').keydown(function(event) {
    if (event.keyCode == 13) {
      var lastCommand = $(".submit-on-enter").val();
      alert(lastCommand);
      $(".input").reset();
      return false;
    }
  });
});

// function load(adventure_game){
//
// }
// function help(){
//   
// }
