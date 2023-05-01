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
keyboard.value = "";

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
        "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "Shift", String.fromCodePoint(129093),
        "Ctrl", "Win", "Alt", "Space", "Alt", "Ctrl", String.fromCodePoint(129092), String.fromCodePoint(129095), String.fromCodePoint(129094),
    ];

    keyLayout.forEach(key => {
        let keyElement = document.createElement("button");

        keyElement.setAttribute("type", "button");
        keyElement.setAttribute("data-about", ` ${key} `);
        keyElement.classList.add("keyboard__key");
        //console.log(keyElement.dataset.about);

        switch (key) {
            case "Backspace":
                keyElement.classList.add("keyboard__key-wide");
                keyElement.textContent = "Backspace";
                keyElement.value = keyElement.textContent;

                keyElement.addEventListener("click", () => {
                    if (textarea.value.endsWith(String.fromCodePoint(129093))
                        || textarea.value.endsWith(String.fromCodePoint(129092))
                        || textarea.value.endsWith(String.fromCodePoint(129095))
                        || textarea.value.endsWith(String.fromCodePoint(129094))) {
                        keyboard.value = keyboard.value.substring(0, keyboard.value.length - 2);
                    } else {
                        keyboard.value = keyboard.value.substring(0, keyboard.value.length - 1);
                    }

                    textarea.value = keyboard.value;
                });

                break;

            case "Tab":
                keyElement.classList.add("keyboard__key-wide");
                keyElement.textContent = "Tab";

                keyElement.addEventListener("click", () => {
                    keyboard.value += "    ";
                    textarea.value = keyboard.value;
                });

                break;

            case "\\":
                keyElement.classList.add("keyboard__key-wide");
                keyElement.textContent = "\\";

                keyElement.addEventListener("click", () => {
                    keyboard.value += keyElement.textContent;
                    textarea.value = keyboard.value;
                });

                break;

            case "CapsLock":
                keyElement.classList.add("keyboard__key-wide");
                keyElement.textContent = "CapsLock";

                keyElement.addEventListener("click", () => {
                    toggleCapsLock();
                    keyElement.classList.toggle("keyboard__key-caps-active");
                })

                break;

            case "Shift":
                keyElement.classList.add("keyboard__key-wide");
                keyElement.classList.add("shift-btn");
                keyElement.textContent = "Shift";

                keyElement.addEventListener("mousedown", () => {
                    toggleShift()
                });

                keyElement.addEventListener("mouseup", () => {
                    toggleShift()
                });

                break;

            case "Ctrl":
                keyElement.classList.add("keyboard__key-wide");
                keyElement.textContent = "Ctrl";

                break;

            case "Enter":
                keyElement.classList.add("keyboard__key-wide");
                keyElement.textContent = "Enter";

                keyElement.addEventListener("click", () => {
                    keyboard.value += "\n";
                    textarea.value = keyboard.value;
                });

                break;

            case "Space":
                keyElement.classList.add("keyboard__key-superwide");
                keyElement.textContent = "Space";

                keyElement.addEventListener("click", () => {
                    keyboard.value += " ";
                    textarea.value = keyboard.value;
                });

                break;

                case "Alt":
                    keyElement.textContent = "Alt";

                    break;

                case "Win":
                    keyElement.textContent = "Win";

                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

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

document.addEventListener('keypress', (event) => {
    for (let key of keys) {
        if(key.textContent === event.key){
            //console.log('yes');
            //console.log(key.textContent);
            key.classList.add("keyboard__key:active");
            //console.log(key.className);
       };
    }
})

document.addEventListener('keyup', (event) => {
    for (let key of keys) {
        if(key.textContent === event.key){
            //console.log('yes');
            //console.log(key.textContent);
            key.classList.remove("keyboard__key:active");
            //console.log(key.className);
       };
    }
})

