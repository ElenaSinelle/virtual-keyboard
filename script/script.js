"use strict"
let capsLock = false;
let shift = false;

let h1 = document.createElement("h1");
h1.textContent = "RSS Виртуальная клавиатура";

let textarea = document.createElement("textarea");
textarea.cols = "80";
textarea.rows = "10";
textarea.wrap = "hard";
textarea.classList.add("textarea");
textarea.value = "";

let keyboard = document.createElement("div");
keyboard.classList.add("keyboard");
keyboard.value = keyboard.value || "";

let keysContainer = document.createElement("div");
keysContainer.classList.add("keyboard__keys");

let p = document.createElement("p");
p.innerHTML = "Клавиатура создана в операционной системе Windows";

document.body.append(h1);
document.body.append(textarea);
document.body.append(keyboard);
keyboard.append(keysContainer);
keysContainer.append(createKeyboard());
document.body.append(p);

let keys = keysContainer.querySelectorAll(".keyboard__key");

function createKeyboard() {
    let fragment = document.createDocumentFragment();
    const keyLayout = [
        "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",
        "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\",
        "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter",
        "ShiftLeft", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "ArrowUp", "ShiftRight",
        "ControlLeft", "Meta", "AltLeft", "Space", "AltRight", "ControlRight", "ArrowLeft", "ArrowDown", "ArrowRight",
    ];

    keyLayout.forEach(key => {
        let keyElement = document.createElement("button");
        textarea.focus();

        switch (key) {
            case "Backspace":
                keyElement.innerHTML = '<button class="keyboard__key keyboard__key-wide" data="'+"Backspace"+'"'+'>'+'Backspace'+'</button>';

                keyElement.addEventListener("click", () => {
                    keyboard.value = keyboard.value.substring(0, keyboard.value.length - 1);
                    textarea.value = keyboard.value;
                });

                break;

            case "Tab":
                keyElement.innerHTML = '<button class="keyboard__key keyboard__key-wide" data="'+"Tab"+'"'+'>'+'Tab'+'</button>';

                keyElement.addEventListener("click", () => {
                    keyboard.value += "    ";
                    textarea.value = keyboard.value;
                });

                break;

            case "\\":
                keyElement.innerHTML = '<button class="keyboard__key keyboard__key-wide" data="'+"Backslash"+'"'+'>'+'&#92;'+'</button>';

                keyElement.addEventListener("click", () => {
                    keyboard.value += keyElement.textContent;
                    textarea.value = keyboard.value;
                });

                break;

            case "CapsLock":
                keyElement.innerHTML = '<button class="keyboard__key keyboard__key-wide" data="'+"CapsLock"+'"'+'>'+'CapsLock'+'</button>';

                keyElement.addEventListener("click", () => {
                    toggleCapsLock();
                    keyElement.classList.toggle("keyboard__key-caps-active");
                })

                break;

            case "ShiftRight":
                keyElement.innerHTML = '<button class="keyboard__key keyboard__key-shiftwide" data="'+"ShiftRight"+'"'+'>'+'Shift'+'</button>';


                keyElement.addEventListener("mousedown", () => {
                    toggleShift()
                });

                keyElement.addEventListener("mouseup", () => {
                    toggleShift()
                });

                break;

            case "ShiftLeft":
                keyElement.innerHTML = '<button class="keyboard__key keyboard__key-shiftwide" data="'+"ShiftLeft"+'"'+'>'+'Shift'+'</button>';


                keyElement.addEventListener("mousedown", () => {
                    toggleShift()
                });

                keyElement.addEventListener("mouseup", () => {
                    toggleShift()
                });

                break;

            case "ControlRight":
                keyElement.innerHTML = '<button class="keyboard__key" data="'+"ControlRight"+'"'+'>'+'Ctrl'+'</button>';

                break;

            case "ControlLeft":
                keyElement.innerHTML = '<button class="keyboard__key" data="'+"ControlLeft"+'"'+'>'+'Ctrl'+'</button>';

                break;

            case "Enter":
                keyElement.innerHTML = '<button class="keyboard__key keyboard__key-wide" data="'+"Enter"+'"'+'>'+'Enter'+'</button>';

                keyElement.addEventListener("click", () => {
                    keyboard.value += "\n";
                    textarea.value = keyboard.value;
                });

                break;

            case "Space":
                keyElement.innerHTML = '<button class="keyboard__key keyboard__key-superwide" data="'+"Space"+'"'+'>'+'Space'+'</button>';

                keyElement.addEventListener("click", () => {
                    keyboard.value += " ";
                    textarea.value = keyboard.value;
                });

                break;

            case "AltRight":
                keyElement.innerHTML = '<button class="keyboard__key" data="'+"AltRight"+'"'+'>'+'Alt'+'</button>';

                break;

            case "AltLeft":
                keyElement.innerHTML = '<button class="keyboard__key" data="'+"AltLeft"+'"'+'>'+'Alt'+'</button>';

                break;

            case "Meta":
                keyElement.innerHTML = '<button class="keyboard__key" data="'+"Meta"+'"'+'>'+'Meta'+'</button>';

                break;

            case "ArrowUp":
                keyElement.innerHTML = '<button class="keyboard__key" data="'+"ArrowUp"+'"'+'>'+'&#x25B2;'+'</button>';

                keyElement.addEventListener("click", () => {
                    keyboard.value += `${keyElement.textContent}`;
                    textarea.value = keyboard.value;
                });

                break;

            case "ArrowLeft":
                keyElement.innerHTML = '<button class="keyboard__key" data="'+"ArrowLeft"+'"'+'>'+'&#x25C4;'+'</button>';

                keyElement.addEventListener("click", () => {
                    keyboard.value += `${keyElement.textContent}`;
                    textarea.value = keyboard.value;
                });

                break;

            case "ArrowDown":
                keyElement.innerHTML = '<button class="keyboard__key" data="'+"ArrowDown"+'"'+'>'+'&#x25BC;'+'</button>';

                keyElement.addEventListener("click", () => {
                    keyboard.value += `${keyElement.textContent}`;
                    textarea.value = keyboard.value;
                });

                break;

            case "ArrowRight":
                keyElement.innerHTML = '<button class="keyboard__key" data="'+"ArrowRight"+'"'+'>'+'&#x25BA;'+'</button>';

                keyElement.addEventListener("click", () => {
                    keyboard.value += `${keyElement.textContent}`;
                    textarea.value = keyboard.value;
                });

                break;

            default:
                keyElement.innerHTML = '<button class="keyboard__key" data="'+key+'"'+'>'+key.toLowerCase()+'</button>';

                keyElement.addEventListener("click", () => {
                    keyboard.value += `${keyElement.textContent}`;
                    textarea.value = keyboard.value;
                });

                break;
        }

        fragment.append(keyElement);

    });

    return fragment;
}

function toggleCapsLock() {
    capsLock = !capsLock;

    for (let key of keys) {
        if (key.textContent !== "Backspace"
            && key.textContent !== "Tab"
            && key.textContent !== "CapsLock"
            && key.textContent !== "Enter"
            && key.textContent !== "Shift"
            && key.textContent !== "Ctrl"
            && key.textContent !== "Win"
            && key.textContent !== "Alt"
            && key.textContent !== "Space") {
                key.textContent = capsLock === true
                ? key.textContent.toUpperCase()
                : key.textContent.toLowerCase();
        }
    }
}

function toggleShift() {
    shift = !shift;

    for (let key of keys) {
        if (key.textContent !== "Backspace"
            && key.textContent !== "Tab"
            && key.textContent !== "CapsLock"
            && key.textContent !== "Enter"
            && key.textContent !== "Shift"
            && key.textContent !== "Ctrl"
            && key.textContent !== "Win"
            && key.textContent !== "Alt"
            && key.textContent !== "Space") {
                key.textContent = shift === true
                ? key.textContent.toUpperCase()
                : key.textContent.toLowerCase();
        }

        if (key.textContent === "`" || key.textContent === "~") {
            key.textContent = shift === true ? "~" : "`";
        }

        if (key.textContent === "1" || key.textContent === "!") {
            key.textContent = shift === true ? "!" : "1";
        }

        if (key.textContent === "2" || key.textContent === "@") {
            key.textContent = shift === true ? "@" : "2";
        }

        if (key.textContent === "3" || key.textContent === "#") {
            key.textContent = shift === true ? "#" : "3";
        }

        if (key.textContent === "4" || key.textContent === "$") {
            key.textContent = shift === true ? "$" : "4";
        }

        if (key.textContent === "5" || key.textContent === "%") {
            key.textContent = shift === true ? "%" : "5";
        }

        if (key.textContent === "6" || key.textContent === "^") {
            key.textContent = shift === true ? "^" : "6";
        }

        if (key.textContent === "7" || key.textContent === "&") {
            key.textContent = shift === true ? "&" : "7";
        }

        if (key.textContent === "8" || key.textContent === "*") {
            key.textContent = shift === true ? "*" : "8";
        }

        if (key.textContent === "9" || key.textContent === "(") {
            key.textContent = shift === true ? "(" : "9";
        }

        if (key.textContent === "0" || key.textContent === ")") {
            key.textContent = shift === true ? ")" : "0";
        }

        if (key.textContent === "-" || key.textContent === "_") {
            key.textContent = shift === true ? "_" : "-";
        }

        if (key.textContent === "=" || key.textContent === "+") {
            key.textContent = shift === true ? "+" : "=";
        }

        if (key.textContent === "[" || key.textContent === "{") {
            key.textContent = shift === true ? "{" : "[";
        }

        if (key.textContent === "]" || key.textContent === "}") {
            key.textContent = shift === true ? "}" : "]";
        }

        if (key.textContent === "\\" || key.textContent === "|") {
            key.textContent = shift === true ? "|" : "\\";
        }

        if (key.textContent === ";" || key.textContent === ":") {
            key.textContent = shift === true ? ":" : ";";
        }

        if (key.textContent === "'" || key.textContent === "\"") {
            key.textContent = shift === true ? "\"" : "'";
        }
        if (key.textContent === "," || key.textContent === "<") {
            key.textContent = shift === true ? "<" : ",";
        }

        if (key.textContent === "." || key.textContent === ">") {
            key.textContent = shift === true ? ">" : ".";
        }

        if (key.textContent === "?" || key.textContent === "/") {
            key.textContent = shift === true ? "?" : "/";
        }
    }
}


window.addEventListener('keydown', (event) => {

    if(event.key === "Backspace") {
        document.querySelector('.keyboard__keys .keyboard__key[data="' + "Backspace" + '"]').classList.add('keyboard__key-active');
    } else if (event.key === "Tab") {
        document.querySelector('.keyboard__keys .keyboard__key[data="' + "Tab" + '"]').classList.add('keyboard__key-active');

    } else if (event.key === "CapsLock") {
        toggleCapsLock();
        document.querySelector('.keyboard__keys .keyboard__key[data="' + "CapsLock" + '"]').classList.toggle("keyboard__key-caps-active");

    } else if ((event.key === "Shift") && (event.code === "ShiftLeft")){
        document.querySelector('.keyboard__keys .keyboard__key[data="' + "ShiftLeft" + '"]').classList.add('keyboard__key-active');

    } else if((event.key === "Shift") && (event.code === "ShiftRight")) {
        document.querySelector('.keyboard__keys .keyboard__key[data="' + "ShiftRight" + '"]').classList.add('keyboard__key-active');

    } else if ((event.key === "\\") || (event.code === "Backslash")) {
        document.querySelector('.keyboard__keys .keyboard__key[data="' + "Backslash" + '"]').classList.add('keyboard__key-active');

    } else if (event.key === "Enter") {
        document.querySelector('.keyboard__keys .keyboard__key[data="' + "Enter" + '"]').classList.add('keyboard__key-active');

    } else if ((event.key === "Control") && (event.code === "ControlLeft")) {
        document.querySelector('.keyboard__keys .keyboard__key[data="' + "ControlLeft" + '"]').classList.add('keyboard__key-active');

    } else if ((event.key === "Control") && (event.code === "ControlRight")) {
        document.querySelector('.keyboard__keys .keyboard__key[data="' + "ControlRight" + '"]').classList.add('keyboard__key-active');

    } else if (event.key === "Meta") {
        document.querySelector('.keyboard__keys .keyboard__key[data="' + "Meta" + '"]').classList.add('keyboard__key-active');

    } else if ((event.key === "Alt") && (event.code === "AltLeft")) {
        document.querySelector('.keyboard__keys .keyboard__key[data="' + "AltLeft" + '"]').classList.add('keyboard__key-active');

    } else if ((event.key === "Alt") && (event.code === "AltRight")) {
        document.querySelector('.keyboard__keys .keyboard__key[data="' + "AltRight" + '"]').classList.add('keyboard__key-active');

    } else if (event.key === "ArrowLeft") {
        document.querySelector('.keyboard__keys .keyboard__key[data="' + "ArrowLeft" + '"]').classList.add('keyboard__key-active');

    } else if (event.key === "ArrowRight") {
        document.querySelector('.keyboard__keys .keyboard__key[data="' + "ArrowRight" + '"]').classList.add('keyboard__key-active');

    } else if (event.key === "ArrowUp") {
        document.querySelector('.keyboard__keys .keyboard__key[data="' + "ArrowUp" + '"]').classList.add('keyboard__key-active');

    } else if (event.key === "ArrowDown") {
        document.querySelector('.keyboard__keys .keyboard__key[data="' + "ArrowDown" + '"]').classList.add('keyboard__key-active');

    } else if (event.key === " ") {
        document.querySelector('.keyboard__keys .keyboard__key[data="' + "Space" + '"]').classList.add('keyboard__key-active');

    } else {
        for (let key of keys) {
            if(key.getAttribute('data') == event.key.toLowerCase()){
                key.classList.add("keyboard__key-active");
           }
        }
    }


})

window.addEventListener('keyup', (event) => {

    if(event.key === "Backspace") {
        document.querySelector('.keyboard__keys .keyboard__key[data="' + "Backspace" + '"]').classList.remove('keyboard__key-active');

    } else if (event.key === "Tab") {
        document.querySelector('.keyboard__keys .keyboard__key[data="' + "Tab" + '"]').classList.remove('keyboard__key-active');

    } else if ((event.key === "Shift") && (event.code === "ShiftLeft")){
        document.querySelector('.keyboard__keys .keyboard__key[data="' + "ShiftLeft" + '"]').classList.remove('keyboard__key-active');

    } else if((event.key === "Shift") && (event.code === "ShiftRight")) {
        document.querySelector('.keyboard__keys .keyboard__key[data="' + "ShiftRight" + '"]').classList.remove('keyboard__key-active');

    } else if ((event.key === "\\") || (event.code === "Backslash")) {
        document.querySelector('.keyboard__keys .keyboard__key[data="' + "Backslash" + '"]').classList.remove('keyboard__key-active');

    } else if (event.key === "Enter") {
        document.querySelector('.keyboard__keys .keyboard__key[data="' + "Enter" + '"]').classList.remove('keyboard__key-active');

    } else if ((event.key === "Control") && (event.code === "ControlLeft")) {
        document.querySelector('.keyboard__keys .keyboard__key[data="' + "ControlLeft" + '"]').classList.remove('keyboard__key-active');

    } else if ((event.key === "Control") && (event.code === "ControlRight")) {
        document.querySelector('.keyboard__keys .keyboard__key[data="' + "ControlRight" + '"]').classList.remove('keyboard__key-active');

    } else if (event.key === "Meta") {
        document.querySelector('.keyboard__keys .keyboard__key[data="' + "Meta" + '"]').classList.remove('keyboard__key-active');

    } else if ((event.key === "Alt") && (event.code === "AltLeft")) {
        document.querySelector('.keyboard__keys .keyboard__key[data="' + "AltLeft" + '"]').classList.remove('keyboard__key-active');

    } else if ((event.key === "Alt") && (event.code === "AltRight")) {
        document.querySelector('.keyboard__keys .keyboard__key[data="' + "AltRight" + '"]').classList.remove('keyboard__key-active');

    } else if (event.key === "ArrowLeft") {
        document.querySelector('.keyboard__keys .keyboard__key[data="' + "ArrowLeft" + '"]').classList.remove('keyboard__key-active');

    } else if (event.key === "ArrowRight") {
        document.querySelector('.keyboard__keys .keyboard__key[data="' + "ArrowRight" + '"]').classList.remove('keyboard__key-active');

    } else if (event.key === "ArrowUp") {
        document.querySelector('.keyboard__keys .keyboard__key[data="' + "ArrowUp" + '"]').classList.remove('keyboard__key-active');

    } else if (event.key === "ArrowDown") {
        document.querySelector('.keyboard__keys .keyboard__key[data="' + "ArrowDown" + '"]').classList.remove('keyboard__key-active');

    } else if (event.key === " ") {
        document.querySelector('.keyboard__keys .keyboard__key[data="' + "Space" + '"]').classList.remove('keyboard__key-active');

    } else {
        for (let key of keys) {
            if(key.getAttribute('data') == event.key.toLowerCase()){
                key.classList.remove("keyboard__key-active");
           }
        }
    }


})

