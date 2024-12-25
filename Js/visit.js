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
function saveVisitorData(companyOrSchoolName, guiderOrTeacherName, phoneNumber, numberOfVisitorOrStudent) {
    const today = new Date();
    const year = today.getFullYear(); // e.g., 2024
    const month = today.toLocaleString('default', { month: 'long' }); // e.g., December
    const date = today.getDate(); // e.g., 25

    // Get current in-time (hh:mm:ss format)
    const inTime = today.toLocaleTimeString();

    const visitorData = {
        company_or_school_name: companyOrSchoolName, // Updated to remove special characters
        guider_or_teacher_name: guiderOrTeacherName, // Updated to remove special characters
        phone_number: phoneNumber,
        number_of_visitor_or_student: numberOfVisitorOrStudent, // Updated to remove special characters
        in_time: inTime // Add in-time
    };

    // Generate a unique ID for the visitor entry
    const visitorID = `${phoneNumber}-${Date.now()}`;

    const visitorRef = ref(database, `visitor_guider_or_teacher/${year}/${month}/${date}/${visitorID}`);
    set(visitorRef, visitorData)
        .then(() => console.log("Visitor data saved successfully with in-time."))
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

    const companyOrSchoolName = document.getElementById('companyName').value.trim();
    const guiderOrTeacherName = document.getElementById('guiderName').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const numberOfVisitorOrStudent = document.getElementById('numberOfVisitors').value.trim();

    // Validate input
    if (!companyOrSchoolName || !guiderOrTeacherName || !phoneNumber || !numberOfVisitorOrStudent) {
        alert("Please fill in all required fields.");
        return;
    }

    // Validate phone number format
    if (!isValidPhoneNumber(phoneNumber)) {
        alert("Please enter a valid phone number in the format: 07XXXXXXXX or 06XXXXXXXX (10 digits).");
        return;
    }

    // Save data to Firebase
    saveVisitorData(companyOrSchoolName, guiderOrTeacherName, phoneNumber, numberOfVisitorOrStudent);

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
