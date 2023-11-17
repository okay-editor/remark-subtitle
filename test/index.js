import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import remarkSubtitle from '../index.js'

const str = `
`

const processor1 = unified()
    .use(remarkParse)
    .use(remarkSubtitle)
const ast = processor1.parse(str)
console.log('ast ->', ast)

const processor2 = unified()
    .use(remarkParse)
    .use(remarkSubtitle)
    .use(remarkStringify)
const md = processor2.stringify(ast)
console.log('markdown ->', md)