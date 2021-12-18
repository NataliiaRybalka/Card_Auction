import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAlert } from 'react-alert';

import { changeBalance } from "../../redux/actions/user.actions";

export const PayPal = ({ sum }) => {
  const paypal = useRef();
  const dispatch = useDispatch();
  const errorAlert = useAlert();


  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: sum,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();

          dispatch(changeBalance({ sum: order.purchase_units[0].amount.value }));
        },
        onError: (err) => {
          errorAlert.show('Something went wrong.');
        }
      })
      .render(paypal.current);
  }, [dispatch, sum, errorAlert]);

  return (
    <div id={'paypal'}>
      <div ref={paypal} />
    </div>
  )
};