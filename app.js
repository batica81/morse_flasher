window.onload = function() {

    let wrapper = document.getElementsByClassName('wrapper')[0]
    let flasher = document.getElementById('flasher')


    let content = document.getElementsByClassName('content')[0]
    let contentRight = document.getElementsByClassName('contentRight')[0]

    let ta = document.getElementById('ta')

    let morseText = ""
    let flashDuration = 50
    let flashColor = "rgba(64.28571428571429%,100%,0%, 1)"; //555 nm wavelength

    let wpmSpeed = 25 //initial speed
    let dotDuration
    let characterDotCount

    function calcParameters(newSpeed) {
        wpmSpeed = newSpeed
        dotDuration = Math.round(60 / (50 * newSpeed) * 1000)
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function flash(character, characterDotCount) {
        // let flashDelay = dotDuration * characterDotCount + (dotDuration * 3)
        let flashDelay = dotDuration * (characterDotCount + 2.5)

        await sleep(flashDelay);
        content.innerText = character
        contentRight.innerText = character
        content.style.color = flashColor
        contentRight.style.color = flashColor

        // console.log("character: ", character);
        // console.log("characterDotCount: ", characterDotCount)
        // console.log("wpmSpeed: ", wpmSpeed)
        // console.log("flashDelay: ", flashDelay)

        setTimeout(function() {
            content.style.color = "#000";
            contentRight.style.color = "#000";
        }, flashDuration)
    }


    function sync() {
        calcParameters(m.wpm)
        console.log("SYNC");
        let txt = ta.value;
        txt = "   " + txt.replace(/(?:\r\n|\r|\n)/g, " ");
        m.setText(txt);
    }

    function genRandomWords(numWords) {
        let wordList = ""
        for (var i = 0; i < numWords; i++) {
            wordList += Math.random().toString(36).replace(/[^a-z0-9]+/g, '').substr(0, 5) + " ";
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
            if (el != " ")
                out.push({ "t": time, "v": 0 });
            time += 1 * el_len[el];
            out.push({ "t": time, "v": 0 });
            if (j < l.length - 1) {
                time += 1;
            }
        }

        out.push({ "t": time, "v": 0 });

        characterDotCount = out[out.length - 1].t
        return characterDotCount;
    }

    flasher.addEventListener("click", function() {
        ta.value = genRandomWords(5)
    })

    ta.addEventListener("keyup", function() {
        sync(this.value);
    })

    let m = new jscw({ "wpm": wpmSpeed });
    m.setText(morseText);
    m.setEff(15)
    m.renderPlayer('player', m);
    m.onParamChange = sync;

    m.onPlay = () => {
        wrapper.requestFullscreen();
    }

    m.onFinished = () => {
      setTimeout(() => {
        document.exitFullscreen();
    }, 1000)
    }

    m.onCharacterPlay = function(character) {
        let characterDotCount = getCharacterDotCount(character.c, m.alphabet, m.el_len)
        flash(character.c, characterDotCount)
    }

}