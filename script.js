document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmpassword');
    const dateInput = document.getElementById('date');
    const termsCheckbox = document.getElementById('terms');
    
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    // 1. Show/Hide Password Toggle
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.textContent = type === 'password' ? '👁️' : '🙈';
    });

    // 2. Show/Hide Confirm Password Toggle
    toggleConfirmPassword.addEventListener('click', () => {
        const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPasswordInput.setAttribute('type', type);
        toggleConfirmPassword.textContent = type === 'password' ? '👁️' : '🙈';
    });

    // 3. Form Submission Validation
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;

        // Full Name Validation
        if (nameInput.value.trim() === '') {
            showError('nameError', 'Full name is required');
            isValid = false;
        } else {
            clearError('nameError');
        }

        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            showError('emailError', 'Email address is required');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        } else {
            clearError('emailError');
        }

        // Password Validation (Min 8 chars, Alphanumeric)
        const passwordValue = passwordInput.value.trim();
        const hasLetter = /[a-zA-Z]/.test(passwordValue);
        const hasNumber = /[0-9]/.test(passwordValue);

        if (passwordValue === '') {
            showError('passwordError', 'Password is required');
            isValid = false;
        } else if (passwordValue.length < 8) {
            showError('passwordError', 'Password must be at least 8 characters long');
            isValid = false;
        } else if (!hasLetter || !hasNumber) {
            showError('passwordError', 'Password must be alphanumeric (letters & numbers)');
            isValid = false;
        } else {
            clearError('passwordError');
        }

        // Confirm Password Match
        if (confirmPasswordInput.value.trim() === '') {
            showError('confirmPasswordError', 'Please confirm your password');
            isValid = false;
        } else if (confirmPasswordInput.value !== passwordInput.value) {
            showError('confirmPasswordError', 'Passwords do not match');
            isValid = false;
        } else {
            clearError('confirmPasswordError');
        }

        // Date Validation (DD/MM/YYYY)
        const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (dateInput.value.trim() === '') {
            showError('dateError', 'Date of birth is required');
            isValid = false;
        } else if (!dateRegex.test(dateInput.value.trim())) {
            showError('dateError', 'Use DD/MM/YYYY format');
            isValid = false;
        } else {
            clearError('dateError');
        }

        // Radio Button Selection
        const professionSelected = document.querySelector('input[name="profession"]:checked');
        if (!professionSelected) {
            showError('professionError', 'Please select Student or Employee');
            isValid = false;
        } else {
            clearError('professionError');
        }

        // Checkbox Terms Validation
        if (!termsCheckbox.checked) {
            showError('termsError', 'You must agree to all conditions');
            isValid = false;
        } else {
            clearError('termsError');
        }

        // If All Validations Pass -> Show Success Popup Modal
        if (isValid) {
            successModal.classList.add('active');
        }
    });

    function showError(elementId, message) {
        document.getElementById(elementId).innerText = message;
    }

    function clearError(elementId) {
        document.getElementById(elementId).innerText = '';
    }

    // Modal Close Action
    closeModalBtn.addEventListener('click', () => {
        successModal.classList.remove('active');
        form.reset();
    });
});