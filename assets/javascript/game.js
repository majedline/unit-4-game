

var characters = [obiwan, luke, sith, maul];
// var characterButtons = [];


console.log(characters);

var humanPlayer;
var aiPlayer;

var isHumanPlayerSelected = false;
var isAIPlayerSelected = false;

var readyToFight = false;

var isGameActive = true;

function initSetupSection1() {
    console.log("Build player section");
    // create the buttons;
    for (var i = 0; i < characters.length; i++) {
        var characterButton = buildButton(i, characters[i]);
        $("#section-1").append(characterButton);
    }

    // setup the play-button events
    $(".play-button").on("click", function () {
        executButtonClick(this);
    });

    // setup the fight event
    $("#fight").on("click", function () {
        fight();
    });
}

function initSetupSection2() {
    console.log("Build AI section");

    // Setup the human button selection area.
    for (var i = 0; i < characters.length; i++) {
        // if it is human player or current AI player, then ignore it
        if (characters[i] != humanPlayer && characters[i] != aiPlayer) {
            // if the AI player is still alive, then show it
            if (characters[i].isAlive) {
                var characterButton = buildButton(i, characters[i]);
                $("#section-2").append(characterButton);
            }
        }
    }

    // setup the play-button events
    $(".play-button").on("click", function () {
        executButtonClick(this);
    });

}



// the function called by the human and AI button selection
function executButtonClick(buttonClicked) {

    // the game is active
    if (isGameActive) {

        // the human player is not selected, select it
        if (!isHumanPlayerSelected) {
            humanPlayer = characters[buttonClicked.id];
            console.log("Human Player is:")
            console.log(humanPlayer);
            isHumanPlayerSelected = true;

            $("#section-1").html(buttonClicked);
            initSetupSection2();

            $("#instructions-1").html("You are: " + humanPlayer.characterName);
            $("#instructions-2").html("Select who you want to fight");

            $("#"+humanPlayer.id).attr("class", "play-button play-button-green")
            

        // the human player is selected but the AI is not.
        } else if (!isAIPlayerSelected) {
            aiPlayer = characters[buttonClicked.id];
            console.log("AI Player is:")
            console.log(aiPlayer);
            isAIPlayerSelected = true;

            var numberOFEnemiesRemaining = numberOFEnemiesRemainingToFight();
            console.log("isAnyAIRemaining: " + numberOFEnemiesRemaining);

            $("#section-3").html(buttonClicked);
            if (numberOFEnemiesRemaining > 1) {
                $("#instructions-2").html("These are the other enemies to fight");
            } else {
                $("#instructions-2").html("You are close! One more to go");
            }
            $("#instructions-3").html("You are now fighting: " + aiPlayer.characterName);

            // Human and AI are selected, now we are ready to fight
            readyToFight = true;


        }
    }
}

/* game actions */
function run() {
    initSetupSection1();
}

// fight. Human vs AI
function fight() {

    if (readyToFight && isGameActive) {
        console.log("AI Fighter");
        console.log(aiPlayer);
        console.log("Human Fighter");
        console.log(humanPlayer);

        // Human attack AI
        aiPlayer.healthPoint -= humanPlayer.currentAttackPoint;

        // AI attacks human
        humanPlayer.healthPoint -= aiPlayer.counterAttackPoints;

        //Human power increase by baseAttachPoint
        humanPlayer.currentAttackPoint += humanPlayer.baseAttackPoint;

        // update the interface
        $("#ptext" + humanPlayer.id).html("HP: " + humanPlayer.healthPoint);
        $("#ptext" + aiPlayer.id).html("HP: " + aiPlayer.healthPoint);

        // check if the human is still alive
        if (humanPlayer.healthPoint <= 0) {
            humanPlayer.isAlive = false;
            gameOverMessage(humanPlayer.isAlive);
        }

        // check if the AI is alive
        if (aiPlayer.healthPoint <= 0) {

            aiPlayer.isAlive = false;
            readyToFight = false;
            isAIPlayerSelected = false;

            // the current AI is dead, ask the user to select the next one
            var msg = aiPlayer.characterName + " is dead. Select the next enemy!";
            $("#instructions-3").html(msg);
            $("#ptext" + aiPlayer.id).html(msg);

        }
    }

    // Check if there are any enemies left. if none, then send the win message if you are still alive
    var numberOFEnemiesRemaining = numberOFEnemiesRemainingToFight();
    if (numberOFEnemiesRemaining <= 0 && humanPlayer.isAlive) {
        gameOverMessage(humanPlayer.isAlive);
    }
}

// displays custome game over message based on win or lose
function gameOverMessage(win) {
    if (win) {
        $("#instructions-1").html("You are Win!!!! May the force be with you");
    } else {
        $("#instructions-1").html("You are dead - Game Over");

    }
    $("#instructions-2").html("");
    $("#instructions-3").html("");
    $("#section-2").html("");
    $("#section-3").html("");
    isGameActive = false;

}




// Build the buttons
function buildButton(id, character) {

    // create the button
    var playerButton = $("<button>");
    playerButton.attr("id", id);
    playerButton.attr("class", "play-button play-button-red");

    // create the image of the button
    var playerImage = $("<img>");
    playerImage.attr("src", character.image);
    playerImage.attr("alt", character.characterName);
    playerImage.attr("class", character.color);
    playerImage.attr("id", character.id);

    var playerText = $("<p>");
    playerText.attr("id", "ptext" + id);
    playerText.html("HP: " + character.healthPoint);

    playerButton.append(playerImage);
    playerButton.append(playerText);

    return playerButton;

}

// returns the number of enemies still alive.
function numberOFEnemiesRemainingToFight() {
    var NumOfEnemiesRemaining = 0;

    for (var i = 0; i < characters.length; i++) {
        if (characters[i].id != humanPlayer.id) {
            if (characters[i].isAlive) {
                NumOfEnemiesRemaining++;
            }
        }
    }

    return NumOfEnemiesRemaining;
}


