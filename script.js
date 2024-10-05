document.getElementById('addNameBtn').addEventListener('click', function () {
    const nameFields = document.getElementById('nameFields');
  
    const inputGroup = document.createElement('div');
    inputGroup.classList.add('input-group');
  
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'names[]';
    input.placeholder = 'Enter name';
    input.required = true;
  
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.classList.add('remove-btn');
    removeBtn.textContent = 'X';
    removeBtn.onclick = function () {
      removeField(removeBtn);
    };
  
    inputGroup.appendChild(input);
    inputGroup.appendChild(removeBtn);
  
    nameFields.appendChild(inputGroup);
  });
  
  function removeField(button) {
    const field = button.parentElement;
    field.remove();
  }
  