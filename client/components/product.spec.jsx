/* eslint-disable max-len */
/* global describe beforeEach it */

import React from 'react';
import { range, last } from 'lodash';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';

import faker from 'faker';

import { productComponent as Product } from './product';
import actualStore, { reducer as rootReducer } from '../store';
import { getAllProducts } from '../store/products';

const createRandomProducts = amount => {
  return range(0, amount).map(index => {
    return {
      id: index + 1,
      name: faker.company.companyName(),
      price: faker.commerce.price(),
      Description: faker.lorem.paragraph(),
    };
  });
};

const testUtilities = {
  createRandomProducts,
  createOneRandomProduct: () => createRandomProducts(1)[0],
};

describe('Product', () => {
  describe('visual content', () => {
    let productData;
    let productWrapper;
    let match;
    beforeEach('Create <Product /> wrapper', () => {
      productData = [{
        id: 6,
        name: 'ProductName',
        price: 8,
        description: 'Product Description',
        imageUrl: 'myImage.png',
      }];

      match = {
        params: {
          id: 6,
        },
      };

      productWrapper = shallow(<Product products={productData} match={match} />);
    });

    it('includes "Product Name" line as an h1', () => {
      expect(productWrapper.find('h1').text()).to.equal('ProductName');
    });

    it('includes "Price" line as h3', () => {
      expect(productWrapper.find('h3').text()).to.equal('Price: 8');
    });

    it('includes "Image" line as img', () => {
      expect(productWrapper.find('img').html()).to.equal('<img src="myImage.png"/>');
    });

    it('includes "Description" as p', () => {
      expect(productWrapper.find('p').text()).to.equal('Description: Product Description');
    });

    it('is not hardcoded', () => {
      const aDifferentProduct = [{
        id: 6,
        name: 'ProductNameV2',
        price: 10,
        description: 'Product Description 2',
        imageUrl: 'myImage2.png',
      }];
      const differentProductWrapper = shallow(<Product products={aDifferentProduct} match={match} />);
      expect(differentProductWrapper.find('h1').text()).to.equal('ProductNameV2');
      expect(differentProductWrapper.find('h3').text()).to.equal('Price: 10');
      expect(differentProductWrapper.find('img').html()).to.equal('<img src="myImage2.png"/>');
      expect(differentProductWrapper.find('p').text()).to.equal('Description: Product Description 2');
    });
  });
});

