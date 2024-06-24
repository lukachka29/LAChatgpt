// Funktion zum Senden der Nachricht
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

    // ChatGPT Nachricht anzeigen
    const botMessage = document.createElement('div');
    botMessage.textContent = `ChatGPT: ${generateResponse(userInput)}`;
    chatBox.appendChild(botMessage);

    // Scrollen Sie nach unten, um die neue Nachricht anzuzeigen
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Funktion zur Generierung der Antwort
function generateResponse(userInput) {
    const lowerInput = userInput.toLowerCase();
    
    // Überprüfen auf Hauptstädte
    if (capitals[lowerInput]) {
        return `Die Hauptstadt von ${capitalizeFirstLetter(lowerInput)} ist ${capitals[lowerInput]}.`;
    }
    
    // Vordefinierte Antworten
    const responses = {
        "hallo": "Hallo! Wie kann ich dir helfen?",
        "wie geht's": "Mir geht es gut, danke! Und dir?",
        "was machst du": "Ich antworte auf deine Fragen!",
        "wer bist du": "Ich bin ein Chatbot, der dir hilft.",
        "tschüss": "Auf Wiedersehen! Bis zum nächsten Mal.",
        "wie spät ist es": `Es ist ${getTimeInGerman()}.`,
        "welches datum haben wir": `Heute ist der ${getGermanDate()}.`,
        "wie heißt du": "Ich bin ChatGPT, dein persönlicher Assistent.",
        "kennst du alex": "Ja, Alex ist ein Hund."
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
                result = "Unbekannter Operator";
        }
        return `Das Ergebnis von ${num1} ${operator} ${num2} ist ${result}.`;
    }
    
    // Standardantwort, falls keine passende Antwort gefunden wird
    return "Kann deine Frage zurzeit nicht beantworten, bin aber dabei, mich zu verbessern.";
}

// Hilfsfunktion, um den ersten Buchstaben zu groß zu machen
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Funktion, um die aktuelle Uhrzeit auf Deutsch anzuzeigen
function getTimeInGerman() {
    const now = new Date();
    const options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
        timeZone: 'Europe/Berlin'
    };
    return now.toLocaleTimeString('de-DE', options);
}

// Funktion, um das aktuelle Datum auf Deutsch anzuzeigen
function getGermanDate() {
    const now = new Date();
    const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };
    return now.toLocaleDateString('de-DE', options);
}

// Liste der Hauptstädte und Länder
const capitals = {
    "afghanistan": "Kabul",
    "albania": "Tirana",
    "algeria": "Algiers",
    "andorra": "Andorra la Vella",
    "angola": "Luanda",
    "antigua and barbuda": "Saint John's",
    "argentina": "Buenos Aires",
    "armenia": "Yerevan",
    "australia": "Canberra",
    "austria": "Vienna",
    "azerbaijan": "Baku",
    "bahamas": "Nassau",
    "bahrain": "Manama",
    "bangladesh": "Dhaka",
    "barbados": "Bridgetown",
    "belarus": "Minsk",
    "belgium": "Brussels",
    "belize": "Belmopan",
    "benin": "Porto-Novo",
    "bhutan": "Thimphu",
    "bolivia": "Sucre",
    "bosnia and herzegovina": "Sarajevo",
    "botswana": "Gaborone",
    "brazil": "Brasília",
    "brunei": "Bandar Seri Begawan",
    "bulgaria": "Sofia",
    "burkina faso": "Ouagadougou",
    "burundi": "Gitega",
    "cabo verde": "Praia",
    "cambodia": "Phnom Penh",
    "cameroon": "Yaoundé",
    "canada": "Ottawa",
    "central african republic": "Bangui",
    "chad": "N'Djamena",
    "chile": "Santiago",
    "china": "Beijing",
    "colombia": "Bogotá",
    "comoros": "Moroni",
    "congo": "Kinshasa",
    "costa rica": "San José",
    "croatia": "Zagreb",
    "cuba": "Havana",
    "cyprus": "Nicosia",
    "czech republic": "Prague",
    "denmark": "Copenhagen",
    "djibouti": "Djibouti",
    "dominica": "Roseau",
    "dominican republic": "Santo Domingo",
    "east timor": "Dili",
    "ecuador": "Quito",
    "egypt": "Cairo",
    "el salvador": "San Salvador",
    "equatorial guinea": "Malabo",
    "eritrea": "Asmara",
    "estonia": "Tallinn",
    "eswatini": "Mbabane",
    "ethiopia": "Addis Ababa",
    "fiji": "Suva",
    "finland": "Helsinki",
    "france": "Paris",
    "gabon": "Libreville",
    "gambia": "Banjul",
    "georgia": "Tbilisi",
    "germany": "Berlin",
    "ghana": "Accra",
    "greece": "Athens",
    "grenada": "St. George's",
    "guatemala": "Guatemala City",
    "guinea": "Conakry",
    "guinea-bissau": "Bissau",
    "guyana": "Georgetown",
    "haiti": "Port-au-Prince",
    "honduras": "Tegucigalpa",
    "hungary": "Budapest",
    "iceland": "Reykjavik",
    "india": "New Delhi",
    "indonesia": "Jakarta",
    "iran": "Tehran",
    "iraq": "Baghdad",
    "ireland": "Dublin",
    "israel": "Jerusalem",
    "italy": "Rome",
    "ivory coast": "Yamoussoukro",
    "jamaica": "Kingston",
    "japan": "Tokyo",
    "jordan": "Amman",
    "kazakhstan": "Nur-Sultan",
    "kenya": "Nairobi",
    "kiribati": "Tarawa",
    "kosovo": "Pristina",
    "kuwait": "Kuwait City",
    "kyrgyzstan": "Bishkek",
    "laos": "Vientiane",
    "latvia": "Riga",
    "lebanon": "Beirut",
};