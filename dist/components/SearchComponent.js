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
const react_1 = __importStar(require("react"));
const TextField_1 = __importDefault(require("@mui/material/TextField"));
const IconButton_1 = __importDefault(require("@mui/material/IconButton"));
const Search_1 = __importDefault(require("@mui/icons-material/Search"));
const material_1 = require("@mui/material");
const SignOut_1 = __importDefault(require("./SignOut"));
const SearchComponent = ({ placeholder = 'Search by dog id' }) => {
    // State variables
    const [searchText, setSearchText] = (0, react_1.useState)('');
    const [dogs, setDogs] = (0, react_1.useState)([]);
    const fetchData = (searchText = '') => __awaiter(void 0, void 0, void 0, function* () {
        let dataArray = searchText === '' ? [] : searchText.replaceAll(/['"`\s]/g, '').split(',');
        try {
            const response = yield fetch('https://frontend-take-home-service.fetch.com/dogs', {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataArray)
            });
            const data = yield response.json();
            setDogs(data);
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    });
    const handleInputChange = (event) => {
        setSearchText(event.target.value);
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch(event);
        }
    };
    const handleSearch = (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        fetchData(searchText);
    });
    (0, react_1.useEffect)(() => {
        fetchData();
    }, []);
    return (react_1.default.createElement(material_1.Box, { sx: { mt: 2, height: '50px' } },
        react_1.default.createElement(SignOut_1.default, null),
        react_1.default.createElement(material_1.Box, { sx: { display: 'flex', justifyContent: 'center' } },
            react_1.default.createElement(TextField_1.default, { label: placeholder, variant: "outlined", size: "small", value: searchText, onChange: handleInputChange, onKeyDown: handleKeyDown, slotProps: {
                    input: {
                        endAdornment: (react_1.default.createElement(IconButton_1.default, { onClick: handleSearch, "aria-label": "search" },
                            react_1.default.createElement(Search_1.default, null))),
                    }
                }, sx: { width: '40%' } }),
            react_1.default.createElement(material_1.Button, { variant: "contained", color: "primary", onClick: handleSearch, sx: { ml: 2 } }, "Search")),
        react_1.default.createElement(material_1.Box, { sx: { display: 'flex', flexDirection: 'column', ml: '37%' } }, dogs.map((dog) => (
        // <DogCard dog={dog} />
        react_1.default.createElement(material_1.Card, { sx: { maxWidth: 500, mt: 4, width: '600px' }, key: dog.id },
            react_1.default.createElement(material_1.CardMedia, { sx: { height: 400 }, image: `${dog.img}`, title: `${dog.name}` }),
            react_1.default.createElement(material_1.CardContent, null,
                react_1.default.createElement(material_1.Typography, { gutterBottom: true, variant: "h5", component: "div", sx: { mb: 0 } }, dog.name),
                react_1.default.createElement(material_1.Typography, { variant: "body2", sx: { color: 'text.secondary' } },
                    react_1.default.createElement(material_1.List, null,
                        react_1.default.createElement(material_1.ListItem, null,
                            react_1.default.createElement(material_1.ListItemText, { primary: `Age: ${dog.age}` })),
                        react_1.default.createElement(material_1.ListItem, null,
                            react_1.default.createElement(material_1.ListItemText, { primary: `Breed: ${dog.breed}` })),
                        react_1.default.createElement(material_1.ListItem, null,
                            react_1.default.createElement(material_1.ListItemText, { primary: `Zip Code: ${dog.zip_code}` })))))))))));
};
exports.default = SearchComponent;
