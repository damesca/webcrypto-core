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

# Original webcrypto-core module
[![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat)](https://raw.githubusercontent.com/PeculiarVentures/webcrypto-core/master/LICENSE)
[![Build Status](https://travis-ci.org/PeculiarVentures/webcrypto-core.svg?branch=master)](https://travis-ci.org/PeculiarVentures/webcrypto-core)
[![Coverage Status](https://coveralls.io/repos/github/PeculiarVentures/webcrypto-core/badge.svg?branch=master)](https://coveralls.io/github/PeculiarVentures/webcrypto-core?branch=master)
[![npm version](https://badge.fury.io/js/webcrypto-core.svg)](https://badge.fury.io/js/webcrypto-core)

[![NPM](https://nodei.co/npm/webcrypto-core.png)](https://nodei.co/npm/webcrypto-core/)

# webcrypto-core

We have created a number of WebCrypto polyfills including: [node-webcrypto-ossl](https://github.com/PeculiarVentures/node-webcrypto-ossl), [node-webcrypto-p11](https://github.com/PeculiarVentures/node-webcrypto-p11), and [webcrypto-liner](https://github.com/PeculiarVentures/webcrypto-liner).  `webcrypto-core` was designed to be a common layer to be used by all of these libraries for input validation.

Unless you intend to create a WebCrypto polyfill this library is probably not useful to you.

## Installing

```
npm install webcrypto-core
```

## Example

Current examples shows how you can implement your own WebCrypt interface

```js
const core = require(".");
const crypto = require("crypto");

class Sha1Provider extends core.ProviderCrypto {

  constructor() {
    super();

    this.name = "SHA-1";
    this.usages = [];
  }

  async onDigest(algorithm, data) {
    const hash = crypto.createHash("SHA1").update(Buffer.from(data)).digest();
    return new Uint8Array(hash).buffer;
  }

}

class SubtleCrypto extends core.SubtleCrypto {
  constructor() {
    super();

    // Add SHA1 provider to SubtleCrypto
    this.providers.set(new Sha1Provider());
  }
}

class Crypto {

  constructor() {
    this.subtle = new SubtleCrypto();
  }

  getRandomValues(array) {
    const buffer = Buffer.from(array.buffer);
    crypto.randomFillSync(buffer);
    return array;
  }

}

const webcrypto = new Crypto();
webcrypto.subtle.digest("SHA-1", Buffer.from("TEST MESSAGE"))
  .then((hash) => {
    console.log(Buffer.from(hash).toString("hex")); // dbca505deb07e1612d944a69c0c851f79f3a4a60
  })
  .catch((err) => {
    console.error(err);
  });
```
