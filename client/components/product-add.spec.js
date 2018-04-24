/* global describe beforeEach it */

import { expect } from 'chai';
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AddProduct } from './product-add';

const adapter = new Adapter();
enzyme.configure({ adapter });

describe('Product-Add component', () => {
  describe('Checking to see if there is a user', () => {
    let rejectedOne;
    let rejectedTwo;

    beforeEach(() => {
      rejectedOne = shallow(<AddProduct
        user={{}}
        productNames={[]}
        userInput={{}}
      />);
      rejectedTwo = shallow(<AddProduct
        user={{ id: 3, firstName: 'GUEST', lastName: 'USER', isGuest: true }}
        productNames={[]}
        userInput={{}}
      />);
    });

    it('renders the appropriate response when there is no user', () => {
      expect(rejectedOne.find('p').text()).to.be.equal('You must be a registered user to add a product.');
    });

    it('renders the appropriate response when the user is a guest', () => {
      expect(rejectedTwo.find('p').text()).to.be.equal('You must be a registered user to add a product.');
    });
  });

  describe('It renders the right elements', () => {
    let formWrapper;

    beforeEach(() => {
      formWrapper = shallow(<AddProduct
        user={{ id: 1, firstName: 'Fred', lastName: 'Ma', isGuest: false }}
        productNames={[]}
        userInput={{}}
      />);
    });

    it('includes addProduct_input_name', () => {
      expect(formWrapper.find('label').at(0).text()).to.equal('Product Name');
    });

    it('includes addProduct_input_price', () => {
      expect(formWrapper.find('label').at(1).text()).to.equal('Product Price');
    });

    it('includes addProduct_input_desc', () => {
      expect(formWrapper.find('label').at(2).text()).to.equal('Product Description');
    });

    it('includes addProduct_input_imageUrl', () => {
      expect(formWrapper.find('label').at(3).text()).to.equal('Product Image URL');
    });
  });
});
