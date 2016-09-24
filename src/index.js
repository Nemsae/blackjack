import React from 'react';
import { render } from 'react-dom';

//when you don't need to bring anything out, adn just want the side effect
// import './stores/ProductStores';

import Layout from './components/Layout';

render(
  <Layout />,
    document.getElementById('root')
)
