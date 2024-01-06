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
 * Create an extension for `micromark` to enable webvtt syntax.
 *
 * @returns {Extension}
 *   Extension for `micromark` that can be passed in `extensions`, to
 *   enable webvtt syntax.
 */
export function webvtt() {
    return {
        flow: {
            [48]: webvttText(),
            [49]: webvttText(),
            [50]: webvttText(),
            [51]: webvttText(),
            [52]: webvttText(),
            [53]: webvttText(),
            [54]: webvttText(),
            [55]: webvttText(),
            [56]: webvttText(),
            [57]: webvttText(),
        },
    }
}

export function webvttText() {

    return {
        tokenize: tokenizeSrtText,
    }

    /**
     * tokenize webvtt
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
            effects.enter('webvtt')
            effects.enter('webvttLine')
            return line(code)
        }


        function line(code) {
            if (-4 === code) {
                effects.exit('webvttLine')
                effects.enter('webvttTime')
                return time(code)
            }
            if (32 === code) {
                effects.enter('webvttIngore')
                effects.consume(code)
                effects.exit('webvttIngore')
                return line
            }
            if (null === code || code < 47 || code > 58) {
                return nok(code)
            }
            effects.enter('webvttLineNumber')
            effects.consume(code)
            effects.exit('webvttLineNumber')
            return line
        }

        function time(code) {
            if (-4 === code && !sizeTime) {
                sizeTime++
                effects.enter('webvttIngore')
                effects.consume(code)
                effects.exit('webvttIngore')
                return time
            }
            if (-4 === code) {
                effects.exit('webvttTime')
                return text(code)
            }
            if (32 === code) {
                sizeTime++
                effects.enter('webvttIngore')
                effects.consume(code)
                effects.exit('webvttIngore')
                return time
            }
            if (null === code || (1 === sizeTime && -4 === code)) {
                return nok(code)
            }
            if (!(code === 45 || code === 46 || (code > 47 && code < 59) || code === 62)) {
                return nok(code)
            }
            sizeTime++
            effects.enter('webvttTimeProps')
            effects.consume(code)
            effects.exit('webvttTimeProps')
            return time
        }

        function text(code) {
            if (-4 === code && !sizeValue) {
                sizeValue++
                effects.enter('webvttIngore')
                effects.consume(code)
                effects.exit('webvttIngore')
                return text
            }
            if (null === code || -4 === code) {
                effects.exit('webvtt')
                return ok(code)
            }
            sizeValue++
            effects.enter('webvttText')
            effects.consume(code)
            effects.exit('webvttText')
            return text
        }
    }

}