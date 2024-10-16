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

function addChild() {
    const childrenContainer = document.querySelector('.children_container');
    const childCount = document.querySelectorAll('.child').length + 1;

    const newChild = document.createElement('div');
    newChild.classList.add('child');

    newChild.innerHTML = `
        <div class="input_field">
            <label for="childName${childCount}">Child Name</label>
            <input type="text" id="childName${childCount}" name="childName[]" placeholder="Enter child name" required>
        </div>
        <div class="input_field">
            <label for="childAge${childCount}">Child Age</label>
            <input type="number" id="childAge${childCount}" name="childAge[]" placeholder="Enter child age" required>
        </div>
    `;

    childrenContainer.appendChild(newChild);
}

function saveParentData(parentName, parentPhone, children) {
    const parentRef = ref(database, 'parents/' + parentPhone);
    set(parentRef, {
        name: parentName,
        phone: parentPhone,
        children: children
    })
    .then(() => {
        console.log('Data saved successfully!');
    })
    .catch((error) => {
        console.error('Error saving data:', error);
    });
}

function submitForm(event) {
    event.preventDefault();

    const parentName = document.getElementById('parentName').value;
    const parentPhone = document.getElementById('parentPhone').value;
    const children = Array.from(document.querySelectorAll('.child')).map((child) => {
        const name = child.querySelector(`[name="childName[]"]`).value;
        const age = child.querySelector(`[name="childAge[]"]`).value;
        return { name, age };
    });

    // Save data to Firebase
    saveParentData(parentName, parentPhone, children);

    // Display the notification
    const notification = document.getElementById('notification');
    notification.style.display = 'block';
    notification.classList.add('show');

    // Clear the form fields
    const form = document.getElementById('parentForm');
    form.reset();

    // Optionally hide the notification after a few seconds
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Attach the submit event to the form
document.getElementById('parentForm').addEventListener('submit', submitForm);

// Attach the click event to the "Add Another Child" button
document.getElementById('addChildButton').addEventListener('click', addChild);
