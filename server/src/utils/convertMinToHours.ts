//Function to converte minutes to hours
export const convertMinToHours = (time: number) => {
  const hour = Math.floor(time / 60);
  const minutes = time % 60;

  return `${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}