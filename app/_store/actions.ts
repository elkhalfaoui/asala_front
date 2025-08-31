import { OrderInfo } from "./reducer";

export const add_order = (order_info: OrderInfo) =>
  ({ type: "ADD_ORDER", payload: order_info } as const);

export const remove_order = ({
  product_id,
  option_id,
}: {
  product_id: string;
  option_id: number;
}) => ({ type: "REMOVE_ORDER", payload: { product_id, option_id } } as const);

export const incrementByAmount = (amount: number) =>
  ({ type: "INCREMENT_BY_AMOUNT", payload: amount } as const);
