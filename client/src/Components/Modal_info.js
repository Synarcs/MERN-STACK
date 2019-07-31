import React from 'react';
import {Nav,NavItem,Modal,ModalBody,ModalHeader,Collapse,Button,FormGroup,Label,Input,Container} from 'reactstrap';
import {connect} from 'react-redux';

class Modal_info extends React.Component{
    constructor(){
        super();
        this.state={
            modal:false,
            item:'',
            orgs:[]
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
        const data = {
            food_type:this.props.info,
            item:this.state.item
        }
        this.setState(state=>({
            orgs:[...state.orgs,data]
        }),()=>{
            console.log('item added');
        })
        console.log(this.state.orgs);
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
                    <Button color='info' className="float-right" onClick={this.toggle}>Add Info</Button>
                </Container>
               <Modal isOpen={this.state.modal} toggle={this.toggle}>
                   <ModalHeader toggle={this.toggle}>
                        Add Excess Info
                   </ModalHeader>
                   <ModalBody>
                       <form onSubmit={this.onSubmit}>
                            <Input 
                                type="text"
                                placeholder="Excess Info"
                                id="info"
                                onChange={this.change}
                                name="item"
                             />
                             <br />
                             <Button
                                 color="info" style={{width:'100%'}}                           
                             >
                               Add Info
                             </Button>
                       </form>
                   </ModalBody>
               </Modal>
            </div>
        )
    }
}

export default connect(null)(Modal_info);