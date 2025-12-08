import unicodedata

def transcrire_rituel(texte_latin):
    """
    Transcripteur Rituel : Modifie la grammaire pour donner un ton solennel.
    Structure : Inverse l'ordre des mots (effet miroir/Yoda).
    """
    # 1. Normalisation
    texte = ''.join(
        c for c in unicodedata.normalize('NFKD', texte_latin).upper()
        if not unicodedata.combining(c)
    )

    # 2. Restructuration Grammaticale (L'Inversion Rituelle)
    # "Boule de feu" -> "FEU DE BOULE"
    # "Je lance un sort" -> "SORT UN LANCE JE"
    mots = texte.split()
    mots_inverses = mots[::-1]
    texte_structure = " ".join(mots_inverses)

    # 3. Mapping (Standard)
    MAPPING = {
        'A': '𐤀', 'B': '𐤁', 'C': '𐤂', 'D': '𐤃', 'E': '𐤄',
        'F': '𐤅', 'G': '𐤂', 'H': '𐤇', 'I': '𐤉', 'J': '𐤉',
        'K': '𐤊', 'L': '𐤋', 'M': '𐤌', 'N': '𐤍', 'O': '𐤏',
        'P': '𐤐', 'Q': '𐤒', 'R': '𐤓', 'S': '𐤔', 'T': '𐤕',
        'U': '𐤅', 'V': '𐤅', 'W': '𐤅', 'X': '𐤔', 'Y': '𐤉',
        'Z': '𐤔'
    }

    transcription = []
    for char in texte_structure:
        transcription.append(MAPPING.get(char, char))

    return "".join(transcription)

# Test
if __name__ == "__main__":
    phrases = ["Je lance une boule de feu", "Esprit de la forêt"]
    for p in phrases:
        print(f"{p} -> {transcrire_rituel(p)}")
