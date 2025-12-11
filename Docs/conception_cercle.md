# Grimoire de Construction des Cercles Magiques

Ce document détaille les règles et la logique pour créer des cercles magiques authentiques et fonctionnels dans l'univers du jeu. Un cercle ne se dessine pas au hasard ; il suit une syntaxe rigoureuse.

---

## Étape 1 : Le Centre (La Source)

Tout sort commence par un point d'origine. C'est le cœur du cercle, l'endroit d'où l'énergie est tirée avant d'être transformée. Ce centre est toujours délimité par **un cercle unique** contenant le symbole de la source.

Il existe trois sources d'énergie possibles :

### 1. L'Activateur (La Volonté)
*   **Symbole :** `𐤉` (**Yod** - La Main / Le Bras)
*   **Concept :** Le mage ou la créature lance le sort par sa propre force vitale ou mana interne. C'est une magie active, projetée.
*   **Visuel :** Une forme dynamique (éclair/bras) au centre, symbolisant l'action directe.
*   **Usage typique :** Sorts de combat, projections immédiates, télékinésie.

### 2. L'Objet (L'Ancre)
*   **Symbole :** `𐤈` (**Tet** - La Roue / Le Bouclier)
*   **Concept :** La magie est stockée ou émane d'un objet physique (artefact, parchemin, potion). Le cercle sert souvent à libérer ou contenir cette énergie.
*   **Visuel :** Un cercle barré d'une croix (Roue), évoquant la structure et la matérialité.
*   **Usage typique :** Pièges, enchantements d'armes, sceaux de protection.

### 3. L'Ambiant (La Canalisation)
*   **Symbole :** `𐤒` (**Qoph** - L'Aiguille / Le Chas)
*   **Concept :** Le sort tire son énergie de l'environnement (lignes telluriques, chaleur ambiante, vide). C'est une magie de manipulation qui redirige ce qui existe déjà.
*   **Visuel :** Un cercle traversé par un trait vertical (Aiguille), symbolisant le flux qui traverse le cercle.
*   **Usage typique :** Rituels climatiques, régénération lente, zones d'effet durables.

---

## Étape 2 : Le Flux (La Spirale)

L'énergie quitte la source par un canal physique : **une spirale**.
Elle relie le cercle central au premier cercle orbital.

*   **Forme :** Un trait continu qui part du bord du cercle central et s'enroule pour attendre l'orbite.
*   **Sens de rotation :**
    *   **Horaire (Naturel / Auto) :** Le sort se déclenche automatiquement dès que le coût en mana est atteint.
        *   *Usage :* Sorts instantanés, projectiles classiques.
    *   **Anti-horaire (Différé / Manuel) :** Le sort doit être "armé" (coût de base) puis nécessite une **impulsion activatrice** supplémentaire pour se déclencher.
        *   *Mécanique :* Coût de base (ex: 500mp) + Coût d'activation (ex: 40mp).
        *   *Usage :* Pièges, Rituels, Sorts en attente.

---

## Étape 3 : La Composition (Les Cercles Orbitaux)

Autour de la source orbitent des cercles contenant les **Éléments**. C'est ici que la magie prend sa "couleur" et son effet.

### Les 6 Éléments Primordiaux
Chaque élément a une forme géométrique simple :

1.  **Feu** : `Triangle pointe en HAUT` (Ascension)
2.  **Eau** : `Triangle pointe en BAS` (Chute)
3.  **Air** : `Losange` (Instabilité)
4.  **Terre** : `Carré` (Stabilité)
5.  **Lumière** : `Pentagone pointe en HAUT` (Élévation)
6.  **Ténèbres** : `Pentagone pointe en BAS` (Profondeur)

### Règles d'Assemblage

Il existe deux manières de manipuler ces éléments :

#### A. L'Intrication (Fusion) - "L'un DANS l'autre"
On place le symbole d'un élément (Le Modificateur) **à l'extérieur** du symbole d'un autre (La Base).
*   **Logique :** Le contenant (Extérieur) modifie le contenu (Intérieur).
*   **Formule :** `Base (Intérieur) + Modificateur (Extérieur) = Nouvel Effet`
*   *Exemple :* Symbole Eau (Triangle Bas) à l'intérieur du Symbole Feu (Triangle Haut) = **Vapeur** (De l'Eau chauffée par le Feu).
*   *Référence :* Voir `Magic elements.csv` pour la table des fusions.

#### B. La Combinaison (Séquence) - "L'un APRÈS l'autre"
Les cercles sont reliés en série par des lignes de flux, sans se chevaucher.
*   **Logique :** Les effets s'appliquent séquentiellement ou s'additionnent sans se mélanger.
*   **Formule :** `Effet 1 -> Effet 2`
*   *Exemple :* Cercle Terre (Création de matière) -> relié à -> Cercle Air (Propulsion) = **Projectile de Pierre**.

---

## Étape 4 : Le Périmètre (La Clôture)

Pour finaliser le sort, le cercle doit être physiquement fermé pour contenir l'énergie.

### A. Le Cercle de Clôture (Base)
La spirale (Flux) termine sa course en rejoignant ce cercle extérieur qui englobe toute la structure (Source + Orbites).
*   **Fonction :** Définit la limite physique du sort.
*   **Si aucun modificateur :** Le cercle est simple et le sort est prêt.

### B. Le Scriptorium (Runes & Modificateurs)
Si des instructions complexes sont nécessaires, on les inscrit sur **le Cercle de Clôture**.

*   **Règle d'Or :** Les runes ne doivent **JAMAIS** redonder avec la géométrie.
    *   **INTERDIT :** Effets élémentaires ou actions physiques (ex: "BRULE", "PROJETTE", "GELE"). Ces effets sont déjà gérés par les Éléments et Intrications.
    *   **AUTORISÉ :** Meta-modificateurs de paramètres (Taille, Puissance, Durée, Cible spécifique).
        *   *Exemples :* "DILATE" (Taille+), "COMPRESSE" (Taille-), "AMPLIFIE" (Puissance+), "ATTENUE" (Puissance-), "VERROUILLE".
*   **Syntaxe :** Verbes (souvent à l'impératif) passés dans le **Traducteur Phénicien**.
*   **Sceau de Scellement :** Si des runes sont présentes, il faut **ajouter un second cercle concentrique** à l'extérieur pour "fermer" l'écriture et sceller le sort.
    *   *Structure :* `[Cercle Clôture (Runes)]` entouré de `[Cercle de Scellement]`.

---

## Étape 5 : La Numération (Quantification)

Certaines runes nécessitent des précisions chiffrées (durée, taille, coût).
Pour cela, on utilise le système **Hiéroglyphique**, distinguant visuellement les nombres des instructions textuelles.

*   **1** : `𓏤` (Le Bâton)
*   **10** : `𓎆` (L'Arche / Le Pont)
*   **100** : `𓍢` (La Spirale)
*   **1000** : `𓆼` (Le Lotus)

*Syntaxe :* Les nombres s'écrivent additivement (ex: 123 = `𓍢𓎆𓎆𓏤𓏤𓏤`). Ils suivent immédiatement la rune modifiée.

---

## Annexe A : Catalogue des Méta-Runes

Seules ces runes sont autorisées sur le cercle de clôture.

| Rune (FR) | Paramètre (Unité) | Description |
| :--- | :--- | :--- |
| **PERSISTE** | Coût (Mp/sec) | Maintient le sort actif tant que la source fournit le mana. |
| **DILATE** | Rayon (Mètres) | Augmente la zone d'effet. |
| **COMPRESSE** | Rayon (Mètres) | Concentre l'effet sur une zone réduite (Densité +). |
| **AMPLIFIE** | Facteur (%) | Augmente la puissance brute. |
| **ATTENUE** | Facteur (%) | Réduit la puissance (Pour l'entraînement ou la sécurité). |
| **RETARDE** | Temps (Sec) | Ajoute un délai avant activation (souvent avec Flux Anti-horaire). |
| **CIBLE** | - | *Spécial.* Indique que l'effet ne touche qu'une entité marquée. |
| **VERROUILLE** | - | Empêche la modification ou l'annulation du cercle par un tiers. |
