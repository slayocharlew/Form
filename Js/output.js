// Import the necessary Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

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

function fetchChildName() {
    const parentPhone = document.getElementById('parentPhone').value.trim();

    if (parentPhone) {
        const parentRef = ref(database, 'parents/' + parentPhone);

        // Fetch the parent data from Firebase
        get(parentRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const childList = document.getElementById('childList');
                    childList.innerHTML = ''; // Clear the list first

                    // Add each child as a list item
                    data.children.forEach((child) => {
                        const listItem = document.createElement('li');
                        listItem.textContent = child.name;
                        childList.appendChild(listItem);
                    });

                    document.getElementById('childNameContainer').style.display = 'block'; // Show the child name list
                } else {
                    alert('No child found for this phone number. Please check again.');
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                alert('Error fetching child name. Please try again later.');
            });
    } else {
        alert('Please enter a phone number.');
    }
}

function signOut(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const childList = document.getElementById('childList');
    if (childList.children.length > 0) {
        // Show the pop-up message first
        alert('Thank you! Welcome again, see you next time!');

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

// Attach the click event to the fetch button
document.getElementById('fetchButton').addEventListener('click', fetchChildName);
