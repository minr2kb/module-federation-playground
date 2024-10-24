// This d.ts file is automatically generated
declare module 'remote-weather/WeatherWidget' {
  export type WeatherWidgetProps = {
  	onClick: () => void;
  };
  declare const WeatherWidget: (props: WeatherWidgetProps & Partial<Pick<import("@tanstack/react-query").QueryClientProviderProps, "client">>) => import("react/jsx-runtime").JSX.Element;
  
  export {
  	WeatherWidget as default,
  };
  
  export as namespace WeatherWidget;
  
  export {};
  
}

declare module 'remote-weather/WeatherPage' {
  declare const WeatherPage: (props: object & Partial<Pick<import("@tanstack/react-query").QueryClientProviderProps, "client">>) => import("react/jsx-runtime").JSX.Element;
  
  export {
  	WeatherPage as default,
  };
  
  export as namespace WeatherPage;
  
  export {};
  
}

