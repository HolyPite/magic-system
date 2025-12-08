import unicodedata
import re

def transcrire_visuel(texte_latin):
    """
    Transcripteur Visuel : Se concentre sur l'esthétique runique.
    - Utilise des séparateurs phéniciens (points) au lieu d'espaces.
    - Crée des 'ligatures' (fusion de lettres) pour les paires courantes.
    - Encadre le texte de symboles sacrés.
    """
    
    # 1. Normalisation
    texte = ''.join(
        c for c in unicodedata.normalize('NFKD', texte_latin).upper()
        if not unicodedata.combining(c)
    )

    # 2. Ligatures Visuelles
    # On remplace certaines paires par un caractère phénicien unique mais visuellement distinct
    # ou rarement utilisé, pour simuler un symbole magique complexe.
    
    # ST -> 𐤑 (Ṣādē - ressemble à un crochet/éclair, parfait pour 'Saint' ou 'Star')
    texte = texte.replace("ST", "𐤑") 
    
    # AE -> 𐤈 (Ṭēt - une roue avec une croix, symbole d'union)
    texte = texte.replace("AE", "𐤈")

    # TR -> 𐤖 (Zayin - ressemble à une arme ou un outil)
    texte = texte.replace("TR", "𐤖")

    # 3. Mapping Standard
    MAPPING = {
        'A': '𐤀', 'B': '𐤁', 'C': '𐤂', 'D': '𐤃', 'E': '𐤄',
        'F': '𐤅', 'G': '𐤂', 'H': '𐤇', 'I': '𐤉', 'J': '𐤉',
        'K': '𐤊', 'L': '𐤋', 'M': '𐤌', 'N': '𐤍', 'O': '𐤏',
        'P': '𐤐', 'Q': '𐤒', 'R': '𐤓', 'S': '𐤔', 'T': '𐤕',
        'U': '𐤅', 'V': '𐤅', 'W': '𐤅', 'X': '𐤔', 'Y': '𐤉',
        'Z': '𐤔',
        ' ': '𐤟' # LE POINT DE SÉPARATION PHÉNICIEN
    }

    transcription = []
    for char in texte:
        # Si c'est déjà un char phénicien (ligature), on garde
        if ord(char) > 10000:
            transcription.append(char)
        else:
            transcription.append(MAPPING.get(char, char))

    corps = "".join(transcription)
    
    # Ajout de marqueurs de début et fin d'incantation
    return f"𐤟{corps}𐤟"

# Test
if __name__ == "__main__":
    phrases = ["Aeterna Est", "Star Wars", "Trois Rois"]
    for p in phrases:
        print(f"{p} -> {transcrire_visuel(p)}")
