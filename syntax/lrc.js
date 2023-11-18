/**
 * @typedef {import('micromark-util-types').Construct} Construct
 * @typedef {import('micromark-util-types').TokenizeContext} TokenizeContext
 * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
 * @typedef {import('micromark-util-types').Previous} Previous
 * @typedef {import('micromark-util-types').Resolver} Resolver
 * @typedef {import('micromark-util-types').State} State
 * @typedef {import('micromark-util-types').Token} Token
 * @typedef {import('micromark-util-types').Extension} Extension
 */

/**
 * Create an extension for `micromark` to enable lrc syntax.
 *
 * @returns {Extension}
 *   Extension for `micromark` that can be passed in `extensions`, to
 *   enable lrc syntax.
 */
export function lrc() {
    return {
        flow: { [91]: lrcText() }
    }
}

export function lrcText() {

    return {
        tokenize: tokenizeLrcText,
    }

    /**
     * tokenize lrc
     * 
     * @this {TokenizeContext}
     * @type {Tokenizer}
     */
    function tokenizeLrcText(effects, ok, nok) {
        const self = this

        let sizeLeft = 0
        let sizeRight = 0
        let sizeData = 0

        return start

        function start(code) {
            effects.enter('lrc')
            effects.enter('lrcProps')
            return left(code)
        }

        /** start with `[`, end witd `]`*/
        function left(code) {
            if (91 === code) {
                sizeLeft++
                effects.enter('lrcIgnore')
                effects.consume(code)
                effects.exit('lrcIgnore')
                return left
            }
            if (sizeLeft > 1) {
                return nok(code)
            }
            if (93 === code) {
                effects.exit('lrcProps')
                return right(code)
            }
            /** support character `0~9` `:` `-` `>` */
            if (!((code > 47 && code < 59) || 45 === code || 62 === code)) {
                return nok(code)
            }
            effects.enter('lrcProperites')
            effects.consume(code)
            effects.exit('lrcProperites')
            return left
        }

        /** start with `]`, end with `eof` or `\n` */
        function right(code) {
            if (93 === code) {
                sizeRight++
                effects.enter('lrcIgnore')
                effects.consume(code)
                effects.exit('lrcIgnore')
                return right
            }
            /** only `]` */
            if (sizeRight > 1) {
                return nok(code)
            }
            /** non-empty value */
            if (!sizeData && (null === code || -4 === code)) {
                return nok(code)
            }
            /** end with `eof `or `\n` or next `[` */
            if (null === code || -4 === code) {
                effects.exit('lrc')
                return ok(code)
            }
            sizeData++
            effects.enter('lrcValue')
            effects.consume(code)
            effects.exit('lrcValue')
            return right
        }
    }

}