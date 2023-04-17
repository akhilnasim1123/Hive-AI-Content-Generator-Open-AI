import React from 'react'
import Layout from '../../components/Layout'

const PaymentPage = () => {
  return (
        <Layout>
            
        <div className='mx-5 mt-5'>
          <script src="https://www.paypal.com/sdk/js?client-id=ATnhltsONXuKbLz3LpI69PSX78UI5JguElvPXJHzKO5pDaRB7bLBqv-u4D58KMx1w05eH4Bh7wI_Iv7U&currency=USD"></script>
          <div id="paypal-button-container"></div>
        </div>
        </Layout>
  )
}

export default PaymentPage