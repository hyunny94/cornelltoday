import React, {Component} from 'react';
import './wishlist.css';
import ProductCondensed from '../product-condensed/product-condensed';
import DataService from '../service/data-service';
import NotificationService, {NOTIF_WISHLIST_CHANGED} from '../service/notification-service';


let ns = new NotificationService();

class WishList extends Component {
	constructor(props) {
		super (props);
		
		this.state = {wishlist:[]}

		//bind functions  why is there a cosntructor  
		this.createWishList = this.createWishList.bind(this); 
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

	onWishListChanged(newWishList) {
		this.setState({wishlist: newWishList}); 
	}

	createWishList = () => {
		const list = this.state.wishlist.map((wishlistitem)=> 
			 <ProductCondensed product={wishlistitem} key = {wishlistitem._id} /> 



			); 
		return (list); 
	}

	render() {
		return (
			<div className="card">
				<div className="card-block">
					<h4 className="card-title">Wish list</h4>
					<ul className="list-group"> 
						{this.createWishList()}
					</ul> 
				</div>
			</div>
		);
	}
}

export default WishList;