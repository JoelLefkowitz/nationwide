import { beforeChar, fromPounds, roundAdd, sortFields } from './utils';

import moment from 'moment';

export class Entry {
  date: Date;
  type: string;
  account: string;
  change: number;
  balance: number;

  constructor(row: any) {
    const lines = row.childNodes
      .filter((i: any) => i.rawTagName == 'td')
      .map((i: any) => i.innerText.trim());

    this.date = moment(beforeChar(lines[0], '\n'), 'DD MMM yyyy').toDate();

    this.type = lines[1];
    this.account = lines[2];

    this.change = lines[3] ? -fromPounds(lines[3]) : fromPounds(lines[4]);
    this.balance = fromPounds(lines[5]);
  }

  static collate(entries: Entry[]): Record<string, number> {
    const accounts: Record<string, number> = {};

    for (const entry of entries) {
      if (Object.keys(accounts).includes(entry.account)) {
        accounts[entry.account] = roundAdd(
          accounts[entry.account],
          entry.change
        );
      } else {
        accounts[entry.account] = entry.change;
      }
    }

    return sortFields(accounts);
  }
}
