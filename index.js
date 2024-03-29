import { lrc } from './syntax/lrc.js'
import { srt } from './syntax/srt.js'
import { webvtt } from './syntax/webvtt.js'
import { subtitleFromMarkdown, subtitleToMarkdown } from './lib/util.js'

/**
 * Create an extension to use in `unified`.
 */
export default function remarkSubtitle() {

    // @ts-expect-error: TS is wrong about `this`.
    const self = /** @type {Processor} */ (this)
    // const settings = options
    const data = self.data()

    const micromarkExtensions =
        data.micromarkExtensions || (data.micromarkExtensions = [])
    const fromMarkdownExtensions =
        data.fromMarkdownExtensions || (data.fromMarkdownExtensions = [])
    const toMarkdownExtensions =
        data.toMarkdownExtensions || (data.toMarkdownExtensions = [])

    micromarkExtensions.push(...[lrc(), srt(), webvtt()])
    fromMarkdownExtensions.push(subtitleFromMarkdown())
    toMarkdownExtensions.push(subtitleToMarkdown())

}