import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';

import LoadingIndicator from './LoadingIndicator';

function MintButton({
  isLoading,
  createNFT,
  messageError,
  toAddressError,
  message,
  twitter,
  toAddress,
  validateToAddress,
}) {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const isFormValid = message && twitter && validateToAddress ? true : false;

  // if (isConnected && isFormValid) {
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
  // } else {
  //   return (
  //     <button className='mint-button' onClick={openConnectModal}>
  //       Connect Wallet
  //     </button>
  //   );
  // }
}

export default MintButton;
