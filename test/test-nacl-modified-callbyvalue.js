import {
  naclSignVerify,
  naclSign,
  naclSignKeyPairFromSeed,
} from '../src/nacl-sign-callbyvalue.js';
import printPerformancePure from './printPerformancePure.js';

async function main() {
  printPerformancePure(
    'nacl-modified-callbyvalue',
    naclSign,
    naclSignVerify,
    naclSignKeyPairFromSeed
  );
}
main();