# Nationwide

A Nationwide transactions table parser.

# Example

```html
<tbody>
  <tr>
    <td>
      01 May 2021
      <div style="display: none">- 10</div>
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
      <div style="display: none">- 11</div>
    </td>
    <td>Visa purchase</td>
    <td>UBER *TRIP HELP.UBER.COM GB</td>
    <td class="currency">£5.00</td>
    <td class="currency"></td>
    <td class="amountCell currency">£55.00</td>
  </tr>
</tbody>
```

```json
{ "UBER *TRIP HELP.UBER.COM GB": -10 }
```
