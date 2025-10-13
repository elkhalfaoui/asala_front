export interface OrderInfo {
  product_id: string;
  option_id: number;
  title: string;
  image: string;
  rating: number;
  dimension: string;
  price: number;
  quantity: number;
  total: number;
  cadreType: string;
}

export interface CounterState {
  count: number;
  ordersInfo: OrderInfo[];
}

type CounterAction =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "INCREMENT_BY_AMOUNT"; payload: number }
  | { type: "ADD_ORDER"; payload: OrderInfo }
  | {
      type: "REMOVE_ORDER";
      payload: { product_id: string; option_id: number };
    };

const initialState: CounterState = {
  count: 0,
  ordersInfo: [],
};

export const counterReducer = (
  state = initialState,
  action: CounterAction
): CounterState => {
  switch (action.type) {
    case "ADD_ORDER": {
      const existingIndex = state.ordersInfo.findIndex(
        (order) =>
          order.product_id === action.payload.product_id &&
          order.option_id === action.payload.option_id
      );

      if (existingIndex !== -1) {
        // Item already in orders → increase quantity
        const updatedOrders = [...state.ordersInfo];
        const existingOrder = updatedOrders[existingIndex];

        const newQuantity = existingOrder.quantity + action.payload.quantity;
        updatedOrders[existingIndex] = {
          ...existingOrder,
          quantity: newQuantity,
          total: newQuantity * existingOrder.price,
        };

        return {
          ...state,
          ordersInfo: updatedOrders,
        };
      }

      // Item not in orders → add new
      return {
        ...state,
        ordersInfo: [...state.ordersInfo, action.payload],
      };
    }

    case "REMOVE_ORDER":
      return {
        ...state,
        ordersInfo: state.ordersInfo.filter(
          (order) =>
            !(order.product_id === action.payload.product_id &&
            order.option_id === action.payload.option_id)
        ),
      };
    // case "INCREMENT":
    //   return { ...state, count: state.count + 1 };
    // case "DECREMENT":
    //   return { ...state, count: state.count - 1 };
    // case "INCREMENT_BY_AMOUNT":
    //   return { ...state, count: state.count + action.payload };
    default:
      return state;
  }
};
