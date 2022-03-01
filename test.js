

        var alphabet = {"a": ".-", "b": "-...", "c": "-.-.", "d": "-..", "e": ".", 
            "f": "..-.", "g": "--.", "h": "....", "i": "..", "j": ".---", "k":
            "-.-", "l": ".-..", "m": "--", "n": "-.", "o": "---", "p": ".--.",
            "q": "--.-", "r": ".-.", "s": "...", "t": "-", "u": "..-", "v":
            "...-", "w": ".--", "x": "-..-", "y": "-.--", "z": "--..", 
            "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5":
            ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
            "0": "-----", "/": "-..-.", "+": ".-.-.", "=": "-...-", "?": "..--..",
            ".": ".-.-.-", ",": "--..--", ":": "---...", "(": "-.--.", ")": "-.--.-",
            "@": ".--.-.", "-": "-....-", "\"": ".-..-.", "!": "..--.",
            "$": "...-..-", "'": ".----.", "`": ".-----.", 
            "&": ". ...",
            "-": "-....-", ";": "-.-.-.", 
            "«": ".-..-.", "»": ".-..-.", 
            "ä": ".-.-", "ß": "...--..",
            "à": ".--.-", "á": ".--.-", "â": ".-", "ã": ".-",
            "å": ".--.-", "æ": ".-.-", "ç": "-.-..", "è": "..-..", "é": "..-..", 
            "ê": ".", "ë": ".", "ì": "..", "í": "..", "î": "..", "ï": "..",
            "ð": "..--.", "ñ": "--.--", "ò": "---", "ó": "---", "ô": "---",
            "õ": "---", "ö": "---.", "ø": "---.", "ù": "..-", "ú": "..-",
            "û": "..-", "ü": "..--", "ý": "-.--", "þ": ".--..", "ÿ": "-.--",
            "ā": ".-", "ă": ".-", "ą": ".-", "ć": "-.-.", "ĉ": "-.-..",
            "ċ": "-.-.", "č": "-.-.", "ď": "-..", "đ": "-..", "ē": ".",
            "ĕ": ".", "ė": ".", "ę": ".", "ě": ".", "ĝ": "--.-.", "ğ": "--.",
            "ġ": "--.", "ģ": "--.", "ĥ": "----", "ħ": "....", "ĩ": "..",
            "ī": "..", "ĭ": "..", "į": "..", "ı": "..", "ĳ": ".. .---",
            "ĵ": ".---.", "ķ": "-.-", "ĸ": "-.-", "ĺ": ".-..", "ļ": ".-..",
            "ľ": ".-..", "ŀ": ".-..", "ł": ".-..", "ń": "-.", "ņ": "-.",
            "ň": "-.", "ŉ": "-.", "ŋ": "-.", "ō": "---", "ŏ": "---",
            "ő": "---", "œ": "---.", "ŕ": ".-.", "ŗ": ".-.", "ř": ".-.",
            "ś": "...", "ŝ": "...-.", "ş": "...", "š": "...", "ţ": "-",
            "ť": "-", "ŧ": "-", "ũ": "..-", "ū": "..-", "ŭ": "..--",
            "ů": "..-", "ű": "..-", "ų": "..-", "ŵ": ".--", "ŷ": "-.--",
            "Ÿ": "-.--", "ź": "--..", "ż": "--..", "ž": "--..", "ſ": "...",
            /* cyrillic */
            "а": ".-", "б": "-...", "в": ".--", "г": "--.", "д": "-..",
            "е": ".", "ж": "...-", "з": "--..", "и": "..", "й": ".---",
            "к": "-.-", "л": ".-..", "м": "--", "н": "-.", "о": "---",
            "п": ".--.", "р": ".-.", "с": "...", "т": "-", "у": "..-",
            "ф": "..-.", "х": "....", "ц": "-.-.", "ч": "---.", "ш": "----",
            "щ": "--.-", "ъ": "-..-", "ы": "-.--", "ь": "-..-", "э": "..-..",
            "ю": "..--", "я": ".-.-", "ѐ": ".", "ё": ".", "ђ": "-.. .---",
            "ѓ": "--. .---", "є": ".", "ѕ": "-.. --..", "і": "..",
            "ї": "..", "ј": ".---", "љ": ".-.. .---", "њ": "-. .---",
            "ћ": "-.-.", "ќ": "-.- .---", "ѝ": "..", "ў": "..-", "џ": "-.. --..",
            /* Japanese, tnx JE1TRV */
            /* KataKana    HiraGana */
            "イ": ".-",    "い": ".-",     /* i  */
            "ロ": ".-.-",  "ろ": ".-.-",   /* ro */
            "ハ": "-...",  "は": "-...",   /* ha */
            "ニ": "-.-.",  "に": "-.-.",   /* ni */
            "ホ": "-..",   "ほ": "-..",    /* ho */
            "ヘ": ".",     "へ": ".",      /* he */
            "ト": "..-..", "と": "..-..",  /* to */
            "チ": "..-.",  "ち": "..-.",   /* ti */
            "リ": "--.",   "り": "--.",    /* ri */
            "ヌ": "....",  "ぬ": "....",   /* nu */
            "ル": "-.--.", "る": "-.--.",  /* ru */
            "ヲ": ".---",  "を": ".---",   /* wo */
            "ワ": "-.-",   "わ": "-.-",    /* wa */
            "カ": ".-..",  "か": ".-..",   /* ka */
            "ヨ": "--",    "よ": "--",     /* yo */
            "ョ": "--",    "ょ": "--",     /* yo (small) */
            "タ": "-.",    "た": "-.",     /* ta */
            "レ": "---",   "れ": "---",    /* re */
            "ソ": "---.",  "そ": "---.",   /* so */
            "ツ": ".--.",  "つ": ".--.",   /* tu */
            "ッ": ".--.",  "っ": ".--.",   /* tu (small) */
            "ネ": "--.-",  "ね": "--.-",   /* ne */
            "ナ": ".-.",   "な": ".-.",    /* na */
            "ラ": "...",   "ら": "...",    /* ra */
            "ム": "-",     "む": "-",      /* mu */
            "ウ": "..-",   "う": "..-",    /* u  */
            "ヰ": ".-..-", "ゐ": ".-..-",  /* yi */
            "ノ": "..--",  "の": "..--",   /* no */
            "オ": ".-...", "お": ".-...",  /* o  */
            "ク": "...-",  "く": "...-",   /* ku */
            "ヤ": ".--",   "や": ".--",    /* ya */
            "ャ": ".--",   "ゃ": ".--",    /* ya (small) */
            "マ": "-..-",  "ま": "-..-",   /* ma */
            "ケ": "-.--",  "け": "-.--",   /* ke */
            "フ": "--..",  "ふ": "--..",   /* fu */
            "コ": "----",  "こ": "----",   /* ko */
            "エ": "-.---", "え": "-.---",  /* e  */
            "テ": ".-.--", "て": ".-.--",  /* te */
            "ア": "--.--", "あ": "--.--",  /* a  */
            "サ": "-.-.-", "さ": "-.-.-",  /* sa */
            "キ": "-.-..", "き": "-.-..",  /* ki */
            "ユ": "-..--", "ゆ": "-..--",  /* yu */
            "ュ": "-..--", "ゅ": "-..--",  /* yu (small) */
            "メ": "-...-", "め": "-...-",  /* me */
            "ミ": "..-.-", "み": "..-.-",  /* mi */
            "シ": "--.-.", "し": "--.-.",  /* si */
            "ヱ": ".--..", "ゑ": ".--..",  /* ye */
            "ヒ": "--..-", "ひ": "--..-",  /* hi */
            "モ": "-..-.", "も": "-..-.",  /* mo */
            "セ": ".---.", "せ": ".---.",  /* se */
            "ス": "---.-", "す": "---.-",  /* su */
            "ン": ".-.-.", "ん": ".-.-.",  /* n  */
            /* characters with turbidity suffix */
            "゛": "..",                    /* "  */
            "ガ": ".-.. ..",     "が": ".-.. ..",    /* ga */
            "ギ": "-.-.. ..",    "ぎ": "-.-.. ..",   /* gi */
            "グ": "...- ..",     "ぐ": "...- ..",    /* gu */
            "ゲ": "-.-- ..",     "げ": "-.-- ..",    /* ge */
            "ゴ": "---- ..",     "ご": "---- ..",    /* go */
            "ザ": "-.-.- ..",    "ざ": "-.-.- ..",   /* za */
            "ジ": "--.-. ..",    "じ": "--.-. ..",   /* zi */
            "ズ": "---.- ..",    "ず": "---.- ..",   /* zu */
            "ゼ": ".---. ..",    "ぜ": ".---. ..",   /* ze */
            "ゾ": "---. ..",     "ぞ": "---. ..",    /* zo */
            "ダ": "-. ..",       "だ": "-. ..",      /* da */
            "ヂ": "..-. ..",     "ぢ": "..-. ..",    /* di */
            "ヅ": ".--. ..",     "づ": ".--. ..",    /* du */
            "デ": ".-.-- ..",    "で": ".-.-- ..",   /* de */
            "ド": "..-.. ..",    "ど": "..-.. ..",   /* do */
            "バ": "-... ..",     "ば": "-... ..",    /* ba */
            "ビ": "--..- ..",    "び": "--..- ..",   /* bi */
            "ブ": "--.. ..",     "ぶ": "--.. ..",    /* bu */
            "ベ": ". ..",        "べ": ". ..",       /* be */
            "ボ": "-.. ..",      "ぼ": "-.. ..",     /* bo */
            /* characters with semi-turbidity suffix */
            "゜": "..--.",                 /* *  */
            "パ": "-... ..--.",  "ぱ": "-... ..--.", /* pa */
            "ピ": "--..- ..--.", "ぴ": "--..- ..--.",/* pi */
            "プ": "--.. ..--.",  "ぷ": "--.. ..--.", /* pu */
            "ペ": ". ..--.",     "ぺ": ". ..--.",    /* pe */
            "ポ": "-.. ..--.",   "ぽ": "-.. ..--.",  /* po */

            "－": ".--.-",                 /* -  */
            "ー": ".--.-",                 /* -  */
            "（": "-.--.-",                /* (  */
            "）": ".-..-.",                /* )  */
            "、": ".-.-.-",                /* .  */
            "」": ".-.-..",                /* \n */
            " ":" " };
        var el_len = { ".": 1, "-": 3, " ": 1 };


        // in: a single character (except space) and a start time
        // out: array of timing for this character w/o spaces after the last element, starting at "time"
        function getDotLength(c, time=0) {
            var out = [];
            var l = alphabet[c];

            console.log(l)

            if (!l) {
                console.log("Don't know CW for character: '" + c + "', replacing with space.");
                l = " ";
            }

            for (var j = 0; j < l.length; j++) {
                var el = l.substr(j,1);  // . or -
                if (el != " ")
                    out.push({"t": time, "v": 0});
                time += 1 * el_len[el];
                out.push({"t": time, "v": 0});
                if (j < l.length - 1) {
                    time += 1;
                }
            }

            out.push({"t": time, "v": 0});

            let dotLength = out[out.length - 1].t

            console.log(dotLength)
            return dotLength;
        }

        getDotLength("t")


        function genRandomWords(numWords) {
            let wordList = ""
            for (var i = 0; i < numWords; i++) {      
              wordList += Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5) + " "; 
            }
            return wordList
        }

        console.log(genRandomWords(10))