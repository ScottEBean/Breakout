# Breakout
Breakout game for CS5410 Game Development

Introduction
Write a web-based and modern update to the Breakout game.  This assignment increases your game difficulty by including an in-game menu, client-side persistent high-scores, and particle explosions.  
Refer to this Wikipedia https://en.wikipedia.org/wiki/Breakout_(video_game) link for an overview and history of the game.

Interesting discussion of Breakout style games: http://www.gamasutra.com/view/feature/1630/breaking_down_breakout_system_and_.php?print=1

Breakout paddle-ball bouncing ideas: http://stackoverflow.com/questions/19145678/breakout-paddle-collision-angle

Assignment
Write a 2D HTML Canvas Breakout game according to the following specifications...

Game starts with 8 rows of bricks.  When all bricks are cleared, or all paddles have been used, the game ends.
Each row is made up of at least 14 bricks.
Starting from the bottom, two rows of yellow, two rows of orange, two rows of blue, and two rows of green.
Have a small space between each of the rows and bricks.  Look at the sample gameplay video below for how this should look.

Some kind of nice background image for the gameplay area.

When starting the game, provide a 3, 2, 1 count down timer, showing the numbers 3, 2, 1 in the middle of the screen for the count down.  Following the completion of the countdown, the ball starts from the paddle in a nice direction (nice meaning most anything other than straight up).

Single paddle (not two as in the sample gameplay video).
The paddle shrinks to half size when the player breaks through (makes a hole) in the top green row.  On start of new paddle, if top row already has a hole, start with the full size paddle and then shrink to half size when a brick in the top green row is destroyed.

Player starts with three paddles; no way to earn any more.
When the player doesn't hit the ball, subtract a paddle from the remaining paddles (or end the game if none left) and provide a 3, 2, 1 count down timer before starting with the new paddle.  Ball starts in the same way as the start of the game.

The ball speed increases at the following intervals (start over when starting a new paddle):
4 bricks removed
12 bricks removed
36 bricks removed
62 bricks removed

When the ball collides with the paddle, use the reflection technique discussed in this blog post: http://seangeo.blogspot.com/2011/03/breakout-week-3-when-balls-collide.html

Scoring
1 point for each yellow brick
2 points for each orange brick
3 points for each blue brick
5 points for each green brick
25 points when a line is cleared
Every 100 points the player earns a second ball that automatically starts from the middle of the paddle (no space bar to release it).

Every time a brick is hit, a tasteful explosion of particles occurs.  The explosion happens by having particles take up the same space (surface area) as the brick and then explode out based upon their position relative to the center.  Alternatively, the explosion could be the particles falling down, with a stickiness based upon their relative position on the brick (higher in the brick, the stickier).

User Interface : New Game, High Scores, Credits
In-Place menu, like my GameState example (may be HTML or Canvas rendered).  Use one or both of two menu navigation options:
Up and down arrow keys to move between the menu options.  Use ESC key to back out of the High Scores and Credits screens.  When ESC is pressed during gameplay, provide a menu option for the user to resume or quit the game.
Mouse selection of menu items.

Currently selected menu choice must be clearly understood by the user (me).

High Scores are persisted to the browser's local storage; keep and display up to the top 5 scores.

Provide an option in the High Score display to reset the scores.

During gameplay
Show current score; place at bottom of the gameplay screen.
Graphically (not text) show number of paddles left; place in the upper right or lower left of the gameplay screen.


Control Scheme
Player movement is controlled by using the arrow keys.

Technical Notes
Your code must have a game loop that follows the pattern learned from the first assignment.  It should loop something like...

function gameLoop() {
    ...compute elapsed time...
    handleInput(elapsedTime);
    update(elapsedTime);
    render(elapsedTime);
    requestAnimationFrame(gameLoop);
}

You may spread your code over multiple .js files if you like; in fact, I encourage it.

Development Notes
At the time this assignment is given, I haven't presented lectures on particles or using the browser's local storage; these lectures are coming next.  
There is still quite a bit of the game you can do while we work through these lectures.

Once again, note that JavaScript is different from C++/C#/Java, and the way you think about and organize your code should be different.  
Take the time to "think" in JavaScript and code accordingly. Again, I don't expect perfection on this assignment, but looking to see progress made.



Image Credits
Baseball image http://pngimg.com/download/19046
Baseball pack https://opengameart.org/content/baseball-pack
