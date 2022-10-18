---
nav:
  title: Components
  path: /components
---

## Affix

Demo:

```tsx
import React, { useEffect } from 'react';
import Affix from './Affix';

export default () => {
  useEffect(() => {
    document.querySelector('#root').style.height = '2000px';
    return () => {
      document.querySelector('#root').style.height = 'auto';
    };
  }, []);
  return (
    <Affix offsetTop={120}>
      <div>测试Affix</div>
    </Affix>
  );
};
```
