import 'fs'
import * as jsipfs from 'ipfs'
export default function main() {
  for (let i = 0; i < 40; i++) {
    console.log(jsipfs.add(`../../NFTMetadata/${i / 8}.${i % 5}.json`))
  }
}
