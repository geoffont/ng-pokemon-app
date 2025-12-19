import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';
import { BattleService } from '../battle.service';
import { BattleState, BattleStatistics } from '../battle.models';

@Component({
  selector: 'app-battle-arena',
  templateUrl: './battle-arena.component.html',
  styleUrls: ['./battle-arena.component.css']
})
export class BattleArenaComponent implements OnInit {
  @ViewChild('historyContainer') historyContainer: ElementRef | undefined;

  battleState: BattleState | null = null;
  pokemon1: Pokemon | null = null;
  pokemon2: Pokemon | null = null;
  statistics: BattleStatistics | null = null;
  battleStartTime: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService,
    private battleService: BattleService
  ) {}

  ngOnInit(): void {
    const p1Id = this.route.snapshot.queryParamMap.get('p1');
    const p2Id = this.route.snapshot.queryParamMap.get('p2');

    if (!p1Id || !p2Id) {
      this.router.navigate(['/battle/selection']);
      return;
    }

    this.pokemon1 = this.pokemonService.getPokemonById(+p1Id) || null;
    this.pokemon2 = this.pokemonService.getPokemonById(+p2Id) || null;

    if (!this.pokemon1 || !this.pokemon2 || this.pokemon1.id === this.pokemon2.id) {
      this.router.navigate(['/battle/selection']);
      return;
    }

    this.battleState = this.battleService.initializeBattle(this.pokemon1, this.pokemon2);
    this.battleStartTime = Date.now();
  }

  handleAttack(attackerIndex: 1 | 2): void {
    if (!this.battleState || this.battleState.isComplete) {
      return;
    }

    this.battleState = this.battleService.executeAttack(this.battleState, attackerIndex);

    if (this.battleState.isComplete) {
      this.statistics = this.battleService.getBattleStatistics(this.battleState);
    }

    setTimeout(() => {
      this.scrollHistoryToBottom();
    }, 100);
  }

  getHpPercentage(index: 1 | 2): number {
    if (!this.battleState) return 0;

    const pokemon = index === 1 ? this.battleState.pokemon1 : this.battleState.pokemon2;
    return (pokemon.currentHp / pokemon.maxHp) * 100;
  }

  getHpBarColor(index: 1 | 2): string {
    const percentage = this.getHpPercentage(index);

    if (percentage > 66) {
      return 'green';
    } else if (percentage > 33) {
      return 'yellow darken-2';
    } else {
      return 'red';
    }
  }

  getEffectivenessText(multiplier: number): string {
    return this.battleService.getEffectivenessText(multiplier);
  }

  getEffectivenessClass(multiplier: number): string {
    if (multiplier === 0) {
      return 'grey-text';
    }
    if (multiplier < 1) {
      return 'orange-text';
    }
    if (multiplier > 1) {
      return 'red-text text-darken-2';
    }
    return '';
  }

  rematch(): void {
    if (!this.pokemon1 || !this.pokemon2) return;

    this.battleState = this.battleService.initializeBattle(this.pokemon1, this.pokemon2);
    this.statistics = null;
    this.battleStartTime = Date.now();
  }

  goBack(): void {
    this.router.navigate(['/battle/selection']);
  }

  goToList(): void {
    this.router.navigate(['/pokemons']);
  }

  private scrollHistoryToBottom(): void {
    if (this.historyContainer) {
      const element = this.historyContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
    }
  }

  trackByTurn(index: number, item: any): number {
    return item.turn;
  }
}
