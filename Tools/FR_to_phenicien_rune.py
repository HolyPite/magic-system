import unicodedata

def generer_rune_magique(mot):
    """
    Générateur de Runes / Mots de Pouvoir.
    Version "ALIEN" : Évite les symboles ressemblant aux lettres latines (W, Y, X, O, I).
    """
    
    # --- 1. Normalisation ---
    mot = ''.join(c for c in unicodedata.normalize('NFKD', mot).upper() if not unicodedata.combining(c))
    
    # --- 2. Phonétique & Simplification ---
    PHONEMES = [
        ("CH", "S"), ("SH", "S"), ("PH", "P"), 
        ("QU", "Q"), ("OU", "W"), ("ON", "M"), ("AN", "N"), 
        ("EN", "N"), ("IN", "Y"), ("EAU", "W"), ("AU", "W"), # EAU/AU sonnent souvent comme O/W
        ("OI", "W"), 
        ("TT", "T"), ("TH", "T")
    ]
    
    for seq, char in PHONEMES:
        mot = mot.replace(seq, char)

    # --- 3. Mapping "ALIEN" ---
    # On utilise des lettres phéniciennes visuellement distinctes du latin.
    MAPPING = {
        'A': '𐤀', # Aleph (Tête de boeuf / A renversé)
        'B': '𐤁', # Bet (Maison / 9)
        'C': '𐤂', # Gimel (Chameau / 1) - Sert pour C dur
        'G': '𐤂', # Gimel
        'D': '𐤃', # Dalet (Porte / Triangle)
        'E': '𐤄', # He (Prière / E inversé) - Souvent supprimé en Abjad
        
        # W, V, F, U -> Remplacé par TET (Roue/Croix cerclée) car WAW ressemble trop à Y
        'F': '𐤈', 'V': '𐤈', 'W': '𐤈', 'U': '𐤈', 
        
        # H -> He (On garde He ou on supprime H muet)
        'H': '𐤄', 
        
        # I, J, Y -> On garde YOD (Bras/Eclair) comme demandé
        'I': '𐤉', 'J': '𐤉', 'Y': '𐤉',
        
        'K': '𐤊', # Kap (Paume / K trident)
        'L': '𐤋', # Lamed (Bâton / L)
        'M': '𐤌', # Mem (Eau / M zigzag)
        'N': '𐤍', # Nun (Serpent)
        'O': '𐤏', # Ayin (Oeil / Cercle) - Souvent supprimé en Abjad
        'P': '𐤐', # Pe (Bouche / 7 courbe)
        'Q': '𐤒', # Qop (Singe / Sucette)
        'R': '𐤓', # Rosh (Tête / 4 inversé)
        
        # S, Z, X -> Remplacé par SAMEKH (Pilier) car SHIN ressemble trop à W
        'S': '𐤎', 'Z': '𐤎', 'X': '𐤎',
        
        # T -> Remplacé par HET (Échelle) car TAW ressemble trop à X
        'T': '𐤇', 
    }

    # Voyelles à supprimer (Sauf au début)
    # On garde 'W' (Tet) et 'Y' (Yod) car ce sont des consonnes fortes ici
    VOYELLES_SUPPRIMABLES = ['𐤀', '𐤄', '𐤏'] 

    transcription = []
    
    # Conversion
    temp_chars = []
    for char in mot:
        temp_chars.append(MAPPING.get(char, char))

    # --- 4. Compression Abjad ---
    if not temp_chars: return ""

    # Garder la première lettre
    rune_finale = [temp_chars[0]]

    for i in range(1, len(temp_chars)):
        char = temp_chars[i]
        if char in VOYELLES_SUPPRIMABLES:
            continue
        rune_finale.append(char)

    # --- 5. Dédoublage ---
    resultat = []
    last = None
    for char in rune_finale:
        if char != last:
            resultat.append(char)
            last = char
            
    return "".join(resultat)

# Test rapide
if __name__ == "__main__":
    mots = ["COMPRESSE", "ACTIVE", "DETRUIS", "VOYAGE", "SYSTEME"]
    for m in mots:
        print(f"{m} -> {generer_rune_magique(m)}")