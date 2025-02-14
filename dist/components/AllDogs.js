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
const material_1 = require("@mui/material");
const InfoOutlined_1 = __importDefault(require("@mui/icons-material/InfoOutlined"));
const common_1 = require("./common");
// import DogCard from "./DogCard.tsx";
const AllDogs = () => {
    const totalDogs = 10000;
    const dogsPerPage = 25;
    // State variables
    const [dogs, setDogs] = (0, react_1.useState)([]);
    const [filterBreed, setFilterBreed] = (0, react_1.useState)('');
    const [listOfBreeds, setListOfBreeds] = (0, react_1.useState)([]);
    const [page, setPage] = (0, react_1.useState)(1);
    const [isAscending, setIsAscending] = (0, react_1.useState)(true);
    const getBreeds = () => {
        const breeds = dogs.map((dog) => dog.breed);
        const uniqueBreeds = [...new Set(breeds)];
        setListOfBreeds(uniqueBreeds);
    };
    const sorDogsByBreed = () => {
        console.log('inside sort dogs before sort:', dogs);
        if (!isAscending) {
            let sortedDogs = dogs.sort((a, b) => a.breed.localeCompare(b.breed));
            setDogs(sortedDogs);
        }
        else {
            let sortedDogs = dogs.sort((a, b) => b.breed.localeCompare(a.breed));
            setDogs(sortedDogs);
        }
        setIsAscending(!isAscending);
    };
    const fetchData = (page) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const idsResponse = yield fetch(`${common_1.baseUrl}/dogs/search?size=25&from=${(page - 1) * 25}`, {
                method: 'GET',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = yield idsResponse.json();
            const ids = data.resultIds;
            const currentDogs = yield fetch(`${common_1.baseUrl}/dogs`, {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ids)
            });
            const currentDogsData = yield currentDogs.json();
            const sortedDogs = currentDogsData.sort((a, b) => a.breed.localeCompare(b.breed));
            setDogs(sortedDogs);
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    });
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        fetchData(newPage);
        setIsAscending(true);
    };
    const handleChangeBreed = (event) => {
        setFilterBreed(event.target.value);
        const filteredDogs = dogs.filter((dog) => dog.breed === event.target.value);
        setDogs(filteredDogs);
    };
    const resetFilter = () => {
        setFilterBreed('');
        fetchData(page);
    };
    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'auto'
        });
    };
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'auto'
        });
    };
    (0, react_1.useEffect)(() => {
        fetchData(page);
    }, [page]);
    (0, react_1.useEffect)(() => {
        getBreeds();
    }, [dogs, getBreeds]);
    return (react_1.default.createElement(material_1.Box, { sx: { mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', width: '1200px' } },
        react_1.default.createElement("h1", null, "Our \u2764\uFE0F dogs"),
        react_1.default.createElement(material_1.Button, { onClick: scrollToBottom, sx: { mr: 10, fontSize: '15px', fontStyle: 'italic', fontWeight: 'bold' }, value: 'italic' }, "Go to Bottom"),
        react_1.default.createElement(material_1.Box, { display: 'flex', justifyContent: 'space-between', alignItems: 'center', sx: { mb: 2 } },
            react_1.default.createElement(material_1.Box, { component: 'section' },
                react_1.default.createElement(material_1.Box, { sx: { mb: 2 } }, `Total Dogs: ${totalDogs}. Displayed: ${dogsPerPage}.`),
                react_1.default.createElement(material_1.Link, { href: "/search", underline: "always", target: "_blank", sx: { mb: 2 } }, "Search for the dogs"),
                react_1.default.createElement(material_1.Box, { sx: { mb: 2, mt: 2 } },
                    react_1.default.createElement("div", null,
                        "Current order: ",
                        isAscending ? "ASCENDING" : "DESCENDING")),
                react_1.default.createElement(material_1.Box, { display: "flex", justifyContent: "center", alignItems: "center", sx: { mb: 2 } },
                    react_1.default.createElement("div", null, "Sort by the breed:"),
                    react_1.default.createElement(material_1.Button, { variant: "contained", color: "primary", sx: { mx: 2 }, onClick: sorDogsByBreed }, `${!isAscending ? 'Ascending' : 'Descending'}`))),
            react_1.default.createElement(material_1.Box, { display: "flex", alignItems: "center" },
                react_1.default.createElement(material_1.Box, { sx: { minWidth: 200, ml: 15 } },
                    react_1.default.createElement(material_1.FormControl, { fullWidth: true, disabled: listOfBreeds.length === 1 },
                        react_1.default.createElement(material_1.InputLabel, null, "Filter by breed"),
                        react_1.default.createElement(material_1.Select, { value: filterBreed, label: "Filter by breed", onChange: handleChangeBreed }, listOfBreeds.map((breed) => (react_1.default.createElement(material_1.MenuItem, { value: breed }, breed))))),
                    react_1.default.createElement(material_1.Tooltip, { title: "Filter is disabled if all dogs on the page are the same breed.", placement: "bottom-start", arrow: true },
                        react_1.default.createElement(InfoOutlined_1.default, { sx: { color: 'grey' } })),
                    react_1.default.createElement(material_1.Box, null,
                        react_1.default.createElement("strong", null, filterBreed),
                        " dogs: ",
                        dogs.length)),
                react_1.default.createElement(material_1.Box, null,
                    react_1.default.createElement(material_1.Button, { variant: "text", color: "primary", onClick: resetFilter, sx: { mb: 6, ml: 2, fontSize: '15px', backgroundColor: '#f0f0f0' } }, "Reset filter")))),
        react_1.default.createElement(material_1.Box, { sx: { width: '100%', display: 'flex', justifyContent: 'center' } },
            react_1.default.createElement(material_1.Pagination, { count: totalDogs / 25, page: page, onChange: (event, page) => handleChangePage(event, page), variant: "text", shape: "rounded", sx: { height: '50px' }, color: "primary" })),
        react_1.default.createElement(material_1.Box, null, dogs.map((dog) => (
        // <DogCard dog={dog} key={dog.id}/>         *** DogCard as a separate component doesn't display the dog's age, breed and zip_code in the card.
        react_1.default.createElement(material_1.Card, { sx: { maxWidth: 500, mb: 2, width: '600px' }, key: dog.id },
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
                            react_1.default.createElement(material_1.ListItemText, { primary: `Zip Code: ${dog.zip_code}` }))))))))),
        react_1.default.createElement(material_1.Box, { sx: { width: '100%', display: 'flex', justifyContent: 'center' } },
            react_1.default.createElement(material_1.Pagination, { count: totalDogs / 25, page: page, onChange: handleChangePage, variant: "text", shape: "rounded", sx: { height: '50px' }, color: "primary" })),
        react_1.default.createElement(material_1.Box, { sx: { mb: 10 } },
            react_1.default.createElement(material_1.Button, { onClick: scrollToTop, sx: { mb: 7, fontSize: '15px', fontStyle: 'italic', fontWeight: 'bold' }, value: 'italic' }, "Go to Top"))));
};
exports.default = AllDogs;
