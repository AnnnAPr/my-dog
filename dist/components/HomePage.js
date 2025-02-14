"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const AllDogs_1 = __importDefault(require("./AllDogs"));
const material_1 = require("@mui/material");
const SignOut_1 = __importDefault(require("./SignOut"));
const HomePage = () => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(SignOut_1.default, null),
        react_1.default.createElement(material_1.Box, { sx: { display: 'flex', justifyContent: 'center', height: '100vh' } },
            react_1.default.createElement(AllDogs_1.default, null))));
};
exports.default = HomePage;
