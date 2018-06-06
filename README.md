# React Virtualized Table
[Demo here!](http://matteoterrinoni.it/react-virtualized-table-demo/ "Demo here!")
---
[Stackblitz example here](https://stackblitz.com/edit/react-virtualized-table "Stackblitz example here")
---
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Greenkeeper badge](https://badges.greenkeeper.io/matteoterrinoni/react-virtualized-table.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/matteoterrinoni/react-virtualized-table.svg?branch=master)](https://travis-ci.org/matteoterrinoni/react-virtualized-table)
[![Coverage Status](https://coveralls.io/repos/github/matteoterrinoni/react-virtualized-table/badge.svg?branch=master)](https://coveralls.io/github/matteoterrinoni/react-virtualized-table?branch=master)
[![Dev Dependencies](https://david-dm.org/matteoterrinoni/react-virtualized-table/dev-status.svg)](https://david-dm.org/alexjoverm/typescript-library-starter?type=dev)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg)](https://www.paypal.me/matteoterrinoni)

A simple fully working table using **[react-virtualized](https://github.com/bvaughn/react-virtualized)**.

### Usage

```bash
npm install
```

```javascript
import {
	FilteredVTable,
	GivenVTable
} from 'react-virtualized-table'

import * as faker from 'faker'

export const initFakeItems = (n = 1000) => {
  let list = []
  for (let i = 0; i < n; i++) {
    list.push({
      name: faker.name.findName(),
      email: faker.internet.email(),
      age: faker.random.number()
    })
  }
  return list
}

const columns = GivenVTable.columns()
.addSortableColumnFor('name')
.addColumnFor('age')
.addSortableColumnFor('email')
.result

<FilteredVTable
items={initFakeItems()}
columns={columns}/>

```


