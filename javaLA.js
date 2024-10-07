// Funktion zum Senden einer Nachricht
function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    if (!userInput) return;

    const chatBox = document.getElementById('chat-box');

    // Benutzer Nachricht anzeigen
    const userMessage = document.createElement('div');
    userMessage.textContent = `Du: ${userInput}`;
    chatBox.appendChild(userMessage);

    // Benutzer Eingabe zurücksetzen
    document.getElementById('user-input').value = '';

    // ChatGPT Antwort generieren und anzeigen
    const botMessage = document.createElement('div');
    botMessage.textContent = `ChatGPT: ${generateResponse(userInput)}`;
    chatBox.appendChild(botMessage);

    // Scrollen Sie nach unten, um die neue Nachricht anzuzeigen
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Funktion zum Generieren der Antwort
function generateResponse(userInput) {
    const lowerInput = userInput.toLowerCase();

    // Vordefinierte Antworten
    const responses = {
        "hallo": "Hallo! Wie kann ich dir helfen?",
        "hello": "Hello! How can I help you?",
        "wie geht's": "Mir geht es gut, danke! Und dir?",
        "how are you": "I'm good, thank you! How about you?",
        "was machst du": "Ich beantworte deine Fragen!",
        "what are you doing": "I'm here to answer your questions!",
        "wer bist du": "Ich bin ein Chatbot, der dir hilft.",
        "who are you": "I am a chatbot here to assist you.",
        "tschüss": "Auf Wiedersehen! Bis zum nächsten Mal.",
        "goodbye": "Goodbye! See you next time.",
        "wie spät ist es": `Es ist ${new Date().toLocaleTimeString()}.`,
        "what time is it": `The current time is ${new Date().toLocaleTimeString()}.`,
        "welches datum haben wir": `Heute ist der ${new Date().toLocaleDateString()}.`,
        "what is today's date": `Today's date is ${new Date().toLocaleDateString()}.`,
        "wer ist arina für luka": "Arina ist die größte Liebe von Luka, und Luka liebt Arina über alles. Sie ist seine kleine Prinzessin.",
        "who is arina to luka": "Arina is Luka's greatest love, and Luka loves her more than anything. She is his little princess."
    };

    // Überprüfen auf vordefinierte Antworten
    if (responses[lowerInput]) {
        return responses[lowerInput];
    }

    // Mathematische Berechnungen
    const mathMatch = userInput.match(/(\d+(\.\d+)?)\s*([\+\-\*\/])\s*(\d+(\.\d+)?)/);
    if (mathMatch) {
        const num1 = parseFloat(mathMatch[1]);
        const operator = mathMatch[3];
        const num2 = parseFloat(mathMatch[4]);
        let result;
        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num2 !== 0 ? num1 / num2 : "Fehler: Division durch Null";
                break;
            default:
                result = "Unbekannter Operator";
        }
        return `Das Ergebnis von ${num1} ${operator} ${num2} ist ${result}.`;
    }

    // Antwort, wenn keine passende Antwort gefunden wird
    return "Ich kann deine Frage zurzeit nicht beantworten, bin aber dabei, mich zu verbessern.";
}

// Funktion, um die Enter-Taste zum Senden der Nachricht zu verwenden
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
