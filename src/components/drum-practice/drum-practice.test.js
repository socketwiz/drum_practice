/* global afterEach, beforeEach, describe, expect, jest, it */

import '../../../setup';

import {shallow} from 'enzyme';
import React from 'react';
import DrumPractice from './index';
import fetchMock from 'fetch-mock';

fetchMock.get('/songs', []);

let onDragOverSpy = null;
let onDropSpy = null;

describe('DrumPractice main page', () => {
    beforeEach(() => {
        const dragEvents = {
            'onDragOver': () => {},
            'onDrop': () => {}
        };

        onDragOverSpy = jest.spyOn(dragEvents, 'onDragOver');
        onDropSpy = jest.spyOn(dragEvents, 'onDrop');
    });

    afterEach(() => {
        onDragOverSpy.mockReset();
        onDragOverSpy.mockRestore();

        onDropSpy.mockReset();
        onDropSpy.mockRestore();
    });

    it('renders DrumPractice without crashing', () => {
        const wrapper = shallow(<DrumPractice onDragOver={onDragOverSpy} onDrop={onDropSpy} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('calls onDragOver', () => {
        const wrapper = shallow(<DrumPractice onDragOver={onDragOverSpy} onDrop={onDropSpy} />);

        wrapper.find('.drop-zone').simulate('dragover');
        expect(onDragOverSpy).toHaveBeenCalled();
    });

    it('calls onDrop', () => {
        const wrapper = shallow(<DrumPractice onDragOver={onDragOverSpy} onDrop={onDropSpy} />);

        wrapper.find('.drop-zone').simulate('drop');
        expect(onDropSpy).toHaveBeenCalled();
    });
});
