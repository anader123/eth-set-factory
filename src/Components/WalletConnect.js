import React from 'react';
import { Button, Heading } from 'rebass';

// Redux
import { connect } from 'react-redux';
import { setUserAddress, toggleWalletConnected } from '../Redux/actions';

// Ethereum 
import { initializeWeb3 } from '../Ethereum/SetFunctions';

function WalletConnect(props) {
  const { toggleWalletConnected, setUserAddress } = props;

  const connectWallet = async () => {
    if(window.ethereum) {
      // Make sure that the user is connected to Kovan
      if(window.ethereum.networkVersion === "42") {
        const accounts = await window.ethereum.enable();
        initializeWeb3();
        setUserAddress(accounts[0]);
        toggleWalletConnected(true);
      }
      else{
        window.alert('Please switch to the Kovan Network.')
      }
    }
    else {
      window.alert('No Ethereum wallet detected.');
    }
  }
  return (
    <div>
      <Heading mt={6}>Please connect your Ethereum wallet to create a Set.</Heading>
      <Button mt={4} onClick={connectWallet}>Connect Wallet</Button>
    </div>
  )
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {
  setUserAddress, 
  toggleWalletConnected
})(WalletConnect);
