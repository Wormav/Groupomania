const strongPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

export default function checkPasswordStrong(value) {
  if (value.match(strongPassword)) {
    return true;
  } else {
    return false;
  }
}
