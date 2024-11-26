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

function fetchData() {
    const phoneNumber = document.getElementById('parentPhone').value.trim();

    if (phoneNumber) {
        // Get current year, month, and date
        const today = new Date();
        const year = today.getFullYear();
        const month = today.toLocaleString('default', { month: 'long' });
        const date = today.getDate();

        // Fetch parent details
        const parentRef = ref(database, `parents/${year}/${month}/${date}/${phoneNumber}`);
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

                    // Show the child name container and confirmation button
                    document.getElementById('childNameContainer').style.display = 'block';
                    document.getElementById('visitorDetails').style.display = 'none';
                    document.getElementById('confirmParent').style.display = 'inline-block';
                } else {
                    // If no parent details are found, fetch visitor details
                    const visitorRef = ref(database, `visitor_guider_or_teacher/${year}/${month}/${date}`);
                    get(visitorRef).then((visitorSnapshot) => {
                        if (visitorSnapshot.exists()) {
                            let visitorFound = false;

                            // Loop through visitors to find the matching phone number
                            visitorSnapshot.forEach((childSnapshot) => {
                                const visitorData = childSnapshot.val();
                                if (visitorData.phone_number === phoneNumber) {
                                    visitorFound = true;

                                    // Populate visitor details
                                    document.getElementById('visitorCompanyName').textContent = visitorData.company_name || "Not available";
                                    document.getElementById('visitorGuiderName').textContent = visitorData.guider_name || "Not available";
                                    document.getElementById('visitorCount').textContent = visitorData.number_of_visitors || "Not available";

                                    document.getElementById('childNameContainer').style.display = 'none';
                                    document.getElementById('visitorDetails').style.display = 'block';
                                    document.getElementById('confirmVisitor').style.display = 'inline-block';
                                }
                            });

                            if (!visitorFound) {
                                alert('No details found for this phone number.');
                            }
                        } else {
                            alert('No details found for this phone number.');
                        }
                    }).catch((error) => {
                        console.error('Error fetching visitor data:', error);
                        alert('Error fetching visitor data. Please try again later.');
                    });
                }
            })
            .catch((error) => {
                console.error('Error fetching parent data:', error);
                alert('Error fetching parent data. Please try again later.');
            });
    } else {
        alert('Please enter a phone number.');
    }
}

// Confirmation button action
function confirmAction() {
    alert("Thank you! Confirmation successful.");

    // Clear the form fields
    document.getElementById('parentPhone').value = '';

    // Hide the fetched details sections
    document.getElementById('childNameContainer').style.display = 'none';
    document.getElementById('visitorDetails').style.display = 'none';

    // Hide the confirmation buttons
    document.getElementById('confirmParent').style.display = 'none';
    document.getElementById('confirmVisitor').style.display = 'none';
}

// Attach events
document.getElementById('fetchButton').addEventListener('click', fetchData);
document.getElementById('confirmParent').addEventListener('click', confirmAction);
document.getElementById('confirmVisitor').addEventListener('click', confirmAction);
