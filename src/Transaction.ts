import { HTMLElement, Node, parse } from "node-html-parser";
import { groupBy, prop, sortBy, sum } from "ramda";
import { number, object, string, validate } from "superstruct";

import { DateTime } from "luxon";
import { pounds } from "./numbers";
import dedent from "dedent";

export class Transaction {
  date: string;

  type: string;
  account: string;

  change: number;
  balance: number;

  constructor(row: HTMLElement) {
    const columns = row.childNodes as (Node &
      Partial<Record<"rawTagName" | "innerText", string>>)[];

    const [date, type, account, sent, received, balance] = columns
      .filter(({ rawTagName }) => rawTagName === "td")
      .map(({ innerText }) =>
        innerText
          .split("\n")
          .filter((i) => i !== "")
          .join(" ")
          .trim(),
      );

    const iso = (date: string) =>
      DateTime.fromFormat(date, "dd MMM yyyy").toISODate();

    const [error, validated] = validate(
      {
        date: iso((date ?? "").slice(0, 11)),
        type,
        account,
        sent: sent ? pounds(sent) : 0,
        received: received ? pounds(received) : 0,
        balance: pounds(balance ?? ""),
      },
      object({
        date: string(),
        type: string(),
        account: string(),
        sent: number(),
        received: number(),
        balance: number(),
      }),
    );

    if (error) {
      throw error;
    }

    this.date = validated.date;

    this.type = validated.type;
    this.account = validated.account;

    this.change = validated.sent ? -validated.sent : validated.received;
    this.balance = validated.balance;
  }

  static table(str: string): Transaction[] {
    return parse(dedent(str))
      .querySelectorAll("table > tbody > tr")
      .map((i) => new Transaction(i));
  }

  static collate(transactions: Transaction[]): Record<string, number> {
    return Object.fromEntries(
      sortBy(
        ([_, v]) => v,
        Object.entries(groupBy(prop("account"), transactions)).map(([k, v]) => [
          k,
          sum((v ?? []).map(prop("change"))),
        ]),
      ),
    );
  }
}
