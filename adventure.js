Scenes = new Mongo.Collection("scenes");
Commands = new Mongo.Collection("commands");

Router.configure({
  layoutTemplate: 'layout'
});
Router.route('/', function() {
  this.render('main');
  console.log(this);
});

function reuseableTyped(elementClass, whatToType) {
  (elementClass).typed({
    strings: [whatToType],
    typeSpeed: 0
  });
}

if (Meteor.isClient) {
  // Template.main.helpers({
  //   introText : reuseableTyped(".intro", "This is test text for the intro page")
  // });
}

if (Meteor.isServer) {
  Meteor.startup(function() {
    if (!Scenes.findOne()) {
      Scenes.insert({
        title: "home",
        setting: "the internet",
      });
    }
    if (!Commands.findOne()) {
      Commands.insert({
        command: "look",
        example: "LOOK AT object",
        helpText: "Use look to look",
      });
      Commands.insert({
        command: "use",
        example: "USE object",
        helpText: "Use use to use",
      });
      Commands.insert({
        command: "take",
        example: "TAKE object",
        helpText: "Use take to take",
      });
      Commands.insert({
        command: "talk",
        example: "TALK TO person",
        helpText: "Use talk to talk",
      });
    }
  });
}
