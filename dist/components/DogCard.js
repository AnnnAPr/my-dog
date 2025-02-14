"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const icons_material_1 = require("@mui/icons-material");
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const DogCard = ({ dog }) => {
    return (react_1.default.createElement(material_1.Card, { sx: { maxWidth: 500, mb: 2, width: '600px' }, key: dog.id },
        react_1.default.createElement(material_1.CardMedia, { sx: { height: 400 }, image: `${dog.img}`, title: `${dog.name}` }),
        react_1.default.createElement(material_1.CardContent, null,
            react_1.default.createElement(material_1.Typography, { gutterBottom: true, variant: "h5", component: "div", sx: { mb: 0 } }, dog.name),
            react_1.default.createElement(material_1.Typography, { sx: { color: 'text.secondary' } },
                react_1.default.createElement(icons_material_1.List, null,
                    react_1.default.createElement(material_1.ListItem, null,
                        react_1.default.createElement(material_1.ListItemText, { primary: `Age: ${dog.age}` })),
                    react_1.default.createElement(material_1.ListItem, null,
                        react_1.default.createElement(material_1.ListItemText, { primary: `Breed: ${dog.breed}` })),
                    react_1.default.createElement(material_1.ListItem, null,
                        react_1.default.createElement(material_1.ListItemText, { primary: `Zip Code: ${dog.zip_code}` })))))));
};
exports.default = DogCard;
