# @imarkjs/remark-subtitle

## Introduction

an extension for `unified` to enable subtitle syntax, supports `LRC`, `SRT`, `WebVTT` format.

1. LRC

```LRC

[time, hh:mm:ss]this is a subtitle.
[time, hh:mm:ss]this is a subtitle.

```

2. SRT

```SRT

number, 1
start time --> end time, hh:mm:ss,ms --> hh:mm:ss,ms
this is a subtitle.

number, 2
start time --> end time, hh:mm:ss,ms --> hh:mm:ss,ms
this is a subtitle.

```

3. WebVTT

```WebVTT

number, 1
start time --> end time, hh:mm:ss.ms --> hh:mm:ss.ms
this is a subtitle.

number, 2
start time --> end time, hh:mm:ss.ms --> hh:mm:ss.ms
this is a subtitle.

```

## Using

### Install

```bash
npm i @imarkjs/remark-subtitle
```

### Example

```javascript
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import remarkSubtitle from '../index.js'

const str = `
# Example 1 of LRC

[00:00:00]这是第一行字幕。
[00:00:11]这是第二行字幕。

# Example 2 of LRC

[00:00:00]这是第一行字幕。[00:00:20]这是第二行字幕。

# Example of SRT

1
00:00:01,000-->00:00:04,000
这是第一行字幕。  

2
00:00:05,000-->00:00:09,000
这是第二行字幕。

#Example of WebVTT

1  
00:00:01.000 --> 00:00:04.000  
这是WebVTT的第一行字幕。  
  
2  
00:00:05.000 --> 00:00:09.000  
这是WebVTT的第二行字幕。
`

const parser = unified()
    .use(remarkParse)
    .use(remarkSubtitle)
const ast = parser.parse(str)
console.log('ast ->', JSON.stringify(ast))

const stringifier = unified()
    .use(remarkParse)
    .use(remarkSubtitle)
    .use(remarkStringify)
const md = stringifier.stringify(ast)
console.log('markdown ->', md)
```