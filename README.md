# Adventure
## by Zelda Hessler
A browser based text adventure

### Featuring:
  * A dialog system using typed.js
  * A decision tree using JSON
  * a simple command parser

The structure of a story(in progress)
Scenes file
    Scene(n) // Adventures always start at scene0
        scene_name
        scene_description
        moves
            location
                is_closed
                    opened_with
        objects
            object
                object_name
                object_description
                is_takeable
                is_unique
                interacts_with
                    interact_object
                combines_with
                     combo_object
        NPCs
             character
                 character_name
                 character_description
                 interacts_with
                 dialog

