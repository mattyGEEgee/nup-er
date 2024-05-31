const numberDisplay = document.querySelector('#number-display')
const upToInput = document.querySelector('#up-to-number')
const languageFieldset = document.querySelector('#language-selection')
const languageSelection = document.querySelectorAll('input[name="language"]')
const generateNewNumberButton = document.querySelector('#generate-new-number')
const revealNumberButton = document.querySelector('#reveal-number')
const AZURE_API_KEY = document.querySelector('#azure-api-key')
const responseMessageArea = document.querySelector("#response-message")
let number
let upTo
let language

languageFieldset.addEventListener('click', (event) => {
    console.log(event);
})

function ChooseLanguage() {
    let checked = []
    languageSelection.forEach((checkbox)=> {
        if (checkbox.checked) {
            checked.push(checkbox.value)
        }
    })
    if (checked.length == 1){
        language = checked[0]
    } else {
        let randomLanguage = Math.floor(Math.random() * checked.length)
        language = checked[randomLanguage]
    }
}

generateNewNumberButton.addEventListener('click', () => {
    ChooseLanguage()
    upTo = parseInt(upToInput.value, 10)
    number = Math.floor(Math.random() * upTo) + 1
    numberDisplay.textContent = ""
    revealNumberButton.disabled = false
    speechButton.disabled = false
})

revealNumberButton.addEventListener('click', (event) => {
    event.target.disabled = true
    numberDisplay.textContent = number
})

speechButton.addEventListener("click", () => {
    synthesizeSpeech(number, language)
})