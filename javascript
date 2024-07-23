// Funktion zum Senden der Nachricht
async function sendMessage() {
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
    const response = await generateResponse(userInput);
    botMessage.textContent = `Chatbot: ${response}`;
    chatBox.appendChild(botMessage);

    // Scrollen, um die neue Nachricht anzuzeigen
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Funktion zur Generierung der Antwort
async function generateResponse(userInput) {
    const lowerInput = userInput.toLowerCase();

    // Sprachprüfung
    const isEnglish = /[a-zA-Z]/.test(lowerInput) && !/[äöüß]/.test(lowerInput);

    // Vordefinierte Antworten auf Deutsch
    const responsesDe = {
        // ...
    };

    // Vordefinierte Antworten auf Englisch
    const responsesEn = {
        // ...
    };

    const responses = isEnglish ? responsesEn : responsesDe;
    const predefinedResponse = responses[lowerInput];

    if (predefinedResponse) {
        return typeof predefinedResponse === 'function' ? predefinedResponse() : predefinedResponse;
    }

    // Wenn keine vordefinierte Antwort gefunden wird, Übersetzung verwenden
    const translatedInput = await translateText(userInput, isEnglish ? 'en' : 'de');
    const translatedResponse = responses[translatedInput.toLowerCase()];

    return translatedResponse || (isEnglish ? "I'm sorry, I don't understand that." : "Es tut mir leid, das verstehe ich nicht.");
}

// Funktion zum Übersetzen von Text
async function translateText(text, targetLang) {
    const apiKey = 'YOUR_GOOGLE_CLOUD_API_KEY';
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            q: text,
            target: targetLang
        })
    });

    const data = await response.json();
    return data.data.translations[0].translatedText;
}

// Event-Listener für die Eingabetaste
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

document.getElementById('user-input').addEventListener('keypress', handleKeyPress);
