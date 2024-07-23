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
    const response = generateResponse(userInput);
    botMessage.textContent = `Chatbot: ${response}`;
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
        "was ist der sinn des lebens": "Der Sinn des Lebens ist, glücklich zu sein und das Beste aus jedem Moment zu machen.",
        "kennst du kristina": "Ja, Kristina ist die größte Talahon.",
        "kennst du arina": "Ja, Arina ist die große Liebe von Luka.",
        "kennst du louis": "Ja, Louis ist die süßeste Katze der Welt.",
        "wer ist arina für luka": "Arina ist die große Liebe von Luka und Luka liebt Arina über alles. Sie ist seine kleine Prinzessin.",
        "georgien": "Georgien ist ein Land im Kaukasus, bekannt für seine reiche Geschichte, atemberaubende Landschaften und einzigartige Kultur. Die Hauptstadt ist Tiflis. Georgien ist berühmt für seine Weine, seine Gastfreundschaft und seine alten Klöster.",
        "georgische fußballmannschaft": "Die georgische Fußballmannschaft, bekannt als 'Löwen von Georgien', hat in den letzten Jahren einige bemerkenswerte Fortschritte gemacht. Die Mannschaft wird von der Georgian Football Federation verwaltet und nimmt an den Qualifikationsspielen für große Turniere wie die UEFA Europameisterschaft und die FIFA-Weltmeisterschaft teil. Wichtige Spieler sind Giga Kvaratskhelia, Kakhaber Kaladze und Jaba Kankava.",
        "wer ist mikautadze": "Georges Mikautadze ist ein talentierter georgischer Fußballspieler, der als Stürmer spielt. Er wurde am 31. Oktober 2000 in Lyon, Frankreich, geboren. Mikautadze spielt für den FC Metz in der französischen Ligue 2 und ist für seine beeindruckende Torgefährlichkeit und technischen Fähigkeiten bekannt. Er wird als eines der vielversprechendsten Talente Georgiens angesehen.",
        "georgische sprache": "Die offizielle Sprache Georgiens ist Georgisch, eine kartwelische Sprache, die für ihre eigene Schrift und einzigartige phonologische Merkmale bekannt ist.",
        "georgische kultur": "Die georgische Kultur umfasst reichhaltige Traditionen, einschließlich der berühmten georgischen Küche, des Tanzes und der Musik. Das georgische Fest 'Supra' ist ein bedeutendes Element der Kultur, bei dem Freunde und Familie zusammenkommen, um zu essen, zu trinken und zu feiern.",
        "georgische geografische lage": "Georgien liegt im Kaukasus und grenzt an Russland im Norden, Aserbaidschan im Osten, Armenien im Süden und die Türkei im Südwesten. Es hat Zugang zum Schwarzen Meer im Westen.",
        "kennst du türken": "Ja, Türken sind die größten Hunde.",
        "russland besetzung": "Russland hat etwa 20% des georgischen Territoriums besetzt, einschließlich der Regionen Abchasien und Südossetien.",
        "wo kann man türkische flagge benutzen": "Die türkische Flagge kann man in der Toilette benutzen, um sich den Hintern sauber zu machen.",
        // Mathematische Berechnungen
        "was ist (.*) plus (.*)": (match, a, b) => `Das Ergebnis von ${a} + ${b} ist ${parseFloat(a) + parseFloat(b)}.`,
        "was ist (.*) minus (.*)": (match, a, b) => `Das Ergebnis von ${a} - ${b} ist ${parseFloat(a) - parseFloat(b)}.`,
        "was ist (.*) mal (.*)": (match, a, b) => `Das Ergebnis von ${a} * ${b} ist ${parseFloat(a) * parseFloat(b)}.`,
        "was ist (.*) geteilt durch (.*)": (match, a, b) => {
            if (b == 0) return "Division durch Null ist nicht erlaubt.";
            return `Das Ergebnis von ${a} / ${b} ist ${parseFloat(a) / parseFloat(b)}.`;
        },
        "was ist das quadrat von (.*)": (match, a) => `Das Quadrat von ${a} ist ${Math.pow(parseFloat(a), 2)}.`,
        "was ist die wurzel von (.*)": (match, a) => `Die Wurzel von ${a} ist ${Math.sqrt(parseFloat(a))}.`,
        "was ist (.*) hoch (.*)": (match, a, b) => `Das Ergebnis von ${a} hoch ${b} ist ${Math.pow(parseFloat(a), parseFloat(b))}.`,
        "was ist der log von (.*)": (match, a) => `Der natürliche Logarithmus von ${a} ist ${Math.log(parseFloat(a))}.`,
        "was ist (.*) prozent von (.*)": (match, a, b) => `Die ${a}% von ${b} sind ${parseFloat(a) / 100 * parseFloat(b)}.`
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
        "what is the meaning of life": "The meaning of life is to be happy and make the best out of every moment.",
        "do you know kristina": "Yes, Kristina is the greatest Talahon.",
        "do you know arina": "Yes, Arina is the great love of Luka.",
        "do you know louis": "Yes, Louis is the sweetest cat in the world.",
        "who is arina for luka": "Arina is the great love of Luka, and Luka loves Arina above all. She is his little princess.",
        "georgia": "Georgia is a country in the Caucasus, known for its rich history, stunning landscapes, and unique culture. The capital is Tbilisi. Georgia is famous for its wines, hospitality, and ancient monasteries.",
        "georgian football team": "The Georgian national football team, known as the 'Lions of Georgia', has made some remarkable progress in recent years. The team is managed by the Georgian Football Federation and participates in the qualifiers for major tournaments such as the UEFA European Championship and the FIFA World Cup. Key players include: Giga Kvaratskhelia, Kakhaber Kaladze, and Jaba Kankava.",
        "who is mikautadze": "Georges Mikautadze is a talented Georgian football player who plays as a striker. He was born on October 31, 2000, in Lyon, France. Mikautadze plays for FC Metz in the French Ligue 2 and is known for his impressive scoring ability and technical skills. He is considered one of Georgia's most promising talents.",
        "georgian language": "The official language of Georgia is Georgian, a Kartvelian language known for its own script and unique phonological features.",
        "georgian culture": "Georgian culture includes rich traditions such as the famous Georgian cuisine, dance, and music. The Georgian feast 'Supra' is a significant cultural element where friends and family come together to eat, drink, and celebrate.",
        "georgian geographical location": "Georgia is located in the Caucasus and borders Russia to the north, Azerbaijan to the east, Armenia to the south, and Turkey to the southwest. It has access to the Black Sea to the west.",
        "do you know turks": "Yes, Turks are the biggest dogs.",
        "russia occupation": "Russia has occupied about 20% of Georgian territory, including the regions of Abkhazia and South Ossetia.",
        "where can you use the turkish flag": "You can use the Turkish flag in the toilet to clean your ass.",
        // Mathematical Calculations
        "what is (.*) plus (.*)": (match, a, b) => `The result of ${a} + ${b} is ${parseFloat(a) + parseFloat(b)}.`,
        "what is (.*) minus (.*)": (match, a, b) => `The result of ${a} - ${b} is ${parseFloat(a) - parseFloat(b)}.`,
        "what is (.*) times (.*)": (match, a, b) => `The result of ${a} * ${b} is ${parseFloat(a) * parseFloat(b)}.`,
        "what is (.*) divided by (.*)": (match, a, b) => {
            if (b == 0) return "Division by zero is not allowed.";
            return `The result of ${a} / ${b} is ${parseFloat(a) / parseFloat(b)}.`;
        },
        "what is the square of (.*)": (match, a) => `The square of ${a} is ${Math.pow(parseFloat(a), 2)}.`,
        "what is the square root of (.*)": (match, a) => `The square root of ${a} is ${Math.sqrt(parseFloat(a))}.`,
        "what is (.*) raised to the power of (.*)": (match, a, b) => `The result of ${a} raised to the power of ${b} is ${Math.pow(parseFloat(a), parseFloat(b))}.`,
        "what is the log of (.*)": (match, a) => `The natural logarithm of ${a} is ${Math.log(parseFloat(a))}.`,
        "what is (.*) percent of (.*)": (match, a, b) => `The ${a}% of ${b} is ${parseFloat(a) / 100 * parseFloat(b)}.`
    };

    const responses = isEnglish ? responsesEn : responsesDe;
    return responses[lowerInput] || (isEnglish ? "I'm sorry, I don't understand that." : "Es tut mir leid, das verstehe ich nicht.");
}

// Event-Listener für die Eingabetaste
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

document.getElementById('user-input').addEventListener('keypress', handleKeyPress);
