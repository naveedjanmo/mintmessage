import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';

import LoadingIndicator from './LoadingIndicator';

function MintButton({ isLoading, createNFT }) {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  // const buttonClass = () => `mint-button ${isConnected ? 'connected' : ''}`;

  if (isConnected) {
    return (
      <button className='mint-button connected' onClick={createNFT}>
        {isLoading ? <LoadingIndicator /> : 'Mint'}
      </button>
    );
  } else {
    return (
      <button className='mint-button' onClick={openConnectModal}>
        Connect Wallet
      </button>
    );
  }
}

export default MintButton;
