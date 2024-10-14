const chatbotIcon = document.getElementById('chatbot-icon');
const chatbotContainer = document.getElementById('chatbot-container');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotMessages = document.getElementById('chatbot-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

chatbotIcon.addEventListener('click', () => {
    chatbotContainer.style.display = 'flex';
    chatbotIcon.classList.remove('pulse');
});

chatbotClose.addEventListener('click', () => {
    chatbotContainer.style.display = 'none';
});

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, 'user-message');
        userInput.value = '';
        try {
            const botResponse = await getBotResponse(message);
            addMessage(botResponse, 'bot-message');
        } catch (error) {
            console.error('Error:', error);
            addMessage("I'm sorry, I couldn't process your request at the moment. Please try again later.", 'bot-message');
        }
    }
}

function addMessage(message, className) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', className);
    messageElement.textContent = message;
    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

async function getBotResponse(message) {
    const apiKey = '';
    const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
    
    // Expanded website-specific information
    const websiteInfo = {
        "services": ["Laboratory Test", "Health Check", "General Dentistry"],
        "doctors": [
            {name: "Dr. Sakshi Malik", specialty: "Cardiologist", contact: "sakshi.malik@care.com"},
            {name: "Dr. Akash More", specialty: "Neurosurgeon", contact: "akash.more@care.com"},
            {name: "Dr. Abhay Varma", specialty: "Dermatologist", contact: "abhay.varma@care.com"}
        ],
        "contact": "123,ABC Street, INDIA | support@care.com | (+91) 99999 99999",
        "about": "We are committed to promoting wellness and providing valuable resources to empower you on your health journey.",
        "appointment": "To book an appointment, you can:\n1. Use our online booking form on the website\n2. Call us at (+91) 99999 99999\n3. Email us at appointments@care.com",
        "useful_info": [
            "We offer 24/7 emergency services",
            "Free health check-ups are available on the first Sunday of every month",
            "We accept all major insurance providers",
            "Our laboratory is open from 7 AM to 9 PM every day"
        ]
    };

    // Check if the message is related to website information
    const lowercaseMessage = message.toLowerCase();
    if (lowercaseMessage.includes("services") || lowercaseMessage.includes("doctors") || 
        lowercaseMessage.includes("contact") || lowercaseMessage.includes("about") ||
        lowercaseMessage.includes("appointment") || lowercaseMessage.includes("information") ||
        lowercaseMessage.includes("specialty")) {
        
        if (lowercaseMessage.includes("services")) {
            return "Our services include: " + websiteInfo.services.join(", ");
        } else if (lowercaseMessage.includes("doctors")) {
            return "Our doctors are: " + websiteInfo.doctors.map(doc => `${doc.name} (${doc.specialty})`).join(", ");
        } else if (lowercaseMessage.includes("contact")) {
            return "Contact us at: " + websiteInfo.contact;
        } else if (lowercaseMessage.includes("about")) {
            return websiteInfo.about;
        } else if (lowercaseMessage.includes("appointment")) {
            return websiteInfo.appointment;
        } else if (lowercaseMessage.includes("information")) {
            return "Useful information:\n" + websiteInfo.useful_info.join("\n");
        } else if (lowercaseMessage.includes("specialty")) {
            const specialty = lowercaseMessage.split("specialty")[1].trim();
            const doctor = websiteInfo.doctors.find(doc => doc.specialty.toLowerCase() === specialty);
            if (doctor) {
                return `To contact our ${doctor.specialty}, ${doctor.name}, please email: ${doctor.contact}`;
            } else {
                return "I'm sorry, I couldn't find a doctor with that specialty. Please try asking about our available doctors.";
            }
        }
    }
    
    // If not website-specific, use the AI API
    try {
        const response = await fetch(`${apiUrl}?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: message
                    }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data);

        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0].text) {
            return data.candidates[0].content.parts[0].text;
        } else {
            throw new Error('Unexpected response format from API');
        }
    } catch (error) {
        console.error('Error in getBotResponse:', error);
        return "I'm sorry, I couldn't process your request at the moment. Please try again later.";
    }
}

// The rest of your code remains the same...

// The rest of your code remains the same...

document.addEventListener('DOMContentLoaded', function() {
    const chatbotIcon = document.getElementById('chatbot-icon');
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotClose = document.getElementById('chatbot-close');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const chatbotMessages = document.getElementById('chatbot-messages');
  
    chatbotIcon.addEventListener('click', function() {
      chatbotContainer.classList.add('active');
      chatbotIcon.style.display = 'none';
      setTimeout(() => {
        addBotMessage("Hello! How can I assist you today?");
      }, 500);
    });
  
    chatbotClose.addEventListener('click', function() {
      chatbotContainer.classList.remove('active');
      setTimeout(() => {
        chatbotIcon.style.display = 'flex';
      }, 300);
    });
  
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  
    function sendMessage() {
      const message = userInput.value.trim();
      if (message) {
        addUserMessage(message);
        userInput.value = '';
        // Here you would typically send the message to a server and get a response
        // For this example, we'll just echo the message back
        setTimeout(() => {
          addBotMessage("I received your message: " + message);
        }, 1000);
      }
    }
  
    function addUserMessage(message) {
      const messageElement = document.createElement('div');
      messageElement.classList.add('message', 'user-message');
      messageElement.textContent = message;
      chatbotMessages.appendChild(messageElement);
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
  
    function addBotMessage(message) {
      const messageElement = document.createElement('div');
      messageElement.classList.add('message', 'bot-message');
      messageElement.textContent = message;
      chatbotMessages.appendChild(messageElement);
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    let isOpen = false;
    
    function toggleChatbot() {
        isOpen = !isOpen;
        chatbotContainer.classList.toggle('active', isOpen);
        chatbotIcon.classList.toggle('open', isOpen);
        
        if (isOpen) {
            chatbotIcon.style.animation = 'none';
        } else {
            chatbotIcon.style.animation = 'pulse 2s infinite';
        }
    }
    
    chatbotIcon.addEventListener('click', toggleChatbot);
    chatbotClose.addEventListener('click', toggleChatbot);        
  });




// Find the form element
const appointmentForm = document.querySelector('#appointmentForm');

// Add event listener for form submission
appointmentForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission

    // Get form data
    const formData = new FormData(this);

    // Create an object with the form data
    const appointmentData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        address: formData.get('address'),
        phone: formData.get('phone')
    };

    // Check if all fields are filled
    for (let key in appointmentData) {
        if (!appointmentData[key]) {
            alert(`Please fill in the ${key.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
            return;
        }
    }

    console.log('Sending appointment data:', JSON.stringify(appointmentData, null, 2));

    // Send POST request to the backend
    fetch('http://localhost:5000/book_appointment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
    })
    .then(response => {
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        if (!response.ok) {
            return response.text().then(text => {
                throw new Error(`HTTP error! status: ${response.status}, message: ${text}`);
            });
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert('Appointment booked successfully!');
        this.reset(); // Reset the form
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while booking the appointment: ' + error.message);
    });
});