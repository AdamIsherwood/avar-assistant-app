```typescript
import React from 'react';

interface HelloWorldProps {
  name: string;
}

const HelloWorld: React.FC<HelloWorldProps> = ({ name }) => {
  return (
    <div style={{ color: 'blue', backgroundColor: 'blue' }}>
      Hello, {name}!
    </div>
  );
};

export default HelloWorld;
```