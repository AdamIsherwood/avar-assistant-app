```tsx
import React from 'react';

interface HelloWorldProps {
  name: string;
}

const HelloWorld: React.FC<HelloWorldProps> = ({ name }) => {
  return (
    <div style={{ backgroundColor: 'green', color: 'lightcoral' }}>
      Hello, {name}!
    </div>
  );
};

export default HelloWorld;
```