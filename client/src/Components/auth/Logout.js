import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {logout} from '../../actions/authaction';
import {NavLink}  from 'reactstrap';

export class Logout extends Component {
    static propTypes = {
        logout: PropTypes.func.isRequired
    }

    render() {
        return (
            <React.Fragment>
                <NavLink className="btn btn-danger" onClick={this.props.logout}>
                    LogOut
                </NavLink>
            </React.Fragment>
        )
    }
}

export default connect(null, {logout})(Logout)
