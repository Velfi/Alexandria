// # Startup stuff # //
$('.display-container').replaceWith("<h1>You look tired.</h1><h2>Why don't you come in and have a seat.</h2><p>I wasn't sure I'd have any visitors today.</p><p>How's about I tell you a story?</p><p>I have one in mind, but if you can think of one you'd like to here instead, just say so.</p><br/><p>(To load a story, just type 'load (story)' and press enter or, if you like to hear the story they had in mind, just type 'say ok' and press enter.)</p>")

// # Global vars # //
var lastCommand = $(".submit-on-enter").val();

// # Functions # //
$(".submit-on-enter").keydown(function(event) {
  if (event.keyCode == 13) {
    event.preventDefault();
    lastCommand = $(".submit-on-enter").val();
    $(".submit-on-enter").val("");
    parser(lastCommand);
  }
});

function inputSanitizer(commandInput) {
  return commandInput.toLowerCase().split(" ");
}

function parser(stringsToParse) {
  switch (inputSanitizer(stringsToParse)[0]) {
    case "help":
      help();
      break;
    default:
      console.log("That input is invalid.");
  }
}

function help(){console.log("you have successfully entered the help command.")}


// function load(adventure_game){
//
// }
// function help(){
//
// }

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
