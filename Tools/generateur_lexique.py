from FR_to_phenicien_rune import generer_rune_magique

# Liste étendue de verbes conjugués à l'IMPÉRATIF
verbes_imperatif = [
    "ABSORBE",      "ACCELERE",     "ACTIVE",       "ADAPTE",       "AIGUISE",
    "ALIGNE",       "ALTERE",       "AMPLIFIE",     "ANCRE",        "ANNULE",
    "APPELLE",      "ASSEMBLE",     "ASSOMBRIS",    "ATTIRE",       "BANNIS",
    "BLOQUE",       "BOUCLIER",     "BRULE",        "CACHE",        "CANALISE",
    "CHARGE",       "CIBLE",        "COLLE",        "COMPRESSE",    "CONCENTRE",
    "CONDENSE",     "CONNECTE",     "CONTIENS",     "CORROMPS",     "COUPE",
    "CREE",         "CRISTALLISE",  "DECUPE",       "DEVORE",       "DEFLECHIS",
    "DEFORME",      "DETECTE",      "DETOURNE",     "DETRUIS",      "DIFFUSE",
    "DILATE",       "DIMINUE",      "DISPERSE",     "DISSIPE",      "DISTORDS",
    "DIVISE",       "DOMINE",       "DRAINE",       "DUPLIQUE",     "ECLAIRE",
    "ECRASE",       "ELECTRISE",    "EMBRASE",      "EMPOISONNE",   "ENCHAINE",
    "ENCHANTE",     "ENDURCIS",     "EXTRAIS",      "FIGE",         "FRACTURE",
    "FUSIONNE",     "GELE",         "GENERE",       "GRAVE",        "GUIDE",
    "HARMONISE",    "ILLUMINE",     "IMMOBILISE",   "IMPREGNE",     "INCINERE",
    "INFUSE",       "INVERSE",      "INVISIBILISE", "INVOQUE",      "ISOLE",
    "LANCE",        "LEVITE",       "LIBERE",       "LIE",          "LIQUEFIE",
    "MAGNETISE",    "MATERIALISE",  "MAUDIS",       "MODIFIE",      "MULTIPLIE",
    "OBSCURCIS",    "OUVRE",        "PARALYSE",     "PERCE",        "PETRIFIE",
    "PIEGE",        "POLARISE",     "POSSEDE",      "POUSSE",       "PRESERVE",
    "PROJETTE",     "PROLONGE",     "PROTEGE",      "PURIFIE",      "RALENTIS",
    "RAYONNE",      "RECOUVRE",     "REDUIS",       "REFLECHIS",    "REGENERE",
    "REJETTE",      "RENFORCE",     "REPARE",       "REPOUSSE",     "RESSUSCITE",
    "RESTAURE",     "RETIENS",      "REVELE",       "SCELLE",       "SEPARE",
    "SOIGNE",       "SOLIDIFIE",    "SONDE",        "SOULEVE",      "STABILISE",
    "STAGNE",       "SUPPRIME",     "TELEPORTE",    "TIRE",         "TRANCHE",
    "TRANSFORME",   "TRANSMUE",     "TRANSPERCE",   "TRAVERSE",     "VERROUILLE",
    "VIBRE",        "VOILE",        "VOIS",         "VOLE"
]

verbes_imperatif.sort()

nom_fichier = "../Docs/lexique_magique.md"

with open(nom_fichier, "w", encoding="utf-8") as f:
    f.write("# Grimoire des Runes (Lexique Étendu)\n\n")
    f.write(f"**Nombre de Runes :** {len(verbes_imperatif)}\n\n")
    f.write("**Système :** Impératif -> Phonétique -> Abjad -> Phénicien Alien\n\n")
    f.write("| Commande (FR) | Rune (Phénicien) | Longueur |\n")
    f.write("| :--- | :--- | :---: |\n")
    
    for commande in verbes_imperatif:
        rune = generer_rune_magique(commande)
        # On met la rune en code ` ` pour qu'elle ressorte bien
        f.write(f"| **{commande}** | `{rune}` | {len(rune)} |\n")

print(f"Lexique MD généré dans {nom_fichier}")