
import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';

configure({adapter: new Adapter()});

const shallowWithStore = (component, store) => {
    const context = {
        store
    };

    return shallow(component, {context});
};

export default shallowWithStore;
