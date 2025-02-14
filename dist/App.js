"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
require("./App.css");
const LoginPage_1 = __importDefault(require("./components/LoginPage"));
const HomePage_1 = __importDefault(require("./components/HomePage"));
const SearchComponent_1 = __importDefault(require("./components/SearchComponent"));
function App() {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
            react_1.default.createElement(react_router_dom_1.Routes, null,
                react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(LoginPage_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/home", element: react_1.default.createElement(HomePage_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/search", element: react_1.default.createElement(SearchComponent_1.default, { onSearch: (query) => console.log(query) }) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(react_router_dom_1.Navigate, { replace: true, to: "/login" }) })))));
}
exports.default = App;
