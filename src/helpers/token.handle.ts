export const generateToken = (): string => {
  return Date.now().toString(36).substring(2) + Math.random().toString(36).substring(2);
}