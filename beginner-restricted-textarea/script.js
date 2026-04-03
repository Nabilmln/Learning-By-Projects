const textarea = document.getElementById("textarea");
const counter = document.getElementById("counter");

const maxLength = 250;

textarea.addEventListener("input", function () {

    let text = textarea.value;

    if (text.length > maxLength) {
        textarea.value = text.substring(0, maxLength);
    }

    let length = textarea.value.length;

    counter.textContent = length + " / " + maxLength;

    if (length >= maxLength) {
        textarea.classList.add("textarea-red");
        counter.classList.add("counter-red");
    } else {
        textarea.classList.remove("textarea-red");
        counter.classList.remove("counter-red");
    }

});