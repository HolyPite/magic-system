def transcrire_du_phenicien_primitif(texte_phenicien):
    """
    Transcripteur inverse du phénicien vers le latin (français) en mode primitif.
    
    Cette fonction utilise la correspondance la plus directe pour convertir
    chaque caractère phénicien en son équivalent latin principal.
    
    Args:
        texte_phenicien (str): Le mot ou la phrase en alphabet phénicien.
        
    Returns:
        str: La transcription en alphabet latin (majuscules).
    """

    # Table de correspondance inverse (Phénicien -> Latin principal)
    # Note : Le Phénicien étant l'ancêtre du Latin, une seule lettre phénicienne
    # a souvent donné naissance à plusieurs lettres latines (ex: Waw -> F, U, V, W).
    # Pour ce traducteur primitif, nous choisissons le descendant latin le plus commun/direct
    # pour chaque cas.
    
    MAPPING_INVERSE = {
        '𐤀': 'A',      # ʼālep -> A
        '𐤁': 'B',      # Bēt -> B
        '𐤂': 'G',      # Gīmel -> G (choix de G plutôt que C)
        '𐤃': 'D',      # Dālet -> D
        '𐤄': 'E',      # Hē -> E
        '𐤅': 'F',      # Waw -> F (choix du F comme descendant direct)
        '𐤇': 'H',      # Ḥēt -> H
        '𐤈': 'TT',     # Ṭēt -> TT (Règle spéciale : on le retranscrit en double T)
        '𐤉': 'I',      # Yōd -> I
        '𐤊': 'K',      # Kap -> K
        '𐤋': 'L',      # Lāmed -> L
        '𐤌': 'M',      # Mēm -> M
        '𐤍': 'N',      # Nun -> N
        '𐤏': 'O',      # ʻayin -> O
        '𐤐': 'P',      # Pē -> P
        '𐤒': 'Q',      # Qōp -> Q
        '𐤓': 'R',      # Rōš -> R
        '𐤔': 'S',      # Šin -> S (choix du S)
        '𐤕': 'T',      # Tāw -> T
    }

    transcription_latine = []
    
    for char in texte_phenicien:
        # Si le caractère est dans notre mapping, le remplacer.
        # Sinon (espace, ponctuation), le conserver.
        transcription_latine.append(MAPPING_INVERSE.get(char, char))

    # Reconstruire la chaîne latine et la mettre en minuscule pour un rendu "français"
    # bien que toutes les lettres soient des majuscules dans le mapping (convention).
    return "".join(transcription_latine).lower()

# --- Exemples d'utilisation ---

# 1. Reprendre l'exemple 'ATTERRIR' transcrit : 𐤀𐤈𐤄𐤓𐤉𐤓 (avec 𐤈 pour TT)
mot_phenicien_1 = "𐤀𐤈𐤄𐤓𐤉𐤓"
resultat_1 = transcrire_du_phenicien_primitif(mot_phenicien_1)
print(f"Phénicien : '{mot_phenicien_1}'")
print(f"Transcription latine : {resultat_1}\n")
# Résultat attendu : attérir (la double consonne réapparaît : 𐤈 -> TT)

# 2. Reprendre l'exemple 'BONJOUR LE MONDE' transcrit : 𐤁𐤏𐤍𐤉𐤏𐤅𐤓 𐤋𐤄 𐤌𐤏𐤍𐤃𐤄
mot_phenicien_2 = "𐤁𐤏𐤍𐤉𐤏𐤅𐤓 𐤋𐤄 𐤌𐤏𐤍𐤃𐤄"
resultat_2 = transcrire_du_phenicien_primitif(mot_phenicien_2)
print(f"Phénicien : '{mot_phenicien_2}'")
print(f"Transcription latine : {resultat_2}\n")
# Résultat attendu : bonifor le mode (BōNIŌF R L E M ō N D E)

# 3. Exemple avec des lettres simples
mot_phenicien_3 = "𐤕𐤀𐤔𐤕"
resultat_3 = transcrire_du_phenicien_primitif(mot_phenicien_3)
print(f"Phénicien : '{mot_phenicien_3}'")
print(f"Transcription latine : {resultat_3}\n")
# Résultat attendu : tast (TAŠT)