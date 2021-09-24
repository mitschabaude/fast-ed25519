# watsign

This module a port of the signing part of [tweetnacl](http://tweetnacl.cr.yp.to/) to WebAssembly + JavaScript. Thus, it implements the [ed25519 signature scheme](https://en.wikipedia.org/wiki/EdDSA#Ed25519).
It works in all modern browsers. Currently it doesn't work in node/deno but I plan to fix that.

The code is based on and tested against [tweetnacl-js](https://github.com/dchest/tweetnacl-js), but is quite a lot faster. The size impact is about half of tweetnacl-js only for the signing part.

The code is mostly written in raw WAT (Webassembly text format) and bundled to JS-friendly Wasm with [watever](https://github.com/mitschabaude/watever), the WAT bundler written also by me.

```sh
npm i watsign
```

## Usage

```js
import {newKeyPair, sign, verify} from 'watsign';

let {publicKey, secretKey} = await newKeyPair();

// message must be Uint8Array
let message = new TextEncoder().encode('Something I want to sign');

let signature = await sign(message, secretKey);

let ok = await verify(message, signature, publicKey);

console.log('everything ok?', ok);
```

## API

The API is basically a streamlined version of [nacl.sign from tweetnacl-js](https://github.com/dchest/tweetnacl-js#signatures). The only differences are:

- All exported functions are **async** (this is dictated by WebAssembly, and also means we can use native browser crypto for SHA-512).
- We only support detached signatures, so our `sign` is `nacl.sign.detached`
- There us just a normal named export for each function, no `nacl` object with nested sub-objects
- There is only the "high-level" API, not the redundant "low-level" API (`crypto_sign` etc.) and no constants (`nacl.sign.signatureLength` etc.)

Like in tweetnacl-js, all functions operate on `Uint8Array`s.

The following is the full list of exported functions and their tweetnacl-js equivalents:

- **`sign(message: Uint8Array, secretKey: Uint8Array): Uint8Array`**  
  Sign a message with your secret key. Returns the signature. Async version of `nacl.sign.detached`.

- **`verify(message: Uint8Array, signature: Uint8Array, publicKey: Uint8Array): boolean`**  
  Verifies that the signature is valid, returns true if and only if it is. Async version of `nacl.sign.detached.verify`.

- **`newKeyPair(): {secretKey: Uint8Array, publicKey: Uint8Array}`**  
  Creates a new random key pair. Async version of `nacl.sign.keyPair`.

- **`keyPairFromSeed(seed: Uint8Array): {secretKey: Uint8Array, publicKey: Uint8Array}`**  
  Deterministically creates a key pair from a 32-byte seed. Async version of `nacl.sign.keyPair.fromSeed`.

- **`keyPairFromSecretKey(secretKey: Uint8Array): {secretKey: Uint8Array, publicKey: Uint8Array}`**  
  Re-creates the full key pair from the 64-byte secret key (which, in fact, has the public key stored in its last 32 bytes). Async version of `nacl.sign.keyPair.fromSecretKey`.

## Performance

Performance compared to `tweetnacl.js` on my laptop in Chromium 92 (via puppeteer). We are 3-5x faster in the warmed-up regime and 5-50x faster on cold start after page load.

- **Our version**

```sh
First run after page load (varies between runs!):
sign (short msg):   3.40 ms
verify (short msg): 2.09 ms
sign (long msg):    1.71 ms
verify (long msg):  2.06 ms

Average of 50x after warm-up of 50x:
sign (short msg):   1.12 ± 0.14 ms
verify (short msg): 1.57 ± 0.23 ms
sign (long msg):    1.48 ± 0.13 ms
verify (long msg):  1.77 ± 0.13 ms
```

- **tweetnacl.js**

```sh
First run after page load (varies between runs!):
sign (short msg):   29.58 ms
verify (short msg): 15.70 ms
sign (long msg):    91.31 ms
verify (long msg):  22.83 ms

Average of 50x after warm-up of 50x:
sign (short msg):   4.13 ± 0.37 ms
verify (short msg): 8.25 ± 0.42 ms
sign (long msg):    8.65 ± 0.42 ms
verify (long msg):  10.87 ± 0.48 ms
```

## Testing

```sh
# before you do anything else
yarn

# build wasm
npx watever ./src/wat/sign.wat

# test and watch for changes (TODO watching currently doesn't work)
npx chrodemon test/test-nacl-modified.js

# test and compare with tweetnacl.js
node test/test.js
```
