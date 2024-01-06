
export { lrc } from './lrc.js'

declare module 'remark-lrc' {
  interface TokenTypeMap {
    lrc: 'lrc',
    lrcProps: 'lrcProps',
    lrcProperites: 'lrcProperites',
    lrcIgnore: 'lrcIgnore',
    lrcValue: 'lrcValue'
  }

}