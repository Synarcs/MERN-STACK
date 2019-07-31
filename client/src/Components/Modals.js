import React from 'react';
import {Nav,NavItem,Modal,ModalBody,ModalHeader,Collapse,Button,FormGroup,Label,Input,Container} from 'reactstrap';
import {connect} from 'react-redux';
import {addItems} from '../actions/action';

class Modals extends React.Component{
    constructor(){
        super();
        this.state={
            modal:false,
            item:''
        }
        this.toggle = this.toggle.bind(this);
        this.change = this.change.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    toggle(){
        this.setState({
            modal:!this.state.modal
        })
    }
    onSubmit(e){
        e.preventDefault();
       const item={
           item:this.state.item
       }
       this.props.addItems(item);
       this.toggle();
    }
    change(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    render(){
        return(
            <div>
                <Container>
                    <Button color='dark' style={{margin:'1.1rem'}} onClick={this.toggle}>Add Item</Button>
                </Container>
               <Modal isOpen={this.state.modal} toggle={this.toggle}>
                   <ModalHeader toggle={this.toggle}>
                        Add Items
                   </ModalHeader>
                   <ModalBody>
                       <form onSubmit={this.onSubmit}>
                           <FormGroup>
                               <Label>
                                    Item name 
                               </Label>
                               <Input type="text" onChange={this.change} name="item" placeholder="item name"/>
                           </FormGroup>
                           <Button color="info" style={{width:'100%'}}>Add Item</Button>
                       </form>
                   </ModalBody>
               </Modal>
            </div>
        )
    }
}

const mapStatetoProps=state=>({
    items : state.items
})

export default connect(mapStatetoProps,{addItems})(Modals);
