import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import remarkSubtitle from '../index.js'
import remarkCode from '@imarkjs/remark-code'

const str = `
# h1

[00:00:00-00:00:10]这是第一行字幕。
[00:00:11-00:00:20]这是第二行字幕。

`

const processor1 = unified()
    .use(remarkParse)
    .use(remarkSubtitle)
    .use(remarkCode)
const ast = processor1.parse(str)
console.log('ast ->', JSON.stringify(ast))

const processor2 = unified()
    .use(remarkParse)
    .use(remarkSubtitle)
    .use(remarkCode)
    .use(remarkStringify)
const md = processor2.stringify(ast)
console.log('markdown ->', md)