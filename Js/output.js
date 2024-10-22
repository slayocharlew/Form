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
        // Check if the phone number belongs to a parent
        const parentRef = ref(database, 'parents/' + phoneNumber);
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

                    document.getElementById('childNameContainer').style.display = 'block';
                    document.getElementById('visitorDetails').style.display = 'none';
                } else {
                    // If no parent details are found, check the "visitor_guider_or_teacher" node
                    const visitorRef = ref(database, 'visitor_guider_or_teacher/' + phoneNumber);
                    get(visitorRef)
                        .then((visitorSnapshot) => {
                            if (visitorSnapshot.exists()) {
                                const visitorData = visitorSnapshot.val();

                                // Check and log the visitorData to verify structure
                                console.log('Fetched Visitor Data:', visitorData);

                                // Access the keys based on the actual structure
                                const schoolName = visitorData.schoolName || visitorData.school || "Not Available";
                                const guiderName = visitorData.guiderName || visitorData.teacherName || "Not Available";
                                const numberOfStudents = visitorData.numberOfStudents || visitorData.students || "Not Available";

                                // Display the fetched details
                                document.getElementById('visitorDetails').innerHTML = `
                                    <p>School Name: ${schoolName}</p>
                                    <p>Guider Name: ${guiderName}</p>
                                    <p>Number of Students: ${numberOfStudents}</p>
                                `;
                                document.getElementById('childNameContainer').style.display = 'none';
                                document.getElementById('visitorDetails').style.display = 'block';
                            } else {
                                alert('No details found for this phone number.');
                            }
                        })
                        .catch((error) => {
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

// Attach the click event to the fetch button
document.getElementById('fetchButton').addEventListener('click', fetchData);
