// --- Firebase Setup (Compat Mode) ---
// Using global 'firebase' object from CDN scripts in index.html


const ELEMENTS_DATA = {
    "Feu": {
        "Feu": "Plasma chaud",
        "Eau": "Pétrol/Huile",
        "Air": "Fumée",
        "Terre": "Explosif",
        "Lumière": "Feu céleste",
        "Ténèbre": "Feu spirituel"
    },
    "Eau": {
        "Feu": "Vapeur",
        "Eau": "Eau pure",
        "Air": "Brume",
        "Terre": "Eau trouble",
        "Lumière": "Eau bénite",
        "Ténèbre": "Poison"
    },
    "Air": {
        "Feu": "Tempête",
        "Eau": "Nuage",
        "Air": "Gaz",
        "Terre": "Sable",
        "Lumière": "Son",
        "Ténèbre": "Vide"
    },
    "Terre": {
        "Feu": "Magma",
        "Eau": "Boue/Argile",
        "Air": "Erosion",
        "Terre": "Roche",
        "Lumière": "Cristaux",
        "Ténèbre": "Miasme"
    },
    "Lumière": {
        "Feu": "Laser",
        "Eau": "Lumière prismatique",
        "Air": "Illusion",
        "Terre": "Vie",
        "Lumière": "Divin",
        "Ténèbre": "Dualité"
    },
    "Ténèbre": {
        "Feu": "Ombre",
        "Eau": "Lien/Pacte",
        "Air": "Psychique",
        "Terre": "Os",
        "Lumière": "Eclipse",
        "Ténèbre": "Néant"
    }
};

const BASE_ELEMENTS = ["Feu", "Eau", "Air", "Terre", "Lumière", "Ténèbre"];

const firebaseConfig = {
    apiKey: "AIzaSyBCbfDIdSPvubiAxCKFUZfqXkidNh7qqLI",
    authDomain: "magic-translator-cc502.firebaseapp.com",
    projectId: "magic-translator-cc502",
    storageBucket: "magic-translator-cc502.firebasestorage.app",
    messagingSenderId: "721482008870",
    appId: "1:721482008870:web:840d9a7b3fc0295a5759e7",
    measurementId: "G-W5EXQDV0J2"
};

// Uses the default app initialized below
// Let's protect it in case of network issues (though script tags should load if online)
let db;
let lexiconCollection;

try {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    lexiconCollection = db.collection("lexique");
} catch (e) {
    console.warn("Firebase initialization failed (offline?):", e);
}

// --- Constants & Mappings ---

const PHONEMES_IMPERATIF = [
    ["CH", "S"], ["SH", "S"], ["PH", "P"],
    ["QU", "Q"], ["OU", "W"], ["ON", "M"], ["AN", "N"],
    ["EN", "N"], ["IN", "Y"], ["EAU", "W"], ["AU", "W"],
    ["OI", "W"],
    ["TT", "T"], ["TH", "T"]
];

const FR_TO_RUNE_MAPPING = {
    'A': '𐤀', 'B': '𐤁', 'C': '𐤂', 'G': '𐤂', 'D': '𐤃',
    'E': '𐤄', 'F': '𐤑', 'V': '𐤒', 'W': '𐤈', 'U': '𐤈',
    'H': '𐤄', 'I': '𐤉', 'J': '𐤉', 'Y': '𐤉', 'K': '𐤊',
    'L': '𐤋', 'M': '𐤌', 'N': '𐤍', 'O': '𐤏', 'P': '𐤐',
    'Q': '𐤊', 'R': '𐤓', 'S': '𐤎', 'Z': '𐤎', 'X': '𐤎',
    'T': '𐤇'
};

const RUNE_TO_FR_MAPPING = {
    '𐤀': 'A', '𐤁': 'B', '𐤂': 'G', '𐤃': 'D', '𐤄': 'E',
    '𐤅': 'F', '𐤇': 'H', '𐤈': 'W', '𐤉': 'I', '𐤊': 'K',
    '𐤋': 'L', '𐤌': 'M', '𐤍': 'N', '𐤏': 'O', '𐤐': 'P',
    '𐤒': 'V', '𐤓': 'R', '𐤔': 'S', '𐤕': 'T',
    '𐤎': 'S', '𐤑': 'F'
};

const VOYELLES_SUPPRIMABLES = ['𐤀', '𐤄', '𐤏'];

// --- Lexicon Data (Dynamic) ---
let LEXIQUE = []; // Will be populated from Firebase

const INITIAL_LEXIQUE = [
    { fr: "ABSORBE", rune: "𐤀𐤁𐤎𐤓𐤁" },
    { fr: "ACCELERE", rune: "𐤀𐤂𐤋𐤓" },
    { fr: "ACTIVE", rune: "𐤀𐤂𐤇𐤉𐤒" },
    { fr: "ADAPTE", rune: "𐤀𐤃𐤐𐤇" },
    { fr: "AIGUISE", rune: "𐤀𐤉𐤂𐤈𐤉𐤎" },
    { fr: "ALIGNE", rune: "𐤀𐤋𐤉𐤂𐤍" },
    { fr: "ALTERE", rune: "𐤀𐤋𐤇𐤓" },
    { fr: "AMPLIFIE", rune: "𐤀𐤌𐤐𐤋𐤉𐤑𐤉" },
    { fr: "ANCRE", rune: "𐤍𐤂𐤓" },
    { fr: "ANNULE", rune: "𐤍𐤈𐤋" },
    { fr: "APPELLE", rune: "𐤀𐤐𐤋" },
    { fr: "ASSEMBLE", rune: "𐤀𐤎𐤌𐤁𐤋" },
    { fr: "ASSOMBRIS", rune: "𐤀𐤎𐤌𐤁𐤓𐤉𐤎" },
    { fr: "ATTIRE", rune: "𐤀𐤇𐤉𐤓" },
    { fr: "BANNIS", rune: "𐤁𐤍𐤉𐤎" },
    { fr: "BLOQUE", rune: "𐤁𐤋𐤊" },
    { fr: "BOUCLIER", rune: "𐤁𐤈𐤂𐤋𐤉𐤓" },
    { fr: "BRULE", rune: "𐤁𐤓𐤈𐤋" },
    { fr: "CACHE", rune: "𐤂𐤎" },
    { fr: "CANALISE", rune: "𐤂𐤍𐤋𐤉𐤎" },
    { fr: "CHARGE", rune: "𐤎𐤓𐤂" },
    { fr: "CIBLE", rune: "𐤂𐤉𐤁𐤋" },
    { fr: "COLLE", rune: "𐤂𐤋" },
    { fr: "COMPRESSE", rune: "𐤂𐤌𐤐𐤓𐤎" },
    { fr: "CONCENTRE", rune: "𐤂𐤌𐤂𐤍𐤇𐤓" },
    { fr: "CONDENSE", rune: "𐤂𐤌𐤃𐤍𐤎" },
    { fr: "CONNECTE", rune: "𐤂𐤌𐤍𐤂𐤇" },
    { fr: "CONTIENS", rune: "𐤂𐤌𐤇𐤉𐤎" },
    { fr: "CORROMPS", rune: "𐤂𐤓𐤌𐤐𐤎" },
    { fr: "COUPE", rune: "𐤂𐤈𐤐" },
    { fr: "CREE", rune: "𐤂𐤓" },
    { fr: "CRISTALLISE", rune: "𐤂𐤓𐤉𐤎𐤇𐤋𐤉𐤎" },
    { fr: "DECUPE", rune: "𐤃𐤂𐤈𐤐" },
    { fr: "DEFLECHIS", rune: "𐤃𐤑𐤋𐤎𐤉𐤎" },
    { fr: "DEFORME", rune: "𐤃𐤑𐤓𐤌" },
    { fr: "DETECTE", rune: "𐤃𐤇𐤂𐤇" },
    { fr: "DETOURNE", rune: "𐤃𐤇𐤈𐤓𐤍" },
    { fr: "DETRUIS", rune: "𐤃𐤇𐤓𐤈𐤉𐤎" },
    { fr: "DEVORE", rune: "𐤃𐤒𐤓" },
    { fr: "DIFFUSE", rune: "𐤃𐤉𐤑𐤈𐤎" },
    { fr: "DILATE", rune: "𐤃𐤉𐤋𐤇" },
    { fr: "DIMINUE", rune: "𐤃𐤉𐤌𐤉𐤈" },
    { fr: "DISPERSE", rune: "𐤃𐤉𐤎𐤐𐤓𐤎" },
    { fr: "DISSIPE", rune: "𐤃𐤉𐤎𐤉𐤐" },
    { fr: "DISTORDS", rune: "𐤃𐤉𐤎𐤇𐤓𐤃𐤎" },
    { fr: "DIVISE", rune: "𐤃𐤉𐤒𐤉𐤎" },
    { fr: "DOMINE", rune: "𐤃𐤌𐤉" },
    { fr: "DRAINE", rune: "𐤃𐤓𐤉" },
    { fr: "DUPLIQUE", rune: "𐤃𐤈𐤐𐤋𐤉𐤊" },
    { fr: "ECLAIRE", rune: "𐤄𐤂𐤋𐤉𐤓" },
    { fr: "ECRASE", rune: "𐤄𐤂𐤓𐤎" },
    { fr: "ELECTRISE", rune: "𐤄𐤋𐤂𐤇𐤓𐤉𐤎" },
    { fr: "EMBRASE", rune: "𐤄𐤌𐤁𐤓𐤎" },
    { fr: "EMPOISONNE", rune: "𐤄𐤌𐤐𐤈𐤎𐤌𐤍" },
    { fr: "ENCHAINE", rune: "𐤍𐤎𐤉" },
    { fr: "ENCHANTE", rune: "𐤍𐤎𐤍𐤇" },
    { fr: "ENDURCIS", rune: "𐤍𐤃𐤈𐤓𐤂𐤉𐤎" },
    { fr: "EXTRAIS", rune: "𐤄𐤎𐤇𐤓𐤉𐤎" },
    { fr: "FIGE", rune: "𐤑𐤉𐤂" },
    { fr: "FRACTURE", rune: "𐤑𐤓𐤂𐤇𐤈𐤓" },
    { fr: "FUSIONNE", rune: "𐤑𐤈𐤎𐤉𐤌𐤍" },
    { fr: "GELE", rune: "𐤂𐤋" },
    { fr: "GENERE", rune: "𐤂𐤍𐤓" },
    { fr: "GRAVE", rune: "𐤂𐤓𐤒" },
    { fr: "GUIDE", rune: "𐤂𐤈𐤉𐤃" },
    { fr: "HARMONISE", rune: "𐤄𐤓𐤌𐤉𐤎" },
    { fr: "ILLUMINE", rune: "𐤉𐤋𐤈𐤌𐤉" },
    { fr: "IMMOBILISE", rune: "𐤉𐤌𐤁𐤉𐤋𐤉𐤎" },
    { fr: "IMPREGNE", rune: "𐤉𐤌𐤐𐤓𐤂𐤍" },
    { fr: "INCINERE", rune: "𐤉𐤂𐤉𐤓" },
    { fr: "INFUSE", rune: "𐤉𐤑𐤈𐤎" },
    { fr: "INVERSE", rune: "𐤉𐤒𐤓𐤎" },
    { fr: "INVISIBILISE", rune: "𐤉𐤒𐤉𐤎𐤉𐤁𐤉𐤋𐤉𐤎" },
    { fr: "INVOQUE", rune: "𐤉𐤒𐤊" },
    { fr: "ISOLE", rune: "𐤉𐤎𐤋" },
    { fr: "LANCE", rune: "𐤋𐤍𐤂" },
    { fr: "LEVITE", rune: "𐤋𐤒𐤉𐤇" },
    { fr: "LIBERE", rune: "𐤋𐤉𐤁𐤓" },
    { fr: "LIE", rune: "𐤋𐤉" },
    { fr: "LIQUEFIE", rune: "𐤋𐤉𐤊𐤑𐤉" },
    { fr: "MAGNETISE", rune: "𐤌𐤂𐤍𐤇𐤉𐤎" },
    { fr: "MATERIALISE", rune: "𐤌𐤇𐤓𐤉𐤋𐤉𐤎" },
    { fr: "MAUDIS", rune: "𐤌𐤈𐤃𐤉𐤎" },
    { fr: "MODIFIE", rune: "𐤌𐤃𐤉𐤑𐤉" },
    { fr: "MULTIPLIE", rune: "𐤌𐤈𐤋𐤇𐤉𐤐𐤋𐤉" },
    { fr: "OBSCURCIS", rune: "𐤏𐤁𐤎𐤂𐤈𐤓𐤂𐤉𐤎" },
    { fr: "OUVRE", rune: "𐤈𐤒𐤓" },
    { fr: "PARALYSE", rune: "𐤐𐤓𐤋𐤉𐤎" },
    { fr: "PERCE", rune: "𐤐𐤓𐤂" },
    { fr: "PETRIFIE", rune: "𐤐𐤇𐤓𐤉𐤑𐤉" },
    { fr: "PIEGE", rune: "𐤐𐤉𐤂" },
    { fr: "POLARISE", rune: "𐤐𐤋𐤓𐤉𐤎" },
    { fr: "POSSEDE", rune: "𐤐𐤎𐤃" },
    { fr: "POUSSE", rune: "𐤐𐤈𐤎" },
    { fr: "PRESERVE", rune: "𐤐𐤓𐤎𐤓𐤒" },
    { fr: "PROJETTE", rune: "𐤐𐤓𐤉𐤇" },
    { fr: "PROLONGE", rune: "𐤐𐤓𐤋𐤌𐤂" },
    { fr: "PROTEGE", rune: "𐤐𐤓𐤇𐤂" },
    { fr: "PURIFIE", rune: "𐤐𐤈𐤓𐤉𐤑𐤉" },
    { fr: "RALENTIS", rune: "𐤓𐤋𐤍𐤇𐤉𐤎" },
    { fr: "RAYONNE", rune: "𐤓𐤉𐤌𐤍" },
    { fr: "RECOUVRE", rune: "𐤓𐤂𐤈𐤒𐤓" },
    { fr: "REDUIS", rune: "𐤓𐤃𐤈𐤉𐤎" },
    { fr: "REFLECHIS", rune: "𐤓𐤑𐤋𐤎𐤉𐤎" },
    { fr: "REGENERE", rune: "𐤓𐤂𐤍𐤓" },
    { fr: "REJETTE", rune: "𐤓𐤉𐤇" },
    { fr: "RENFORCE", rune: "𐤓𐤍𐤑𐤓𐤂" },
    { fr: "REPARE", rune: "𐤓𐤐𐤓" },
    { fr: "REPOUSSE", rune: "𐤓𐤐𐤈𐤎" },
    { fr: "RESSUSCITE", rune: "𐤓𐤎𐤈𐤎𐤂𐤉𐤇" },
    { fr: "RESTAURE", rune: "𐤓𐤎𐤇𐤈𐤓" },
    { fr: "RETIENS", rune: "𐤓𐤇𐤉𐤎" },
    { fr: "REVELE", rune: "𐤓𐤒𐤋" },
    { fr: "SCELLE", rune: "𐤎𐤂𐤋" },
    { fr: "SEPARE", rune: "𐤎𐤐𐤓" },
    { fr: "SOIGNE", rune: "𐤎𐤈𐤂𐤍" },
    { fr: "SOLIDIFIE", rune: "𐤎𐤋𐤉𐤃𐤉𐤑𐤉" },
    { fr: "SONDE", rune: "𐤎𐤌𐤃" },
    { fr: "SOULEVE", rune: "𐤎𐤈𐤋𐤒" },
    { fr: "STABILISE", rune: "𐤎𐤇𐤁𐤉𐤋𐤉𐤎" },
    { fr: "STAGNE", rune: "𐤎𐤇𐤂𐤍" },
    { fr: "SUPPRIME", rune: "𐤎𐤈𐤐𐤓𐤉𐤌" },
    { fr: "TELEPORTE", rune: "𐤇𐤋𐤐𐤓𐤇" },
    { fr: "TIRE", rune: "𐤇𐤉𐤓" },
    { fr: "TRANCHE", rune: "𐤇𐤓𐤍𐤎" },
    { fr: "TRANSFORME", rune: "𐤇𐤓𐤍𐤎𐤑𐤓𐤌" },
    { fr: "TRANSMUE", rune: "𐤇𐤓𐤍𐤎𐤌𐤈" },
    { fr: "TRANSPERCE", rune: "𐤇𐤓𐤍𐤎𐤐𐤓𐤂" },
    { fr: "TRAVERSE", rune: "𐤇𐤓𐤒𐤓𐤎" },
    { fr: "VERROUILLE", rune: "𐤒𐤓𐤈𐤉𐤋" },
    { fr: "VIBRE", rune: "𐤒𐤉𐤁𐤓" },
    { fr: "VOILE", rune: "𐤒𐤈𐤋" },
    { fr: "VOIS", rune: "𐤒𐤈𐤎" },
    { fr: "VOLE", rune: "𐤒𐤋" }
];

async function checkAndSeed() {
    // stub removed
}

// --- Translation Functions ---

function normalizeText(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
}

/**
 * Mode: Rune (Impératif)
 * Logic: Phonemes -> Mapping -> Abjad Compression
 */
function translateImperatif(text) {
    if (!text) return "";

    let mot = normalizeText(text);

    // 1. Phonetics
    for (const [seq, char] of PHONEMES_IMPERATIF) {
        mot = mot.split(seq).join(char);
    }

    // 2. Mapping
    let tempChars = [];
    for (const char of mot) {
        if (FR_TO_RUNE_MAPPING[char]) {
            tempChars.push(FR_TO_RUNE_MAPPING[char]);
        } else if (char.match(/[A-Z]/)) {
            tempChars.push(char);
        }
    }

    if (tempChars.length === 0) return "";

    // 3. Abjad Compression
    let runeFinale = [tempChars[0]]; // Keep first

    for (let i = 1; i < tempChars.length; i++) {
        const char = tempChars[i];
        if (VOYELLES_SUPPRIMABLES.includes(char)) {
            continue;
        }
        runeFinale.push(char);
    }

    // 4. Deduplication
    let resultat = [];
    let last = null;
    for (const char of runeFinale) {
        if (char !== last) {
            resultat.push(char);
            last = char;
        }
    }

    return resultat.join("");
}



function translateRuneToFR(text) {
    if (!text) return "";

    let transcription = [];
    for (const char of text) {
        if (RUNE_TO_FR_MAPPING[char]) {
            transcription.push(RUNE_TO_FR_MAPPING[char]);
        } else {
            transcription.push(char);
        }
    }

    return transcription.join("").toLowerCase();
}

// --- UI Logic ---

document.addEventListener('DOMContentLoaded', () => {
    // Tabs
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });

    // FR to Runic
    const btnTranslateFr = document.getElementById('btn-translate-fr');
    const inputFr = document.getElementById('input-fr');
    const outputRune = document.getElementById('output-rune');

    // Runic to FR elements
    const btnTranslateRune = document.getElementById('btn-translate-rune');
    const inputRune = document.getElementById('input-rune');
    const outputFr = document.getElementById('output-fr');

    // Lexicon elements
    const lexiconContainer = document.getElementById('lexicon-container');
    const lexiconSearch = document.getElementById('lexicon-search');

    async function doFrTranslation() {
        const text = inputFr.value.trim();
        if (!text) return;

        // Imperative mode: word by word
        const words = text.split(/\s+/);
        const translatedWords = words.map(w => {
            const rune = translateImperatif(w);

            // --- Auto-Lexicon Logic (Firebase) ---
            const normalizedFr = normalizeText(w);
            if (normalizedFr.length > 1 && rune && lexiconCollection) {
                // Check if exists in local cache
                const exists = LEXIQUE.find(item => item.fr === normalizedFr);
                if (!exists) {
                    // Add to Firestore (Compat)
                    lexiconCollection.add({
                        fr: normalizedFr,
                        rune: rune,
                        createdAt: new Date()
                    }).catch(err => console.error("Error adding to DB:", err));

                    // Optimistic update (optional, but snapshot will handle it)
                }
            }
            // --------------------------

            return rune;
        });
        outputRune.textContent = translatedWords.join(" ");
    }

    btnTranslateFr.addEventListener('click', doFrTranslation);

    function doRuneTranslation() {
        const text = inputRune.value.trim();
        if (!text) {
            outputFr.innerHTML = "";
            return;
        }

        // 1. Literal Transcription
        const literalTranslation = translateRuneToFR(text);

        // 2. Lexicon Match
        // We look for the exact rune sequence in the lexicon
        const match = LEXIQUE.find(item => item.rune === text);

        let html = `<div class="translation-result">
            <span class="label">Transcription littérale :</span>
            <span class="value">${literalTranslation}</span>
        </div>`;

        if (match) {
            html += `<div class="translation-result match">
                <span class="label">Correspondance Lexique :</span>
                <span class="value highlight">${match.fr}</span>
            </div>`;
        }

        outputFr.innerHTML = html;
    }

    btnTranslateRune.addEventListener('click', doRuneTranslation);

    // Lexicon Logic

    function renderLexicon(filter = "") {
        lexiconContainer.innerHTML = "";
        const searchTerm = filter.toUpperCase();

        // Sort alphabetically
        const sortedLexicon = [...LEXIQUE].sort((a, b) => a.fr.localeCompare(b.fr));

        sortedLexicon.forEach(item => {
            if (item.fr.includes(searchTerm) || item.rune.includes(filter)) {
                const div = document.createElement('div');
                div.className = 'lexicon-item';
                div.innerHTML = `
                    <span class="lexicon-word">${item.fr}</span>
                    <span class="lexicon-rune">${item.rune}</span>
                `;
                div.addEventListener('click', () => {
                    // Copy to clipboard
                    navigator.clipboard.writeText(item.rune).then(() => {
                        // Visual feedback
                        div.style.backgroundColor = "rgba(212, 175, 55, 0.2)";
                        setTimeout(() => {
                            div.style.backgroundColor = "";
                        }, 200);
                    });
                });
                lexiconContainer.appendChild(div);
            }
        });
    }

    lexiconSearch.addEventListener('input', (e) => {
        renderLexicon(e.target.value);
    });

    // --- Real-time Listener & Seeding ---
    if (lexiconCollection) {
        // Compat syntax: collection.orderBy(...).onSnapshot(...)
        lexiconCollection.orderBy("fr").onSnapshot((snapshot) => {
            if (snapshot.empty && INITIAL_LEXIQUE.length > 0) {
                console.log("Database empty. Seeding...");
                INITIAL_LEXIQUE.forEach(item => {
                    lexiconCollection.add({
                        ...item,
                        createdAt: new Date()
                    }).catch(e => console.error("Seed error", e));
                });
                return; // Snapshot will fire again after adds
            }

            LEXIQUE = [];
            snapshot.forEach((doc) => {
                LEXIQUE.push(doc.data());
            });
            renderLexicon(lexiconSearch.value);
            console.log("Lexicon updated from DB:", LEXIQUE.length, "words");
        }, (error) => {
            console.error("Error getting lexicon:", error);
            // Fallback if permission denied or offline
        });
    } else {
        console.log("Firebase not available. Using static INITIAL_LEXIQUE.");
        LEXIQUE = [...INITIAL_LEXIQUE];
        renderLexicon(lexiconSearch.value);
    }

    // --- Grimoire Logic ---
    const hexGrid = document.getElementById('hex-grid');
    const grimoireDetails = document.getElementById('grimoire-details');

    function renderGrimoire() {
        hexGrid.innerHTML = "";
        BASE_ELEMENTS.forEach(element => {
            const div = document.createElement('div');
            div.className = 'hex-item';
            div.innerHTML = `
                <div class="inner">
                    <div class="rune-preview">${translateImperatif(element)}</div>
                    <div class="element-name">${element}</div>
                </div>
            `;
            div.addEventListener('click', () => showCombinations(element, div));
            hexGrid.appendChild(div);
        });
    }

    function showCombinations(baseElement, activeDiv) {
        // Highlight active
        document.querySelectorAll('.hex-item').forEach(el => el.classList.remove('active'));
        activeDiv.classList.add('active');

        const combinations = ELEMENTS_DATA[baseElement];
        if (!combinations) return;

        let html = `<div class="combination-display">
            <h3>Combinaisons avec ${baseElement} <span class="combo-rune">${translateImperatif(baseElement)}</span></h3>`;

        for (const [modifier, result] of Object.entries(combinations)) {
            const resultRune = translateImperatif(result);
            html += `
                <div class="combo-row">
                    <span class="combo-element">+ ${modifier}</span>
                    <span class="combo-result">${result}</span>
                    <span class="combo-rune">${resultRune}</span>
                </div>
            `;
        }
        html += `</div>`;
        grimoireDetails.innerHTML = html;
    }

    // Initialize Grimoire
    renderGrimoire();

});

function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(text).then(() => {
        console.log('Copied!');
    });
}
