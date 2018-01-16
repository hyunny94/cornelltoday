import React, {Component} from 'react';
import './product.css';
import DataService from '../service/data-service'; 
import NotificationService, {NOTIF_WISHLIST_CHANGED} from '../service/notification-service'; 


let ds = new DataService(); 
let ns = new NotificationService();

class Product extends Component {
	constructor (props) {
		super (props); 

		this.state = {onWishList: ds.itemOnWishList()};

		this.onButtonClicked = this.onButtonClicked.bind(this);
		this.onWishListChanged = this.onWishListChanged.bind(this);

	}

// when about to load 
	componentDidMount () {
		ns.addObserver(NOTIF_WISHLIST_CHANGED, this, this.onWishListChanged); 
	}

// remove ourselves from the observer if not delete then it will be in memoery FOREVER
	componentWillUnmount () {
		ns.removeObserver(this, NOTIF_WISHLIST_CHANGED);
	} 

	onButtonClicked=() => {
		if (this.state.onWishList) {
			ds.removeWishListItem(this.props.product);
		} else {
			ds.addWishListItem(this.props.product);	
		}
	}

	onWishListChanged() {
		this.setState({onWishList: ds.itemOnWishList(this.props.product)});
	}


	render() {
		var btnClass;

		if (this.state.onWishList) {
			btnClass = "btn btn-danger";
		} else {
			btnClass = "btn btn-primary";
		}

		return (
			<div className="card product container">
				<img className="card-img-top" src={this.props.product.imgUrl} alt="Product"></img>
				<div className="card-block">
					<h4 className="card-title">{this.props.product.title}</h4>
					<p className="card-text">Price: ${this.props.product.price}</p>
					<a href="#" onClick = {() => this.onButtonClicked()} className={btnClass}>{this.state.onWishList ? "Remove from Wish List" : "Add to Wish List"}</a>
				</div>
			</div>
		);
	}
}

export default Product;