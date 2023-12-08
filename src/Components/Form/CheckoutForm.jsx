import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useState } from 'react';
import './CheckoutForm.css'
import { AuthContext } from '../../Provider/AuthProvider';

const CheckoutForm = ({ closeModal, bookingInfo }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const {user} = useContext(AuthContext);
    const [clientSecret, setClientSecret] = useState('');

    const handleSubmit = async event => {
        event.preventDefault();

        if (!stripe || !elements) {


            return
        }

        const card = elements.getElement(CardElement);
        if (card == null) {

            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setCardError(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }

        // Confirm card payment here

       await stripe
            .confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'Unknown',
                        email: user?.email || 'anynomous'
                    },
                },
            })
            .then(function (result) {
                // Handle result.error or result.paymentIntent
            });

    }



    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            {/* error and success message show here */}

            {cardError && <p className='text-center text-red-500 font-semibold'>{cardError}</p>}

            <div className='flex mt-2 justify-around'>
                <button
                    disabled={!stripe}
                    type='submit'
                    className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                    onClick={closeModal}
                >
                    Cancel
                </button>
                <button
                    type='button'
                    className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
                >
                    Pay {bookingInfo.price}$
                </button>
            </div>

        </form>
    );
};

export default CheckoutForm;