import React, {Component} from 'react';
import './event.css';
import DataService from '../service/data-service'; 
import NotificationService, {NOTIF_WISHLIST_CHANGED} from '../service/notification-service'; 
import Today from 'dates-of-today'; 

//services
import HttpService from '../service/http-service';

const http = new HttpService();
let ds = new DataService(); 
let ns = new NotificationService();
let today = new Today();

var today_year = parseInt(today.year);
var today_month = parseInt(today.month + 1);
var today_date = parseInt(today.day);

class Event extends Component {
	constructor (props) {
		console.log("entered constructor");
		super (props); 
		// this.state = {isEvent : false};  
		
		//BIND Functions
	}

	render() {
		return ( 		
			<div> 
				<div>
					<div className="card-block"> 
						<h5 className="card-title"> {((this.props.event.fromMonth == this.props.event.toMonth) && 
													(this.props.event.fromDate == this.props.event.toDate)) ?
						 							this.props.event.title : 
						 							this.props.event.title + " (~ " + this.props.event.toMonth + "." 
						 							+ this.props.event.toDate + ")"} 
						 </h5>
						
	              </div> 
				</div>
			</div>
		) ; 
	} 
} 


export default Event;