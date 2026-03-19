// Dyslexic Font Toggle
function toggleDyslexicFont() {
    document.body.classList.toggle('dyslexic');
}

// Speak Summary Aloud
function speakSummary() {
    const text = document.getElementById('bio-text').innerText;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
}

// Google Translate Initialization
function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
}
