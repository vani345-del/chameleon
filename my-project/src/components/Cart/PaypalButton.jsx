import React from 'react'
import { PayPalButtons,PayPalScriptProvider } from '@paypal/react-paypal-js'

const PaypalButton = ({amount,onSuccess,onError}) => {
  return (
       <PayPalScriptProvider options={{"client-id":
        import.meta.env.VITE_PAYPAL_CLIEND_ID,
       }}>
        <PayPalButtons style={{layout:"vertical"}}
        createOrder={(data,actions)=>{
            return actions.order.create({
                purchase_units:[{amount:{value:parseFloat(amount).toFixed(2)}}]
            })
        }}
        onApprove={(data,actions)=>{
            return actions.order.capture().then(onSuccess)
        }}
        onError={onError}/>
       </PayPalScriptProvider>
  )
}

export default PaypalButton