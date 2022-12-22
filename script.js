const strengths = document.querySelector('.strength');
const passwordInput = document.querySelector('input[type="text"]');
const passwordCheck = document.querySelector('.password-check');

passwordInput.addEventListener('input', updateStrength);

function updateStrength() {
  const assessments = calculateStrength(passwordInput.value);

  let strength = 100;
  passwordCheck.innerHTML = '';

  assessments.forEach((assessment) => {
    if (assessment == null) return;

    strength -= assessment.strengthLost;
    const pwdCheckEl = document.createElement('p');
    pwdCheckEl.innerHTML = assessment.pwdCheck;
    passwordCheck.appendChild(pwdCheckEl);
  });

  strengths.style.setProperty('--strength-amount', strength);
}

function calculateStrength(password) {
  const assessment = [];
  assessment.push(lengthAssessment(password));
  assessment.push(lowercaseAssessment(password));
  assessment.push(uppercaseAssessment(password));
  assessment.push(numberAssessment(password));
  assessment.push(specialCharacterAssessment(password));
  return assessment;
}

function lengthAssessment(password) {
  const length = password.length;

  if (length <= 5) {
    return {
      pwdCheck: 'Password is to short',
      strengthLost: 40,
    };
  }
  if (length <= 10) {
    return {
      pwdCheck: 'Password could be longer',
      strengthLost: 15,
    };
  }
}

/*Assign function characterAssessment
 to lowercase, uppercase, number and special character function
 */
function lowercaseAssessment(password) {
  return characterAssessment(password, /[a-z]/g, 'lowercase characters');
}

function uppercaseAssessment(password) {
  return characterAssessment(password, /[A-Z]/g, 'uppercase characters');
}

function numberAssessment(password) {
  return characterAssessment(password, /[0-9]/g, 'numbers');
}

function specialCharacterAssessment(password) {
  return characterAssessment(password, /[^0-9a-zA-Z\s]/g, 'special character');
}

/*Creating parameters
 for the password
 checks if a sufficient number 
 of characters have been entered
 */

function characterAssessment(password, regX, assessmentType) {
  const characterMatch = password.match(regX) || [];

  if (characterMatch.length === 0) {
    return {
      pwdCheck: `Password has no ${assessmentType}`,
      strengthLost: 20,
    };
  }

  if (characterMatch.length <= 2) {
    return {
      pwdCheck: `Password must have more ${assessmentType}`,
      strengthLost: 15,
    };
  }
}
