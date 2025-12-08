# Project Context: Magic System Translator

## Overview
This project provides tools to generate "Words of Power" and "Runes" for a magic system in a game (Action-RPG style). The goal is to create aesthetically pleasing, concise, and consistent inscriptions to be placed on magic circles and spell effects.

The language is based on a **Primitive Phoenician** script, transformed through specific linguistic rules to create a unique "Magic Language".

## Core Logic: The "Runic Imperative"
The primary standard for magic circles is defined in `FR_to_phenicien_rune.py`.
1.  **Input:** French verb in the **Imperative** form (e.g., "COMPRESSE").
2.  **Phonetics:** Complex sounds (CH, ON, EAU) are condensed into single phonemes.
3.  **Abjad Compression:** Internal vowels are removed to simulate an ancient writing system and save space.
    *   *Rule:* Always keep the first letter. Keep 'W'.
4.  **Translation:** Characters are mapped to Phoenician Unicode.

## File Structure

### Translators (Python Scripts)
*   **`FR_to_phenicien_rune.py`** (Main): The generator for magic circle runes. High compression, Imperative mode.
*   `FR_to_phenicien_phonetique.py`: Translates full sentences phonetically (good for spoken incantations).
*   `FR_to_phenicien_rituel.py`: Changes word order (SOV/Inverted) for ritual text.
*   `FR_to_phenicien_visuel.py`: Focuses on aesthetics with ligatures and separators (for decorative engravings).
*   `FR_to_phenicien.py` & `Phenicien_to_FR.py`: Original literal translation scripts (Legacy).

### Documentation & Data
*   **`lexique_magique.txt`**: A generated list of ~30 common magic modifiers/actions translated into runes.
*   **`recette_traduction.md`**: The "Design Document" explaining the translation algorithm for manual creation.
*   `generateur_lexique.py`: Utility script to regenerate the lexicon.

## Usage
To generate new words for textures:
```bash
python3 FR_to_phenicien_rune.py
# Or edit 'generateur_lexique.py' to add new verbs and run it.
```

## Design Philosophy
*   **Conciseness is key:** Textures have limited space. 4-6 characters is the target length.
*   **Imperative Mood:** Magic commands the universe ("Burn!", "Freeze!").
*   **Visual Authenticity:** The text should look like it belongs on an ancient stone tablet.
