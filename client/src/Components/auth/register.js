import React from 'react';
import {Nav,NavItem,Modal,ModalBody,ModalHeader,Button,FormGroup,Label,Input,Container,NavLink,Alert} from 'reactstrap';
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Proptypes from 'prop-types';
import {Register} from '../../actions/authaction';
import {clearerrors} from '../../actions/erroraction';

class register extends React.Component{
    constructor(){
        super();
        this.state={
            modal:false,
            username:'',
            email:'',
            password:'',
            msg:''
        }
        this.toggle = this.toggle.bind(this);
        this.change = this.change.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    static propTypes = {
        isauth:Proptypes.bool,
        error:Proptypes.object.isRequired,
        register:Proptypes.func.isRequired,
        geterrors:Proptypes.func.isRequired,
        clearerrors:Proptypes.func.isRequired
    }
    toggle(){
        this.props.clearerrors();
        this.setState({
            modal:!this.state.modal
        })
    }
    onSubmit(e){
        e.preventDefault();
        const {message} = this.props;
        const {username,email,password} = this.state;
        const user = {username,email,password}
        this.props.Register(user);
    }
    componentDidUpdate(prevProps){
        const {error,isauth,message} = this.props;
        if(error !==prevProps.error || message){
            // register error
            if(error.id === 'register_error'){
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
                    <NavLink className="btn btn-warning text-secondary" onClick={this.toggle}>Register</NavLink>
                </Container>
               <Modal isOpen={this.state.modal} toggle={this.toggle}>
                   <ModalHeader toggle={this.toggle}>
                       Register
                   </ModalHeader>
                   <ModalBody>
                       {this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>):null}
                       <form onSubmit={this.onSubmit}>
                           <FormGroup>
                               <Label>
                                   User Name
                               </Label>
                               <Input type="text" className="mb-1" onChange={this.change} name="username" placeholder="username"/>
                               <Label>
                                   Email
                               </Label>
                               <Input type="text" onChange={this.change} name="email" placeholder="Email"/>
                               <Label>
                                    Password
                               </Label>
                               <Input type="password" onChange={this.change} name="password" placeholder="Password"/>
                             
                           </FormGroup>
                           <Button color="dark" style={{width:'100%'}}>Register</Button>
                       </form>
                   </ModalBody>
               </Modal>
            </div>
        )
    }
}

const mapStatetoProps=state=>({
    isauth : state.auth.isauth, 
    error: state.error,
    message : state.auth.message
})

export default connect(mapStatetoProps,{Register,clearerrors})(register);
