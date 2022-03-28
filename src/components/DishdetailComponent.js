import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

class DishDetail extends Component{
    
    constructor(props) {
        super(props);
    }

    renderDish(dish) {

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

    renderComments(dish){
        const cmnts = dish.comments.map(comment => {
            return (
                <div key={comment.id}>
                    <li>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author}, 
                        &nbsp; 
                        {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit'
                    }).format(new Date(comment.date))}
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
            </div>
        )
    }


    render(){
        const dish = this.props.dish;
        
        if (dish == null) {
            return (<div></div>);
        }

        return (
            <>
                {this.renderDish(dish)}
                {this.renderComments(dish)}
            </>
        )
    }

}

export default DishDetail;