export const validateName = (
  name: string,
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>,
  setValidationMsg: React.Dispatch<React.SetStateAction<string>>
): void => {
  const reqOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: name })
  };

  fetch('/api/validation', reqOptions)
    .then(res => res.json())
    .then(res => {
      setIsValid(res.valid);
      setValidationMsg(res.msg)
    })
    .catch(err => {
      setIsValid(false);
      setValidationMsg('Server is unavailable. Please try again later.')
    });
};