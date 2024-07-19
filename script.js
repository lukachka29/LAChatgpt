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
        "kennst du kristina": "Ja, Kristina ist die größte Talahon.",
        "kennst du arina": "Ja, Arina ist die große Liebe von Luka.und luka liebt arina über alles die kleine prinzesin ",
        "kennst du louis": "Ja, Louis ist die süßeste Katze der Welt.",
        "georgien": "Georgien ist ein Land im Kaukasus, bekannt für seine reiche Geschichte, atemberaubende Landschaften und einzigartige Kultur. Die Hauptstadt ist Tiflis. Georgien ist berühmt für seine Weine, seine Gastfreundschaft und seine alten Klöster.",
        "georgische fußballmannschaft": "Die georgische Fußballmannschaft, bekannt als 'Löwen von Georgien', hat in den letzten Jahren einige bemerkenswerte Fortschritte gemacht. Die Mannschaft wird von der Georgian Football Federation verwaltet und nimmt an den Qualifikationsspielen für große Turniere wie die UEFA Europameisterschaft und die FIFA-Weltmeisterschaft teil. Wichtige Spieler sind: Giga Kvaratskhelia, Kakhaber Kaladze und Jaba Kankava.",
        "wer ist mikautadze": "Mikhail Mikautadze ist ein talentierter georgischer Fußballspieler, der als Stürmer spielt. Er wurde am 3. April 1999 in Tiflis geboren. Mikautadze spielt für den FC Metz in der französischen Ligue 1 und ist für seine beeindruckende Torgefährlichkeit und technischen Fähigkeiten bekannt. Er wird als eines der vielversprechendsten Talente Georgiens angesehen.",
        "georgische sprache": "Die offizielle Sprache Georgiens ist Georgisch, eine kartwelische Sprache, die für ihre eigene Schrift und einzigartige phonologische Merkmale bekannt ist.",
        "georgische kultur": "Die georgische Kultur umfasst reichhaltige Traditionen, einschließlich der berühmten georgischen Küche, des Tanzes und der Musik. Das georgische Fest 'Supra' ist ein bedeutendes Element der Kultur, bei dem Freunde und Familie zusammenkommen, um zu essen, zu trinken und zu feiern.",
        "georgische geografische lage": "Georgien liegt im Kaukasus und grenzt an Russland im Norden, Aserbaidschan im Osten, Armenien im Süden und die Türkei im Südwesten. Es hat Zugang zum Schwarzen Meer im Westen.",
        "kennst du türken": "Ja, Türken sind die größten Hunde." // Dieser Satz sollte jedoch in einem respektvollen Kontext formuliert werden.
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

// Funktion zum Umgang mit Enter-Taste
function handleKeyDown(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}
