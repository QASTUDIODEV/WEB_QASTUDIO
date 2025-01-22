const getCookie = (name: string): string | null => {
  console.log(document.cookie);
  const match = document.cookie.match(`(^|; )${name}=([^;]*)`);
  console.log(match);
  return match ? decodeURIComponent(match[2]) : null;
};

export default getCookie;
