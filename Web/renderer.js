
class MagicCircleRenderer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.center = { x: this.width / 2, y: this.height / 2 };

        // Configuration
        this.colors = {
            "FEU": "#ff4d4d", // Rouge
            "EAU": "#4d94ff", // Bleu
            "AIR": "#e6e6e6", // Blanc/Gris
            "TERRE": "#8c5523", // Marron
            "LUMIERE": "#ffff99", // Jaune pâle
            "TENEBRE": "#2e004f", // Violet très sombre
            "DEFAULT": "#d4af37" // Or
        };

        this.fonts = {
            phoenician: "40px 'Noto Sans Phoenician', 'Noto Sans Egyptian Hieroglyphs', sans-serif",
            runic: "24px 'Noto Sans Phoenician', 'Noto Sans Egyptian Hieroglyphs', sans-serif",
            label: "16px 'Cinzel', serif"
        };
    }

    draw(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.ctx.save();

            // Background glow
            this.ctx.fillStyle = "#0a0a0d";
            this.ctx.fillRect(0, 0, this.width, this.height);

            // 1. Source (Center)
            this.drawSource(data.source);

            // 2. Flux (Spiral) & Orbitals Placement
            // New Logic: Continuous Spiral from Center to Perimeter
            const startRadius = 40; // Exact match to source radius
            const endRadius = 250;  // Matches perimeter radius
            const direction = (data.flux && data.flux.type.includes("ANTI")) ? -1 : 1;

            // Calculate Spiral Path
            const spiralPath = this.calculateSpiralPath(startRadius, endRadius, direction, data.sequence_assemblage.length);

            // Draw Flux Line
            this.drawFluxSpiral(spiralPath);

            // Draw Elements at calculated positions
            this.drawElementsOnSpiral(data.sequence_assemblage, spiralPath);

            // 3. Perimeter
            const perimeterRadius = endRadius; // Sync with spiral end
            if (data.perimetre) {
                this.drawPerimeter(data.perimetre, perimeterRadius);
            }

            this.ctx.restore();
        } catch (e) {
            console.error(e);
            alert("Erreur JSON: " + e.message);
        }
    }

    drawSource(source) {
        const { x, y } = this.center;
        const radius = 40;

        // Circle
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.strokeStyle = this.colors.DEFAULT;
        this.ctx.lineWidth = 3;
        this.ctx.stroke();

        // Symbol
        let char = source.symbole;
        if (char && char.includes('(')) {
            char = char.match(/\((.*?)\)/)[1];
        }

        this.ctx.fillStyle = this.colors.DEFAULT;
        this.ctx.font = this.fonts.phoenician;
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(char, x, y + 5);
    }

    calculateSpiralPath(startRadius, endRadius, direction, elementCount) {
        // Archimedean Spiral: r = a + b * theta
        // We want to go from startRadius to endRadius.
        // Number of turns: depends on element count to give them space.
        // Base turns = 2. Extra turns if many elements.
        const turns = 2 + (elementCount > 4 ? 1 : 0);
        const totalAngle = Math.PI * 2 * turns;

        const path = [];
        const step = 0.05; // Precision

        // b = (r_end - r_start) / total_theta
        const b = (endRadius - startRadius) / totalAngle;

        for (let theta = 0; theta <= totalAngle; theta += step) {
            const r = startRadius + b * theta;
            // Angle adjustment for direction and starting orientation (-PI/2 is top)
            const globalAngle = -Math.PI / 2 + (theta * direction);

            path.push({
                x: this.center.x + Math.cos(globalAngle) * r,
                y: this.center.y + Math.sin(globalAngle) * r,
                r: r,
                theta: theta, // Local theta (0 to totalAngle)
                globalAngle: globalAngle
            });
        }

        // Calculate Element Positions
        // We distribute them evenly along the spiral length (by theta)
        // We skip the very beginning and very end to avoid crowding source/wall
        const elementPositions = [];
        if (elementCount > 0) {
            // Divide the total angle into (count + 1) segments
            const angleStep = totalAngle / (elementCount + 1);

            for (let i = 1; i <= elementCount; i++) {
                const targetTheta = i * angleStep;
                // Find point in path closest to this theta
                const point = path.find(p => p.theta >= targetTheta) || path[path.length - 1];
                elementPositions.push(point);
            }
        }

        return { path, elementPositions };
    }

    drawFluxSpiral(spiralData) {
        if (!spiralData || !spiralData.path.length) return;

        this.ctx.beginPath();
        this.ctx.strokeStyle = this.colors.DEFAULT;
        this.ctx.lineWidth = 2;

        const path = spiralData.path;
        this.ctx.moveTo(path[0].x, path[0].y);

        for (let i = 1; i < path.length; i++) {
            this.ctx.lineTo(path[i].x, path[i].y);
        }

        this.ctx.stroke();
    }

    drawElementsOnSpiral(sequence, spiralData) {
        if (!sequence || sequence.length === 0) return;

        const positions = spiralData.elementPositions;

        sequence.forEach((item, index) => {
            if (positions[index]) {
                const pos = positions[index];
                this.drawElementNode(item, pos.x, pos.y);
            }
        });
    }

    drawElementNode(item, x, y) {
        const size = 30; // Radius of shape

        // 1. Draw Container Circle
        this.ctx.beginPath();
        this.ctx.arc(x, y, size + 8, 0, Math.PI * 2); // Slightly larger than shape
        this.ctx.strokeStyle = this.colors.DEFAULT;
        this.ctx.lineWidth = 1;
        this.ctx.stroke();

        // Clear background inside container so spiral doesn't cut through
        this.ctx.save();
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.fillStyle = "#000";
        this.ctx.fill();
        this.ctx.restore();


        if (item.type === "INTRICATION" && item.modificateur) {
            // Draw Modifier (Outer/Big)
            const modColor = this.colors[item.modificateur] || this.colors.DEFAULT;
            this.drawShape(item.modificateur, x, y, size, modColor, false);

            // Draw Base (Inner/Small)
            // No fill, just contours
            const baseColor = this.colors[item.base] || "#fff";
            this.drawShape(item.base, x, y, size * 0.5, baseColor, false);
        } else {
            // Simple Element
            const color = this.colors[item.base] || this.colors.DEFAULT;
            // No fill, just contours
            this.drawShape(item.base, x, y, size, color, false);
        }

        // Label
        this.ctx.fillStyle = "#fff";
        this.ctx.font = "12px 'Inter'";
        this.ctx.textAlign = "center";
        this.ctx.fillText(item.resultat || item.base, x, y + size + 20);
    }

    drawShape(element, x, y, size, color, fill) {
        this.ctx.save();
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();

        switch (element) {
            case "FEU": // Triangle Up
                this.ctx.moveTo(x, y - size);
                this.ctx.lineTo(x + size, y + size);
                this.ctx.lineTo(x - size, y + size);
                this.ctx.closePath();
                break;
            case "EAU": // Triangle Down
                this.ctx.moveTo(x - size, y - size);
                this.ctx.lineTo(x + size, y - size);
                this.ctx.lineTo(x, y + size);
                this.ctx.closePath();
                break;
            case "TERRE": // Square
                this.ctx.rect(x - size, y - size, size * 2, size * 2);
                break;
            case "AIR": // Diamond
                this.ctx.moveTo(x, y - size);
                this.ctx.lineTo(x + size, y);
                this.ctx.lineTo(x, y + size);
                this.ctx.lineTo(x - size, y);
                this.ctx.closePath();
                break;
            case "LUMIERE": // Pentagon Up
                this.drawPolygon(x, y, size, 5, -Math.PI / 2);
                break;
            case "TENEBRE": // Pentagon Down
                this.drawPolygon(x, y, size, 5, Math.PI / 2);
                break;
            default:
                this.ctx.arc(x, y, size, 0, Math.PI * 2);
        }

        this.ctx.stroke();
        if (fill) {
            this.ctx.fillStyle = color;
            this.ctx.fill();
        } else {
            this.ctx.fillStyle = color;
            this.ctx.globalAlpha = 0.1;
            this.ctx.fill();
        }
        this.ctx.restore();
    }

    drawPolygon(x, y, radius, sides, startAngle) {
        const step = (Math.PI * 2) / sides;
        for (let i = 0; i < sides; i++) {
            const angle = startAngle + step * i;
            const px = x + Math.cos(angle) * radius;
            const py = y + Math.sin(angle) * radius;
            if (i === 0) this.ctx.moveTo(px, py);
            else this.ctx.lineTo(px, py);
        }
        this.ctx.closePath();
    }

    drawPerimeter(perimetre, radius) {
        const { x, y } = this.center;

        // Inner Circle
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.strokeStyle = this.colors.DEFAULT;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        // Sealing Circle (Outer)
        // If Runes are present, we MUST have a sealing circle to contain them.
        if (perimetre.scellement || (perimetre.runes && perimetre.runes.length > 0)) {
            this.ctx.beginPath();
            this.ctx.arc(x, y, radius + 40, 0, Math.PI * 2);
            this.ctx.strokeStyle = this.colors.DEFAULT;
            this.ctx.lineWidth = 4;
            this.ctx.stroke();
        }

        // Circular Runes
        if (perimetre.runes && perimetre.runes.length > 0) {
            const runesText = perimetre.runes.map(r => {
                let s = r.rune || r;
                if (typeof window.translateImperatif === 'function') {
                    s = window.translateImperatif(s);
                } else if (typeof translateImperatif === 'function') {
                    s = translateImperatif(s);
                }
                if (r.arg) s += " " + this.convertNumberToHieroglyph(r.arg);
                return s;
            }).join(" • ");

            this.ctx.save();
            this.ctx.font = this.fonts.runic;
            this.ctx.fillStyle = this.colors.DEFAULT;
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";

            // Use Array.from to correctly split by code points (handling surrogate pairs for Hieroglyphs)
            const chars = Array.from(runesText);
            const angleStep = 0.12;
            const totalAngle = chars.length * angleStep;
            let startAngle = -Math.PI / 2 - (totalAngle / 2); // Center around top

            const textRadius = radius + 20;

            chars.forEach((char, i) => {
                const angle = startAngle + (i * angleStep);

                this.ctx.save();
                this.ctx.translate(
                    x + Math.cos(angle) * textRadius,
                    y + Math.sin(angle) * textRadius
                );
                this.ctx.rotate(angle + Math.PI / 2);
                this.ctx.fillText(char, 0, 0);
                this.ctx.restore();
            });
            this.ctx.restore();
        }
    }

    convertNumberToHieroglyph(num) {
        let s = "";
        while (num >= 100) { s += "𓍢"; num -= 100; }
        while (num >= 10) { s += "𓎆"; num -= 10; }
        while (num >= 1) { s += "𓏤"; num -= 1; }
        return s;
    }
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    // Check if fonts are ready. If using Google Fonts, they should load quickly.
    // The browser automatically eventually fires this promise.
    document.fonts.ready.then(() => {
        const renderer = new MagicCircleRenderer('circle-canvas');
        const btn = document.getElementById('btn-draw');
        const input = document.getElementById('json-input');

        if (btn) {
            btn.addEventListener('click', () => {
                renderer.draw(input.value);
            });
        }
    });
});
