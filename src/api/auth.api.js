function login(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        email,
        name: 'Durin',
      });
    });
  });
}

export { login };
