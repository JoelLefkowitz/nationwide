# Nationwide

A Nationwide transactions table parser.

## Status

| Source     | Shields                                                                |
| ---------- | ---------------------------------------------------------------------- |
| Project    | ![latest_release] ![license] ![line_count] ![language_count]           |
| Health     | ![documentation] ![review_action] ![codacy_quality] ![codacy_coverage] |
| Publishers | ![npm_version] ![npm_downloads]                                        |
| Repository | ![open_issues] ![closed_issues] ![open_pulls] ![closed_pulls]          |
| Activity   | ![contributors] ![monthly_commits] ![last_commit]                      |

## Installation

```bash
npm i nationwide
```

## Usage

Copy the Nationwide statement table  from the browser:

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

const transactions = Transaction.table(
  fs.readFileSync(path.resolve(__dirname, "nationwide.html"), "utf8")
);
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

## Tests

To run tests:

```bash
nps test
```

## Documentation

This repository's documentation is hosted on [Read the Docs](https://nationwide.readthedocs.io/en/latest).

To generate the documentation locally:

```bash
quickdocs
```

## Linters

To run linters:

```bash
nps lint
```

## Formatters

To run formatters:

```bash
nps format
```

## Continuous integration

This repository uses GitHub Actions to lint and test each commit. Each commit should be formatted and its corresponding documentation should be updated.

## Versioning

This repository adheres to semantic versioning standards. For more information on semantic versioning visit [semver](https://semver.org).

Bump2version is used to version and tag changes. For example:

```bash
bump2version patch
```

## Changelog

Please read this repository's [changelog](CHANGELOG.md) for details on changes that have been made.

## Contributing

Please read this repository's guidelines on [contributing](CONTRIBUTING.md) for details on the process for submitting pull requests. Moreover, our [code of conduct](CODE_OF_CONDUCT.md) declares our collaboration standards.

## Contributors

- [Joel Lefkowitz](https://github.com/joellefkowitz) - Initial work

## Remarks

Lots of love to the open source community!

<p align='center'>
    <img width=200 height=200 src='https://media.giphy.com/media/osAcIGTSyeovPq6Xph/giphy.gif' alt='Be kind to your mind' />
    <img width=200 height=200 src='https://media.giphy.com/media/KEAAbQ5clGWJwuJuZB/giphy.gif' alt='Love each other' />
    <img width=200 height=200 src='https://media.giphy.com/media/WRWykrFkxJA6JJuTvc/giphy.gif' alt="It's ok to have a bad day" />
</p>

[latest_release]: https://img.shields.io/github/v/tag/joellefkowitz/nationwide "Latest release"
[license]: https://img.shields.io/github/license/joellefkowitz/nationwide "License"
[line_count]: https://img.shields.io/tokei/lines/github/joellefkowitz/nationwide "Line count"
[language_count]: https://img.shields.io/github/languages/count/joellefkowitz/nationwide "Language count"
[documentation]: https://img.shields.io/readthedocs/nationwide "Documentation"
[review_action]: https://img.shields.io/github/actions/workflow/status/JoelLefkowitz/nationwide/review.yml "Review action"
[codacy_quality]: https://img.shields.io/codacy/grade/8fb4d0f0694748c188e083f00ae4ff9f "Codacy quality"
[codacy_coverage]: https://img.shields.io/codacy/coverage/8fb4d0f0694748c188e083f00ae4ff9f "Codacy coverage"
[npm_version]: https://img.shields.io/npm/v/nationwide "NPM Version"
[npm_downloads]: https://img.shields.io/npm/dw/nationwide "NPM Downloads"
[open_issues]: https://img.shields.io/github/issues/joellefkowitz/nationwide "Open issues"
[closed_issues]: https://img.shields.io/github/issues-closed/joellefkowitz/nationwide "Closed issues"
[open_pulls]: https://img.shields.io/github/issues-pr/joellefkowitz/nationwide "Open pull requests"
[closed_pulls]: https://img.shields.io/github/issues-pr-closed/joellefkowitz/nationwide "Closed pull requests"
[contributors]: https://img.shields.io/github/contributors/joellefkowitz/nationwide "Contributors"
[monthly_commits]: https://img.shields.io/github/commit-activity/m/joellefkowitz/nationwide "Monthly commits"
[last_commit]: https://img.shields.io/github/last-commit/joellefkowitz/nationwide "Last commit"
