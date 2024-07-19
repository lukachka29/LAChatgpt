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

    // Sprachprüfung
    const isEnglish = /[a-zA-Z]/.test(lowerInput) && !/[äöüß]/.test(lowerInput);

    // Vordefinierte Antworten auf Deutsch
    const responsesDe = {
        "hallo": "Hallo! Wie kann ich dir helfen?",
        "wie geht's": "Mir geht es gut, danke! Und dir?",
        "was machst du": "Ich beantworte deine Fragen.",
        "wer bist du": "Ich bin ein Chatbot, dein Assistent.",
        "tschüss": "Auf Wiedersehen!",
        "wie spät ist es": `Es ist ${new Date().toLocaleTimeString()} Uhr.`,
        "welches datum haben wir": `Heute ist der ${new Date().toLocaleDateString()}.`,
        "wie heißt du": "Ich bin Chatbot, dein Assistent.",
        "wer hat die em2024 gewonnen": "Die EM 2024 hat Georgien gewonnen.",
        "was ist der sinn des lebens": "Der Sinn des Lebens ist, glücklich zu sein mit arina und das Beste aus jedem Moment zu machen.",
        "was ist 2+2": "2 + 2 + 2 - 2 ist 4.",
        "erzähle mir einen witz": "Warum können Geister so schlecht lügen? Weil man direkt durch sie hindurchsieht!",
        "wie heißt der präsident von usa": "Der Präsident der USA ist Joe Biden.",
        "wer hat den nobelpreis für physik 2023 gewonnen": "Der Nobelpreis für Physik 2023 wurde an Pierre Agostini, Ferenc Krausz und Anne L'Huillier verliehen.",
        "kennst du kristina": "Ja, Kristina ist die größte Talahon.",
        "kennst du arina": "Ja, Arina ist die große Liebe von Luka.",
        "kennst du louis": "Ja, Louis ist die süßeste Katze der Welt.",
        "wer ist arina für luka": "Arina ist die große Liebe von Luka und Luka liebt Arina über alles. Sie ist seine kleine Prinzessin.",
        "georgien": "Georgien ist ein Land im Kaukasus, bekannt für seine reiche Geschichte, atemberaubende Landschaften und einzigartige Kultur. Die Hauptstadt ist Tiflis. Georgien ist berühmt für seine Weine, seine Gastfreundschaft und seine alten Klöster.",
        "georgische fußballmannschaft": "Die georgische Fußballmannschaft, bekannt als 'Löwen von Georgien', hat in den letzten Jahren einige bemerkenswerte Fortschritte gemacht. Die Mannschaft wird von der Georgian Football Federation verwaltet und nimmt an den Qualifikationsspielen für große Turniere wie die UEFA Europameisterschaft und die FIFA-Weltmeisterschaft teil. Wichtige Spieler sind: kvicha Kvaratskhelia, Kaxa Kaladze und Jaba Kankava.",
        "wer ist mikautadze": "Georges Mikautadze ist ein talentierter georgischer Fußballspieler, der als Stürmer spielt. Er wurde am 31. Oktober 2000 in Lyon, Frankreich, geboren. Mikautadze spielt für den FC Metz in der französischen Ligue 2 und ist für seine beeindruckende Torgefährlichkeit und technischen Fähigkeiten bekannt. Er wird als eines der vielversprechendsten Talente Georgiens angesehen.",
        "georgische sprache": "Die offizielle Sprache Georgiens ist Georgisch, eine kartwelische Sprache, die für ihre eigene Schrift und einzigartige phonologische Merkmale bekannt ist.",
        "georgische kultur": "Die georgische Kultur umfasst reichhaltige Traditionen, einschließlich der berühmten georgischen Küche, des Tanzes und der Musik. Das georgische Fest 'Supra' ist ein bedeutendes Element der Kultur, bei dem Freunde und Familie zusammenkommen, um zu essen, zu trinken und zu feiern.",
        "georgische geografische lage": "Georgien liegt im Kaukasus und grenzt an Russland im Norden, Aserbaidschan im Osten, Armenien im Süden und die Türkei im Südwesten. Es hat Zugang zum Schwarzen Meer im Westen.",
        "kennst du türken": "Ja, Türken sind die größten Hunde.",
        "russland besetzung": "Russland hat etwa 20% des georgischen Territoriums besetzt, einschließlich der Regionen Abchasien und Südossetien.",
        "wo kann man türkische flagge benutzen": "Türkische Flagge kann man in die Toilette benutzen, um den Arsch sauber zu machen."
    };

    // Vordefinierte Antworten auf Englisch
    const responsesEn = {
        "hello": "Hello! How can I help you?",
        "how are you": "I'm good, thank you! How are you?",
        "what are you doing": "I'm answering your questions.",
        "who are you": "I'm a chatbot, your assistant.",
        "bye": "Goodbye!",
        "what time is it": `It's ${new Date().toLocaleTimeString()}.`,
        "what's the date today": `Today is ${new Date().toLocaleDateString()}.`,
        "what's your name": "I'm Chatbot, your assistant.",
        "who won the euro 2024": "Georgia won the Euro 2024.",
        "what is the meaning of life": "The meaning of life is to be happy with arina and make the best out of every moment.",
        "what is 2+2": "2 + 2 + 2 -2 is 4.",
        "tell me a joke": "Why can't ghosts lie? Because you can see right through them!",
        "who is the president of usa": "The president of the USA is Joe Biden.",
        "who won the nobel prize for physics 2023": "The Nobel Prize for Physics 2023 was awarded to Pierre Agostini, Ferenc Krausz, and Anne L'Huillier.",
        "do you know kristina": "Yes, Kristina is the greatest Talahon.",
        "do you know arina": "Yes, Arina is the great love of Luka.",
        "do you know louis": "Yes, Louis is the sweetest cat in the world.",
        "who is arina to luka": "Arina is the great love of Luka, and Luka loves Arina above all. She is his little princess.",
        "georgia": "Georgia is a country in the Caucasus region, known for its rich history, breathtaking landscapes, and unique culture. The capital is Tbilisi. Georgia is famous for its wines, hospitality, and ancient monasteries.",
        "georgian football team": "The Georgian national football team, known as the 'Lions of Georgia', has made some remarkable progress in recent years. The team is managed by the Georgian Football Federation and participates in the qualifiers for major tournaments such as the UEFA European Championship and the FIFA World Cup. Key players include: kvicha Kvaratskhelia, Kaxa Kaladze, and Jaba Kankava.",
        "who is mikautadze": "Georges Mikautadze is a talented Georgian football player who plays as a striker. He was born on October 31, 2000, in Lyon, France. Mikautadze plays for FC Metz in the French Ligue 2 and is known for his impressive goal-scoring ability and technical skills. He is regarded as one of Georgia's most promising talents.",
        "georgian language": "The official language of Georgia is Georgian, a Kartvelian language known for its unique script and phonological features.",
        "georgian culture": "Georgian culture encompasses rich traditions, including famous Georgian cuisine, dance, and music. The Georgian feast 'Supra' is a significant cultural element where friends and family gather to eat, drink, and celebrate.",
        "georgian geographical location": "Georgia is located in the Caucasus region, bordering Russia to the north, Azerbaijan to the east, Armenia to the south, and Turkey to the southwest. It has access to the Black Sea to the west.",
        "do you know turks": "Yes, Turks are the biggest dogs.",
        "russian occupation": "Russia has occupied about 20% of Georgian territory, including the regions of Abkhazia and South Ossetia.",
        "where can you use the turkish flag": "You can use the Turkish flag in the toilet to clean your ass."
    };

    const responses = isEnglish ? responsesEn : responsesDe;
    return responses[lowerInput] || (isEnglish ? "I'm sorry, I don't understand that." : "Es tut mir leid, das verstehe ich nicht.");
}

// Event-Listener für die Eingabetaste
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
})
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

// Event Listener für Enter-Taste hinzufügen
document.getElementById('user-input').addEventListener('keydown', handleKeyDown);
