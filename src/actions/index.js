// Coloque aqui suas actions
export const SAVE_USER = 'SAVE_USER';
export const saveUserEmail = (user) => ({
  type: SAVE_USER,
  user,
});

export default { SAVE_USER, saveUserEmail };
