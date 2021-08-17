import { Entry } from './entry';
import dedent from 'dedent';
import { expect } from 'chai';
import moment from 'moment';
import { parse } from 'node-html-parser';

describe('parseRow', () => {
  it('parses a transaction table row to an Entry object.', () => {
    const root = parse(
      dedent(`
        <tr>
          <td>
            01 May 2021
            <div style= "display: none">- 10</div>
          </td>
        <td>Visa purchase</td>
        <td>UBER *TRIP HELP.UBER.COM GB</td>
        <td class="currency">£5.00</td>
        <td class="currency"></td>
        <td class="amountCell currency">£50.00</td>
        </tr>
      `)
    );
    const entry = new Entry(root.childNodes[0]);

    expect(entry.date).to.eql(moment('01 May 2021', 'DD MMM yyyy').toDate());
    expect(entry.type).to.equal('Visa purchase');
    expect(entry.account).to.equal('UBER *TRIP HELP.UBER.COM GB');
    expect(entry.change).to.equal(-5);
    expect(entry.balance).to.equal(50);
  });
});

describe('collate', () => {
  it('collates entries and evaluate the net change per account.', () => { 
    const root = parse(
      dedent(`
        <tbody>
          <tr>
            <td>
              01 May 2021
              <div style= "display: none">- 10</div>
            </td>
            <td>Visa purchase</td>
            <td>UBER *TRIP HELP.UBER.COM GB</td>
            <td class="currency">£5.00</td>
            <td class="currency"></td>
            <td class="amountCell currency">£50.00</td>
            </tr>
            <tr>
              <td>
                01 May 2021
                <div style= "display: none">- 11</div>
              </td>
            <td>Visa purchase</td>
            <td>UBER *TRIP HELP.UBER.COM GB</td>
            <td class="currency">£5.00</td>
            <td class="currency"></td>
            <td class="amountCell currency">£55.00</td>
          </tr>
        </tbody>
      `)
    );

    const entries = root.childNodes[0].childNodes
      .filter((i: any) => i.rawTagName == 'tr')
      .map((row: any) => new Entry(row));

    const collated = Entry.collate(entries);
    expect(collated['UBER *TRIP HELP.UBER.COM GB']).to.equal(-10);
  });
});
