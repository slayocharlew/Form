function fetchChildName() {
    const parentPhone = document.getElementById('parentPhone').value;

    if (parentPhone) {
        // Placeholder: Replace this block with code to fetch data from your database
        // Example: You might use an API call to fetch the child name based on the phone number
        // fetch(`https://yourapiurl.com/child?phone=${parentPhone}`)
        //     .then(response => response.json())
        //     .then(data => {
        //         const childName = data.childName;
        //         if (childName) {
        //             document.getElementById('childName').value = childName;
        //             document.getElementById('childNameContainer').style.display = 'block';
        //         } else {
        //             alert('No child found for this phone number. Please check again.');
        //         }
        //     })
        //     .catch(error => {
        //         console.error('Error fetching data:', error);
        //         alert('Error fetching child name. Please try again later.');
        //     });

        // Temporary alert until database integration
        alert('Database fetch functionality to be implemented.');
    } else {
        alert('Please enter a phone number.');
    }
}

function signOut(event) {
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
