function deleteAllCookies() {
  const cookies = document.cookie.split(';');
  cookies.forEach((cookie) => {
    const cookieName = cookie.split('=')[0].trim();
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
}
const getCookie = (name: string): string | null => {
  const match = document.cookie.match(`(^|; )${name}=([^;]*)`);
  if (match) console.log(match[2]);
  return match ? match[2] : null;
};

export { deleteAllCookies, getCookie };
