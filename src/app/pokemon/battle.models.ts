import { Pokemon } from './pokemon';

export interface BattlePokemon {
  pokemon: Pokemon;
  currentHp: number;
  maxHp: number;
  isDefeated: boolean;
}

export interface BattleAction {
  turn: number;
  attackerName: string;
  defenderName: string;
  damage: number;
  effectiveness: number;
  attackerHpRemaining: number;
  defenderHpRemaining: number;
  timestamp: Date;
}

export interface BattleState {
  pokemon1: BattlePokemon;
  pokemon2: BattlePokemon;
  currentTurn: number;
  history: BattleAction[];
  winner: BattlePokemon | null;
  isComplete: boolean;
}

export interface BattleStatistics {
  totalTurns: number;
  totalDamageDealt: number;
  pokemon1TotalDamage: number;
  pokemon2TotalDamage: number;
  winner: string | null;
  battleDuration: number;
}
