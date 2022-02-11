import { useState } from 'react';

const Search = ({ setGeniusData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleGo = () => {
    if (!searchQuery) {
      return;
    }

    fetch(`/api/getLyrics?q=${searchQuery}`)
      .then((res) => res.json())
      .then((data) => setGeniusData(data) || console.log(data));
  };

  const keyPressHandler = (event) => {
    console.log(event.key);
    if (event.key === 'Enter') {
      handleGo();
    }
  };

  return (
    <>
      <input
        onChange={handleChange}
        onKeyPress={(e) => keyPressHandler(e)}
        placeholder='Enter song/track title or artist or lyrics'
        type='search'
        value={searchQuery}
      />
      <button onClick={handleGo}>Go</button>
    </>
  );
};

export default Search;
