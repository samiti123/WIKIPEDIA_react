
import React from 'react';
import logo  from "../wikipedia.jpeg";

export default function Home(){

    return ( <>
        <div className = "home">
            <h1>SaMaPedia</h1>
            <h3>The Free Encyclopedia</h3>
            <img    className   = "homeImage"
                    src         = {logo}
                    alt         = "Wikipedia Logo"/>
        </div>
        </>
    );
}
