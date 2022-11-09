import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';

import LoadingIndicator from './LoadingIndicator';

function MintButton({ isLoading }) {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  if (isConnected) {
    return (
      // <div className='mint-button-wrap'>
      //   <div className='mint-info'>
      //     <div className='mint-info-left'>
      //       <p>Price: FREE!</p>
      //     </div>
      //     <div className='mint-info-right'>
      //       <p>Gas: </p>
      //     </div>
      //   </div>
      <button className='mint-button connected'>
        {isLoading ? <LoadingIndicator /> : 'Mint'}
      </button>
      // </div>
    );
  } else {
    return (
      <button type='button' className='mint-button' onClick={openConnectModal}>
        Connect Wallet
      </button>
    );
  }
}

export default MintButton;
