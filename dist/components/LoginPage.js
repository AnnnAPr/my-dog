"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("@mui/material");
const LockOutlined_1 = __importDefault(require("@mui/icons-material/LockOutlined"));
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const common_1 = require("./common");
const LoginPage = () => {
    // const baseUrl = ' https://frontend-take-home-service.fetch.com'
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [name, setName] = (0, react_1.useState)('');
    const [email, setEmail] = (0, react_1.useState)('');
    const [isNameEntered, setIsNameEntered] = (0, react_1.useState)(false);
    const [isEmailEntered, setIsEmailEntered] = (0, react_1.useState)(false);
    const handleNameChange = (e) => {
        setName(e.target.value);
        setIsNameEntered(!isNameEntered);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setIsEmailEntered(!isEmailEntered);
    };
    const handleOnSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        try {
            yield fetch(`${common_1.baseUrl}/auth/login`, {
                method: 'POST',
                credentials: "include",
                body: JSON.stringify({
                    name: name,
                    email: email
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            navigate('/home');
        }
        catch (err) {
            console.log("error: ", err);
        }
    });
    return (react_1.default.createElement(material_1.Container, { maxWidth: "xs" },
        react_1.default.createElement(material_1.Paper, { elevation: 10, sx: { padding: 2, marginTop: 8 } },
            react_1.default.createElement(material_1.Avatar, { sx: {
                    mx: 'auto',
                    bgcolor: 'success.main',
                    textAlign: 'center',
                    mb: 1,
                } },
                react_1.default.createElement(LockOutlined_1.default, null)),
            react_1.default.createElement(material_1.Typography, { variant: "h5", component: 'h1', sx: { textAlign: 'center' } }, "Sign In"),
            react_1.default.createElement(material_1.Box, { component: 'form', onSubmit: handleOnSubmit, noValidate: true, sx: { mt: 1 } },
                react_1.default.createElement(material_1.TextField, { placeholder: "required", label: "Name", required: true, fullWidth: true, autoFocus: true, sx: { mb: 2 }, onChange: handleNameChange }),
                react_1.default.createElement(material_1.TextField, { placeholder: "required", label: "Email", required: true, fullWidth: true, sx: { mb: 2 }, onChange: handleEmailChange }),
                react_1.default.createElement(material_1.Button, { type: 'submit', color: 'primary', variant: 'contained', fullWidth: true, sx: { mt: 1 }, disabled: !isNameEntered || !isEmailEntered }, "Sign In")))));
};
exports.default = LoginPage;
