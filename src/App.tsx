import React from 'react';

import './App.css';
import Forgot from './Forgot/Forgot';

function App() {
  // console.log('Olá mundo!');
  
  // React.useEffect(() => {
  //   function onSubmit() {
  //     return new Promise((resolve, _reject) => {
  //       setTimeout(() => {
  //         resolve({ data: null });
  //       }, 3000);
  //     });
  //   }

  //   async function test() {
  //     console.log(await onSubmit());
  //   }

  //   test();
  // }, []);
  return <div className="App">
    <Forgot />
  </div>;
}

export default App;
