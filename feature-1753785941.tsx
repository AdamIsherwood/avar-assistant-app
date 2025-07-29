```typescript
import React from 'react';

interface HelloWorldProps {
  name: string;
}

const HelloWorld: React.FC<HelloWorldProps> = ({ name }) => {
  const styles = {
    container: {
      backgroundColor: 'red',
      color: 'red',
    },
  };

  return (
    <div style={styles.container}>Hello, {name}!</div>
  );
};

export default HelloWorld;
```