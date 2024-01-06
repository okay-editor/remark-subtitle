
export { webvtt } from './webvtt.js'

declare module 'remark-webvtt' {
  interface TokenTypeMap {
    webvtt: 'webvtt',
    webvttProps: 'webvttProps',
    webvttProperites: 'webvttProperites',
    webvttIgnore: 'webvttIgnore',
    webvttValue: 'webvttValue'
  }

}