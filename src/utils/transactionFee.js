// async function estimateGasPrice() {
//   const { ethereum } = window;

//   if (ethereum) {
//     const provider = new ethers.providers.Web3Provider(ethereum);
//     const signer = provider.getSigner();
//     const contract = new ethers.Contract(
//       mintMessageAddress,
//       MintMessage.abi,
//       signer
//     );

//     const gasAmount = await contract.estimateGas.createToken(
//       'https://ipfs.io/ipfs/QmQB6bnynRwVd7APepgHvxrF3Jv2x7AmnftG7iQxTh1vNt',
//       '0x970062d3ebEe26F651C401f69d2fe510b43a1b03'
//     );

//     const formattedGasAmount = gasAmount.toNumber();
//     console.log(`Gas amount (GAS): ${formattedGasAmount}`);

//     var data = await provider.getFeeData();
//     var fee = data.maxFeePerGas.parseUnits(150);
//     var priority = data.maxPriorityFeePerGas;
//     // var price = (fee + priority) * formattedGasAmount;
//     // var formatPrice = ethers.utils.formatEther(price);
//     console.log(fee.toNumber());

//     // const maxFeePerGas = (await provider.getFeeData()).maxFeePerGas.mul(1.5);
//     // const priorityFee = (
//     //   await provider.getFeeData()
//     // ).maxPriorityFeePerGas.mul(1.5);
//     // // const gasPrice = await provider.getFeeData();

//     // // .maxFeePerGas.parseUnits('150', 'gwei')
//     // //   .maxPriorityFeePerGas.parseUnits('150', 'gwei');

//     // // console.log(`gas price: ${gasPrice.toNumber()}`);
//     // console.log(`max fee per gas: ${ethers.utils.formatEther(maxFeePerGas)}`);
//     // console.log(
//     //   `max priority per gas: ${ethers.utils.formatEther(priorityFee)}`
//     // );

//     // const totalGas = formattedGasAmount * formattedGasPrice;
//     // console.log(`total gas price: ${ethers.utils.formatEther(totalGas)}`);

//     // console.log(ethers.utils.formatUnits(totalGas, 'ether'));
//   }
// }
// estimateGasPrice();
