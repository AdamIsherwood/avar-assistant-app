```tsx
import React, { useState, useEffect } from 'react';

interface SearchResult {
  title: string;
  description: string;
  url: string;
}

interface SearchResultsProps {
  initialResults: SearchResult[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ initialResults }) => {
  const [results, setResults] = useState<SearchResult[]>(initialResults);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate fetching results based on searchTerm (replace with actual API call)
    const filteredResults = initialResults.filter((result) =>
      result.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setResults(filteredResults);
  }, [searchTerm, initialResults]);


  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ul>
        {results.map((result) => (
          <li key={result.url}>
            <h3><a href={result.url} target="_blank" rel="noopener noreferrer">{result.title}</a></h3>
            <p>{result.description}</p>
          </li>
        ))}
        {results.length === 0 && <p>No results found.</p>}
      </ul>
    </div>
  );
};

export default SearchResults;

```
