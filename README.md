# Nationwide

A Nationwide transactions table parser.

![Review](https://img.shields.io/github/actions/workflow/status/JoelLefkowitz/nationwide/review.yml)
![Version](https://img.shields.io/npm/v/nationwide)
![Downloads](https://img.shields.io/npm/dw/nationwide)
![Size](https://img.shields.io/bundlephobia/min/nationwide)
![Quality](https://img.shields.io/codacy/grade/8fb4d0f0694748c188e083f00ae4ff9f)
![Coverage](https://img.shields.io/codacy/coverage/8fb4d0f0694748c188e083f00ae4ff9f)

## Installing

```bash
npm install nationwide
```

## Documentation

Documentation and more detailed examples are hosted on [Github Pages](https://joellefkowitz.github.io/nationwide).

## Usage

Copy the Nationwide statement table from the browser:

`nationwide.html`

```html
<table>
  <tbody>
    <tr>
      <td>
        01 May 2023
        <div style="display: none">- 1</div>
      </td>
      <td>Visa purchase</td>
      <td>UBER *TRIP HELP.UBER.COM GB</td>
      <td class="currency">£5.00</td>
      <td class="currency"></td>
      <td class="amountCell currency">£55.00</td>
    </tr>
    <tr>
      <td>
        02 May 2023
        <div style="display: none">- 2</div>
      </td>
      <td>Visa purchase</td>
      <td>UBER *TRIP HELP.UBER.COM GB</td>
      <td class="currency">£5.00</td>
      <td class="currency"></td>
      <td class="amountCell currency">£50.00</td>
    </tr>
    <tr>
      <td>
        03 May 2023
        <div style="display: none">- 3</div>
      </td>
      <td>Visa purchase</td>
      <td>UBER *TRIP HELP.UBER.COM FR</td>
      <td class="currency">£20.00</td>
      <td class="currency"></td>
      <td class="amountCell currency">£30.00</td>
    </tr>
  </tbody>
</table>
```

Parse the table:

```ts
import fs from "fs";
import path from "path";
import { Transaction } from "./Transaction";

const transactions = Transaction.table(fs.readFileSync(path.join(__dirname, "nationwide.html"), "utf8"));
```

```json
[
  {
    "date": "2023-01-01",
    "type": "Visa purchase",
    "account": "UBER *TRIP HELP.UBER.COM GB",
    "change": -5,
    "balance": 55
  },
  {
    "date": "2023-01-02",
    "type": "Visa purchase",
    "account": "UBER *TRIP HELP.UBER.COM GB",
    "change": -5,
    "balance": 50
  },
  {
    "date": "2023-01-03",
    "type": "Visa purchase",
    "account": "UBER *TRIP HELP.UBER.COM FR",
    "change": -20,
    "balance": 30
  }
]
```

Collate the transactions:

```ts
Transaction.collate(transactions);
```

```json
{
  "UBER *TRIP HELP.UBER.COM FR": -20,
  "UBER *TRIP HELP.UBER.COM GB": -10
}
```

## Tooling

### Dependencies

To install dependencies:

```bash
yarn install
```

### Tests

To run tests:

```bash
yarn test
```

### Documentation

To generate the documentation locally:

```bash
yarn docs
```

### Linters

To run linters:

```bash
yarn lint
```

### Formatters

To run formatters:

```bash
yarn format
```

## Contributing

Please read this repository's [Code of Conduct](CODE_OF_CONDUCT.md) which outlines our collaboration standards and the [Changelog](CHANGELOG.md) for details on breaking changes that have been made.

This repository adheres to semantic versioning standards. For more information on semantic versioning visit [SemVer](https://semver.org).

Bump2version is used to version and tag changes. For example:

```bash
bump2version patch
```

### Contributors

- [Joel Lefkowitz](https://github.com/joellefkowitz) - Initial work

## Remarks

Lots of love to the open source community!

<div align='center'>
    <img width=200 height=200 src='https://media.giphy.com/media/osAcIGTSyeovPq6Xph/giphy.gif' alt='Be kind to your mind' />
    <img width=200 height=200 src='https://media.giphy.com/media/KEAAbQ5clGWJwuJuZB/giphy.gif' alt='Love each other' />
    <img width=200 height=200 src='https://media.giphy.com/media/WRWykrFkxJA6JJuTvc/giphy.gif' alt="It's ok to have a bad day" />
</div>
