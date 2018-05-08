---
title: Signers.PrivateKey
category: Signers - Signing Transactions
order: 2
---
## Private Keys

> **new Browseth.Signers.PrivateKey(privKey)**

#### Parameters

`privKey`: `Buffer | string`<br>
A 32-bit private key. If passed as a string, any '0x' is removed and converted to Buffer.<br>

#### Returns

`Signer`: A new Signer object with Private Key functionality.

#### Example

```javascript
const myPrvKey = new Browseth.Signers.PrivateKey(SOME_PRIVATE_KEY_STRING);
```

<hr>

## Methods

- [fromV3](#from-v3)
- [fromHex](#from-hex)
- [fromRandomBytes](#from-random-bytes)
- [account](#account)
- [signTransaction](#sign-transaction)
- [signMessage](#sign-message)
- [toString](#to-string)
- [toV3](#to-v3)
- [getKeyStoreFileName](#get-keystore-file-name)

### From V3

> **.fromV3(keystore, pw)**

(Static) Takes a V3 keystore file and password and returns a private key.

#### Parameters

1. `keystore`: `object` | `string`<br>
A V3 keystore in object or string form. This method is not case sensitive, all characters are treated as lower case.
2. `pw`: `string`<br>
A password.

#### Returns

`PrivateKey`: A new `PrivateKey` object.

#### Example

```javascript
const myPrivateKey = Browseth.Signers.PrivateKey.fromV3(myKeystore, myPassword);
```

### From Hex

> **.fromHex(raw)**

(Static) Takes an private key as a hexidecimal `string` and converts it to a `PrivateKey` object. If the string is prepended with a `'0x'`, it is removed.

#### Parameters

1. `raw`: `string`<br>
A private key in hexidecimal form.

#### Returns

`PrivateKey`: A new `PrivateKey` object.

#### Example

```javascript
const prvKeyObj = Browseth.Signers.PrivateKey.fromHex(SOME_PRIVATE_KEY_STRING);
```

<!-- ### From Mnemonic -->

### From Random Bytes

> **.fromRandomBytes()**

(Static) Produces a random 32 byte address.

#### Returns

A new `PrivateKey` object.

#### Example

```javascript
const newPrivateKey = Browseth.Signers.PrivateKey.fromRandomBytes();
```

### Account

> **.account()**

(Asynchronous) Gets the public address.

#### Returns

`string`: The public address of the private key in hexidecimal with a preprended `'0x'`.

#### Example

```javascript
const prvKey = Browseth.Signers.PrivateKey.fromRandomBytes();

// logs a string '0x123...'
console.log(await prvKey.account());
```

### Sign Transaction

> **.signTransaction(obj)**

(Asynchronous) Signs a transaction.

#### Parameters

1. `obj`: `object`

```javascript
{ // obj
  nonce: string | Buffer | number,    // defaults to '0x'
  gasPrice: string | Buffer | number, // defaults to '0x1'
  gas: string | Buffer | number,      // defaults to '0x5208'
  to: string | Buffer,                // defaults to '0x'
  value: string | Buffer | number,    // defaults to '0x'
  data: string | Buffer,              // defaults to '0x'
  chainId: number,                    // defaults to '0x1'
}
```

#### Returns

`Promise<string>`: A `Promise` that resolves to a `string` representation of the transaction hash in hexidecimal.

#### Example

```javascript
const pk = Browseth.Signers.PrivateKey.fromRandomBytes();

await pk.signTransaction();
```

### Sign Message

> **.signMessage(message)**

(Asynchronous) Signs a message.

#### Parameters

1. `message`: `string`

#### Returns

`Promise<string>`: A `Promise` that resolves to a `string` representation of the transaction hash in hexidecimal.

#### Example

### To String

> **.toString()**

#### Returns

`string`: A string representation of the private key in hexidecimal with no prepended `'0x'`.

#### Example

```javascript
const pk = Browseth.Signers.PrivateKey.fromRandomBytes().toString();
console.log(pk.toString());
```

### To V3

> **.toV3(pw, options?)**

(Asynchronous) Takes a password and generates a V3 keystore object.

#### Parameters

1. `pw`: `string`<br>
A password.
2. `options?`: `object`<br>
(Optional) Options for changing algorithm settings.

```javascript
{ // options?
  salt: Buffer,   // default: randomBytes(32)
  iv: Buffer,     // default: randomBytes(16)
  uuid: Buffer,   // default: randomBytes(16)
  kdf: string,    // default: 'scrypt'
  cipher: string, // default: 'aes-128-ctr'
  dklen: number,  // default: 32
  c: number,      // default: 262144
  n: number,      // default: 262144
  r: number,      // default: 8
  p: number,      // default: 1
}
```

- `salt`: A random salt for the kdf (key derivation function)
- `iv`: Initialization vector for the cipher.
- `uuid`: A random universally unique identifier.
- `kdf`: Key derivation function. (E.G. `pbkdf2` or `scrypt`)
- `cipher`: Must be supported by `OpenSSL`.
- `dklen`: Derived key length.
- `c`: Number of iterations for `pbkdf2`.
- `n`: Number of iterations for `scrypt`.
- `r`: Block size for underlying hash. For `scrypt`.
- `p`: Parallelization factor. For `scrypt`.

#### Returns

`Promise<string>`: A promise that resolves to a V3 keystore object in `string` format.

#### Example

###### Code

```javascript
const password = 'somestring';
const pk = Browseth.Signers.PrivateKey.fromRandomBytes();
console.log(await pk.toV3(password));
```

###### Output

```javascript
{
  "version": 3,
  "id": "07d6f15b-bb9e-4489-9866-b7a1fd709691",
  "address": "0xe661c122051d18cc3aa5d035b284c17fce00c11f",
  "crypto": {
    "ciphertext": "7cc2fe83dace12194ac0d8159f4bb5ca03cf4e31ef1a38bac446214a5e9d4efd",
    "cipherparams": {
      "iv": "558c4533e62d2843457c2fef9d3fa95a"
    },
    "cipher":"aes-128-ctr",
    "kdf": "scrypt",
    "kdfparams": {
      "dklen": 32,
      "salt": "4e07af9c7b228f260ce40714bc929745c2230bf6e578aa5072013776df301d88",
      "n": 262144,
      "r": 8,
      "p": 1
    },
    "mac": "230e7f33536e1bf6860cce7dac2528a7b46b64270470ceca4bdd46016482d281"
  }
}
```

### Get Keystore File Name

> **.getKeyStoreFileName(date?)**

Generates a filename for keystore file using the private key's address. Uses (geth's)[https://geth.ethereum.org/] naming convention for keystore files. Also compatible with (Parity)[https://www.parity.io/].

#### Parameters

1. `date?`: `Date`<br>
(Optional) Defaults to the current UTC date.

#### Example

```javascript
const pk = Browseth.Signers.PrivateKey.fromRandomBytes();
console.log(pk.getKeyStoreFileName())
```

###### Output

```
UTC--2018-01-01T18-10-02.771Z--1234567890abcdef0123456789abcdef01234567
```