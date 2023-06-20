
let contentWrapper = document.getElementsByClassName('contentWrapper')[0]
let contentLeft = document.getElementsByClassName('contentLeft')[0]
let contentRight = document.getElementsByClassName('contentRight')[0]
let ta = document.getElementById('ta')
let vrToggle = document.getElementById('vrToggle')
let fontSelector = document.getElementById('fontSelector')
let charsetArea = document.getElementById('charsetArea')
let randomMin = document.getElementById('randomMin')
let randomMax = document.getElementById('randomMax')
let randomWordsNumber = document.getElementById('randomWordsNumber')
let playButton = document.getElementById('playButton')
let flasher = document.getElementById('flasher')
let exportBtn = document.getElementById('exportBtn')
let downloadBtn = document.getElementById('downloadBtn')
let switchCase = document.getElementById('switchCase')
let align = document.getElementById('align')
let inputPreset = document.getElementById('inputPreset')

let appSettings = {
    morseText : "",
    flashDuration : 50,
    flashColor : "rgb(164,255,0)",
    wpmSpeed : 25,
    effectiveSpeed : 20,
    q : 15,
    frequency : 850,
    dotDuration : 0,
    characterDotCount : 0,
}

let localSettings = JSON.parse(window.localStorage.getItem('morseFlasherSettings'));

if(localSettings !== null) {
    console.log('Reading settings from localStorage')
    appSettings = localSettings
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function flash(character, characterDotCount) {
    let flashDelay = appSettings.dotDuration * (characterDotCount + 4)
    // todo: rework the timing, it could be causing issues on Android
    await sleep(flashDelay);
    contentLeft.innerText = character
    contentRight.innerText = character
    contentLeft.style.color = appSettings.flashColor
    contentRight.style.color = appSettings.flashColor

    setTimeout(function () {
        contentLeft.style.color = "#000";
        contentRight.style.color = "#000";
    }, appSettings.flashDuration)
}

function randomIntFromInterval(min, max) { // min and max included
    if (min > max) {max = min}
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function exportize(w){
    return (w + '[' + w.split('').toString() + ']').toUpperCase();
}

function genRandomWords(minLength, maxLength, numWords, charset, exportWords=false) {
    let wordList = ""
    let text = "";
    let spacer = " ";

    for (let i = 0; i < numWords; i++) {
        let currentLength = randomIntFromInterval(minLength, maxLength);

        for (let j = 1; j <= currentLength; j++) {
            text += charset.charAt(Math.floor(Math.random() * charset.length));
        }

        if (exportWords) {
            spacer = "\n"
            text = exportize(text)
        }

        wordList += text + spacer;
        text = ""
    }
    return wordList
}

function downloadFile(filename, content) {
    // It works on all HTML5 Ready browsers as it uses the download attribute of the <a> element:
    const element = document.createElement('a');

    //A blob is a data type that can store binary data
    // “type” is a MIME type
    // It can have a different value, based on a file you want to save
    const blob = new Blob([content], { type: 'plain/text' });
    //createObjectURL() static method creates a DOMString containing a URL representing the object given in the parameter.
    const fileUrl = URL.createObjectURL(blob);

    //setAttribute() Sets the value of an attribute on the specified element.
    element.setAttribute('href', fileUrl); //file location
    element.setAttribute('download', filename); // file name
    element.style.display = 'none';

    //use appendChild() method to move an element from one element to another
    document.body.appendChild(element);
    element.click();

    //The removeChild() method of the Node interface removes a child node from the DOM and returns the removed node
    document.body.removeChild(element);
}

window.onload = () => {
    document.getElementById('download').
    addEventListener('click', e => {

        //The value of the file name input box
        const filename = document.getElementById('filename').value;

        //The value of what has been input in the textarea
        const content = document.getElementById('text').value;

        // The && (logical AND) operator indicates whether both operands are true. If both operands have nonzero values, the result has the value 1 . Otherwise, the result has the value 0.

        if (filename && content) {
            downloadFile(filename, content);
        }
    });
};

function getCharacterDotCount(c, alphabet, el_len, time = 0) {
    let out = [];
    let l = alphabet[c];

    if (!l) {
        console.log("Don't know CW for character: '" + c + "', replacing with space.");
        l = " ";
    }

    for (let j = 0; j < l.length; j++) {
        let el = l.substr(j, 1); // . or -
        if (el !== " ")
            out.push({"t": time, "v": 0});
        time += 1 * el_len[el];
        out.push({"t": time, "v": 0});
        if (j < l.length - 1) {
            time += 1;
        }
    }
    out.push({"t": time, "v": 0});
    return out[out.length - 1].t;
}

vrToggle.addEventListener("click", function (){
    contentRight.classList.toggle('hidden')
})

flasher.addEventListener("click", function () {
    ta.value = genRandomWords(parseInt(randomMin.value), parseInt(randomMax.value), parseInt(randomWordsNumber.value), charsetArea.value.replaceAll(' ', ''))
    ta.classList.add('hiddenText')
    downloadBtn.classList.add('hidden')
})

exportBtn.addEventListener("click", function () {
    ta.value = genRandomWords(parseInt(randomMin.value), parseInt(randomMax.value), parseInt(randomWordsNumber.value), charsetArea.value.replaceAll(' ', ''), true)
    ta.classList.remove('hiddenText')
    downloadBtn.classList.remove('hidden')
})

downloadBtn.addEventListener("click", function () {
    downloadFile('codeGroups_' + Date.now() +'.txt', ta.value)
})

ta.addEventListener('click', function (){
    this.classList.remove('hiddenText')
})

switchCase.addEventListener("click", function () {
    contentRight.classList.toggle('uppercase')
    contentLeft.classList.toggle('uppercase')
})

fontSelector.addEventListener('change', function (){
    let fontArray = ['firstFont', 'secondFont', 'thirdFont', 'fourthFont', 'fifthFont']
    contentRight.classList.add(...fontArray.splice(this.value,1))
    contentRight.classList.remove(...fontArray)

    let fontArray2 = ['firstFont', 'secondFont', 'thirdFont', 'fourthFont', 'fifthFont']
    contentLeft.classList.add(...fontArray2.splice(this.value,1))
    contentLeft.classList.remove(...fontArray2)
})

playButton.addEventListener('click', function (){
    m.play()
})

align.addEventListener("click", function (){
    contentWrapper.requestFullscreen();
    contentLeft.style.color = appSettings.flashColor
    contentRight.style.color = appSettings.flashColor
})

inputPreset.addEventListener('change', function (){
    charsetArea.value = this.value;
})

// eslint-disable-next-line no-undef
let m = new jscw({
    "wpm": appSettings.wpmSpeed,
    "eff": appSettings.effectiveSpeed,
    "freq": appSettings.frequency,
    "text": appSettings.morseText,
    "q": appSettings.q,
});

m.renderPlayer('player', m);

m.onParamChange =  () => {
    appSettings.wpmSpeed = m.wpm
    appSettings.dotDuration = Math.round(60 / (50 * m.wpm) * 1000)
    appSettings.effectiveSpeed = m.eff
    appSettings.frequency = parseInt(m.freq)
    appSettings.q = parseInt(m.q)
    window.localStorage.setItem('morseFlasherSettings', JSON.stringify(appSettings))
};

m.onPlay = () => {
    let txt = ta.value;
    // todo: initial pause may be skewing the offset, needs better solution
    txt = "  " + txt.replace(/(?:\r\n|\r|\n)/g, " ");
    m.setText(txt);
    contentLeft.style.color = "black"
    contentRight.style.color = "black"
    document.querySelectorAll('body')[0].classList.add('overflowHidden')
    contentWrapper.requestFullscreen();
}

m.onFinished = () => {
    setTimeout(() => {
        document.exitFullscreen();
        contentLeft.style.color = appSettings.flashColor
        contentRight.style.color = appSettings.flashColor
        document.querySelectorAll('body')[0].classList.remove('overflowHidden')
    }, 1000)
}

m.onCharacterPlay = function (character) {
    let characterDotCount = getCharacterDotCount(character.c, m.alphabet, m.el_len)
    flash(character.c, characterDotCount)
}
