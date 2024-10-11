/**
 * 현재 시간이 낮인지 밤인지 판별하는 함수
 * 낮은 오전 6시(06:00)부터 오후 6시(18:00)까지로 정의
 *
 * @returns {boolean} 현재 시간이 낮이면 true, 밤이면 false를 반환
 */
export const isDaytime = (): boolean => {
  const now = new Date();
  const hour = now.getHours();
  return hour >= 6 && hour < 18;
};

/**
 * 주어진 "YYYY-MM-DD" 형식의 날짜 문자열을 "월/일(요일)" 형식으로 변환
 *
 * @param {string} isoDate - "YYYY-MM-DD" 형식의 날짜 문자열
 * @returns {string} 월/일(요일) 형식으로 변환된 날짜 문자열
 */
export const formatDateWithDay = (isoDate: string): string => {
  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    month: 'numeric',
    day: 'numeric',
    weekday: 'short',
  };

  const formattedDate = date.toLocaleDateString('ko-KR', options);
  return formattedDate.replace('. ', '/').replace('. ', ' ');
};
