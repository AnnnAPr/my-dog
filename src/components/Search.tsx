import React, { useState, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

interface SearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchComponent: React.FC<SearchProps> = ({ onSearch, placeholder = 'Search' }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchQuery);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <TextField
      label={placeholder}
      variant="outlined"
      size="small"
      value={searchQuery}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      InputProps={{
        endAdornment: (
          <IconButton onClick={handleSearchClick} aria-label="search">
            <SearchIcon />
          </IconButton>
        ),
      }}
    />
  );
};

export default SearchComponent;