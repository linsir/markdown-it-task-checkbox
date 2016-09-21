# markdown-it-task-lists

A [markdown-it](https://www.npmjs.com/package/markdown-it) plugin to create GitHub-style [task lists](https://github.com/blog/1825-task-lists-in-all-markdown-documents)

Modify from <https://github.com/mcecot/markdown-it-checkbox> and <https://github.com/revin/markdown-it-task-lists>

## What it does

- Builds [task/todo lists](https://github.com/blog/1825-task-lists-in-all-markdown-documents) out of markdown lists with items starting with `[ ]` or `[x]`.
- Nothing else

## Usage

## Install

node.js, browser:

```bash
npm install markdown-it-checkbox --save
bower install markdown-it-checkbox --save
```

## Use

```js
var md = require('markdown-it')()
            .use(require('markdown-it-checkbox'));

md.render('[ ] unchecked') // =>
// <p>
//  <input type="checkbox" id="checkbox0">
//  <label for="checkbox0">unchecked</label>
// </p>

md.render('[x] checked') // =>
// <p>
//  <input type="checkbox" id="checkbox0" checked="true">
//  <label for="checkbox0">checked</label>
// </p>
```

_Differences in browser._ If you load script directly into the page, without
package system, module will add itself globally as `window.markdownitCheckbox`.

## Options

```js
var md = require('markdown-it')()
            .use(require('markdown-it-checkbox'),{
              disabled: true,
              divWrap: false,
              divClass: 'checkbox',
              idPrefix: 'cbx_',
              ulClass: 'task-list',
              liClass: 'task-list-item'
            });

md.render('- [x] unchecked') // =>
// <ul class="task-list">
//  <li class="task-list-item">
//     <div classname="checkbox">
//       <input type="checkbox" id="cbx_0" checked="true" disabled="true">
//       <label for="cbx_0">unchecked</label>
//     </div>
//  </li>
// </ul>
```

## disabled

* **Type:** `Boolean`
* **Default:** `true`

if the value is true, the checkbox can not be selected.

## divWrap

* **Type:** `Boolean`
* **Default:** `false`

wrap div arround checkbox. this makes it possible to use it for example with [Awesome Bootstrap Checkbox](https://github.com/flatlogic/awesome-bootstrap-checkbox/).

## divClass

* **Type:** `String`
* **Default:** `checkbox`

classname of div wrapper. will only be used if `divWrap` is enanbled.

## idPrefix

* **Type:** `String`
* **Default:** `cbx_`

the id of the checkboxs input contains the prefix and an incremental number starting with `0`. i.e. `cbx_1` for the 2nd checkbox.

## ulClass

* **Type:** `String`
* **Default:** `checkbox`

classname of ul wrapper.

## liClass

* **Type:** `String`
* **Default:** `checkbox`

classname of li wrapper.

## THANKS

<https://github.com/mcecot/markdown-it-checkbox> and <https://github.com/revin/markdown-it-task-lists>

## License

MIT License © 2016 Linsir