"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const react_router_dom_1 = require("react-router-dom");
const SignOut = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleOnClick = () => {
        navigate('/');
    };
    return (react_1.default.createElement(material_1.Box, null,
        react_1.default.createElement(material_1.Button, { sx: { ml: 3, fontWeight: '900' }, onClick: handleOnClick }, "Sign out")));
};
exports.default = SignOut;
