import '../styles/globals.css'
import { providers, utils } from 'ethers'
import { WebBundlr } from '@bundlr-network/client'
import { useState, useRef } from 'react'
import { MainContext } from '../context'

function MyApp({ Component, pageProps }) {
  const [bundlrInstance, setBundlrInstance] = useState()
  const [balance, setBalance] = useState();
  const bundlrRef = useRef()

  async function initialize(){
    await window.ethereum.enable()
    const provider = new providers.Web3Provider(window.ethereum);
    await provider._ready();
    const bundlr = new WebBundlr("https://node1.bundlr.network", "matic", provider);
    await bundlr.ready();
    bundlrRef.current = bundlr
    setBundlrInstance(bundlr);

    fetchBalance(bundlr)
  }

  async function fetchBalance() {
    let balance = await bundlrRef.current.getLoadedBalance();
    setBalance(balance);
    console.log("balance:", balance.toString());
  }

  return (
    <MainContext.Provider
      value={{
        initialize, balance, fetchBalance, bundlrInstance
      }}
    >
      <div>
        <Component {...pageProps} />
      </div>
    </MainContext.Provider>
  )
}

export default MyApp
