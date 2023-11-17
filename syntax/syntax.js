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
 * Create an extension for `micromark` to enable subtitle syntax.
 *
 * @returns {Extension}
 *   Extension for `micromark` that can be passed in `extensions`, to
 *   enable subtitle syntax.
 */
export function subtitle() {
    return {
        text: { [94]: subtitleText() }
    }
}

export function subtitleText() {

    return {
        tokenize: tokenizeSubtitleText,
    }

    /**
     * tokenize code text
     * 
     * @this {TokenizeContext}
     * @type {Tokenizer}
     */
    function tokenizeSubtitleText(effects, ok, nok) {
        const self = this

        return start

        function start(code) {
            effects.enter('test')
            effects.consume(code)
            if (null == code) {
                effects.exit('test')
                return ok(code)
            }
            return nok(code)
        }
    }

}