# 🎮 Pokémon Cards App

Une application web Angular pour gérer une collection de cartes Pokémon avec intégration de l'API PokeAPI.

## ✨ Fonctionnalités

### 🔍 Gestion des Pokémon
- **Liste des Pokémon** : Affichage de tous les Pokémon avec cartes stylisées
- **Détail d'un Pokémon** : Voir les informations complètes (HP, CP, types, etc.)
- **Édition** : Modifier les statistiques et types d'un Pokémon existant
- **Suppression** : Retirer un Pokémon de la collection

### ➕ Ajout de Pokémon
- **Formulaire manuel** : Créer un Pokémon personnalisé
- **Recherche PokeAPI** : Ajouter des Pokémon officiels depuis l'API PokeAPI
- **Autocomplétion** : Suggestions de noms lors de la recherche
- **Aperçu avant ajout** : Voir les détails du Pokémon avant de l'ajouter

### 🎨 Interface utilisateur
- **Design responsive** : Compatible mobile et desktop
- **Cartes interactives** : Effets hover et animations
- **Navigation intuitive** : Routage Angular avec URLs propres
- **Validation de formulaires** : Vérification des données saisies
- **Types colorés** : Chaque type Pokémon a sa couleur distinctive

## 🛠️ Technologies utilisées

- **Angular 16** : Framework principal
- **TypeScript** : Langage de programmation
- **RxJS** : Gestion des observables et requêtes HTTP
- **Angular Router** : Navigation entre les pages
- **Angular Forms** : Formulaires réactifs et validation
- **HttpClient** : Communication avec l'API PokeAPI
- **CSS3** : Styles et animations

## 🚀 Installation et démarrage

### Prérequis
- Node.js (v16 ou supérieur)
- npm ou yarn
- Angular CLI

### Installation
```bash
# Cloner le repository
git clone https://github.com/geoffont/ng-pokemon-app.git
cd ng-pokemon-app

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm start
```

L'application sera accessible à l'adresse : `http://localhost:4200`

### Commandes disponibles
```bash
# Démarrage du serveur de développement
npm start

# Build de production
npm run build

# Build en mode watch
npm run watch
```

## 📁 Structure du projet

```
src/
├── app/
│   ├── pokemon/                    # Module Pokémon
│   │   ├── list-pokemon/           # Composant liste
│   │   ├── detail-pokemon/         # Composant détail
│   │   ├── edit-pokemon/           # Composant édition
│   │   ├── add-pokemon/            # Composant ajout manuel
│   │   ├── pokemon-search/         # Composant recherche PokeAPI
│   │   ├── pokemon-form/           # Composant formulaire partagé
│   │   ├── pokemon.service.ts      # Service de gestion des Pokémon
│   │   ├── pokeapi.service.ts      # Service d'intégration PokeAPI
│   │   ├── pokemon.ts              # Modèle de données
│   │   ├── mock-pokemon-list.ts    # Données de test
│   │   ├── pokemon-type-color.pipe.ts  # Pipe pour les couleurs
│   │   └── border-card.directive.ts    # Directive pour les cartes
│   ├── page-not-found/             # Page 404
│   ├── app-routing.module.ts       # Configuration des routes
│   └── app.module.ts               # Module principal
├── assets/                         # Ressources statiques
└── styles.css                      # Styles globaux
```

## 🎯 Fonctionnalités détaillées

### Navigation
- `/pokemons` : Liste de tous les Pokémon
- `/pokemons/:id` : Détail d'un Pokémon spécifique
- `/pokemons/edit/:id` : Édition d'un Pokémon
- `/pokemons/add` : Ajout manuel d'un Pokémon
- `/pokemons/search` : Recherche et ajout depuis PokeAPI

### Intégration PokeAPI
L'application utilise l'API gratuite [PokeAPI](https://pokeapi.co/) pour :
- Récupérer les données officielles des Pokémon
- Obtenir les images haute qualité
- Mapper les types anglais vers le français
- Convertir les statistiques au format de l'application

### Validation des formulaires
- **Nom** : 1-25 caractères alphanumériques
- **HP** : 0-999 points de vie
- **CP** : 0-99 points de combat
- **Types** : 1-3 types maximum parmi la liste disponible

## 🎨 Types Pokémon supportés

| Type      | Couleur    | Type      | Couleur    |
|-----------|------------|-----------|------------|
| Plante    | Vert       | Poison    | Violet     |
| Feu       | Rouge      | Fée       | Rose       |
| Eau       | Bleu       | Vol       | Cyan       |
| Insecte   | Vert foncé | Combat    | Rouge foncé|
| Normal    | Gris       | Psy       | Rose foncé |
| Electrik  | Jaune      | Roche     | Marron     |

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🔗 Liens utiles

- [Angular Documentation](https://angular.io/docs)
- [PokeAPI Documentation](https://pokeapi.co/docs/v2)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [RxJS Documentation](https://rxjs.dev/)

---

Développé avec ❤️ et Angular
