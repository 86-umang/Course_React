import React, { Component } from "react";
import { Control, Errors, LocalForm } from "react-redux-form";
import { Link } from "react-router-dom";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label } from "reactstrap";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len); // !(val) means val = null
const minLength = (len) => (val) => (val) && (val.length >= len);  // (val) means val != null

function RenderDish({dish}) {

    if (dish != null) {
        return (
            <div className='col-12 col-md-5 m-1'>
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle> {dish.name}</CardTitle>
                        <CardText> {dish.description} </CardText>
                    </CardBody>
                </Card>
            </div>   
        );
    }
    else {
        return (
            <div></div>
        );
    }
}

function RenderComments({comments, addComment, dishId}){
    const cmnts = comments.map((comment) => {
        return (
            <div key={comment.id}>
                <li>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},  
                    {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                }).format(new Date(Date.parse(comment.date)))}
                    </p>
                </li>
            </div>
        )
    })
    return (
        <div className='col-12 col-md-5 m-1'>
            <h4> Comments </h4>
            <ul className='list-unstyled'>
                {cmnts}
            </ul>
            <CommentForm dishId={dishId} addComment={addComment} />
        </div>
    )
}

class CommentForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            isModalOpen: false
        };
        this.togglModal = this.togglModal.bind(this);
    }

    togglModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.togglModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment)
    }

    render(){
        return (
            <>
                <Button outline onClick={this.togglModal}>
                    <span className="fa fa-comment fa-lg"></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.togglModal}>
                    <ModalHeader toggle={this.togglModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)} >
                            <div className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" name="rating"
                                    className="form-control" >
                                    <option selected="true" disabled="disabled">--Select Rating--</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" id="author" name="author"
                                    placeholder="Your Name"
                                    className="form-control" 
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }} />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required, ',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    rows="6"
                                    className="form-control" />
                            </div>
                            <div className="form-group">
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>
                            </div>
                        </LocalForm>
                    </ModalBody>
                </Modal> 
            </>
        );
    }
}


function DishDetail(props){
    
    const dish = props.dish;
    const comments = props.comments;
    const addComment = props.addComment;
    
    if (dish == null) {
        return (<div></div>);
    }

    return (
        <div className="container">
            <Breadcrumb>
                <BreadcrumbItem>
                    <Link to="/menu" >Menu</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{dish.name}</h3>
                <hr />
            </div>
            <div className="row">
                <RenderDish dish={dish} />
                <RenderComments comments={comments} 
                    addComment={addComment}
                    dishId={dish.id} />
            </div>
        </div>
    )
}


export default DishDetail;