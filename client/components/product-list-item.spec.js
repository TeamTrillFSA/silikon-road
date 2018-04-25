/* global describe beforeEach it */

import { expect } from 'chai';
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ProductListItem from './product-list-item';

const adapter = new Adapter();
enzyme.configure({ adapter });

describe('ProductList', () => {
  let prodListItemWrapper;
  let product;

  beforeEach(() => {
    product = { id: 1, name: 'ProductName', price: 8, imageUrl: 'http://www.agecomputer.org/images/computerhappy.png', description: 'Product Description' };
    prodListItemWrapper = shallow(<ProductListItem product={product} />);
  });

  it('includes "Product Name" line as an h3', () => {
    expect(prodListItemWrapper.find('h3').text()).to.equal('ProductName');
  });

  it('includes "Price" line as span', () => {
    expect(prodListItemWrapper.find('span').text()).to.equal('Price: $8');
  });

  it('includes "Image" line as img', () => {
    expect(prodListItemWrapper.find('img').html()).to.equal('<img src="http://www.agecomputer.org/images/computerhappy.png" height="100" width="100"/>');
  });

  it('includes "Description" as p', () => {
    expect(prodListItemWrapper.find('p').text()).to.equal('Product Description');
  });
});
