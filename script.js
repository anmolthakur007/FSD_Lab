// Toggle password visibility
function togglePassword(fieldId, eyeIcon) {
  const input = document.getElementById(fieldId);
  if (input.type === 'password') {
    input.type = 'text';
    eyeIcon.textContent = '🙈';
  } else {
    input.type = 'password';
    eyeIcon.textContent = '👁️';
  }
}

// Live password rules checker
document.getElementById('password').addEventListener('input', function () {
  const val = this.value;
  checkRule('rule-length', val.length > 3);
  checkRule('rule-upper', /[A-Z]/.test(val));
  checkRule('rule-lower', /[a-z]/.test(val));
  checkRule('rule-special', /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val));
  checkRule('rule-number', /[0-9]/.test(val));
});

function checkRule(ruleId, passed) {
  const el = document.getElementById(ruleId);
  if (passed) {
    el.classList.add('passed');
  } else {
    el.classList.remove('passed');
  }
}

// Form submission validation
document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();
  let valid = true;

  const fullname = document.getElementById('fullname');
  const email = document.getElementById('email');
  const age = document.getElementById('age');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');

  // Clear previous errors
  ['fullname', 'email', 'age', 'password', 'confirmPassword'].forEach(id => {
    document.getElementById(id + 'Error').textContent = '';
    document.getElementById(id).classList.remove('valid', 'invalid');
  });
  document.getElementById('successMsg').textContent = '';

  // Full Name
  const nameWords = fullname.value.trim().split(/\s+/);
  if (fullname.value.trim() === '' || nameWords.length < 2) {
    showError('fullname', 'Please enter your full name (first and last name).');
    valid = false;
  } else {
    setValid('fullname');
  }

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    showError('email', 'Please enter a valid email address.');
    valid = false;
  } else {
    setValid('email');
  }

  // Age
  const ageVal = parseInt(age.value);
  if (isNaN(ageVal) || ageVal < 18) {
    showError('age', 'Age must be 18 or older.');
    valid = false;
  } else {
    setValid('age');
  }

  // Password
  const pass = password.value;
  const passErrors = [];

  if (pass.length <= 3) passErrors.push('more than 3 characters');
  if (!/[A-Z]/.test(pass)) passErrors.push('an uppercase letter');
  if (!/[a-z]/.test(pass)) passErrors.push('a lowercase letter');
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass)) passErrors.push('a special character');
  if (!/[0-9]/.test(pass)) passErrors.push('a number');

  if (passErrors.length > 0) {
    showError('password', 'Password must contain: ' + passErrors.join(', ') + '.');
    valid = false;
  } else {
    setValid('password');
  }

  // Confirm Password
  if (confirmPassword.value === '') {
    showError('confirmPassword', 'Please confirm your password.');
    valid = false;
  } else if (confirmPassword.value !== pass) {
    showError('confirmPassword', 'Passwords do not match.');
    valid = false;
  } else {
    setValid('confirmPassword');
  }

  if (valid) {
    document.getElementById('successMsg').textContent = '✅ Registration successful!';
    document.getElementById('registerForm').reset();
    document.querySelectorAll('.password-rules li').forEach(li => li.classList.remove('passed'));
  }
});

function showError(fieldId, message) {
  document.getElementById(fieldId + 'Error').textContent = message;
  document.getElementById(fieldId).classList.add('invalid');
}

function setValid(fieldId) {
  document.getElementById(fieldId).classList.add('valid');
}