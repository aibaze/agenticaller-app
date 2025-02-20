export function capitalize(inputString) {
  if (!inputString) {
    return '';
  }
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}

export function containsHTML(str) {
  const htmlPattern = /<\/?[a-z][\s\S]*>/i;
  return htmlPattern.test(str);
}

export function getInitials(name) {
  // Split the string into an array of words
  const words = name.trim().split(/\s+/);

  // Map the words to their first letters and join them in uppercase
  const initials = words.map((word) => word[0].toUpperCase()).join('');

  return initials;
}
