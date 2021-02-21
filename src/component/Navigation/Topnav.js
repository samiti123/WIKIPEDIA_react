import React, {useState}                   from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import {Link}                              from "react-router-dom";

export default function Topnav(props) {
  const [searchValue, setSearchValue] = useState('');
  const filtered = props.article.filter(item => item.title.match(searchValue));

  function toggleNav() {
    var topNavElement = document.getElementById("myTopnav");
    if (topNavElement.className === "topnav") {
      topNavElement.className += " responsive";
    } else {
      topNavElement.className = "topnav";
    }
  } 

  return ( <>
    
      <div  className = "topnav" 
            id        = "myTopnav">
        <div>
          <InputGroup >
          { searchValue === '' ? null : <ul>{
          filtered
          .map( item => <li>
            <a onClick = {
              e => setSearchValue(item.title)
            }>{
              item.title
            }</a></li> )
              }</ul> }
            <FormControl
              placeholder       = "Search SaMapedia..."
              aria-label        = "Search SaMapedia..."
              aria-describedby  = "basic-addon2"
              value             = {searchValue}
              onChange          = {e => setSearchValue(e.target.value.toUpperCase())}
            />

            <InputGroup.Append>
              <Button className ="btn-search" variant="light" onClick = {e =>
                    {
                      if(searchValue === ''){
                        alert('Please enter a title to search');
                      }
                      else{
                        props.displayContent(searchValue);
                        setSearchValue("");
                      }
                    }
                  }><span className="fa fa-search"></span>
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>

        <div className = "links">

        <Link to = "/" onClick = {toggleNav}>
          Home
        </Link>
        
        <Link to      = "/addArticle" 
              onClick = {toggleNav}>
          Add
        </Link>

        <Link to        = "#"
              className = "icon"  
              onClick   = {toggleNav}><i 
              className = "fa fa-bars"></i>
        </Link>
        </div>
      </div> 
    </>
  );
}


