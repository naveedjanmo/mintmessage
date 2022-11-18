import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';

import { mintMessageAddress } from '../utils/config';
import MintMessage from '../utils/MintMessage.json';

const useFees = () => {
  const [fees, setFees] = useState({
    gasPrice: '',
    transactionFee: '',
  });
  const [feesLoading, setFeesLoading] = useState(true);
  const { ethereum } = window;
  const { isConnected } = useAccount();

  useEffect(() => {
    async function getTransactionFee() {
      try {
        // console.log(feesLoading);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          mintMessageAddress,
          MintMessage.abi,
          signer
        );

        // debugger;
        /* get network gas price */
        const gasPrice = await provider.getGasPrice();
        const gasPriceGwei = ethers.utils.formatUnits(gasPrice, 'gwei');
        const gasPriceGweiFormat = parseInt(gasPriceGwei, 10);
        // console.log('---Network Gas Price (gwei): ' + gasPriceGweiFormat);

        /* get function gas units */
        const gasUnits = await new contract.estimateGas.createMessage(
          'QmQB6bnynRwVd7APepgHvxrF3Jv2x7AmnftG7iQxTh1vNt',
          '0x1F19FaF55eF10deB3Df7002265EFa583bE14AFAb'
        );
        // console.log('---Function Gas Units: ' + gasUnits);

        /* estimate fee in wei, eth */
        const transactionFeeWei = gasPrice.mul(gasUnits);
        const transactionFeeEther = ethers.utils.formatUnits(
          transactionFeeWei,
          'ether'
        );
        console.log('---Transaction Fee (eth): ' + transactionFeeEther);

        // /* fetch eth price */
        const cgBaseEndpoint = `https://api.coingecko.com/api/v3/coins/ethereum`;
        const res = await fetch(`${cgBaseEndpoint}`, {
          headers: {
            Accept: 'application/json',
          },
        });
        const { market_data } = await res.json();
        const ethereumPrice = market_data.current_price.usd;
        const transactionFeeUsd = ethereumPrice * transactionFeeEther;
        // console.log('---Transaction Fee (usd): ' + transactionFeeUsd);

        setFees({
          gasPrice: gasPriceGweiFormat,
          transactionFee: transactionFeeUsd.toFixed(2),
        });
      } catch (error) {
        console.log(error);
      } finally {
        setFeesLoading(false);
      }
    }
    getTransactionFee();
  }, [isConnected]);

  return { fees, feesLoading };
};

export default useFees;
