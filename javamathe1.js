// Funktion zur Durchführung mathematischer Berechnungen
function berechneMathe(benutzereingabe) {
    // Entferne Leerzeichen aus der Eingabe
    benutzereingabe = benutzereingabe.replace(/\s+/g, '');

    try {
        // Überprüfe, ob die Eingabe eine gültige mathematische Operation ist
        const ergebnis = eval(benutzereingabe);
        return `Das Ergebnis der Berechnung ${benutzereingabe} ist ${ergebnis}.`;
    } catch (error) {
        return "Entschuldigung, ich konnte diese Berechnung nicht verstehen. Bitte gib eine gültige mathematische Operation ein.";
    }
}

// Funktion zur Generierung der Antwort
async function generateResponse(userInput) {
    // Überprüfung, ob der Benutzer eine mathematische Frage stellt
    const matheKeywords = ["+", "-", "*", "/"];
    if (matheKeywords.some(keyword => userInput.includes(keyword))) {
        return berechneMathe(userInput);
    }

    // Weitere vordefinierte Antworten
    const responses = {
        "Hallo": "Hallo! Wie kann ich dir helfen?",
        "Wie geht es dir": "Mir geht es gut, danke! Wie kann ich dir helfen?",
        "Wer bist du": "Ich bin ein intelligenter Chatbot, der dir bei Fragen helfen kann.",
        "Auf Wiedersehen": "Auf Wiedersehen! Bis zum nächsten Mal.",
        "Was ist die Hauptstadt von Deutschland": "Die Hauptstadt von Deutschland ist Berlin."
    };

    // Überprüfung auf vorab definierte Antworten
    if (responses[userInput]) {
        return responses[userInput];
    }

    // Standardantwort, wenn keine vordefinierte Antwort gefunden wird
    return "Diese Frage kann ich leider nicht beantworten.";
}

// Funktion zum Senden einer Nachricht
async function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    if (!userInput) return;

    const chatBox = document.getElementById('chat-box');

    // Anzeige der Benutzernachricht
    const userMessage = document.createElement('div');
    userMessage.textContent = `Du: ${userInput}`;
    chatBox.appendChild(userMessage);

    // Textfeld leeren
    document.getElementById('user-input').value = '';

    // Generierung und Anzeige der ChatGPT-Antwort
    const botMessage = document.createElement('div');
    botMessage.textContent = `ChatGPT: ${await generateResponse(userInput)}`;
    chatBox.appendChild(botMessage);

    // Automatisches Scrollen zur neuesten Nachricht
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Ereignislistener zum Senden der Nachricht bei Eingabetaste
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
