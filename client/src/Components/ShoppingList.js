import React, { Component } from 'react'
import {Navbar,NavbarBrand,Container,NavItem,Nav,Collapse,NavbarToggler,ListGroup,ListGroupItem,Alert} from 'reactstrap';
import {Button} from 'reactstrap';
import AppCss from '../App.css';
import PropTypes from 'prop-types';

import Modal_info from './Modal_info';
import Modals from './Modals';
import {CSSTransition ,TransitionGroup} from 'react-transition-group';
import {getItems,deleteItems,addItems} from '../actions/action';
import {connect} from 'react-redux';

class ShoppingList extends Component {
    componentDidMount(){
        this.props.getItems();
    }
    constructor(){
        super();
    }
    onDelete(id){
        this.props.deleteItems(id);
    }
    render() {
        const {items} = this.props.items;
        const error = this.props.error;
        return (
            <div>
                <Container>
                   {!error.msg ? (<Alert color="info">Please Register First</Alert>):(<div>
                <Modals />
                    <ListGroup>    
                        <TransitionGroup className="shopping-list">
                            {items.length >0 ? items.map(({_id,item})=>(
                                <CSSTransition key={_id} timeout={500} classNames="fade">
                                    <ListGroupItem>
                                        <Button
                                            className="remove-itm ml-2 text-center"
                                            color="danger float-right"
                                             size="sm"
                                            onClick={this.onDelete.bind(this,_id)}
                                        >&times;</Button>
                                        <Modal_info info={item}/>
                                        {item}
                                    </ListGroupItem>
                                </CSSTransition>
                            )):null}
                        </TransitionGroup>
                    </ListGroup>
                   </div>)}
                </Container>
            </div>
        )
    }
}

ShoppingList.propTypes={
    getItems:PropTypes.func.isRequired,
    addItems:PropTypes.func.isRequired,
    deleteItems:PropTypes.func.isRequired,
    items:PropTypes.object.isRequired
}

const mapStatetoProps=state=>({
    items : state.items,
    error: state.error
});



export default connect(mapStatetoProps,{getItems,addItems,deleteItems})(ShoppingList);