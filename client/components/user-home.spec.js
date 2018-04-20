/* global describe beforeEach it */

import {expect} from 'chai';
import React from 'react';
import enzyme, {render, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {UserHome} from './user-home';

import {MemoryRouter} from 'react-router';
const history = require('history');
const historyObj = history.createMemoryHistory();

const adapter = new Adapter();
enzyme.configure({adapter});

describe('UserHome', () => {
  let userHome;

  beforeEach(() => {
    const products = [{
      name: 'Killer GPU',
      price: 300000,
      imageUrl: 'http://www.agecomputer.org/images/computerhappy.png',
      description: 'This thing will kill you, but in a good way.'
    }, {
      name: 'Black Magic Monitor',
      price: 200000,
      imageUrl: 'http://www.agecomputer.org/images/computerhappy.png',
      description: 'Amazeballs awaits! Feast your eyes.'
    }, {
      name: '$lave RAM',
      price: 100000,
      imageUrl: 'http://www.agecomputer.org/images/computerhappy.png',
      description: 'Tons of memory, all day, every day.'
    }, {
      name: 'Boingo Motherboard',
      price: 400000,
      imageUrl: 'http://www.agecomputer.org/images/computerhappy.png',
      description: 'The mother of all motherboards.'
    }];

    userHome = render(<MemoryRouter><UserHome newProducts={products} saleProducts={products} /></MemoryRouter>);
  })

  it('renders two ProductLists', () => {
    expect(userHome.find('div.productList')).to.have.length(2);
    expect(userHome.find('div.productListItem')).to.have.length(8);
  })
})
