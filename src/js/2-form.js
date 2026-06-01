const STORAGE_KEY = 'feedback-form-state';
const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;

populateForm();

form.addEventListener('input', onFormInput);
form.addEventListener('submit', onFormSubmit);

function onFormInput(event) {
  formData[event.target.name] = event.target.value.trim();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateForm() {
  const savedState = localStorage.getItem(STORAGE_KEY);

  if (savedState) {
    try {
      const parsedData = JSON.parse(savedState);

      formData.email = parsedData.email || '';
      formData.message = parsedData.message || '';

      emailInput.value = formData.email;
      messageInput.value = formData.message;
    } catch (error) {
      console.error('Error parsing JSON from localStorage', error);
    }
  }
}

function onFormSubmit(event) {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log('Submitted Data:', formData);

  localStorage.removeItem(STORAGE_KEY);

  formData.email = '';
  formData.message = '';

  form.reset();
}
