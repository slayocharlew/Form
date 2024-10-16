// Import the necessary Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

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

// Attach fetchChildName to the global window object
window.fetchChildName = function () {
    const parentPhone = document.getElementById('parentPhone').value.trim();

    if (parentPhone) {
        const parentRef = ref(database, 'parents/' + parentPhone);
        console.log("Fetching child names for phone:", parentPhone); // Debugging log

        // Use onValue to listen for changes
        onValue(parentRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const childNames = data.children.map(child => child.name).join(", "); // Joining child names

                document.getElementById('childName').value = childNames; // Display child names
                document.getElementById('childNameContainer').style.display = 'block'; // Show the child name input
            } else {
                alert('No child found for this phone number. Please check again.');
            }
        }, (error) => {
            console.error('Error fetching data:', error);
            alert('Error fetching child name. Please try again later.');
        });
    } else {
        alert('Please enter a phone number.');
    }
}

// Sign-out function remains the same
window.signOut = function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const childName = document.getElementById('childName').value;
    if (childName) {
        // Placeholder: Code for handling sign-out logic (e.g., updating database status)

        // Display the success notification
        const notification = document.getElementById('notification');
        notification.style.display = 'block';
        notification.classList.add('show');

        // Clear the form fields
        const form = document.getElementById('signOutForm');
        form.reset();
        document.getElementById('childNameContainer').style.display = 'none';

        // Hide the notification after a few seconds
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    } else {
        alert('Please fetch the child name first.');
    }
}
