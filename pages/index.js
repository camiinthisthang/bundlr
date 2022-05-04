import { ethers, utils } from "ethers";
import { useContext, useState } from "react";
import { MainContext } from "../context";
import BigNumber from "bignumber.js";

export default function Home() {
  const context = useContext(MainContext);
  const [amount, setAmount] = useState()

  const { initialize, balance, fetchBalance, bundlrInstance } = context
  console.log("lemme c", context);

  async function fundWallet() {
    let amountParsed = parseInput(amount);
    await bundlrInstance.fund(amountParsed);
    fetchBalance();
  }

  function parseInput (input) {
    const conv = new BigNumber(input).multipliedBy(bundlrInstance.currencyConfig.base[1])
    if (conv.isLessThan(1)) {
      console.log('error: value too small')
      return
    } else {
      return conv
    }
  }

  return (
    <div>
      {
        !balance && <button onClick={initialize}>initialize</button>
      }
      {
        balance && (
          <div>
            <p>Balance: {utils.formatEther(balance.toString())}</p>
            <div>
              <input onChange={e => setAmount(e.target.value)} />
              <button onClick={fundWallet}>Fund Wallet</button>
            </div>
          </div>
        )
      }
    </div>
  )
}
