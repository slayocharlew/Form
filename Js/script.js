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
    `;

    childrenContainer.appendChild(newChild);
}

function submitForm(event) {
    event.preventDefault(); // Prevent the form from submitting normally

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
