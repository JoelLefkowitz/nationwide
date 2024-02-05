import { Transaction } from "./Transaction";

describe("Transaction.parse", () => {
  it("parses transaction rows", () => {
    expect(
      Transaction.table(`
        <table>
            <tbody>
                <tr>
                    <td>
                        01 Jan 2023
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
                        02 Jan 2023
                        <div style="display: none">- 2</div>
                    </td>
                    <td>Visa purchase</td>
                    <td>UBER *TRIP HELP.UBER.COM GB</td>
                    <td class="currency">£5.00</td>
                    <td class="currency"></td>
                    <td class="amountCell currency">£50.00</td>
                </tr>
            </tbody>
        </table>
    `),
    ).toEqual([
      {
        date: "2023-01-01",
        type: "Visa purchase",
        account: "UBER *TRIP HELP.UBER.COM GB",
        change: -5,
        balance: 55,
      },
      {
        date: "2023-01-02",
        type: "Visa purchase",
        account: "UBER *TRIP HELP.UBER.COM GB",
        change: -5,
        balance: 50,
      },
    ]);
  });

  it("validates all transaction columns are present", () => {
    expect(() =>
      Transaction.table(`
          <table>
              <tbody>
                <tr>
                  <td>UBER *TRIP HELP.UBER.COM GB</td>
                </tr>
              </tbody>
          </table>
        `),
    ).toThrow();
  });
});

describe("Transaction.collate", () => {
  it("collates rows", () => {
    expect(
      Transaction.collate([
        {
          date: "2023-01-01",
          type: "Visa purchase",
          account: "UBER *TRIP HELP.UBER.COM GB",
          change: -5,
          balance: 55,
        },
        {
          date: "2023-01-02",
          type: "Visa purchase",
          account: "UBER *TRIP HELP.UBER.COM GB",
          change: -5,
          balance: 50,
        },
        {
          date: "2023-01-03",
          type: "Visa purchase",
          account: "UBER *TRIP HELP.UBER.COM FR",
          change: -20,
          balance: 30,
        },
      ]),
    ).toEqual({
      "UBER *TRIP HELP.UBER.COM FR": -20,
      "UBER *TRIP HELP.UBER.COM GB": -10,
    });
  });
});
