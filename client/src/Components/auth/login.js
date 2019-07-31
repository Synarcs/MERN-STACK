import React from 'react';
import {Nav,NavItem,Modal,ModalBody,ModalHeader,Collapse,Button,FormGroup,Label,NavLink,Input,Container,Alert} from 'reactstrap';
import Proptypes from 'prop-types';
import {connect} from 'react-redux';
import {Login} from '../../actions/authaction';
import {clearerrors} from '../../actions/erroraction';

class login extends React.Component{
    constructor(){
        super();
        this.state={
            modal:false,
            email:'',
            password:'',
            msg:''
        }
        this.toggle = this.toggle.bind(this);
        this.change = this.change.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    toggle(){
        this.props.clearerrors();
        this.setState({
            modal:!this.state.modal
        })
    }
    static propTypes = {
        isauth:Proptypes.bool,
        error:Proptypes.object.isRequired,
        Login:Proptypes.func.isRequired,
        geterrors:Proptypes.func.isRequired,
        clearerrors:Proptypes.func.isRequired
    }
    onSubmit(e){
        e.preventDefault();
        const login_user = {email:this.state.email,password:this.state.password};
        this.props.Login(login_user);
    }
    componentDidUpdate(prevProps){
        const {error,isauth,message} = this.props;
        if(error !==prevProps.error || message){
            // register error
            if(error.id){
                this.setState({
                    msg:error.msg
                })
            }else{
                this.setState({
                    msg:null
                })
            }
        }
        if(isauth && this.state.modal){
            this.toggle();
        }
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
                    <NavLink className="btn btn-primary text-light" color='dark' onClick={this.toggle}>Login</NavLink>
                </Container>
               <Modal isOpen={this.state.modal} toggle={this.toggle}>
                   <ModalHeader toggle={this.toggle}>
                        Add Items
                   </ModalHeader>
                   <ModalBody>
                     {this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>):null}
                       <form onSubmit={this.onSubmit}>
                           <FormGroup>
                           <Label>
                                   Email
                               </Label>
                               <Input type="text" onChange={this.change} name="email" placeholder="Email"/>
                               <Label>
                                    Password
                               </Label>
                               <Input type="text" onChange={this.change} name="password" placeholder="Password"/>
                           </FormGroup>
                           <Button color="info" style={{width:'100%'}}>Login</Button>
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

export default connect(mapStatetoProps,{Login,clearerrors})(login);
