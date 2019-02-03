
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Should be added as a static contextTypes property on any component
// needing access to the parameter. In this case, it's only the HoC
const serverContextTypes = {
    'isServer': PropTypes.bool
};

// Should be the root component of your server-side render to inject
// the parameter into context
export const ServerContext = class ServerContextWrapper extends Component {
    getChildContext() {
        return {
            'isServer': true
        };
    }

    render() {
        // Only allows a single child
        return React.Children.only(this.props.children);
    }
};

// Tells React which context types to pass to ServerContext's children
ServerContext.childContextTypes = serverContextTypes;

ServerContext.propTypes = {
    'children': PropTypes.element.isRequired
};

// The HoC that determines if the wrapped component should be rendered
export const ClientOnly = function ClientOnlyWrapper(Wrapped) {
    const ClientComponent = class ClientComponentWrapper extends Component {
        render() {
            if (this.context.isServer) {
                return null;
            } else {
                return React.createElement(Wrapped, this.props);
            }
        }
    };

    ClientComponent.contextTypes = serverContextTypes;

    return ClientComponent;
};
