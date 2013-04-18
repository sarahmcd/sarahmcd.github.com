COMP 20 [Assignment 4]: Frogger, Part II

The files index.html, style.css, and game.js [along with corresponding asset .png image files] implement an HTML5 Frogger game playable in web browsers. The code written for this assignment uses and is based upon code written for a previous assignment in which I rendered a Frogger gameboard using the HTML5 canvas.

IMPLEMENTED IN THIS ASSIGNMENT:
- Game loads on page load
- Player can move frog piece using UP, DOWN, RIGHT, and LEFT arrow keys
- All vehicles and logs animated
- Collision detection implemented [such that Frogger loses one life one struck by a vehicle]
- Basic game scoring [10 points for moving forward, 50 points for getting Frogger home, 1000 points for each fifth Frogger returned home] implemented

ADDITIONAL IMPLEMENTATIONS:
- Upon collision with car or submersion in water, Frogger animates to dead frog image
- Basic levels implemented such that after successfully getting five frogs home, animation speed of logs and cars increases.
- Implemented game audio [sounds play when Frogger moves, wins, or dies]

FUTURE IMPROVEMENTS:
Although my Frogger game currently meets all necessary requirements and follows all directions, my code is not very modular. While my variable and function names are clear and my code is readable, I reproduce much of the same code multiple times because I have not yet stored objects in arrays [e.g.: an array of logs, another of vehicles, et al]. I am aware of this lack of modularity and will improve upon it in the future.

COLLABORATION AND REFERENCE:
I discussed methods for implementing animation and collision detection with Cameron Jackson and Jessie Serrino.
My HTML5 version of Frogger is based on that playable at www.playfrogger.org.

I spent approximately five hours completing the assignment for which I rendered the Frogger gameboard. I spent approximately ten hours completing the playable version of the game.

NOTE OF THANKS:
I would like to articulate my gratitude to Ming Chow for his understanding and flexibility regarding the submission date for this assignment. His patience enabled me to produce my best work.
