
/**
 * @typedef {import('mdast-util-from-markdown').CompileContext} CompileContext
 * @typedef {import('mdast-util-from-markdown').Extension} FromMarkdownExtension
 * @typedef {import('mdast-util-from-markdown').Handle} FromMarkdownHandle
 * @typedef {import('mdast-util-to-markdown').Options} ToMarkdownExtension
 * @typedef {import('mdast-util-to-markdown').Handle} ToMarkdownHandle
 * /

/**
 * 
 * Create an extension for `mdast-util-from-markdown`.
 *
 * @returns {FromMarkdownExtension}
 * Extension for `mdast-util-from-markdown`.
 */
export function subtitleFromMarkdown() {
    return {
        enter: {
            lrc: enterLrc,
            srt: enterSrt,
            webvtt: enterWebvtt,
        },
        exit: {
            lrc: exitLrc,
            lrcProps: exitLrcProps,
            lrcProperites: exitLrcProperites,
            lrcValue: exitLrcValue,

            srt: exitSrt,
            srtLine: exitSrtLine,
            srtTime: exitSrtTime,
            srtLineNumber: exitSrtLinenumber,
            srtTimeProps: existSrtTimeProps,
            srtText: existSrtText,

            webvtt: exitWebvtt,
            webvttLine: exitWebvttLine,
            webvttTime: exitWebvttTime,
            webvttLineNumber: exitWebvttLinenumber,
            webvttTimeProps: existWebvttTimeProps,
            webvttText: existWebvttText,


        }
    }

    /**
     * start
     * @this {CompileContext}
     * @type {FromMarkdownHandle}
     */
    function enterLrc(token) {
        this.enter({
            // @ts-ignore
            type: 'subtitle',
            lang: 'lrc',
            props: '',
            value: '',
        }, token)
        this.buffer()
    }

    /**
     * props
     * @this {CompileContext}
     * @type {FromMarkdownHandle}
     */
    function exitLrcProps(token) {
        const data = this.resume()
        const node = this.stack[this.stack.length - 1]
        // @ts-ignore
        node.props = data
        this.buffer()
    }

    /**
     * end
     * 
     * @this {CompileContext}
     * @type {FromMarkdownHandle}
     */
    function exitLrc(token) {
        const data = this.resume()
        const node = this.stack[this.stack.length - 1]
        this.exit(token)
        // const node = /** @type {Code} */ this.exit(token)
        /**@ts-ignore */
        node.value = data
    }

    /**
     * properite
     * 
     * @this {CompileContext}
     * @type {FromMarkdownHandle}
     */
    function exitLrcProperites(token) {
        this.config.enter.data.call(this, token)
        this.config.exit.data.call(this, token)
    }

    /**
    * value
    * 
    * @this {CompileContext}
    * @type {FromMarkdownHandle}
    */
    function exitLrcValue(token) {
        this.config.enter.data.call(this, token)
        this.config.exit.data.call(this, token)
    }

    /**
     * @this {CompileContext}
     * @type {FromMarkdownHandle}
     */
    function enterSrt(token) {
        this.enter({
            // @ts-ignore
            type: 'subtitle',
            lang: 'srt',
            line: '',
            props: '',
            value: '',
        }, token)
        this.buffer()
    }

    /**
     * @this {CompileContext}
     * @type {FromMarkdownHandle}
     */
    function exitSrt(token) {
        const data = this.resume()
        const node = this.stack[this.stack.length - 1]
        this.exit(token)
        // const node = /** @type {Code} */ this.exit(token)
        /**@ts-ignore */
        node.value = data
    }

    /**
     * props
     * @this {CompileContext}
     * @type {FromMarkdownHandle}
     */
    function exitSrtLine(token) {
        const data = this.resume()
        const node = this.stack[this.stack.length - 1]
        // @ts-ignore
        node.line = data
        this.buffer()
    }

    /**
     * props
     * @this {CompileContext}
     * @type {FromMarkdownHandle}
     */
    function exitSrtTime(token) {
        const data = this.resume()
        const node = this.stack[this.stack.length - 1]
        // @ts-ignore
        node.props = data
        this.buffer()
    }

    /** 
     * @this {CompileContext}
     * @type {FromMarkdownHandle}
     */
    function exitSrtLinenumber(token) {
        this.config.enter.data.call(this, token)
        this.config.exit.data.call(this, token)
    }

    /** 
     * @this {CompileContext}
     * @type {FromMarkdownHandle}
     */
    function existSrtTimeProps(token) {
        this.config.enter.data.call(this, token)
        this.config.exit.data.call(this, token)
    }

    /** 
     * @this {CompileContext}
     * @type {FromMarkdownHandle}
     */
    function existSrtText(token) {
        this.config.enter.data.call(this, token)
        this.config.exit.data.call(this, token)
    }

    /**
     * @this {CompileContext}
     * @type {FromMarkdownHandle}
     */
    function enterWebvtt(token) {
        this.enter({
            // @ts-ignore
            type: 'subtitle',
            lang: 'webvtt',
            line: '',
            props: '',
            value: '',
        }, token)
        this.buffer()
    }

    /**
     * @this {CompileContext}
     * @type {FromMarkdownHandle}
     */
    function exitWebvtt(token) {
        const data = this.resume()
        const node = this.stack[this.stack.length - 1]
        this.exit(token)
        // const node = /** @type {Code} */ this.exit(token)
        /**@ts-ignore */
        node.value = data
    }

    /**
     * props
     * @this {CompileContext}
     * @type {FromMarkdownHandle}
     */
    function exitWebvttLine(token) {
        const data = this.resume()
        const node = this.stack[this.stack.length - 1]
        // @ts-ignore
        node.line = data
        this.buffer()
    }

    /**
     * props
     * @this {CompileContext}
     * @type {FromMarkdownHandle}
     */
    function exitWebvttTime(token) {
        const data = this.resume()
        const node = this.stack[this.stack.length - 1]
        // @ts-ignore
        node.props = data
        this.buffer()
    }

    /** 
     * @this {CompileContext}
     * @type {FromMarkdownHandle}
     */
    function exitWebvttLinenumber(token) {
        this.config.enter.data.call(this, token)
        this.config.exit.data.call(this, token)
    }

    /** 
     * @this {CompileContext}
     * @type {FromMarkdownHandle}
     */
    function existWebvttTimeProps(token) {
        this.config.enter.data.call(this, token)
        this.config.exit.data.call(this, token)
    }

    /** 
     * @this {CompileContext}
     * @type {FromMarkdownHandle}
     */
    function existWebvttText(token) {
        this.config.enter.data.call(this, token)
        this.config.exit.data.call(this, token)
    }

}

/**
 * 
 * Create an extension for `mdast-util-to-markdown`.
 *
 * @returns {ToMarkdownExtension}
 * Extension for `mdast-util-to-markdown`.
 */
export function subtitleToMarkdown() {

    // @ts-ignore
    const self = { lrc, srt, webvtt }

    return {
        unsafe: [],
        // @ts-ignore
        handlers: { subtitle }
    }

    /**
     * 
     * @type {ToMarkdownHandle}
     */
    function subtitle(node, _, _context, safeOptions) {
        // @ts-ignore
        const func = self[node.lang]
        if (func) {
            return func(node, _, _context, safeOptions)
        }
        return lrc(node, _, _context, safeOptions)
    }

    /**
     * 
     * @type {ToMarkdownHandle}
     */
    function lrc(node, _, context, safeOptions) {
        return [
            '[',
            node?.props,
            ']',
            node.value
        ].join('')
    }

    /**
     * 
     * @type {ToMarkdownHandle}
     */
    function srt(node, _, context, safeOptions) {
        return [
            node?.line,
            node?.props,
            node?.value
        ].join('\n')
    }

    /**
     * 
     * @type {ToMarkdownHandle}
     */
    function webvtt(node, _, context, safeOptions) {
        return [
            node?.line,
            node?.props,
            node?.value
        ].join('\n')
    }
}