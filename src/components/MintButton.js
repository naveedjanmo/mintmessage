import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';

import LoadingIndicator from './LoadingIndicator';

function MintButton({ isLoading }) {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  if (isConnected) {
    return (
      <button className='mint-button connected'>
        {isLoading ? <LoadingIndicator /> : 'Mint'}
      </button>
    );
    // } else if (isConnected && !isFormValid) {
    //   return (
    //     <button
    //       disabled={true}
    //       className='mint-button connected disabled'
    //       onClick={createNFT}
    //     >
    //       {isLoading ? <LoadingIndicator /> : 'Mint'}
    //     </button>
    //   );
  } else {
    return (
      <button type='button' className='mint-button' onClick={openConnectModal}>
        Connect Wallet
      </button>
    );
  }
}

export default MintButton;
