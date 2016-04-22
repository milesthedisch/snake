# snake

## A simple snake game with vanilla JS.

---

Contributions are very welcome.

How the project works: 
  1. Renderer
    * Im using RequestAnimationFrame and canvas to handel painting.
  2. Collision Detection
    * A very complex set of algorithms like the DOOM engine. (Just kidding its really just a bunch of loops)
  3. Update
    * Updating the positions of all the snakes on the map every 1 second (configurable).

Code is pretty simple to read so no need for alot of documentation. Any question from noobs are welcome to be asked.

Setting up:
  1. `Run bower install`
  2. If you dont have bower please install it like this `npm install -g bower-cli`
  3. If you dont have `npm` then its time to move out from under the rock you've been living in and run `brew install npm`
  4. If you dont have `brew` GTFO... Nah actually google this -> "How to install `brew`" cause im too to show people that.
  5. Oh thats right thats only for Mac OS... So Window ladies and gents have to find there own way.
  
Configuring: 
  1. If you want to see alot of collisions go into index and just put random things in the `{...}`, 
     the collision detection might not be able to handel all the collisions. Sorry. If thats something you intreseted in fixing please feel free.


Have fun!
