export type Location = {
  latitude: number;
  longitude: number;
};

export type CurrentWeatherResponse = {
  coord: {
    lon: number; // 위치의 경도
    lat: number; // 위치의 위도
  };
  weather: Array<{
    id: number; // 날씨 상태 ID
    main: string; // 날씨 상태 그룹 (예: Rain, Snow, Clouds 등)
    description: string; // 날씨 상태 설명
    icon: string; // 날씨 아이콘 ID
  }>;
  base: string; // 내부 매개변수
  main: {
    temp: number; // 현재 온도 (단위: Metric - 섭씨)
    feels_like: number; // 체감 온도 (단위: Metric - 섭씨)
    pressure: number; // 대기압 (단위: hPa)
    humidity: number; // 습도 (%)
    temp_min: number; // 현재 관측된 최저 온도 (단위: Metric - 섭씨)
    temp_max: number; // 현재 관측된 최고 온도 (단위: Metric - 섭씨)
    sea_level?: number; // 해수면 대기압 (단위: hPa)
    grnd_level?: number; // 지면 대기압 (단위: hPa)
  };
  visibility: number; // 가시 거리 (단위: meter)
  wind: {
    speed: number; // 풍속 (단위: Metric - meter/sec)
    deg: number; // 풍향 (도)
    gust?: number; // 돌풍 속도 (단위: Metric - meter/sec)
  };
  clouds: {
    all: number; // 구름량 (%)
  };
  rain?: {
    '1h'?: number; // 1시간 강수량 (단위: mm)
  };
  snow?: {
    '1h'?: number; // 1시간 강설량 (단위: mm)
  };
  dt: number; // 데이터 계산 시간 (unix, UTC)
  sys: {
    type?: number; // 내부 매개변수
    id?: number; // 내부 매개변수
    message?: number; // 내부 매개변수
    country: string; // 국가 코드 (예: GB, JP 등)
    sunrise: number; // 일출 시간 (unix, UTC)
    sunset: number; // 일몰 시간 (unix, UTC)
  };
  timezone: number; // UTC로부터의 시차 (초)
  id: number; // 도시 ID
  name: string; // 도시 이름
  cod: number; // 내부 매개변수
};

export type CurrentWeatherData = {
  time: Date;
  temp: string;
  tempMax: string;
  tempMin: string;
  windSpeed: string;
  windDirection: string;
  visibility: number;
  feelsLike: string;
  humidity: number;
  cityName: string;
  sunrise: number;
  sunset: number;
  description: string;
  image: string;
};

export type ForecastWeatherResponse = {
  cod: string; // 내부 매개변수
  message: number; // 내부 매개변수
  cnt: number; // 반환된 타임스탬프의 수
  list: Array<{
    dt: number; // 예보 시간 (Unix, UTC)
    main: {
      temp: number; // 온도 (단위: Metric - 섭씨)
      feels_like: number; // 체감 온도 (단위: Metric - 섭씨)
      temp_min: number; // 예보된 최저 온도 (단위: Metric - 섭씨)
      temp_max: number; // 예보된 최고 온도 (단위: Metric - 섭씨)
      pressure: number; // 대기압 (단위: hPa)
      sea_level?: number; // 해수면 대기압 (단위: hPa)
      grnd_level?: number; // 지면 대기압 (단위: hPa)
      humidity: number; // 습도 (%)
      temp_kf?: number; // 내부 매개변수
    };
    weather: Array<{
      id: number; // 날씨 상태 ID
      main: string; // 날씨 상태 그룹 (예: Rain, Snow, Clouds 등)
      description: string; // 날씨 상태 설명
      icon: string; // 날씨 아이콘 ID
    }>;
    clouds: {
      all: number; // 구름량 (%)
    };
    wind: {
      speed: number; // 풍속 (단위: Metric - meter/sec)
      deg: number; // 풍향 (도)
      gust?: number; // 돌풍 속도 (단위: Metric - meter/sec)
    };
    visibility: number; // 평균 가시 거리 (단위: meter, 최대 10km)
    pop: number; // 강수 확률 (0 ~ 1, 0은 0%, 1은 100%)
    rain?: {
      '3h'?: number; // 최근 3시간 동안의 강수량 (단위: mm)
    };
    snow?: {
      '3h'?: number; // 최근 3시간 동안의 강설량 (단위: mm)
    };
    sys: {
      pod: 'd' | 'n'; // 낮/밤 구분 (d - 낮, n - 밤)
    };
    dt_txt: string; // 예보 시간 (ISO 형식, UTC)
  }>;
  city: {
    id: number; // 도시 ID
    name: string; // 도시 이름
    coord: {
      lat: number; // 위도
      lon: number; // 경도
    };
    country: string; // 국가 코드 (예: GB, JP 등)
    population: number; // 도시 인구
    timezone: number; // UTC로부터의 시차 (초)
    sunrise: number; // 일출 시간 (Unix, UTC)
    sunset: number; // 일몰 시간 (Unix, UTC)
  };
};

export type ForecastWeatherData = {
  time: Date;
  temp: string;
  tempMax: string;
  tempMin: string;
  feelsLike: string;
  humidity: number;
  precipitationProbability: number;
  windSpeed: string;
  windDirection: string;
  visibility: number;
  pod: string;
  description: string;
  image: string;
  cityName: string;
  sunrise: number;
  sunset: number;
};
