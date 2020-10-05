export const validateName = (name: string): Promise<Response> => {

  const reqOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: name })
  };

  return fetch('/api/validation', reqOptions);
};