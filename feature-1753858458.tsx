```jsx
import React, { useState } from 'react';
import axios from 'axios';

const DataFetcher = () => {
  const API_KEY = "dkey_test_a1b2c3d4e5f6a1b2c3d4e5f612345678";
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users/1', {
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        }
      });
      setUserData(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setUserData(null);
    }
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      {userData && (
        <div>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default DataFetcher;
```