// Funktion zum Abrufen von Informationen über Länder aus der REST Countries API
async function getCountryInfo(countryName) {
    const apiUrl = `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`;

    try {
        const response = await fetch(apiUrl);
        const countryData = await response.json();

        if (countryData && countryData.length > 0) {
            const country = countryData[0];
            return `Land: ${country.name.common}
Hauptstadt: ${country.capital ? country.capital[0] : 'Keine Information'}
Bevölkerung: ${country.population.toLocaleString()}
Region: ${country.region}
Unterregion: ${country.subregion}
Sprache(n): ${country.languages ? Object.values(country.languages).join(', ') : 'Keine Information'}
Währung: ${country.currencies ? Object.values(country.currencies)[0].name : 'Keine Information'} (${country.currencies ? Object.values(country.currencies)[0].symbol : ''})
Fläche: ${country.area.toLocaleString()} km²`;
        } else {
            return "Ich konnte keine Informationen zu diesem Land finden.";
        }
    } catch (error) {
        return "Fehler beim Abrufen der Länderinformationen.";
    }
}

// Funktion zur Spracherkennung
function detectLanguage(input) {
    const georgianAlphabet = /[ა-ჰ]/;
    if (georgianAlphabet.test(input)) {
        return 'georgian';
    } else if (/[a-zA-Z]/.test(input)) {
        return 'english';
    } else {
        return 'german';
    }
}

// Funktion zum Generieren der Antwort
async function generateResponse(userInput) {
    const language = detectLanguage(userInput.toLowerCase());

    // Überprüfen, ob der Benutzer nach einem Land fragt
    if (userInput.toLowerCase().startsWith('info über') || userInput.toLowerCase().startsWith('information about')) {
        const countryName = userInput.split(' ').slice(2).join(' ');
        return await getCountryInfo(countryName);
    }

    // Vordefinierte Antworten in verschiedenen Sprachen
    const responses = {
        "german": {
            "hallo": "Hallo! Wie kann ich dir helfen?",
            "wie geht's": "Mir geht es gut, danke! Und dir?",
            "wer bist du": "Ich bin ein intelligenter Chatbot, der dir hilft.",
            "tschüss": "Auf Wiedersehen! Bis zum nächsten Mal.",
            "wer hat die EM2024 gewonnen": "Die EM 2024 wurde von Deutschland gewonnen."
        },
        "english": {
            "hello": "Hello! How can I help you?",
            "how are you": "I'm doing great, thank you! How about you?",
            "who are you": "I am a smart chatbot here to assist you.",
            "bye": "Goodbye! See you next time.",
            "who won the Euro 2024": "The Euro 2024 was won by Germany."
        },
        "georgian": {
            "გამარჯობა": "გამარჯობა! რით შემიძლია დაგეხმარო?",
            "როგორ ხარ": "კარგად ვარ, გმადლობთ! თქვენ როგორ ხართ?",
            "ვინ ხარ შენ": "მე ვარ ჭკვიანი ჩეთბოტი, რომელიც დაგეხმარებათ.",
            "ნახვამდის": "ნახვამდის! შეხვედრამდე.",
            "ვინ მოიგო ევრო 2024": "ევრო 2024 მოიგო გერმანიამ."
        }
    };

    // Überprüfen auf vordefinierte Antworten in der erkannten Sprache
    if (responses[language][userInput.toLowerCase()]) {
        return responses[language][userInput.toLowerCase()];
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
                result = "Unbekannter Operator";
        }
        return `Das Ergebnis von ${num1} ${operator} ${num2} ist ${result}.`;
    }

    // Standardantwort, falls keine passende Antwort gefunden wird
    return language === 'georgian' ? "არ შემიძლია ამ კითხვაზე პასუხის გაცემა." : 
           language === 'english' ? "I cannot answer that question right now." : 
           "Ich kann diese Frage zurzeit nicht beantworten.";
}

// Funktion zum Senden einer Nachricht bei der Benutzerinteraktion
async function sendMessage() {
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
    botMessage.textContent = `ChatGPT: ${await generateResponse(userInput)}`;
    chatBox.appendChild(botMessage);

    // Scrollen, um die neue Nachricht anzuzeigen
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Eventlistener hinzufügen, um Nachricht mit Enter-Taste zu senden
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
