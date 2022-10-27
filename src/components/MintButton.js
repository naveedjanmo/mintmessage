import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';

import LoadingIndicator from './LoadingIndicator';

function MintButton({ wave, message, isLoading, setIsLoading }) {
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  if (isConnected) {
    return (
      <button className='mint-button connected' onClick={() => wave(message)}>
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
