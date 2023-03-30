import * as React from "react";
import { loadStripe } from "@stripe/stripe-js";

type Props = {};

export default function PricingPage({}: Props) {
  const stripe = await loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");
  // Paste the stripe-pricing-table snippet in your React component
  return (
    <div>upgrade</div>
    // <stripe-pricing-table
    //   pricing-table-id="{{PRICING_TABLE_ID}}"
    //   publishable-key="pk_test_uTdFeAdZSfl8lrXTYOOBcIsP006D3lfpv7"
    // >
    // </stripe-pricing-table>
  );
}

/**
 * 
 * <stripe-pricing-table pricing-table-id="prctbl_1MbkHxGjTI7kgs1jTGgUftLJ"
publishable-key="pk_test_uTdFeAdZSfl8lrXTYOOBcIsP006D3lfpv7">
</stripe-pricing-table>
 * 
 */
