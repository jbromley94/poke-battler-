class Battle {
  constructor(pokemon1, pokemon2) {
    this.flag = 0;
    this.ourMultiplier = 1;
    this.oppMultiplier = 1;
  }
  fight(pokemon1, pokemon2, moveNum, userTrainer, audio, Gyarados) {
    console.log("Pokemon bloodlust is high");
    this.ourMultiplier = 1;
    this.oppMultiplier = 1;

    const staticDamage = pokemon1.damage;

    if (moveNum === 1) {
      pokemon1.damage += 10;
    }
    if (moveNum === 2) {
      pokemon1.damage = 0;
    }
    if (moveNum === 3) {
      pokemon1.damage *= 0.5;
    }
    if (
      (pokemon1.type === "Grass" && pokemon2.type === "Water") ||
      (pokemon1.type === "Fire" && pokemon2.type === "Grass") ||
      (pokemon1.type === "Water" && pokemon2.type === "Fire")
    ) {
      this.ourMultiplier *= 1.25;
      this.oppMultiplier = 0.75;
      console.log(
        `YES!${pokemon1.name} is strong against ${
          pokemon2.name
        }! BREAK IT'S FACE!`
      );
    }
    if (
      (pokemon2.type === "Grass" && pokemon1.type === "Water") ||
      (pokemon2.type === "Fire" && pokemon1.type === "Grass") ||
      (pokemon2.type === "Water" && pokemon1.type === "Fire")
    ) {
      this.oppMultiplier *= 1.25;
      this.ourMultiplier = 0.75;
      console.log(
        `GOOD GOD!${pokemon2.name} is strong against ${
          pokemon1.name
        }! WATCH OUT!`
      );
    }
    const num = Math.floor(Math.random() * 5 + 1);
    if (num === 5) {
      this.ourMultiplier *= 3;
      console.log(
        `CRITICAL HIT!!!! Do them in, bash their skull, spill it's blood!`
      );
    }
    if (this.flag === 0 && num !== 4) {
      
      pokemon2.hp = pokemon2.hp - pokemon1.damage * this.ourMultiplier;
      console.log(
        `Your ${pokemon1.name} used ${
          pokemon1.move[moveNum]
        } doing ${pokemon1.damage * this.ourMultiplier} damage`
      );
      if (pokemon1.move[moveNum] === "Rest") {
        pokemon1.hp += 70;
        console.log(`However Snorlax is healthy again`);
      }
      if (pokemon1.move[moveNum] === "Absorb") {
        pokemon1.hp += (pokemon1.damage * this.ourMultiplier) / 2;
        console.log(
          `Tangela drained ${(pokemon1.damage * this.ourMultiplier) /
            2} health from ${pokemon2.name}`
        );
      }
      if (pokemon1.move[moveNum] === "Self-Destruct") {
        pokemon1.hp += 0;
        pokemon2.hp = pokemon2.hp*0.1
        console.log(
          `Shellder blew itself up and left Mewtwo on 10 percent health!`
        );
      }
      if (pokemon2.hp <= 0)
        return (
          console.log(
            "You have destroyed your opponent! STEAL THEIR MONEY AND RUN!"
          ) + audio.kill()
        );
      pokemon1.damage = staticDamage;
      console.log(pokemon2);

      this.flag++;
    }
    if (num === 4) {
      console.log(`OH OH! You missed! Train harder.`);
      this.flag++;
    } if (pokemon1.name === "Magikarp" && num === 2) {
      console.log(`Holy Smokes!!! Magikarp is becoming the Red Gyarados!`)
      userTrainer.pokeballs[0] = Gyarados;
    }
    if (num === 1) {
      this.flag--;
      return console.log(
        `Good news for once, ${pokemon2.name} missed. Silly Pokemon.`
      );
    } else if (this.flag === 1) {
      if (num === 3) {
        this.oppMultiplier *= 3;
        console.log(`CRITICAL HIT!!!! You're pokemons limb just fell off`);
      }
      console.log(
        `Your ${pokemon1.name} has been attacked with ${
          pokemon2.move
        }, taking ${pokemon2.damage * this.oppMultiplier} damage`
      );
      pokemon1.hp = pokemon1.hp - pokemon2.damage * this.oppMultiplier;
      this.flag--;

      if (pokemon1.hp <= 0) {
        console.log("You're Pokemon has died you send out your new pokemon");
        userTrainer.pokeballs.shift();
        if (userTrainer.pokeballs.length === 0) {
          return console.log("You are rubbish, you don't deserve Pokemon!");
        }
        pokemon1 = userTrainer.pokeballs[0];
      }

      console.log(pokemon1);
    }
  }
}

module.exports = { Battle };
