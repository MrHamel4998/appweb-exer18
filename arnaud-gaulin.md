# Revue de code - Arnaud Gaulin

::: info Synthèse rapide
Le code est globalement lisible et bien découpé. La conformité est bonne dans l'ensemble, avec quelques points techniques à corriger.
:::

## 1) Lisibilité et clarté

### Evaluation

- Le code est lisible et la séparation par composants est claire (`ProductForm`, `ProductList`, `ProductItem`, `exportCSV`).
- Les noms de fonctions/métiers sont explicites (`handleProductFormSubmit`, `duplicateProduct`, `exportToCSV`).
- La complexité reste moderée, mais certains composants concentrent beaucoup de logique et d'etat.

::: tip Points forts

- Bonne décomposition par responsabilité.
- Typage TypeScript present sur les interfaces et événements.
- Flux utilisateur clair (ajout, modification, duplication, suppression).
  :::

::: warning Points qui nuisent à la lisibilité

- Balises `<body>` utilisées dans des composants Vue: préférer les balises `<div>` ou `<section>`.
- Type `price` en `string`: génère des conversions répétitives.
- Validation du formulaire dans un seul bloc.
  :::

### Exemple d'amélioration (robustesse + clarté)

Code actuel:

```ts
function deleteProduct(product: Product): void {
  const index = products.value.findIndex(
    (products) => products.id === product.id,
  );
  products.value.splice(index, 1);
}
```

Version recommandée:

```ts
function deleteProduct(product: Product): void {
  const index = products.value.findIndex(
    (products) => products.id === product.id,
  );
  if (index !== -1) { // Vérification de l'existence du produit
    products.value.splice(index, 1);
  }
}
```

## 2) Bonnes pratiques de programmation

### Evaluation

- Le projet applique déjà plusieurs bonnes pratiques Vue/TS.
- Il reste des améliorations de fiabilité, testabilité et uniformité de style.

::: tip Bonnes pratiques deja presentes

- `defineEmits` type.
- `computed` pour la logique dérivée (`stockClass`, `criticalStock`).
- Service dédié pour l'export CSV.
- Validation des données avant émission.
  :::

::: warning Écarts à corriger

- `watch(..., { deep: true })` à vérifier: potentiellement coûteux si non nécessaire.
- Validation centralisée dans une seule fonction: difficile à tester.
- Incohérences de formatage (ponctuation/style).
  :::

### Exemple d'amélioration (modèle de données)

Code actuel:
```ts
export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
}
```
Version recommandée:
```ts
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number; // Type plus approprié pour les prix
  stock: number;
}
```

## 3) Normes et standards

### Evaluation

- Conformité partielle aux standards Vue + TypeScript.
- Architecture correcte, mais certaines conventions HTML/qualité de code sont à resserrer.

::: details Exemple concret de standard Vue (template)

```vue
<!-- À éviter dans un composant -->
<body>
  ...
</body>

<!-- Recommandé -->
<section class="container mt-4">
  ...
</section>
```

:::

## Améliorations possibles (spécial VitePress)

Amelioration                                                     | Impact                                   |
---------------------------------------------------------------- | ---------------------------------------- |
Sécuriser `deleteProduct` avec test `index !== -1`               | Évite les suppressions involontaires     |
Remplacer `price: string` par `price: number`                    | Type safety + logique métier plus propre |
Remplacer `<body>` par `<section>/<div>` dans les composants     | Conformité HTML/Vue                      |
Ajouter ESLint + Prettier                                        | Standardisation du style                 |
Extraire les règles de validation dans des fonctions utilitaires | Lisibilité + tests                       |
Ajouter tests unitaires (validation + services)                  | Fiabilité globale                        |

::: info Proposition de plan court

1. Correctifs rapides: suppression robuste + balises HTML composants.
2. Refactor types: migration `price` vers `number`.
3. Qualité continue: ESLint/Prettier + premiers tests unitaires.
   :::

## Conclusion

::: tip Verdict final
Le code est bon : il est fonctionnel, compréhensible et correctement structuré. Avec les correctifs ciblés ci-dessus, il peut rapidement monter en qualité "pro" sans grosse modification.
:::
