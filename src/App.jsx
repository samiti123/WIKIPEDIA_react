import "./App.scss";

import React, {useEffect, useState}             from 'react';
import { Switch, Route, useHistory} from 'react-router-dom';

import Topnav           from './component/Navigation/Topnav';
import Sidenav          from './component/Navigation/Sidenav';
import Home             from "./component/Home";
import About            from "./component/About";
import Content          from './component/Content';
import RichtextEditor   from './component/RichtextEditor';
import RandomArticle    from './component/RandomArticle';

export default function App() {

  const [article, setArticle] = useState(JSON.parse(localStorage.getItem("myWiki"))||[{id:0,title:'Home',content:'Welcome to SaMaPedia'}]);
  const history               = useHistory();
  let dataDisplay             = '';
  let dataRandom              = '';

  // Dynamic interaction with Local storage
  useEffect(() => {
    localStorage.setItem('myWiki',JSON.stringify(article));
  },[article]
  )

  //Phonetic search using soundex
  var soundex = function(s) {
  var a       = s.toLowerCase().split(''),
      f       = a.shift(),
      r       = '',
      codes   = { a: '', e: '', i: '', o: '', u: '', b: 1, f: 1, p: 1, v: 1, c: 2, g: 2, j: 2, k: 2, q: 2, s: 2, x: 2, z: 2, d: 3, t: 3, l: 4, m: 5, n: 5, r: 6 };
  r           = f +
                a
                .map(function(v, i, a) {
                    return codes[v]
                })
                .filter(function(v, i, a) {
                    return ((i === 0) ? v !== codes[f] : v !== a[i - 1]);
                })
                .join('');
  return (r + '000').slice(0, 4).toUpperCase();
};

  // To display content on search
  function displayContent(searchValue){ 
    dataDisplay ='';

    article.forEach((obj)=>{
      if(soundex(obj.title) === soundex(searchValue)){
        dataDisplay = obj.content;
        history.push(`/content/display/${obj.id}`);
        }
      }
    )

    if(dataDisplay === ''){
      history.push(`/content/notAvailable`);
    }
  }
  
  // To display random article
  function randomDisplay(randomIndex){ 
      dataRandom = article[randomIndex].content ;
  }
  
  // main render
  return (
    <>
    
      {/* Side bar */}
      <Sidenav  article       = {article} 
                setArticle    = {setArticle} 
                randomDisplay = {randomDisplay}
      />
      
      {/* Top bar */}
      <div className = "main">
        <Topnav article         = {article} 
                setArticle      = {setArticle} 
                displayContent  = {displayContent}/>
      </div>
      
      {/* Main content */}
      <div className = "aside">
        <Switch>
          <Route  path      = '/' 
                  exact 
                  component = {Home} 
          />
          <Route  path      = "/about" 
                  component = {About} 
          />
          <Route  path    = "/addArticle" 
                  exact>
            <RichtextEditor article     = {article} 
                            setArticle  = {setArticle} 
            />
          </Route> 
          <Route  path    = "/richtextEditor/:id">
            <RichtextEditor article     = {article} 
                            setArticle  = {setArticle} 
            />
          </Route> 
          <Route  path    = "/content">
            <Content  article    = {article} 
                      setArticle = {setArticle}>
              {article.title}
            </Content>
          </Route>
          <Route  path    = "/randomArticle"    
                  exact
                  render  = {(props) => <RandomArticle {...props} 
                  data    = {dataRandom} 
                    />
                  }
          />
        </Switch>
      </div>
    
    </>
  );
}