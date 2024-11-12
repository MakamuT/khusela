const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("input");

function sendMessage() {
  const message = userInput.value; // Get the user's message
  if (message) {
    displayMessage(message, "user");
    userInput.value = ""; // Clear the input field

    getBotResponse(message).then((response) => {
      displayMessage(response, "bot");
    });
  }
}

function displayMessage(message, sender) {
  const messageElement = document.createElement("div");
  messageElement.className = `message ${sender}`;
  const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    const date = now.toLocaleDateString();
     messageElement.innerHTML = `
        <span class="text">${message}</span>
        <span class="timestamp">${date} ${time}</span>
    `;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight; 
}


async function getBotResponse(userMessage) {
  try {
    const response = await fetch("https://api.your-nlp-service.com/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer YOUR_API_KEY", // Make sure the API key is valid
      },
      body: JSON.stringify({ message: userMessage }),
    });
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Error:", error);
    return "Sorry, something went wrong."; // Fallback response
  }
}

// Speech Recognition functionality (check for browser compatibility)
if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    displayMessage(transcript, "user");
    getBotResponse(transcript).then((response) => {
      displayMessage(response, "bot");
    });
  };

  // Start listening for speech input
  function startListening() {
    recognition.start();
  }
}

// Text-to-Speech functionality
function speak(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  synth.speak(utterance);
}
