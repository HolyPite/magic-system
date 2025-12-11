# Structure des Données : Cercle Magique (JSON)

Ce document définit le schéma JSON utilisé pour stocker et générer les cercles magiques.

## Schéma Global

Un sort est un objet JSON contenant 5 clés principales :

```json
{
  "id": "identifiant_unique_snake_case",
  "nom": "Nom Lisible",
  "description": "Description courte",
  "source": { ... },
  "flux": { ... },
  "sequence_assemblage": [ ... ],
  "perimetre": { ... }
}
```

---

## Détail des Champs

### 1. Source (`source`)
L'origine de l'énergie.
*   `type`: `<String>` Enum : `"ACTIVATOR"`, `"OBJECT"`, `"AMBIENT"`
*   `symbole`: `<String>` Le nom ou caractère du symbole (ex: "YOD").

### 2. Flux (`flux`)
La méthode de transmission.
*   `type`: `<String>` Enum :
    *   `"HORAIRE (AUTO)"` : Déclenchement immédiat.
    *   `"ANTI_HORAIRE (MANUEL/DIFFERE)"` : Nécessite armement + activation.
*   `cout_mana`: `<Integer>` (Seulement pour HORAIRE)
*   `cout_armement`: `<Integer>` (Seulement pour ANTI_HORAIRE)
*   `cout_activation`: `<Integer>` (Seulement pour ANTI_HORAIRE)

### 3. Séquence d'Assemblage (`sequence_assemblage`)
Liste ordonnée des cercles orbitaux. L'ordre dans la liste définit l'ordre de combinaison ("Puis").
Chaque élément de la liste est un objet :

*   `position`: `<Integer>` Index (1, 2, 3...)
*   `type`: `<String>` Enum : `"ELEMENT_SIMPLE"`, `"INTRICATION"`
*   `base`: `<String>` Élément Principal (Celui qui recoit). Enum Éléments.
*   `modificateur`: `<String>` (Optionnel, si INTRICATION). Élément inclus/autour.
*   `resultat`: `<String>` Description de l'effet obtenu (ex: "Vapeur", "Boue").

> **Enum Éléments :** `FEU`, `EAU`, `AIR`, `TERRE`, `LUMIERE`, `TENEBRE`.

### 4. Périmètre (`perimetre`)
La clôture du sort.
*   `runes`: `<Array<Object>>` Liste des modificateurs.
    *   `rune`: `<String>` Nom de la Méta-Rune (ex: "PERSISTE").
    *   `arg`: `<Integer>` (Optionnel) Valeur numérique associée (ex: 50).
*   `scellement`: `<Boolean>` `true` si présence de runes (nécessite un cercle double), `false` sinon.
