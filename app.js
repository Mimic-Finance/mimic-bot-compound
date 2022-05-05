const Main = async () => {
  require("dotenv").config();
  const { API_URL, PRIVATE_KEY } = process.env;
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
  const web3 = createAlchemyWeb3(API_URL);
  const myAddress = "0xCfc597a8793E0ca94FC8310482D9e11367cfCA24";

  const nonce = await web3.eth.getTransactionCount(myAddress, "latest");

  const transaction = {
    to: "0x86aC1a9d70e4bfcA6b4ca273F834cF3F3AfAd615", //send eth to this address
    value: 0.01 * 10 ** 18, // amount of eth to send
    gas: 30000,
    maxPriorityFeePerGas: 1000000108,
    nonce: nonce,
    // optional data field to send message or execute smart contract
  };

  const signedTx = await web3.eth.accounts.signTransaction(
    transaction,
    PRIVATE_KEY
  );

  web3.eth.sendSignedTransaction(
    signedTx.rawTransaction,
    function (error, hash) {
      if (!error) {
        console.log(
          "🎉 The hash of your transaction is: ",
          hash,
          "\n Check Alchemy's Mempool to view the status of your transaction!"
        );
      } else {
        console.log(
          "❗Something went wrong while submitting your transaction:",
          error
        );
      }
    }
  );
};

Main();
