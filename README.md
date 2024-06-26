# Zorpay

Welcome to **Zorpay**, a self-custodial, simplified stablecoin wallet designed to streamline digital transactions. Built with React Native, Foundry, and NextJS, Zorpay enables users to send and receive stablecoins effortlessly through QR code scanning and split bills among friends—all while ensuring a secure, gasless, and decentralized experience.

## Android APK

[Download apk file for Android](https://drive.google.com/drive/folders/1uM-qqES5eNoHF5Ja1ketaYZe-HBQw-Um?usp=sharing)

## Smart Contracts ( opBNB Testnet )

| Contract                                                                                                             | Explorer Link                                                                                                                      |
| -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [SmartAccountFactory.sol](https://github.com/Suhel-Kap/zorpay/tree/main/smart_contracts/src/SmartAccountFactory.sol) | [0x6a795bf108127f4b90b110db688b538c34008c05](https://opbnb-testnet.bscscan.com/address/0x6a795bf108127f4b90b110db688b538c34008c05) |
| [MyUSD.sol](https://github.com/Suhel-Kap/zorpay/tree/main/smart_contracts/src/MyUSD.sol)                             | [0x5d81cb67418762a86e342f322ecf22a677acda27](https://opbnb-testnet.bscscan.com/address/0x5d81cb67418762a86e342f322ecf22a677acda27) |

## Smart Contracts ( Linea Sepolia )

| Contract                                                                                                             | Explorer Link                                                                                                                    |
| -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| [SmartAccountFactory.sol](https://github.com/Suhel-Kap/zorpay/tree/main/smart_contracts/src/SmartAccountFactory.sol) | [0x11da0f57086a19977e46b548b64166411d839a30](https://sepolia.lineascan.build/address/0x11da0f57086a19977e46b548b64166411d839a30) |
| [MyUSD.sol](https://github.com/Suhel-Kap/zorpay/tree/main/smart_contracts/src/MyUSD.sol)                             | [0xdf78d5a57dcff31ca18978b56760867010aebc2e](https://sepolia.lineascan.build/address/0xdf78d5a57dcff31ca18978b56760867010aebc2e) |

## Smart Contracts ( Neon EVM Devnet )

| Contract                                                                                                             | Explorer Link                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| [SmartAccountFactory.sol](https://github.com/Suhel-Kap/zorpay/tree/main/smart_contracts/src/SmartAccountFactory.sol) | [0x76cfde04f691b93c9993be24d5fe7667e7a8782c](https://devnet.neonscan.org/address/0x76cfde04f691b93c9993be24d5fe7667e7a8782c) |
| [MyUSD.sol](https://github.com/Suhel-Kap/zorpay/tree/main/smart_contracts/src/MyUSD.sol)                             | [0x489d47e592639ba11107e84dd6cca08f0892e27d](https://devnet.neonscan.org/address/0x489d47e592639ba11107e84dd6cca08f0892e27d) |

## Table of Contents

- [Inspiration](#inspiration)
- [What It Does](#what-it-does)
- [Walkthrough](#walkthrough)
- [How We Built It](#how-we-built-it)
- [Challenges We Ran Into](#challenges-we-ran-into)
- [Accomplishments That We're Proud Of](#accomplishments-that-were-proud-of)
- [What We Learned](#what-we-learned)
- [What's Next for Zorpay](#whats-next-for-zorpay)

## Inspiration

The inspiration behind Zorpay stemmed from the need to simplify and enhance the user experience in the world of stablecoins. We recognized that while stablecoins offer great potential for everyday transactions, their adoption is often hindered by complexity, high transaction fees, and security concerns. Our goal was to create a user-friendly, secure, and cost-effective solution that leverages the power of decentralization without the typical drawbacks.

## What It Does

Zorpay offers a comprehensive solution for managing stablecoin transactions. Key features include:

- **QR Code Scanning**: Easily send and receive stablecoins by scanning wallet addresses.
- **Bill Splitting**: Conveniently split bills among multiple users.
- **Gasless Transactions**: Enjoy fee-free interactions, ensuring cost efficiency.
- **Biometric Security**: Enhance security with biometric authentication.
- **Social Login**: Quick and easy login using Google or wallets like MetaMask.
- **Decentralization**: Fully decentralized using smart contracts deployed on opBNB, Linea Sepolia, and Neon EVM Devnet.

## Walkthrough

- When you first open Zorpay:

  <!-- ![Zorpay](README/Screenshots/Zorpay.png) -->
  <img src="README/Screenshots/Zorpay.png" width="400">

- It will ask you to login with Google or Wallet:

  <!-- ![Zorpay](README/Screenshots/Login%20Screen.png) -->
  <img src="README/Screenshots/Login%20Screen.png" width="400">

- After logging in, you will be taken to the home screen where you can see your balance and recent activities:

  <!-- ![Zorpay](README/Screenshots/Home%20Page%200.png) -->
  <img src="README/Screenshots/Home%20Page%200.png" width="400">
  <!-- ![Zorpay](README/Screenshots/Home%20Page%201.png) -->
  <img src="README/Screenshots/Home%20Page%201.png" width="400">

- You can also access the menu to change network, get USD from faucet, and log out:

  <!-- ![Zorpay](README/Screenshots/Side%20Bar.png) -->
  <img src="README/Screenshots/Side%20Bar.png" width="400">

- You can receive stablecoins by sharing QR code or your smart account address:

  <!-- ![Zorpay](README/Screenshots/Receive%20QR%20Code.png) -->
  <img src="README/Screenshots/Receive%20QR%20Code.png" width="400">

- You can send stablecoins by scanning QR code or entering the recipient's address:

  <!-- ![Zorpay](README/Screenshots/Send%20Wallet%20Address.png) -->
  <img src="README/Screenshots/Send%20Wallet%20Address.png" width="400">
  <!-- ![Zorpay](README/Screenshots/QR%20Code%20Scan.png) -->
  <img src="README/Screenshots/QR%20Code%20Scan.png" width="400">
  <!-- ![Zorpay](README/Screenshots/Send%20Amount%20Input.png) -->
  <img src="README/Screenshots/Send%20Amount%20Input.png" width="400">
  <!-- ![Zorpay](README/Screenshots/Send%20Transaction%20Details.png) -->
  <img src="README/Screenshots/Send%20Transaction%20Details.png" width="400">

- You can split bills among friends by entering the total amount and the number of people:

  <!-- ![Zorpay](README/Screenshots/Split%20Wallet%20Address.png) -->
  <img src="README/Screenshots/Split%20Wallet%20Address.png" width="400">
  <!-- ![Zorpay](README/Screenshots/Split%20Contributors%20Addresses%200.png) -->
  <img src="README/Screenshots/Split%20Contributors%20Addresses%200.png" width="400">
  <!-- ![Zorpay](README/Screenshots/Split%20Contributors%20Addresses%201.png) -->
  <img src="README/Screenshots/Split%20Contributors%20Addresses%201.png" width="400">
  <!-- ![Zorpay](README/Screenshots/Split%20Transaction%20Details.png) -->
  <img src="README/Screenshots/Split%20Transaction%20Details.png" width="400">

- You can view all the split requests and pay them:

  <!-- ![Zorpay](README/Screenshots/Split%20Requests.png) -->
  <img src="README/Screenshots/Split%20Requests.png" width="400">

- This is how transaction progress looks like:

  <!-- ![Zorpay](README/Screenshots/Transaction%20Processing.png) -->
  <img src="README/Screenshots/Transaction%20Processing.png" width="400">
  <!-- ![Zorpay](README/Screenshots/Transaction%20Confirmed.png) -->
  <img src="README/Screenshots/Transaction%20Confirmed.png" width="400">

## How We Built It

Zorpay is built with a robust technology stack:

- **Frontend**: Developed using React Native for a smooth and responsive user interface.
- **Smart Contracts**: Implemented with Foundry, ensuring secure and reliable decentralized interactions.
- **Backend**: Powered by NextJS, providing a scalable and efficient backend infrastructure.
- **Blockchain Deployments**: Smart contracts are deployed on opBNB, Linea Sepolia, and Neon EVM Devnet to leverage the advantages of these networks.

## Challenges We Ran Into

Throughout the development of Zorpay, we encountered several challenges:

- **Ensuring Security**: Implementing robust security measures, especially for biometric authentication, to protect user assets.
- **Gasless Transactions**: Achieving truly gasless transactions without compromising the integrity and decentralization of the platform.
- **User Experience**: Designing a clean and intuitive UX that simplifies complex blockchain interactions for users.

## Accomplishments That We're Proud Of

We are proud of several key accomplishments:

- **Seamless Integration**: Successfully integrating QR code scanning and bill splitting features.
- **Decentralization**: Deploying secure and reliable smart contracts on multiple blockchain networks.
- **User-Centric Design**: Creating a user-friendly interface that simplifies stablecoin transactions while maintaining top-notch security.

## What We Learned

The development of Zorpay was a valuable learning experience:

- **Blockchain Integration**: Gained deeper insights into deploying and managing smart contracts on various blockchain networks.
- **User Experience Design**: Learned the importance of user-centric design in encouraging the adoption of blockchain-based applications.
- **Security Best Practices**: Enhanced our understanding of implementing advanced security features like biometrics in decentralized applications.

## What's Next for Zorpay

Looking ahead, we have several plans for Zorpay:

- **Feature Expansion**: Adding more features like multi-currency support and advanced transaction tracking.
- **Enhanced Security**: Continuously improving security measures to safeguard user assets.
- **Wider Adoption**: Focusing on user acquisition and community building to drive the widespread adoption of Zorpay.
- **Cross-Platform Availability**: Expanding Zorpay's availability across more platforms and devices to reach a broader audience.

Join us on our journey as we continue to innovate and simplify the world of stablecoin transactions with Zorpay!
