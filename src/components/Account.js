import EthName from './EthName';

const Account = function ({ accounts, isLoggedIn, connect }) {
  if (isLoggedIn) {
    return <EthName address={accounts[0]} />;
  } else {
    return <button onClick={connect}>Connect</button>;
  }
};

export default Account;
