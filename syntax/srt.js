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
 * Create an extension for `micromark` to enable srt syntax.
 *
 * @returns {Extension}
 *   Extension for `micromark` that can be passed in `extensions`, to
 *   enable srt syntax.
 */
export function srt() {
    return {
        flow: {
            [48]: srtText(),
            [49]: srtText(),
            [50]: srtText(),
            [51]: srtText(),
            [52]: srtText(),
            [53]: srtText(),
            [54]: srtText(),
            [55]: srtText(),
            [56]: srtText(),
            [57]: srtText(),
        },
    }
}

export function srtText() {

    return {
        tokenize: tokenizeSrtText,
    }

    /**
     * tokenize srt
     * 
     * @this {TokenizeContext}
     * @type {Tokenizer}
     */
    function tokenizeSrtText(effects, ok, nok) {

        const self = this

        let sizeTime = 0
        let sizeValue = 0

        return start

        function start(code) {
            effects.enter('srt')
            effects.enter('srtLine')
            return line(code)
        }


        function line(code) {
            if (-4 === code) {
                effects.exit('srtLine')
                effects.enter('srtTime')
                return time(code)
            }
            if (32 === code) {
                effects.enter('srtIngore')
                effects.consume(code)
                effects.exit('srtIngore')
                return line
            }
            if (null === code || code < 47 || code > 58) {
                return nok(code)
            }
            effects.enter('srtLineNumber')
            effects.consume(code)
            effects.exit('srtLineNumber')
            return line
        }

        function time(code) {
            if (-4 === code && !sizeTime) {
                sizeTime++
                effects.enter('srtIngore')
                effects.consume(code)
                effects.exit('srtIngore')
                return time
            }
            if (-4 === code) {
                effects.exit('srtTime')
                return text(code)
            }
            if (32 === code) {
                sizeTime++
                effects.enter('srtIngore')
                effects.consume(code)
                effects.exit('srtIngore')
                return time
            }
            if (null === code || (1 === sizeTime && -4 === code)) {
                return nok(code)
            }
            if (!(code === 44 || code === 45 || (code > 47 && code < 59) || code === 62)) {
                return nok(code)
            }
            sizeTime++
            effects.enter('srtTimeProps')
            effects.consume(code)
            effects.exit('srtTimeProps')
            return time
        }

        function text(code) {
            if (-4 === code && !sizeValue) {
                sizeValue++
                effects.enter('srtIngore')
                effects.consume(code)
                effects.exit('srtIngore')
                return text
            }
            if (null === code || -4 === code) {
                effects.exit('srt')
                return ok(code)
            }
            sizeValue++
            effects.enter('srtText')
            effects.consume(code)
            effects.exit('srtText')
            return text
        }
    }

}