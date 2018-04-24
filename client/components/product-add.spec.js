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
        let message;
    
        beforeEach(() => {
            message = shallow(<AddProduct user={ { } } productNames={ [] } userInput={ { } } />);
        });
            
        it('renders the approprite response when there is no user', () => {
            expect(message.find('p').text()).to.be.equal('You must be a registered user to add a product.');
        });
    });

    describe('It renders the right elements', () => {
        let formWrapper;

        beforeEach(() => {
            formWrapper = shallow(<AddProduct user={ { id: 1 } } productNames={ [] } userInput={ { } } />);
        });

        it('includes addProduct_input_name', () => {
            console.log(formWrapper.find('label')[0]);
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
    })
});