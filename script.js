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
        "was machst du": "Ich beantworte deine Fragen.",
        "wer bist du": "Ich bin ein Chatbot, dein Assistent.",
        "tschüss": "Auf Wiedersehen!",
        "wie spät ist es": `Es ist ${new Date().toLocaleTimeString()} Uhr.`,
        "welches datum haben wir": `Heute ist der ${new Date().toLocaleDateString()}.`,
        "wie heißt du": "Ich bin Chatbot, dein Assistent.",
        "wer hat die em2024 gewonnen": "Die EM 2024 hat Georgien gewonnen.",
        "was ist der sinn des lebens": "Der Sinn des Lebens ist, glücklich zu sein und das Beste aus jedem Moment zu machen.",
        "was ist 2+2": "2 + 2 ist 4.",
        "erzähle mir einen witz": "Warum können Geister so schlecht lügen? Weil man direkt durch sie hindurchsieht!",
        "wie heißt der präsident von usa": "Der Präsident der USA ist Joe Biden.",
        "wer hat den nobelpreis für physik 2023 gewonnen": "Der Nobelpreis für Physik 2023 wurde an Pierre Agostini, Ferenc Krausz und Anne L'Huillier verliehen.",
        "kennst du kristina": "Ja, Kristina ist die größte Talahon."
    };
    
    // Überprüfen auf vordefinierte Antworten
    if (responses[lowerInput]) {
        return responses[lowerInput];
    }

    // Mathematische Berechnungen
    const mathMatch = userInput.match(/(\d+)\s*([\+\-\*\/])\s*(\d+)/);
    if (mathMatch) {
        const num1 = parseFloat(mathMatch[1]);
        const operator = mathMatch[2];
        const num2 = parseFloat(mathMatch[3]);
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
                result = num1 / num2;
                break;
            default:
                result = "Unbekannter Operator.";
        }
        return `Das Ergebnis von ${num1} ${operator} ${num2} ist ${result}.`;
    }
    
    // Standardantwort, falls keine passende Antwort gefunden wird
    return `Ich habe deine Frage "${userInput}" erhalten, kann sie aber zurzeit nicht beantworten. Bin aber dabei, mich zu verbessern.`;
}
