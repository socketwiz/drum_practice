
import React, {Component} from 'react';
import Footer from '../components/footer.js';
import Header from '../components/header.js';
import PropTypes from 'prop-types';

export default class Main extends Component {
    render() {
        const {children} = this.props;

        return <div>
            <Header />

            <div className="container-fluid">
                <div>
                    <div className="drum-practice-main">
                        {children}
                    </div>
                </div>
            </div>

            <Footer />
        </div>;
    }
}

Main.propTypes = {
    'children': PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ])
};
