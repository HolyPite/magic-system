# Recette de Cuisine : La Rune de Pouvoir (Version ALIEN)

Ce document explique l'algorithme pour créer des runes magiques qui **ne ressemblent pas** à l'alphabet latin (pas de X, W, Y, O, I visibles).

## Ingrédients
*   Un verbe à **l'IMPÉRATIF** (ex: "BRULE")
*   Le Mapping "Alien" (voir table ci-dessous)

## Préparation

### 1. L'Impératif & Normalisation
Verbe à l'impératif, MAJUSCULES, sans accents.
*   *Exemple :* "Détruis" -> **DETRUIS**

### 2. La Phonétisation
Remplacer les sons complexes.
*   CH / SH -> **S**
*   PH -> **P**
*   QU / K -> **Q**
*   OU / OI -> **W**
*   AN / EN / ON / IN -> **N** ou **M** ou **Y**

### 3. La Traduction "Alien" (Le Coeur du Système)
Nous utilisons des lettres phéniciennes spécifiques pour éviter toute confusion avec le français.

| Lettre Latine | Symbole Choisi | Nom Phénicien | Apparence | Pourquoi ? |
| :--- | :--- | :--- | :--- | :--- |
| **A** | **𐤀** | Aleph | Tête de boeuf | Classique |
| **B** | **𐤁** | Bet | 9 / Maison | Classique |
| **C, G, K** | **𐤂 / 𐤊** | Gimel / Kap | 1 / Trident | Classique |
| **D** | **𐤃** | Dalet | Triangle | Classique |
| **E** | **𐤄** | He | E inversé | (Souvent supprimé) |
| **F, V, W, U** | **𐤈** | **Ṭēt** | **Roue ⊕** | Remplace le `𐤅` (trop 'Y') |
| **H** | **𐤄** | He | E inversé | Classique |
| **I, J, Y** | **𐤉** | **Yōd** | **Bras / Z** | (Validé) |
| **L** | **𐤋** | Lamed | Bâton courbe | Classique |
| **M** | **𐤌** | Mem | Zigzag | Classique |
| **N** | **𐤍** | Nun | Serpent | Classique |
| **O** | **𐤏** | Ayin | Cercle | (Souvent supprimé) |
| **P** | **𐤐** | Pe | 7 courbe | Classique |
| **Q** | **𐤒** | Qop | Sucette | Classique |
| **R** | **𐤓** | Rosh | 4 inversé | Classique |
| **S, Z, X** | **𐤎** | **Samekh** | **Pilier / Arête** | Remplace le `𐤔` (trop 'W') |
| **T** | **𐤇** | **Ḥēt** | **Échelle** | Remplace le `𐤕` (trop 'X') |

### 4. La Compression Abjad
1.  Gardez **toujours** la première lettre.
2.  Pour le reste, supprimez : **A, E, O** (`𐤀`, `𐤄`, `𐤏`).
3.  Gardez les consonnes fortes : **W (`𐤈`)** et **Y (`𐤉`)**.

---

## Exemples Complets

**ACTIVE** (de Activer)
1.  Phonétique : A - C - T - I - V - E
2.  Traduction : 
    *   A -> 𐤀
    *   C -> 𐤂 (Gimel/Kap)
    *   T -> 𐤇 (Het/Échelle)
    *   I -> 𐤉 (Yod)
    *   V -> 𐤈 (Tet/Roue)
    *   E -> 𐤄
3.  Compression : 𐤀, 𐤂, 𐤇, 𐤉, 𐤈 (E saute) -> **𐤀𐤂𐤇𐤉𐤈**

**DETRUIS** (de Détruire)
1.  Phonétique : D - E - T - R - W - I - S
2.  Traduction :
    *   D -> 𐤃
    *   E -> 𐤄
    *   T -> 𐤇 (Het/Échelle)
    *   R -> 𐤓
    *   W -> 𐤈 (Tet/Roue)
    *   I -> 𐤉 (Yod)
    *   S -> 𐤎 (Samekh/Pilier)
3.  Compression : **𐤃𐤇𐤓𐤈𐤉𐤎** (Note: D-T-R-W-Y-S)
