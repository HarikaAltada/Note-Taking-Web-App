// Helper function to format date
export const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 24-hour format to 12-hour
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
    return `${day} ${month} ${year}, ${formattedHours}:${formattedMinutes} ${ampm}`;
  };