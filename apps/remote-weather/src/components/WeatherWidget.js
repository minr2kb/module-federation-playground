"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@chakra-ui/react");
var date_1 = require("@/utils/date");
var useCurrentWeatherData_1 = require("@/hooks/useCurrentWeatherData");
var withQueryProvider_1 = require("./hoc/withQueryProvider");
var WeatherWidget = function (_a) {
    var _b;
    var onClick = _a.onClick;
    var _c = (0, useCurrentWeatherData_1.default)(), currentWeather = _c.data, isLoading = _c.isLoading;
    var _d = currentWeather !== null && currentWeather !== void 0 ? currentWeather : {}, time = _d.time, description = _d.description, image = _d.image, temp = _d.temp, humidity = _d.humidity;
    return ((0, jsx_runtime_1.jsx)(react_1.Card, { maxW: "sm", boxShadow: "md", borderRadius: "xl", overflow: "hidden", bg: "white", cursor: 'pointer', _dark: { bg: 'gray.700' }, onClick: onClick, children: (0, jsx_runtime_1.jsx)(react_1.CardBody, { p: 6, children: (0, jsx_runtime_1.jsxs)(react_1.VStack, { spacing: 2, align: "center", children: [(0, jsx_runtime_1.jsx)(react_1.Text, { fontSize: "lg", color: "gray.600", children: (0, date_1.formatDateWithDay)((_b = time === null || time === void 0 ? void 0 : time.toDateString()) !== null && _b !== void 0 ? _b : new Date().toDateString()) }), isLoading ? ((0, jsx_runtime_1.jsx)(react_1.Skeleton, { borderRadius: "full", width: "80px", height: "80px" })) : ((0, jsx_runtime_1.jsx)(react_1.Image, { src: image, alt: description, borderRadius: "full", boxSize: "80px", objectFit: "cover" })), (0, jsx_runtime_1.jsx)(react_1.Text, { fontSize: "sm", color: "gray.500", children: isLoading ? '-' : description }), (0, jsx_runtime_1.jsxs)(react_1.Text, { fontSize: "2xl", as: "b", color: "blue.900", children: [isLoading ? '-' : temp, "\u2103"] }), (0, jsx_runtime_1.jsxs)(react_1.Text, { fontSize: "sm", color: "gray.500", children: ["\uC2B5\uB3C4: ", isLoading ? '-' : humidity, "%"] })] }) }) }));
};
exports.default = (0, withQueryProvider_1.default)(WeatherWidget);
