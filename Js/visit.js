// Import the necessary Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCNbSygpMwn5groYbfL1vGxsHqvbDOnFOs",
    authDomain: "attendance-scan-c7af7.firebaseapp.com",
    databaseURL: "https://attendance-scan-c7af7-default-rtdb.firebaseio.com",
    projectId: "attendance-scan-c7af7",
    storageBucket: "attendance-scan-c7af7.appspot.com",
    messagingSenderId: "638130886976",
    appId: "1:638130886976:web:ba3b42703e8d46d55c42a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to save visitor data
function saveVisitorData(companyName, guiderName, phoneNumber, numberOfVisitors) {
    const today = new Date();
    const year = today.getFullYear(); // e.g., 2024
    const month = today.toLocaleString('default', { month: 'long' }); // e.g., October
    const date = today.getDate(); // e.g., 22

    const visitorData = {
        company_name: companyName,
        guider_name: guiderName,
        phone_number: phoneNumber,
        number_of_visitors: numberOfVisitors
    };

    // Generate a unique ID for the visitor entry
    const visitorID = `${phoneNumber}-${Date.now()}`;

    const visitorRef = ref(database, `visitor_guider_or_teacher/${year}/${month}/${date}/${visitorID}`);
    set(visitorRef, visitorData)
        .then(() => console.log("Visitor data saved successfully."))
        .catch((error) => console.error("Error saving visitor data:", error));
}

// Function to handle form submission
function submitVisitorForm(event) {
    event.preventDefault();

    const companyName = document.getElementById('companyName').value.trim();
    const guiderName = document.getElementById('guiderName').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const numberOfVisitors = document.getElementById('numberOfVisitors').value.trim();

    // Validate input
    if (!companyName || !guiderName || !phoneNumber || !numberOfVisitors) {
        alert("Please fill in all required fields.");
        return;
    }

    // Save data to Firebase
    saveVisitorData(companyName, guiderName, phoneNumber, numberOfVisitors);

    // Display the notification
    const notification = document.getElementById('notification');
    notification.style.display = 'block';
    notification.classList.add('show');

    // Clear the form fields
    const form = document.getElementById('schoolVisitForm');
    form.reset();

    // Optionally hide the notification after a few seconds
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Attach the submit event to the form
document.getElementById('schoolVisitForm').addEventListener('submit', submitVisitorForm);
