const EthName = function ({ address }) {
  let formatted = '&mdash;';
  if (address) {
    formatted = address.substr(0, 5) + '…' + address.substr(-4);
    formatted = formatted.toLowerCase();
  }

  return (
    <abbr className="ethName" title={address}>
      {formatted}
    </abbr>
  );
};

export default EthName;
