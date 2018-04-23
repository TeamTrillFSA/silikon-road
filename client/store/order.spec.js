/* global describe beforeEach afterEach it */

import { expect } from 'chai';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import { postOrderThunker } from './order'; //change to orders
import history from '../history';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('thunk creators', () => {
    let store;
    let mockAxios;

    const initialState = { order: {} };

    beforeEach(() => {
        mockAxios = new MockAdapter(axios);
        store = mockStore(initialState);
    });

    afterEach(() => {
        mockAxios.restore();
        store.clearActions();
    });

    describe('postOrderThunker', () => {
        it('eventually dispatches the POST ORDER action', () => {
            const fakeOrder = { userId: 1 }
            mockAxios.onPost('/api/orders').replyOnce(201, fakeOrder);
            return store.dispatch(postOrderThunker())
            .then(() => {
                const actions = store.getActions();
                expect(actions[0].type).to.be.equal('POST_ORDER');
                expect(actions[0].order).to.be.deep.equal(fakeOrder);
            });
        });
    });
});