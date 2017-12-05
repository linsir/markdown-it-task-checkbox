# markdown-it-task-checkbox

A [markdown-it](https://www.npmjs.com/package/markdown-it) plugin to create GitHub-style [task lists](https://github.com/blog/1825-task-lists-in-all-markdown-documents)

Modified from <https://github.com/mcecot/markdown-it-checkbox> and <https://github.com/revin/markdown-it-task-lists>


## Usage

## Install

node.js:

```bash
npm install markdown-it-task-checkbox --save
```

## Use

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

_Differences in browser._ If you load script directly into the page, without
package system, module will add itself globally as `window.markdownitCheckbox`.

## Options


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
* **Default:** `task-list`

classname of ul wrapper.

## liClass

* **Type:** `String`
* **Default:** `task-list-item`

classname of li wrapper.

## THANKS

<https://github.com/mcecot/markdown-it-checkbox> and <https://github.com/revin/markdown-it-task-lists>

## License

MIT License © 2016 Linsir
