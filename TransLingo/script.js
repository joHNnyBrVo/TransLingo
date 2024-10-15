const translateButton = document.querySelector('.translate');
const fromText = document.querySelector('.from-text');
const toText = document.querySelector('.to-text');
const fromLang = document.querySelector('.from-lang');
const toLang = document.querySelector('.to-lang');

translateButton.addEventListener('click', async () => {
    const text = fromText.value;
    const fromLanguage = fromLang.value;
    const toLanguage = toLang.value;

    if (!text) {
        alert("Please enter text to translate.");
        return;
    }

    // const apiKey = '42585940a77a97a7fe61'; 
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLanguage}|${toLanguage}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const translatedText = data.responseData.translatedText;
        toText.value = translatedText;
    } catch (error) {
        console.error('Error translating text:', error);
        alert("Error translating text. Please try again later.");
    }
});

function speakOriginal() {
    const utterance = new SpeechSynthesisUtterance(fromText.value);
    utterance.lang = fromLang.value;
    window.speechSynthesis.speak(utterance);
}

function speakTranslation() {
    const utterance = new SpeechSynthesisUtterance(toText.value);
    utterance.lang = toLang.value; 
    window.speechSynthesis.speak(utterance);
}

function exchangeLanguages() {
    const tempLang = fromLang.value;
    fromLang.value = toLang.value;
    toLang.value = tempLang;

    const tempText = fromText.value;
    fromText.value = toText.value;
    toText.value = tempText;
}