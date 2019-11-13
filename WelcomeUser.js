function welcomeUserAndAskThemToThinkOfColumnNames() {
    var userName = document.getElementById('userTextName').value;
    speak('Welcome' + userName + '!, Please be ready with column names; you want for your test cases');
}

function captureColumnNames() {
    speak('Please tell the column names');

}

function speak(text, callback) {
    var u = new SpeechSynthesisUtterance();
    u.text = text;
    u.lang = 'en-UK';
    u.onend = function() {
        if (callback) {
            callback();
        }
    };

    u.onerror = function(e) {
        if (callback) {
            callback(e);
        }
    };
    speechSynthesis.speak(u);
}