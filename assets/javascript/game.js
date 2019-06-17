

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


    if (isGameActive) {

        if (!isHumanPlayerSelected) {
            humanPlayer = characters[buttonClicked.id];
            console.log("Human Player is:")
            console.log(humanPlayer);
            isHumanPlayerSelected = true;

            $("#section-1").html(buttonClicked);
            initSetupSection2();

            $("#instructions-1").html("You are: " + humanPlayer.characterName);
            $("#instructions-2").html("Select who you want to fight");



        } else if (!isAIPlayerSelected) {
            aiPlayer = characters[buttonClicked.id];
            console.log("AI Player is:")
            console.log(aiPlayer);
            isAIPlayerSelected = true;

            $("#section-3").html(buttonClicked);
            $("#instructions-2").html("These are the other enemies to fight");
            $("#instructions-3").html("You are now fighting: " + aiPlayer.characterName);
            readyToFight = true;


        }
    }
}

/* game actions */
function run() {
    initSetupSection1();
}

/* player actions */
function fight() {

    if (readyToFight) {
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


        if (humanPlayer.healthPoint <= 0) {
            humanPlayer.isAlive = false;
        }

        if (aiPlayer.healthPoint <= 0) {

            aiPlayer.isAlive = false;
            readyToFight = false;
            isAIPlayerSelected = false;

            var msg = aiPlayer.characterName+" is dead. Select the next enemy!";    
            $("#instructions-3").html(msg);
            $("#ptext" + aiPlayer.id).html(msg);

        }
    }
}

function checkIfThereAreEnemiesRemainingToFight(){
    var enemiesRemaining =false;

    for (var i=0; i<characters.length; i++){
        if (characters[i].id != humanPlayer.id){
            if (characters[i].isAlive){
                enemiesRemaining = true;
            }
        }
    }

    return enemiesRemaining;
}

function isPlayerDead(player) {

}

function attack(player1, player2) {

}

function buildButton(id, character) {

    var playerButton = $("<button>");
    playerButton.attr("id", id);
    playerButton.attr("class", "play-button play-button-red");

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


