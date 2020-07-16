# webcrypto-core for Oblivious Transfer
This is a fork from the original module of [webcrypto-core](https://github.com/PeculiarVentures/webcrypto-core), which adds the functionality to implement **Oblivious Transfer**. A new directory has been added (/src/ot), which includes 3 files for the functionality. The file *base.ts* integrates the common features for OT and the file *ot-rsa.ts* builds a base for the 1-out-of-2 protocol from [1]. This layer is for validation, so the main functionality has been developed into another forked module called [webcrypto](https://github.com/damesca/webcrypto).

## Oblivious Transfer for WebCrypto API specification
Here, a briefly introduction for designed primitives is introduced.

- **Setup:** It's the initial phase to prepare needed params. It's called by Sender and Receiver, and the two of them generate protocol specific data (cryptographic keys, random values...), which are encapsulated into a structure called FixedData.
- **Oblivious Public Key Derivation:** The Receiver carries out the derivation of cryptographic material which have to contain secret choice information.
- **Oblivious Encrypt:** There are typically two phases: a key derivation process and an encryption process. Key derivation is made from Oblivious Public Key obtained from Receiver, but the Sender never knows which the Receiver choice is. With derived keys, the Sender encrypts the messages, to send them to Receiver.
- **Oblivious Decrypt:** The Receiver gets the encrypted messages from the Sender, but he is only able to decrypt messages which are part of the choice (just 1 message for the 1-out-of-2 version). Decryption is made after a key derivation, as the Sender did.

## Fixed Data Structure
<img src="https://github.com/damesca/webcrypto-core/blob/master/FixedData structure.png" width="1000" height="250">

## Refs
[1] Even S., Goldreich O., Lempel A. (1983) A Randomized Protocol for Signing Contracts. In: Chaum D., Rivest R.L., Sherman A.T. (eds) Advances in Cryptology. Springer, Boston, MA
