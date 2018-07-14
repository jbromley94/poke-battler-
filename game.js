let { Trainer, Pokemon } = require("../CORE-pokemon-battler/pokemenNtrainers");
let { Battle } = require("../CORE-pokemon-battler/battle");
let inquirer = require("inquirer");
let player = require("play-sound")((opts = {}));
let audio = player.play("Overture.mp3");
const opponent = new Trainer("Sam");

const oppMagikarp = new Pokemon(
  "Magikarp",
  ["Flail"],
  100,
  5,
  "Splash",
  "Water"
);
const oppMewtwo = new Pokemon("Mewtwo", ["Psychic"], 750, 75, "Psychic");
opponent.catch(oppMewtwo);
const Shellder = new Pokemon(
  "Shellder",
  ["BubbleBeam", "Surf", "Self-Destruct", "Tackle"],
  120,
  45,
  "Self-Destruct",
  "Water"
);
const Gyarados = new Pokemon(
  "Red Gyarados",
  ["DragonRage", "Hydro Pump", "Double Team", "Thunder"],
  330,
  70,
  "Dragon Rage",
  "Water"
);
const Tangela = new Pokemon(
  "Tangela",
  ["Vine Whip", "Absorb", "SweetScent", "Tackle"],
  125,
  50,
  "Vine Whip",
  "Grass"
);
const Snorlax = new Pokemon(
  "Snorlax",
  ["Body Slam", "Hyper Beam", "Rest", "Tackle"],
  200,
  50,
  "Rest"
);
const Tauros = new Pokemon(
  "Tauros",
  ["Take Down", "Horn Drill", "Leer", "Skull Bash"],
  180,
  45,
  "Take Down"
);
const Magikarp = new Pokemon(
  "Magikarp",
  ["Flail", "Bubble", "Splash", "Tackle"],
  100,
  5,
  "Splash",
  "Water"
);
const Psyduck = new Pokemon(
  "Psyduck",
  ["Scratch", "Water Gun", "Tail Whip", "Tackle"],
  130,
  10,
  "Confusion",
  "Water"
);
const Charmander = new Pokemon(
  "Charmander",
  ["Scratch", "Ember", "Leer", "Tackle"],
  120,
  45,
  "Ember",
  "Fire"
);
const Magmar = new Pokemon(
  "Magmar",
  ["Fire Punch", "Fire Blast", "SmokeScreen", "Smog"],
  120,
  45,
  "Ember",
  "Fire"
);
const Bulbasaur = new Pokemon(
  "Bulbasaur",
  ["Scratch", "Razor Leaf", "Growl", "Tackle"],
  120,
  45,
  "Vine Whip",
  "Grass"
);
const Squirtle = new Pokemon(
  "Squirtle",
  ["Bite", "Hydro Pump", "Leer", "Water Gun"],
  120,
  45,
  "Vine Whip",
  "Water"
);
let wildPokemon = {
  Tangela,
  Psyduck,
  Magikarp,
  Charmander,
  Snorlax,
  Tauros,
  Bulbasaur,
  Squirtle,
  Magmar,
  Gyarados,
  Shellder
};
let arrayPokemon = [
  "Tangela",
  "Psyduck",
  "Magikarp",
  "Shellder",
  "Charmander",
  "Snorlax",
  "Tauros",
  "Bulbasaur",
  "Squirtle",
  "Magmar",
  "I have enough Pokemon"
];

function personalTrainer() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your name, young poke adventurer",
        name: "firstName"
      }
    ])
    .then(function(answers) {
      const userTrainer = new Trainer(answers.firstName);
      choosePokemon(userTrainer);
    });
}

function choosePokemon(userTrainer) {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Catch your pokemons",
        choices: arrayPokemon,
        name: "pokemonChoice"
      }
    ])
    .then(function(answers) {
      if (answers.pokemonChoice !== "I have enough Pokemon") {
        userTrainer.catch(wildPokemon[answers.pokemonChoice]);
        const userChoice = arrayPokemon.indexOf(answers.pokemonChoice);
        console.log("You have Chosen " + answers.pokemonChoice);
        arrayPokemon.splice(userChoice, 1);
        if (userTrainer.pokeballs.length === 6) {
          console.log("DON'T BE GREEDY");
          return hurtEachOther(userTrainer);
        }
        choosePokemon(userTrainer);
      } else hurtEachOther(userTrainer);
    });
}

function hurtEachOther(userTrainer) {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Prepare for a battle to the death!",
        choices: ["Battle", "You have to battle"],
        name: "fightTime"
      },
      {
        type: "list",
        message: "Pick a move you slave driver",
        choices: userTrainer.pokeballs[0].move,
        name: "chosenMove"
      }
    ])
    .then(function(answers) {
      const pickedWord = answers.chosenMove;
      const pickedNum = userTrainer.pokeballs[0].move.indexOf(pickedWord);

      const newRound = new Battle(
        userTrainer.pokeballs[0],
        opponent.pokeballs[0]
      );
      newRound.fight(
        userTrainer.pokeballs[0],
        opponent.pokeballs[0],
        pickedNum,
        userTrainer,
        audio,
        Gyarados
      );
      if (userTrainer.pokeballs.length === 0) {
        return (
          console.log("Thanks for Playing, better luck next time") +
          audio.kill()
        );
      }
      if (userTrainer.pokeballs[0].hp > 0 && opponent.pokeballs[0].hp > 0) {
        hurtEachOther(userTrainer);
      }
    });
}

personalTrainer();

module.exports = audio;
