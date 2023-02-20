import { useState, useContext } from "react";
import { EtherContext } from "./contexts/EtherContext"

import { providers } from "ethers";
import { rLogin } from "./utils/login";

import reactLogo from './assets/react.svg'
import './App.css'

export default function App() {
  const etherHelper = useContext(EtherContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [disconnect, setDisconnect] = useState(null);
  const [address, setAddress] = useState("");

  const login = () =>
    rLogin.connect()
      .then(({ provider, disconnect }) => {
        setDisconnect(disconnect);
        etherHelper.setProvider(provider);
        etherHelper.getAddress().then(setAddress);
        setIsLoggedIn(true);
      })
      .catch(console.error);

  const logout = () => {
    setDisconnect(null);
    setAddress("");
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <div>
        <img src="/rsk_logo.svg" className="logo" alt="RSK logo" />
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <h1>RSK + React</h1>


      {
        isLoggedIn ? 
          <button className="logOut" onClick={logout}>
            Log out
          </button>
        : <>
            <p>
              Connect to RSK
            </p>
            <button className="connect" onClick={login}>
              Connect
            </button>
          </>
      }
      
      {
        isLoggedIn ? 
        <p className="read-the-docs">Address: {address}</p>
        : <></>
      }

      
    </div>
  )
}
