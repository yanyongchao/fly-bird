import React, { useEffect } from 'react';
import BackTop from '../BackTop';

const demo1 = () => {
  useEffect(() => {
    document.body.style.height = '2000px';
  }, []);
  return <BackTop></BackTop>;
};

export default demo1;
