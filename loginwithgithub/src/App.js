import logo from './logo.svg';
import './App.css';

import { useEffect } from 'react';

const clientID = "92fd3047d8b7e6621a7f"

function App() {

  const LOGIN = () => {
    window.location.assign("https://github.com/login/oauth/authorize?client_id="+clientID)
  }

  const getToken = async(code) => {
    await fetch("http://localhost:4000/getToken?code="+code,{
      method:"GET"
    }).then((res) => {
      return res.json();
  }).then((data)=>{
    console.log(data)
      return data
  })
  }
  
  useEffect(() =>{
      const qs = window.location.search;
      const params = new URLSearchParams(qs)
      const code = params.get("code")
      console.log(code)

      if(code && localStorage.getItem("usertoken")===null){
        const data = getToken(code)
        if(data.access_token){
          localStorage.setItem("usertoken",data.access_token)
        }
      }
  },[])
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={LOGIN}>Login</button>
      </header>
    </div>
  );
}

export default App;
