//default imports
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//components
import Product from '../product/product';
import WishList from '../wishlist/wishlist';
import Event from '../event/event';

//services
import HttpService from '../service/http-service';

//etc
import Today from 'dates-of-today'; 

let today = new Today();
var today_year = parseInt(today.year);
var today_month = parseInt(today.month + 1);
var today_date = parseInt(today.day);

const http = new HttpService();

class App extends Component {
    
    constructor(props) {
        super(props);

        this.state = {events:[], isThereEvent: false};
   
        //binding functions. all functions have to be bound.
        this.loadEventData = this.loadEventData.bind(this);
    
        this.loadEventData();
    }
    

    before(event) {
    return ((today_year > event.year) || (today_month > event.toMonth) || 
          ((today_date > event.toDate) && (today_month >= event.toMonth))); 
    }

    after(event) {
      return ((today_year < event.year) || (today_month < event.fromMonth) || 
            ((today_date < event.fromDate) && (today_month <= event.fromMonth)));
    }

    sameday(event) {
      return ((today_year == event.year) && (today_month == event.fromMonth) && 
            (today_month == event.toMonth) && (today_date == event.fromDate) && (today_date == event.toDate));
    }

    loadEventData = () => {
        var self = this;
        http.getEvents().then(data => {
            var selectedEvents = []
            for (var i = 0; i < data.length; i++){
              if ((!this.before(data[i]) && !this.after(data[i])) || this.sameday(data[i])){
                  self.setState({isThereEvent: true})
                  selectedEvents.push(data[i])
              }
            } 
            self.setState({events: selectedEvents})      
        }, err => {
            console.log("error exist in loadEventData"); 
        }); 
    } 

    eventList = () => {
      const list = this.state.events.map((event) =>
        <div className="col-sm-12" key={event._id}>
          <Event event = {event}/>
        </div>
      );
      return (list);
    }
    
  render() {
    return (
      <div className="container App">
        <header className="App-header">
          <h1 className="App-title">Cornell Today</h1>
        </header>
        <p className="App-intro"> Everything you need to know happening around Cornell today </p>


     {/* UDEMY */}   
     {/*   <div className="container-fluid App-main">
          <div className="row">
            <div className="col-sm-8">
              <div className="row">
              {this.productList()}
              </div> 
            </div>
            <div className="col-sm-4">
              <WishList />
            </div>   
          </div>
        </div> 
      */}


      {/*CORNELL TODAY */} 
        <div className="cornellToday">
          <nav id="navbar-example2" class="navbar navbar-light bg-light">
            <ul class="nav nav-pills">
              <li class="nav-item">
                <a class="nav-link" href="#keyAcademicDates">Key Academic Dates</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#f2">Feature 2</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                <div class="dropdown-menu">
                  <a class="dropdown-item" href="#one">one</a>
                  <a class="dropdown-item" href="#two">two</a>
                  <div role="separator" class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#three">three</a>
                </div>
              </li>
            </ul>
          </nav>

          <div data-spy="scroll" data-target="#navbar-example2" data-offset="0">
            <h4 id="academicDates">Key Academic Dates</h4> 
             {!this.state.isThereEvent ? (<p>There is no key academic event today.</p>) :
              <div class="row">
                {this.eventList()}
              </div>
            }


            <h4 id="f2">Feature 2</h4>
            <p>ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. R</p>
            <h4 id="one">one</h4>
            <p>ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. R</p>
            <h4 id="two">two</h4>
            <p>ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. R</p>
            <h4 id="three">three</h4>
            <p>ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. R</p>
          </div>
        </div>  




      </div>
    );
  }
}

export default App;
