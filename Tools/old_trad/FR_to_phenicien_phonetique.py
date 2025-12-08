import unicodedata

def transcrire_phonetique(texte_latin):
    """
    Transcripteur phonétique : Groupe les sons complexes avant de traduire.
    Cela donne un texte plus court et dense, plus proche d'une prononciation.
    """
    # 1. Normalisation (Majuscules, sans accents)
    texte_normalise = ''.join(
        c for c in unicodedata.normalize('NFKD', texte_latin).upper()
        if not unicodedata.combining(c)
    )

    # 2. Définition et application des sons complexes (L'ordre est important : les plus longs d'abord)
    # Utilisez des caractères phéniciens directement, car l'étape de remplacement gérera cela.
    PHONEMES = [
        ("EAU", "𐤏"), # EAU -> O (Ayin - pour changer du O simple)
        ("AU", "𐤏"),  # AU -> O (Ayin)
        ("CH", "𐤔"), # CH -> Šin (Comme SH)
        ("SH", "𐤔"),
        ("PH", "𐤐"), # PH -> Pē (F)
        ("TH", "𐤈"), # TH -> Ṭēt
        ("QU", "𐤒"), # QU -> Qōp
        ("OU", "𐤅"), # OU -> Waw (Son W/U)
        ("OI", "𐤅"), # OI -> Waw (Son Wa)
        ("AN", "𐤍"),  # Nasale -> Nun
        ("EN", "𐤍"),  # Nasale -> Nun
        ("ON", "𐤌"),  # Nasale -> Mem (Son M sourd)
        ("IN", "𐤉"),  # Nasale -> Yod
        ("TT", "𐤈") # Du script original
    ]

    # Tri par longueur décroissante pour traiter les plus longs en premier
    PHONEMES.sort(key=lambda x: len(x[0]), reverse=True)

    texte_intermediaire = texte_normalise
    for latin_seq, phen_char in PHONEMES:
        texte_intermediaire = texte_intermediaire.replace(latin_seq, phen_char)
    
    # 3. Mapping standard pour les lettres restantes
    MAPPING_SINGLE_CHARS = {
        'A': '𐤀', 'B': '𐤁', 'C': '𐤂', 'D': '𐤃', 'E': '𐤄',
        'F': '𐤅', 'G': '𐤂', 'H': '𐤇', 'I': '𐤉', 'J': '𐤉',
        'K': '𐤊', 'L': '𐤋', 'M': '𐤌', 'N': '𐤍', 'O': '𐤏',
        'P': '𐤐', 'Q': '𐤒', 'R': '𐤓', 'S': '𐤔', 'T': '𐤕',
        'U': '𐤅', 'V': '𐤅', 'W': '𐤅', 'X': '𐤔', 'Y': '𐤉',
        'Z': '𐤔'
    }

    transcription_avec_doubles = []
    for char in texte_intermediaire:
        # Si c'est déjà un caractère phénicien (mis par PHONEMES), on le garde.
        # Sinon, on le mappe avec les caractères simples.
        # La plage Unicode pour le phénicien est U+10900 à U+1091F
        if ord(char) >= 0x10900 and ord(char) <= 0x1091F: 
            transcription_avec_doubles.append(char)
        else:
            transcription_avec_doubles.append(MAPPING_SINGLE_CHARS.get(char, char))

    transcription_finale = "".join(transcription_avec_doubles)

    # 4. Dédoublement : suppression des caractères phéniciens consécutifs identiques
    resultat_dedouble = []
    dernier_char_phenicien = None
    
    for char in transcription_finale:
        # Vérifier si le caractère actuel est un caractère phénicien
        est_phenicien = (ord(char) >= 0x10900 and ord(char) <= 0x1091F)
        
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

# Test
if __name__ == "__main__":
    phrases = [
        "Chanter la chanson", 
        "Pharaon", 
        "Oiseau", 
        "Boule de feu", 
        "EAU chaude",
        "ATTENTION Cible",
        "Un chat", # Test "AN"
        "Bon vent" # Test "ON"
    ]
    for p in phrases:
        print(f"{p} -> {transcrire_phonetique(p)}")