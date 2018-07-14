class Pokemon {
  constructor(name, move, hp, damage, favMove, type = "Normal") {
    this.name = name;
    this.move = move;
    this.hp = hp;
    this.damage = damage;
    this.favMove = favMove;
    this.type = type;
  }
}

class Trainer {
  constructor(name, pokeballs) {
    this.name = name;
    this.pokeballs = [];
    this.catch = Trainer.prototype.catch;
    this.limit = 6;
  }
  catch(pokemon) {
    if (this.pokeballs.length < this.limit) {
      this.pokeballs.push(pokemon);
    }
  }
}
module.exports = { Pokemon, Trainer };
