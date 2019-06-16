// character: "Obi-Wan",
// healthPoint: 120,
// baseAttackPoint: 6,
// currentAttackPoint: 6,
// counterAttackPoints: 25,
// image: "../assets/images/obiwan.PNG",
// color: "play-button-green",

var characters = [obiwan, luke, sith, maul];


console.log(characters);

var humanPlayer;
var AIPlayer;

function initSetup() {
    console.log("Build player section");
    for (var i=0; i< characters.length; i++){
        var characterButton = buildButton(i, characters[i]);
        $("#section-1").append(characterButton);
    }
}

function selectHumanPlayer() {
    return;
}

function selectAIPlayer() {
    return;
}


/* game actions */
function run() {
    initSetup();

}

/* player actions */
function attack(player1, player2) {
    return;
}

function isPlayerDead() {
    return;
}

console.log(obiwan);



function attack() {
    return;
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
    playerText.html("Health Point: " + character.healthPoint +
        " | Attack Point: " + character.currentAttackPoint +
        " | Counter Point: " + character.counterAttackPoints);

    playerButton.append(playerImage);
    playerButton.append(playerText);
    
    return playerButton;

}



// *********************************************** //

// *********************************************** //


// var obiwan = {
//     character: "Obi-Wan",
//     healthPoint: 120,
//     baseAttackPoint: 6,
//     currentAttackPoint: 6,
//     counterAttackPoints: 25,
//     image: "../assets/images/obiwan.PNG",
//     color: "play-button-green",

// };

// var luke = {
//     characterName: "luke",
//     healthPoint: 100,
//     baseAttackPoint: 5,
//     currentAttackPoint: 5,
//     counterAttackPoints: 20,
//     image: "../assets/images/luke.PNG",
//     color: "play-button-green",
// };

// var sith = {
//     characterName: "Darth Sidious",
//     healthPoint: 150,
//     baseAttackPoint: 8,
//     currentAttackPoint: 8,
//     counterAttackPoints: 25,
//     image: "../assets/images/sith.PNG",
//     color: "play-button-red",

// };

// var maul = {
//     characterName: "Darth Maul",
//     healthPoint: 180,
//     baseAttackPoint: 9,
//     currentAttackPoint: 9,
//     counterAttackPoints: 30,
//     image: "../assets/images/maul.PNG",
//     color: "play-button-red",

// };

// /******************************/