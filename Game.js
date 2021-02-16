class Game{
    constructor(){}

    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        })
    }
    
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form();
                form.display();
            }
    player1 = createSprite(200,500);
    player1.addImage("player1",player_img);
    
    
    player2 = createSprite(300,500);
    player2.addImage("player2", player_img);

    players = [player1,player2];
    }

    
    play(){
        form.hide();

        Player.getPlayerInfo();
        image(back_img, 0, 0, 1000, 800);
        var x = 100;
        var y = 200;
        var index = 0;
        drawSprites();

        for(var plr in allPlayers){
        
            index = index + 1;
            x = 500-allPlayers[plr].distance;
            y = 500;
            
            players[index - 1].x = x;
            players[index - 1].y = y;

            if(index === player.index){
                fill("black");
                textSize(25);
                text(allPlayers[plr].name ,x-30,y+25);
            }

            // Differentiate the main player by printing
            // the name of the player on the basket. 
            

            var getName = database.ref('players/player1/name');
            getName.on("value", (data) => {
            getName = data.val();
             })
            
            var getName2 = database.ref('players/player2/name');
            getName2.on("value", (data) => {
                getName2 = data.val();
            })
            
            textSize(25);
            fill("white");
            text(getName + " : " +allPlayers.player1.score,50,50);
            text( getName2 + " : " + allPlayers.player2.score, 50, 100);

        }
        // Give movements for the players using arrow keys
            if(keyDown(LEFT_ARROW) && player.index !== null){
                player.distance = player.distance + 6;
                player.update();
             }
       
            if(keyDown(RIGHT_ARROW) && player.index !== null){
                player.distance -= 6;
                player.update();
            }

        // Create and spawn fruits randomly
        if(frameCount %70 === 0){
            fruits = createSprite(random(100,1000),0,100,100);
            fruits.velocityY = 6;

            var rand = Math.round(random(1,5));
            switch(rand){
                case 1: fruits.addImage("fruit1", fruit1_img);
                case 2: fruits.addImage("fruit2", fruit2_img);
                case 3: fruits.addImage("fruit3", fruit3_img);
                case 4: fruits.addImage("fruit4", fruit4_img);
                case 5: fruits.addImage("fruit5", fruit5_img); 
            }
            fruitGroup.add(fruits);
        }
        
        if (player.index !== null) {
            for (var i = 0; i < fruitGroup.length; i++) {
                if (fruitGroup.get(i).isTouching(players)) {
                    fruitGroup.get(i).destroy();
                    player.score =player.score+1;
                    player.update();
                    
                }
                
            }
        }
        
        /*if(player1.isTouching(fruitGroup)){
            fruitGroup.destroyEach();
            player1score +=1;
            database.ref('players/player1').update({
                score: player1score,
            })
         }

          
         text(getName + "'s Score: " + player1score, width -200, height - 50);
         
         if(player2.isTouching(fruitGroup)){
            fruitGroup.destroyEach();
            player2score +=1; 
            database.ref('players/player2').update({
                score: player2score,
            }) 
         } 

         var get2score = database.ref('players/player2/score');
          get2score.on("value", (data) => {
              get2score = data.val();
          })

         text(getName2 + "'s Score: " + get2score, width - 995, height - 50);
         */

         if(player.score >= 10){
             this.update(2);
         }
         
    }

    end(){
       background(end);
       textSize(50);
       fill("black");
       strokeWeight(4);
       text("Game Over!", 580,height/4);
    }
}

/* Game Elements 
    Characters (PC(playing characters)   and   NPC(non playing characters)) 
    Story 
    Goals
    Rules 
    Balance 
    Adaptivity 
    Chance vs Skill 
    Feedback 
*/