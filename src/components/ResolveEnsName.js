import { useEnsName } from 'wagmi';
import { formatAddress } from '../utils/utils';

const ResolveEnsName = ({ address }) => {
  const { data } = useEnsName({
    address: address,
  });

  if (data) return data;
  if (!data) return formatAddress(address);
};

export default ResolveEnsName;
