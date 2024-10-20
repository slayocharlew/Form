// Import the necessary Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

// Your web app's Firebase configuration
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

// Function to save visitor data to Firebase
function saveVisitorData(schoolName, guiderName, phoneNumber, numberOfStudents, dateOfVisit) {
    const visitorRef = ref(database, 'visitor guider or teach name/' + phoneNumber);
    set(visitorRef, {
        schoolName: schoolName,
        guiderName: guiderName,
        phoneNumber: phoneNumber,
        numberOfStudents: numberOfStudents,
        dateOfVisit: dateOfVisit
    })
    .then(() => {
        console.log('Data saved successfully!');
    })
    .catch((error) => {
        console.error('Error saving data:', error);
    });
}

// Function to handle form submission
function submitForm(event) {
    event.preventDefault();

    const schoolName = document.getElementById('schoolName').value;
    const guiderName = document.getElementById('guiderName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const numberOfStudents = document.getElementById('numberOfStudents').value;
    const dateOfVisit = document.getElementById('dateOfVisit').value;

    // Save data to Firebase
    saveVisitorData(schoolName, guiderName, phoneNumber, numberOfStudents, dateOfVisit);

    // Display the notification
    const notification = document.getElementById('notification');
    notification.style.display = 'block';
    notification.classList.add('show');

    // Reset the form fields
    const form = document.getElementById('schoolVisitForm');
    form.reset();

    // Optionally hide the notification after a few seconds
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Attach the submit event to the form
document.getElementById('schoolVisitForm').addEventListener('submit', submitForm);
