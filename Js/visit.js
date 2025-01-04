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
function saveVisitorData(registrationType, companyOrSchoolName, guiderOrTeacherName, phoneNumber, numberOfPeople) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.toLocaleString('default', { month: 'long' });
    const date = today.getDate();

    // Get current in-time (hh:mm:ss format)
    const inTime = today.toLocaleTimeString();

    // Prepare data based on the registration type
    let visitorData = {
        date: `${year}-${month}-${date}`, // Add date field
        phone_number: phoneNumber,
        in_time: inTime
    };

    if (registrationType === "school visit") {
        visitorData = {
            ...visitorData, // Include common fields
            school_name: companyOrSchoolName, // For school visits
            teacher_name: guiderOrTeacherName,
            number_of_students: numberOfPeople
        };
    } else if (registrationType === "guest visitor") {
        visitorData = {
            ...visitorData, // Include common fields
            company_name: companyOrSchoolName, // For guest visitors
            guider_name: guiderOrTeacherName,
            number_of_visitors: numberOfPeople
        };
    }

    // Generate a unique ID for the visitor entry
    const visitorID = `${phoneNumber}-${Date.now()}`;

    // Save data under the selected registration type
    const visitorRef = ref(database, `visitor/${registrationType}/${year}/${month}/${date}/${visitorID}`);
    set(visitorRef, visitorData)
        .then(() => console.log(`Visitor data saved successfully under: ${registrationType}`))
        .catch((error) => console.error("Error saving visitor data:", error));
}

// Validate phone number format
function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^0[67]\d{8}$/; // Matches 07XXXXXXXX or 06XXXXXXXX
    return phoneRegex.test(phoneNumber);
}

// Function to handle form submission
function submitVisitorForm(event) {
    event.preventDefault();

    const companyName = document.getElementById('companyName').value.trim();
    const guiderName = document.getElementById('guiderName').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const numberOfPeople = document.getElementById('numberOfVisitors').value.trim();
    const registrationType = document.querySelector('input[name="registrationType"]:checked')?.value;

    // Validate input
    if (!companyName || !guiderName || !phoneNumber || !numberOfPeople || !registrationType) {
        alert("Please fill in all required fields and select a registration type.");
        return;
    }

    // Validate phone number format
    if (!isValidPhoneNumber(phoneNumber)) {
        alert("Please enter a valid phone number in the format: 07XXXXXXXX or 06XXXXXXXX (10 digits).");
        return;
    }

    // Save data to Firebase
    saveVisitorData(registrationType, companyName, guiderName, phoneNumber, numberOfPeople);

    // Display the notification
    const notification = document.getElementById('notification');
    notification.style.display = 'block';
    notification.classList.add('show');

    // Clear the form fields
    const form = document.getElementById('visitorForm');
    form.reset();

    // Optionally hide the notification after a few seconds
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Attach the submit event to the form
document.getElementById('visitorForm').addEventListener('submit', submitVisitorForm);
