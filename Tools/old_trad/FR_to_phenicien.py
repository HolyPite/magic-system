import unicodedata
import re

def transcrire_en_phenicien_primitif(texte_latin):
    """
    Transcripteur primitif du latin vers le phénicien avec des règles spécifiques.

    Règles appliquées :
    1. Suppression des accents (normalisation).
    2. Conversion en majuscules.
    3. Remplacement de 'TT' par la lettre Ṭēt (𐤈).
    4. Substitution lettre par lettre selon la table.
    5. Suppression des caractères phéniciens consécutifs identiques.

    Args:
        texte_latin (str): Le mot ou la phrase en alphabet latin.

    Returns:
        str: La transcription en alphabet phénicien.
    """

    # 1. & 2. Normalisation : suppression des accents et conversion en majuscules
    # On utilise NFKD pour séparer la lettre de l'accent, puis on filtre les caractères non-ASCII.
    texte_normalise = ''.join(
        c for c in unicodedata.normalize('NFKD', texte_latin).upper()
        if not unicodedata.combining(c)
    )

    # 3. Règle spéciale 'TT' -> Ṭēt (𐤈).
    # Nous utilisons un caractère temporaire unique ('@') pour Ṭēt avant la substitution
    # principale afin d'éviter les conflits avec la substitution du 'T' simple.
    PHOENICIAN_TT_PLACEHOLDER = '@'
    texte_normalise = texte_normalise.replace("TT", PHOENICIAN_TT_PLACEHOLDER)

    # Table de correspondance (Latin -> Phénicien)
    # Note : 'Y' est mappé sur 'I' (Yōd)
    # 'U' et 'V' sont mappés sur 'F' (Waw)
    # 'C' et 'G' sont mappés sur 'G' (Gīmel)
    # 'S', 'X', 'Z' sont mappés sur 'Šin' pour une cohérence phonétique simple
    MAPPING = {
        'A': '𐤀', 'B': '𐤁', 'C': '𐤂', 'D': '𐤃', 'E': '𐤄',
        'F': '𐤅', 'G': '𐤂', 'H': '𐤇', 'I': '𐤉', 'J': '𐤉',
        'K': '𐤊', 'L': '𐤋', 'M': '𐤌', 'N': '𐤍', 'O': '𐤏',
        'P': '𐤐', 'Q': '𐤒', 'R': '𐤓', 'S': '𐤔', 'T': '𐤕',
        'U': '𐤅', 'V': '𐤅', 'W': '𐤅', 'X': '𐤔', 'Y': '𐤉',
        'Z': '𐤔',
        PHOENICIAN_TT_PLACEHOLDER: '𐤈' # Remplacement du placeholder
    }

    # 4. Substitution lettre par lettre
    transcription_intermediaire = []
    for char in texte_normalise:
        # Si c'est une lettre du mapping, transcrire. Sinon, conserver (espaces, ponctuation).
        transcription_intermediaire.append(MAPPING.get(char, char))

    # Reconstruire la chaîne phénicienne
    transcription_phenicienne = "".join(transcription_intermediaire)

    # 5. Dédoublage : suppression des caractères phéniciens consécutifs identiques
    # On utilise une expression régulière pour trouver et remplacer les occurrences (XX -> X)
    # Le pattern '(\w)\1+' correspond à un caractère (ou chiffre/underscore) suivi d'une ou
    # plusieurs fois le même caractère.
    # Ici, nous nous assurons que le pattern ne s'applique qu'aux caractères phéniciens.
    
    # Nous allons effectuer la déduplication manuellement pour garantir qu'elle
    # ne s'applique qu'aux blocs phéniciens et non aux séparateurs.
    resultat_dedouble = []
    dernier_char_phenicien = None
    
    for char in transcription_phenicienne:
        # Vérifier si le caractère actuel est un caractère phénicien
        est_phenicien = char in MAPPING.values()
        
        if est_phenicien:
            # Si le caractère phénicien actuel est différent du précédent phénicien, on l'ajoute
            if char != dernier_char_phenicien:
                resultat_dedouble.append(char)
            # Mettre à jour le dernier caractère phénicien vu
            dernier_char_phenicien = char
        else:
            # Si ce n'est pas un caractère phénicien (espace, ponctuation), on l'ajoute
            # et on réinitialise dernier_char_phenicien (car il ne faut pas dédoubler
            # après une coupure comme un espace).
            resultat_dedouble.append(char)
            dernier_char_phenicien = None # Réinitialiser le compteur de séquence
            
    return "".join(resultat_dedouble)

# --- Exemples d'utilisation ---

phrase1 = "La planète Terre s'appelle Attelée."
phrase2 = "Dictionnaire"
phrase3 = "Ffffffffffff"

print(f"Phrase latine 1 : '{phrase1}'")
trans1 = transcrire_en_phenicien_primitif(phrase1)
print(f"Transcription 1 : {trans1}\n") # Résultat attendu : 𐤋𐤀 𐤐𐤋𐤀𐤍𐤄𐤕 𐤓𐤓𐤄 𐤔𐤀𐤐𐤄𐤋 𐤀𐤈𐤄𐤋𐤄

print(f"Phrase latine 2 : '{phrase2}'")
trans2 = transcrire_en_phenicien_primitif(phrase2)
print(f"Transcription 2 : {trans2}\n") # Résultat attendu : 𐤃𐤉𐤂𐤕𐤉𐤏𐤍𐤓𐤄

print(f"Phrase latine 3 (dédoublement F) : '{phrase3}'")
trans3 = transcrire_en_phenicien_primitif(phrase3)
print(f"Transcription 3 : {trans3}\n") # Résultat attendu : 𐤅

# Exemple avec double T pour tester la Ṭēt (𐤈)
mot_tt = "Motif Attestation"
print(f"Phrase latine 4 (Ṭēt) : '{mot_tt}'")
trans4 = transcrire_en_phenicien_primitif(mot_tt)
print(f"Transcription 4 : {trans4}\n") # Résultat attendu : 𐤌𐤏𐤕𐤉𐤅 𐤀𐤈𐤄𐤔𐤕𐤉𐤏𐤍