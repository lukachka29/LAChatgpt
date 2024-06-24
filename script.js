// Funktion zum Senden der Nachricht
function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    if (!userInput) return;

    const chatBox = document.getElementById('chat-box');
    
    // Benutzer Nachricht anzeigen
    const userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user-message');
    userMessage.textContent = `Du: ${userInput}`;
    chatBox.appendChild(userMessage);

    // Benutzer Eingabe zurücksetzen
    document.getElementById('user-input').value = '';

    // Chatbot Nachricht anzeigen
    const botMessage = document.createElement('div');
    botMessage.classList.add('message', 'bot-message');
    botMessage.textContent = `Chatbot: ${generateResponse(userInput)}`;
    chatBox.appendChild(botMessage);

    // Scrollen, um die neue Nachricht anzuzeigen
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Funktion zur Generierung der Antwort
function generateResponse(userInput) {
    const lowerInput = userInput.toLowerCase();
    
    // Vordefinierte Antworten
    const responses = {
        "hallo": "Hallo! Wie kann ich dir helfen?",
        "wie geht's": "Mir geht es gut, danke! Und dir?",
        "was machst du": "Ich bin ein Chatbot, der dir Fragen beantwortet.",
        "wer bist du": "Ich bin ein Chatbot.",
        "tschüss": "Auf Wiedersehen!",
        "wie spät ist es": `Es ist ${new Date().toLocaleTimeString()} Uhr.`,
        "welches datum haben wir": `Heute ist der ${new Date().toLocaleDateString()}.`,
        "wie heißt du": "Ich bin Chatbot, dein Assistent."
    };
    
    // Überprüfen auf vordefinierte Antworten
    if (responses[lowerInput]) {
        return responses[lowerInput];
    }

    // Standardantwort, falls keine passende Antwort gefunden wird
    return "Entschuldigung, ich verstehe deine Frage nicht.";
}
