import 'fs'
import * as IPFS from 'ipfs-core'
export default async function main() {
  const node = await IPFS.create()
  for (let i = 0; i < 40; i++) {
    console.log(IPFS.add(`../../NFTMetadata/${i / 8}.${i % 5}.json`))
  }
}
async function b() {
  const node = await IPFS.create()

}
export { b }
