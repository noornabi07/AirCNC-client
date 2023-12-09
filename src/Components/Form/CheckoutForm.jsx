import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import './CheckoutForm.css'
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { updateStatus } from '../../API/booking';
import { ImSpinner9 } from "react-icons/im";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ closeModal, bookingInfo }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [axiosSecure] = useAxiosSecure();
    const [cardError, setCardError] = useState('');
    const { user } = useContext(AuthContext);
    const [clientSecret, setClientSecret] = useState('');
    const navigate = useNavigate();
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        // Generate client secret and save in state
        if (bookingInfo?.price) {
            axiosSecure.post('/create-payment-intent', { price: bookingInfo?.price }).then(res => {
                console.log('payment intent-response', res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
        }
    }, [bookingInfo, axiosSecure])

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
            setCardError('')
            console.log('[PaymentMethod]', paymentMethod);
        }

        setProcessing(true)

        // Confirm card payment here
        const { paymentIntent, error: confirmError } = await stripe
            .confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'Unknown',
                        email: user?.email || 'anynomous'
                    },
                },
            })

        if (confirmError) {
            console.log('[error]', confirmError);
            setCardError(confirmError.message);
        } else {
            console.log('[paymentIntent]', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                // save payment info in DB

                const paymentInfo = {
                    ...bookingInfo,
                    transectionId: paymentIntent.id,
                    data: new Date()
                }

                axiosSecure.post('/bookings', paymentInfo).then(res => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        updateStatus(paymentInfo.roomId, true).then(data => {
                            console.log(data);
                            Swal.fire({
                                position: "top-center",
                                icon: "success",
                                title: 'Payment Successfully',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            closeModal();
                            setProcessing(false)
                            navigate('/dashboard/my-bookings')

                        }).catch(err => {
                            console.log(err.message);
                            setProcessing(false)
                        });
                    }
                })

            }
        }

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
                    disabled={!stripe || processing || !clientSecret}
                    type='submit'
                    className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                    onClick={closeModal}
                >
                    Cancel
                </button>
                <button
                    type='submit'
                    className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
                >
                    {processing ? <ImSpinner9 className='m-auto animate-spin' size={24}></ImSpinner9>: `Pay ${bookingInfo.price}$`}
                </button>
            </div>

        </form>
    );
};

export default CheckoutForm;