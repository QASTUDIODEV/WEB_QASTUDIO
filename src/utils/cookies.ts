function deleteAllCookies() {
  // 현재 도메인의 모든 쿠키를 가져옴
  const cookies = document.cookie.split(';');

  // 각각의 쿠키를 삭제
  cookies.forEach((cookie) => {
    // 쿠키의 이름 가져오기
    const cookieName = cookie.split('=')[0].trim();
    // 쿠키 삭제: 값을 빈 문자열로 설정하고 만료 날짜를 과거로 지정
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
}
const getCookie = (name: string): string | null => {
  console.log(document.cookie);
  const match = document.cookie.match(`(^|; )${name}=([^;]*)`);
  console.log(match);
  return match ? decodeURIComponent(match[2]) : null;
};

export { deleteAllCookies, getCookie };
