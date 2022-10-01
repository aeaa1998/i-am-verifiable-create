import { formatAmount } from "@metaplex-foundation/js";

// Value must be amount
export const amountToNumber = (value) => {
    const formatted = formatAmount(value)
    return Number.parseFloat(formatted.replace(`${value.currency.symbol} `, ''));
  };
  