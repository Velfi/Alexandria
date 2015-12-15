Scenes = new Mongo.Collection("scenes");
Commands = new Mongo.Collection("commands");

Scenes.insert ({
  scene : {
    title : "home",
    setting: "the internet",
  }
});

Commands.insert ({
    look : {
      command : "Look",
      example : "LOOK AT object",
      helpText : "Use look to look",
   }
    use : {
      command : "Use",
      example : "USE object",
      helpText : "Use use to use",
   }
    take : {
      command : "Take",
      example : "TAKE object",
      helpText : "Use take to take",
   }
    talk : {
      command : "Talk",
      example : "TALK TO person",
      helpText : "Use talk to talk",}
});
