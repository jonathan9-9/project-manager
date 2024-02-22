export const resetPasswordTemplate = (token: string, id: number) => {
  return `
    <html>
    <h1> Reset your password </h1>
    <p> Click <a href="http://localhost:5000/reset-password/${token}/${id}" target="_blank">here</a> to reset your password </p>
    </html>
    `;
};
