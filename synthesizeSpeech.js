const speechButton = document.querySelector('#speak-number')

let SpeechSDK
let synthesizer

function synthesizeSpeech(number, language) {
    console.log(number);
    console.log(language);
    speechButton.disabled = true
    let speechConfig = SpeechSDK.SpeechConfig.fromSubscription(AZURE_API_KEY.value, "westeurope")
    speechConfig.speechSynthesisVoiceName = language

    synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig)

    synthesizer.speakTextAsync(
        number.toString(),
        (result) => {
            speechButton.disabled = false
            // if success
            if (result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) { 
                responseMessageArea.style.color = "inherit"
                responseMessageArea.innerHTML += "playing voice\n"
            // if failure
            } else if (result.reason === SpeechSDK.ResultReason.Canceled) { 
                responseMessageArea.innerHTML += "voice synthesis failed: " + result.errorDetails + "\n"
            }
            console.log(result)
            synthesizer.close()
            synthesizer = undefined
        },
        (err) => {
            speechButton.disabled = false
            responseMessageArea.innerHTML += "Error: "
            responseMessageArea.innerHTML += err
            responseMessageArea.innerHTML += "\n"
            console.log(err)
            synthesizer.close()
            synthesizer = undefined
    })
}

// loads the SpeechSDK from <script> source
if (!!window.SpeechSDK) {
    SpeechSDK = window.SpeechSDK
    // speechButton.disabled = false

    if (typeof RequestAuthorizationToken === "function") {
        RequestAuthorizationToken()
    }
}