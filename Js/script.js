// Import the necessary Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref, set, get, update } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

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
            <input type="number" id="childAge${childCount}" name="childAge[]" placeholder="Enter child age" required min="1" max="18">
        </div>
        <div class="input_field">
            <label for="childPhoto${childCount}">Upload Child's Photo</label>
            <input type="file" id="childPhoto${childCount}" name="childPhoto[]" accept="image/*">
        </div>
    `;

    childrenContainer.appendChild(newChild);
}

// Validate phone number format
function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^0[67]\d{8}$/; // Matches 07XXXXXXXX or 06XXXXXXXX
    return phoneRegex.test(phoneNumber);
}

function saveParentData(parentName, parentPhone, children) {
    const today = new Date();
    const year = today.getFullYear(); // e.g., 2024
    const month = today.toLocaleString('default', { month: 'long' }); // e.g., October
    const date = today.getDate(); // e.g., 22

    // Get current in-time (hh:mm:ss format)
    const inTime = today.toLocaleTimeString();

    const parentData = {
        name: parentName,
        phone: parentPhone,
        inTime: inTime, // Add in-time
        children: children
    };

    const parentRef = ref(database, `parents/${year}/${month}/${date}/${parentPhone}`);
    set(parentRef, parentData)
        .then(() => console.log("Parent data saved successfully with in-time."))
        .catch((error) => console.error("Error saving parent data:", error));
}

function submitForm(event) {
    event.preventDefault();

    const parentName = document.getElementById('parentName').value.trim();
    const parentPhone = document.getElementById('parentPhone').value.trim();
    const children = Array.from(document.querySelectorAll('.child')).map((child) => {
        const name = child.querySelector(`[name="childName[]"]`).value.trim();
        const age = child.querySelector(`[name="childAge[]"]`).value.trim();
        const photo = child.querySelector(`[name="childPhoto[]"]`).files[0];

        // Validate age
        if (age < 1 || age > 18) {
            alert("Each child's age must be between 1 and 18.");
            throw new Error("Invalid age for child.");
        }

        return { name, age, photo: photo ? photo.name : "No photo uploaded" };
    });

    // Validate phone number format
    if (!isValidPhoneNumber(parentPhone)) {
        alert("Please enter a valid phone number in the format: 07XXXXXXXX or 06XXXXXXXX (10 digits). ");
        return;
    }

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
