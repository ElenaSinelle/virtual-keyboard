"use strict"

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
p.innerHTML = "Клавиатура создана в операционной системе Windows<br>Для переключения языка используйте комбинацию левых клавиш ctrl и alt";

document.body.append(h1);
document.body.append(textarea);
document.body.append(keyboard);
keyboard.append(keysContainer);
keysContainer.append(createKeyboard());
document.body.append(p);

let keys = keysContainer.querySelectorAll(".keyboard__key");
let capsLock = false;

function createKeyboard() {
    let fragment = document.createDocumentFragment();
    const keyLayout = [
        "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",
        "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "{", "}", "\\",
        "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter",
        "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "Shift", String.fromCodePoint(129093),
        "Ctrl", "Win", "Alt", "Space", "Alt", "Ctrl", String.fromCodePoint(129092), String.fromCodePoint(129095), String.fromCodePoint(129094),
    ];

    keyLayout.forEach(key => {
        let keyElement = document.createElement("button");

        keyElement.setAttribute("type", "button");
        keyElement.setAttribute("data-about", ` ${key} `);
        keyElement.classList.add("keyboard__key");

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
                    keyboard.value += "\\";
                    textarea.value = keyboard.value;
                });

                break;

            case "CapsLock":
                keyElement.classList.add("keyboard__key-wide");
                keyElement.textContent = "CapsLock";
/*
                keyElement.addEventListener("click", () => {
                    toggleCapsLock();
                    keyElement.classList.toggle("keyboard__key-caps-active");
                })
*/
                break;

            case "Shift":
                keyElement.classList.add("keyboard__key-wide");
                keyElement.textContent = "Shift";
    /*
                        keyElement.addEventListener("keydown", () => {
                            toggleShift();
                        });*/

                break;

            case "Ctrl":
                keyElement.classList.add("keyboard__key-wide");
                keyElement.textContent = "Ctrl";
    /*
                        keyElement.addEventListener("click", () => {
                            toggleCtrl();
                        });
    */
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
    /*
                        keyElement.addEventListener("click", () => {
                            toggleAlt();
                        });
    */
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
