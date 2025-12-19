import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { BattleState, BattlePokemon, BattleAction, BattleStatistics } from './battle.models';

@Injectable()
export class BattleService {
  // Matrice complète de type effectiveness (18 types français)
  private readonly TYPE_CHART: { [key: string]: { [key: string]: number } } = {
    'Plante': {
      'Eau': 2, 'Sol': 2, 'Roche': 2,
      'Feu': 0.5, 'Plante': 0.5, 'Poison': 0.5, 'Vol': 0.5,
      'Insecte': 0.5, 'Dragon': 0.5, 'Acier': 0.5
    },
    'Feu': {
      'Plante': 2, 'Glace': 2, 'Insecte': 2, 'Acier': 2,
      'Feu': 0.5, 'Eau': 0.5, 'Roche': 0.5, 'Dragon': 0.5
    },
    'Eau': {
      'Feu': 2, 'Sol': 2, 'Roche': 2,
      'Eau': 0.5, 'Plante': 0.5, 'Dragon': 0.5
    },
    'Electrik': {
      'Eau': 2, 'Vol': 2,
      'Plante': 0.5, 'Electrik': 0.5, 'Dragon': 0.5,
      'Sol': 0
    },
    'Insecte': {
      'Plante': 2, 'Psy': 2, 'Ténèbres': 2,
      'Feu': 0.5, 'Combat': 0.5, 'Poison': 0.5, 'Vol': 0.5,
      'Spectre': 0.5, 'Acier': 0.5, 'Fée': 0.5
    },
    'Normal': {
      'Roche': 0.5, 'Acier': 0.5,
      'Spectre': 0
    },
    'Poison': {
      'Plante': 2, 'Fée': 2,
      'Poison': 0.5, 'Sol': 0.5, 'Roche': 0.5, 'Spectre': 0.5,
      'Acier': 0
    },
    'Vol': {
      'Plante': 2, 'Combat': 2, 'Insecte': 2,
      'Electrik': 0.5, 'Roche': 0.5, 'Acier': 0.5
    },
    'Combat': {
      'Normal': 2, 'Glace': 2, 'Roche': 2, 'Ténèbres': 2, 'Acier': 2,
      'Poison': 0.5, 'Vol': 0.5, 'Psy': 0.5, 'Insecte': 0.5, 'Fée': 0.5,
      'Spectre': 0
    },
    'Psy': {
      'Combat': 2, 'Poison': 2,
      'Psy': 0.5, 'Acier': 0.5,
      'Ténèbres': 0
    },
    'Roche': {
      'Feu': 2, 'Glace': 2, 'Vol': 2, 'Insecte': 2,
      'Combat': 0.5, 'Sol': 0.5, 'Acier': 0.5
    },
    'Sol': {
      'Feu': 2, 'Electrik': 2, 'Poison': 2, 'Roche': 2, 'Acier': 2,
      'Plante': 0.5, 'Insecte': 0.5,
      'Vol': 0
    },
    'Glace': {
      'Plante': 2, 'Sol': 2, 'Vol': 2, 'Dragon': 2,
      'Feu': 0.5, 'Eau': 0.5, 'Glace': 0.5, 'Acier': 0.5
    },
    'Acier': {
      'Glace': 2, 'Roche': 2, 'Fée': 2,
      'Feu': 0.5, 'Eau': 0.5, 'Electrik': 0.5, 'Acier': 0.5
    },
    'Dragon': {
      'Dragon': 2,
      'Acier': 0.5,
      'Fée': 0
    },
    'Ténèbres': {
      'Psy': 2, 'Spectre': 2,
      'Combat': 0.5, 'Ténèbres': 0.5, 'Fée': 0.5
    },
    'Fée': {
      'Combat': 2, 'Dragon': 2, 'Ténèbres': 2,
      'Feu': 0.5, 'Poison': 0.5, 'Acier': 0.5
    },
    'Spectre': {
      'Psy': 2, 'Spectre': 2,
      'Ténèbres': 0.5,
      'Normal': 0
    }
  };

  initializeBattle(pokemon1: Pokemon, pokemon2: Pokemon): BattleState {
    // Assurer HP minimum de 1
    const p1Hp = Math.max(pokemon1.hp, 1);
    const p2Hp = Math.max(pokemon2.hp, 1);

    return {
      pokemon1: {
        pokemon: pokemon1,
        currentHp: p1Hp,
        maxHp: p1Hp,
        isDefeated: false
      },
      pokemon2: {
        pokemon: pokemon2,
        currentHp: p2Hp,
        maxHp: p2Hp,
        isDefeated: false
      },
      currentTurn: 0,
      history: [],
      winner: null,
      isComplete: false
    };
  }

  executeAttack(state: BattleState, attackerIndex: 1 | 2): BattleState {
    if (state.isComplete) {
      return state;
    }

    const attacker = attackerIndex === 1 ? state.pokemon1 : state.pokemon2;
    const defender = attackerIndex === 1 ? state.pokemon2 : state.pokemon1;

    const { damage, effectiveness } = this.calculateDamage(
      attacker.pokemon,
      defender.pokemon,
      attacker.currentHp
    );

    // Appliquer les dégâts
    const newDefenderHp = Math.max(0, defender.currentHp - damage);
    defender.currentHp = newDefenderHp;
    defender.isDefeated = newDefenderHp === 0;

    // Incrémenter le tour
    state.currentTurn++;

    // Ajouter l'action à l'historique
    const action: BattleAction = {
      turn: state.currentTurn,
      attackerName: attacker.pokemon.name,
      defenderName: defender.pokemon.name,
      damage: damage,
      effectiveness: effectiveness,
      attackerHpRemaining: attacker.currentHp,
      defenderHpRemaining: defender.currentHp,
      timestamp: new Date()
    };
    state.history.push(action);

    // Vérifier si le combat est terminé
    this.checkBattleComplete(state);

    return state;
  }

  calculateDamage(
    attacker: Pokemon,
    defender: Pokemon,
    attackerCurrentHp: number
  ): { damage: number; effectiveness: number } {
    // Dégâts de base basés sur CP et HP actuel
    const baseDamage = attacker.cp * (attackerCurrentHp / Math.max(attacker.hp, 1));

    // Calculer le multiplicateur de type
    const typeMultiplier = this.getTypeEffectiveness(attacker.types, defender.types);

    // Ajouter un facteur aléatoire (±15%)
    const randomFactor = 0.85 + Math.random() * 0.3;

    // Calculer les dégâts finaux
    let finalDamage = Math.floor(baseDamage * typeMultiplier * randomFactor);

    // Minimum 1 dégât si effectiveness > 0
    if (finalDamage < 1 && typeMultiplier > 0) {
      finalDamage = 1;
    }

    // Cap aux HP restants du défenseur
    finalDamage = Math.min(finalDamage, Math.max(defender.hp, 1));

    return {
      damage: finalDamage,
      effectiveness: typeMultiplier
    };
  }

  getTypeEffectiveness(attackerTypes: string[], defenderTypes: string[]): number {
    let totalMultiplier = 1;

    for (const attackType of attackerTypes) {
      for (const defendType of defenderTypes) {
        const multiplier = this.getSingleTypeEffectiveness(attackType, defendType);
        totalMultiplier *= multiplier;
      }
    }

    return totalMultiplier;
  }

  private getSingleTypeEffectiveness(attackType: string, defendType: string): number {
    if (!this.TYPE_CHART[attackType]) {
      return 1;
    }
    return this.TYPE_CHART[attackType][defendType] !== undefined
      ? this.TYPE_CHART[attackType][defendType]
      : 1;
  }

  checkBattleComplete(state: BattleState): boolean {
    if (state.pokemon1.isDefeated) {
      state.winner = state.pokemon2;
      state.isComplete = true;
      return true;
    }
    if (state.pokemon2.isDefeated) {
      state.winner = state.pokemon1;
      state.isComplete = true;
      return true;
    }
    return false;
  }

  getBattleStatistics(state: BattleState): BattleStatistics {
    const pokemon1Damage = state.history
      .filter(action => action.attackerName === state.pokemon1.pokemon.name)
      .reduce((sum, action) => sum + action.damage, 0);

    const pokemon2Damage = state.history
      .filter(action => action.attackerName === state.pokemon2.pokemon.name)
      .reduce((sum, action) => sum + action.damage, 0);

    const totalDamage = pokemon1Damage + pokemon2Damage;

    const battleDuration = state.history.length > 0
      ? state.history[state.history.length - 1].timestamp.getTime() - state.history[0].timestamp.getTime()
      : 0;

    return {
      totalTurns: state.currentTurn,
      totalDamageDealt: totalDamage,
      pokemon1TotalDamage: pokemon1Damage,
      pokemon2TotalDamage: pokemon2Damage,
      winner: state.winner ? state.winner.pokemon.name : null,
      battleDuration: battleDuration
    };
  }

  getEffectivenessText(multiplier: number): string {
    if (multiplier === 0) {
      return 'Aucun effet...';
    }
    if (multiplier < 1) {
      return 'Peu efficace...';
    }
    if (multiplier === 1) {
      return 'Efficace';
    }
    return 'Super efficace!';
  }
}
