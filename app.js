window.onload = function () {

    let contentwrapper = document.getElementsByClassName('contentwrapper')[0]
    let contentLeft = document.getElementsByClassName('contentLeft')[0]
    let contentRight = document.getElementsByClassName('contentRight')[0]
    let ta = document.getElementById('ta')
    let vrToggle = document.getElementById('vrToggle')
    let fontSelector = document.getElementById('fontSelector')
    let charsetArea = document.getElementById('charsetArea')
    let randomMin = document.getElementById('randomMin')
    let randomMax = document.getElementById('randomMax')
    let randomWordsNumber = document.getElementById('randomWordsNumber')

    let flasher = document.getElementById('flasher')
    let switchCase = document.getElementById('switchCase')
    let align = document.getElementById('align')

    let morseText = ""
    let flashDuration = 50
    let flashColor = "rgb(164,255,0)"; // ~555 nm wavelength
    let wpmSpeed = 30 // initial speed
    let effectiveSpeed = 20
    let frequency = 680
    let charset = "abcdefghijklmnopqrstuvwxyz0123456789?/,.=";
    let dotDuration
    let characterDotCount

    let appSettings = {

    }

    function calcParameters(newSpeed) {
        wpmSpeed = newSpeed
        dotDuration = Math.round(60 / (50 * newSpeed) * 1000)
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function flash(character, characterDotCount) {
        let flashDelay = dotDuration * (characterDotCount + 3)

        await sleep(flashDelay);
        contentLeft.innerText = character
        contentRight.innerText = character
        contentLeft.style.color = flashColor
        contentRight.style.color = flashColor

        setTimeout(function () {
            contentLeft.style.color = "#000";
            contentRight.style.color = "#000";
        }, flashDuration)
    }

    function sync() {
        calcParameters(m.wpm)
        let txt = ta.value;
        txt = "   " + txt.replace(/(?:\r\n|\r|\n)/g, " ");
        m.setText(txt);
    }

    function genRandomWords(minLength, wordLength, numWords, charset) {
        let wordList = ""
        let text = "";
        let possible = charset;

        for (let i = 0; i < numWords; i++) {
            for (let i = minLength; i <= wordLength; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            wordList += text + " ";
            text = ""
        }
        return wordList
    }

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
        characterDotCount = out[out.length - 1].t
        return characterDotCount;
    }

    function alignHelp() {
        contentwrapper.requestFullscreen();
        contentLeft.style.color = flashColor
        contentRight.style.color = flashColor
    }

    vrToggle.addEventListener("click", function (){
        contentRight.classList.toggle('hidden')
        console.log('toggling')
    })

    flasher.addEventListener("click", function () {
        let txt = "  " + genRandomWords(randomMin.value, randomMax.value, randomWordsNumber.value, charsetArea.value)
        ta.value = txt
        m.setText(txt);
    })

    switchCase.addEventListener("click", function () {
        contentRight.classList.toggle('uppercase')
        contentLeft.classList.toggle('uppercase')
    })

    fontSelector.addEventListener('change', function (){
        switch (this.value) {

            case '0':
                contentRight.classList.toggle('firstFont')
                contentLeft.classList.toggle('firstFont')
                break;
            case '1':
                contentRight.classList.toggle('secondFont')
                contentLeft.classList.toggle('secondFont')
                break;
            case '2':
                contentRight.classList.toggle('thirdFont')
                contentLeft.classList.toggle('thirdFont')
                break;

            case '3':
                contentRight.classList.toggle('fourthFont')
                contentLeft.classList.toggle('fourthFont')
                break;
        }
    })

    align.addEventListener("click", alignHelp)

    ta.addEventListener("keyup", function () {
        sync(this.value);
    })

    let m = new jscw({"wpm": wpmSpeed});
    m.setText(morseText);
    m.setEff(effectiveSpeed)
    m.setFreq(frequency)
    m.renderPlayer('player', m);
    m.onParamChange = sync;

    m.onPlay = () => {
        contentLeft.style.color = "black"
        contentRight.style.color = "black"
        document.querySelectorAll('body')[0].classList.add('overflowHidden')
        contentwrapper.requestFullscreen();
    }

    m.onFinished = () => {
        setTimeout(() => {
            document.exitFullscreen();
            contentLeft.style.color = flashColor
            contentRight.style.color = flashColor
            document.querySelectorAll('body')[0].classList.remove('overflowHidden')
        }, 1000)
    }

    m.onCharacterPlay = function (character) {
        let characterDotCount = getCharacterDotCount(character.c, m.alphabet, m.el_len)
        flash(character.c, characterDotCount)
    }
}
