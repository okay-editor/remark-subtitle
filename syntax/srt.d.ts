
export { srt } from './srt.js'

declare module 'remark-srt' {
  interface TokenTypeMap {
    srt: 'srt',
    srtProps: 'srtProps',
    srtProperites: 'srtProperites',
    srtIgnore: 'srtIgnore',
    srtValue: 'srtValue'
  }

}