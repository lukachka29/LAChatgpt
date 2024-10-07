// Funktion zum Abrufen von Informationen über Länder aus der REST Countries API
async function getCountryInfo(countryName) {
    const apiUrl = `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`;

    try {
        const response = await fetch(apiUrl);
        const countryData = await response.json();

        if (countryData && countryData.length > 0) {
            const country = countryData[0];
            return `ქვეყანა: ${country.name.common}
დედაქალაქი: ${country.capital ? country.capital[0] : 'ინფორმაცია არ არის'}
მოსახლეობა: ${country.population.toLocaleString()}
რეგიონი: ${country.region}
ქვერგეგიონი: ${country.subregion}
ენა(ები): ${country.languages ? Object.values(country.languages).join(', ') : 'ინფორმაცია არ არის'}
ვალუტა: ${country.currencies ? Object.values(country.currencies)[0].name : 'ინფორმაცია არ არის'} (${country.currencies ? Object.values(country.currencies)[0].symbol : ''})
ფართობი: ${country.area.toLocaleString()} კმ²`;
        } else {
            return "ვერ ვიპოვე ინფორმაცია ამ ქვეყნის შესახებ.";
        }
    } catch (error) {
        return "ქვეყნის ინფორმაციის მიღებისას შეცდომა მოხდა.";
    }
}

// Funktion zur Verarbeitung komplexerer mathematischer Berechnungen
function calculateExpression(expression) {
    try {
        const result = eval(expression);
        return `გამოთვლის შედეგია: ${result}`;
    } catch (error) {
        return "მათემატიკური გამოთვლა ვერ განხორციელდა.";
    }
}

// Funktion zum Generieren der Antwort
async function generateResponse(userInput) {
    // Erweiterte Antworten auf georgische Fragen
    const responses = {
        "გამარჯობა": "გამარჯობა! რით შემიძლია დაგეხმარო?",
        "როგორ ხარ": "კარგად ვარ, გმადლობთ! თქვენ როგორ ხართ?",
        "ვინ ხარ შენ": "მე ვარ ჭკვიანი ჩეთბოტი, რომელიც დაგეხმარებათ.",
        "ნახვამდის": "ნახვამდის! შეხვედრამდე.",
        "ვინ მოიგო ევრო 2024": "ევრო 2024 მოიგო გერმანიამ.",
        "ვინ არის არინა ლუკასთვის": "არინა არის ლუკას უდიდესი სიყვარული და ლუკა მას ძალიან უყვარს. ის მისი პატარა პრინცესაა.",
        "გიცნია არინა": "დიახ, არინა არის ლუკას დიდი სიყვარული და ლუკა მას ყველაფერზე მეტად უყვარს.",
        "გიცნია ლუისი": "დიახ, ლუისი არის ყველაზე ტკბილი კატა მსოფლიოში.",
        "გიცნია თურქები": "დიახ, თურქები არიან სტუმართმოყვარე ხალხი.",
        "რა არის საქართველოს დედაქალაქი": "საქართველოს დედაქალაქია თბილისი.",
        "როდის დაარსდა საქართველო": "საქართველო დაარსდა როგორც ერთიანი სახელმწიფო დაახლოებით 4-ე საუკუნეში.",
        "ვინ არის საქართველოს პრეზიდენტი": "საქართველოს პრეზიდენტია სალომე ზურაბიშვილი.",
        "რა არის საქართველოს ეროვნული ენა": "საქართველოს ეროვნული ენა არის ქართული."
    };

    // Überprüfung auf vorab definierte Antworten
    if (responses[userInput]) {
        return responses[userInput];
    }

    // Überprüfung auf mathematische Berechnungen mit eval
    const mathMatch = userInput.match(/[-+*/()0-9\s.]+/);
    if (mathMatch && mathMatch[0] === userInput) {
        return calculateExpression(userInput);
    }

    // Wenn Antwort nicht gefunden wird, geben Sie eine Standardantwort zurück
    return "ამ კითხვაზე პასუხის გაცემა არ შემიძლია.";
}

// Funktion zum Senden einer Nachricht
async function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    if (!userInput) return;

    const chatBox = document.getElementById('chat-box');

    // Anzeige der Benutzernachricht
    const userMessage = document.createElement('div');
    userMessage.textContent = `თქვენ: ${userInput}`;
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
