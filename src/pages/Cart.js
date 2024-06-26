import React, { useContext } from 'react';
import { BsCartX } from 'react-icons/bs';
import { calculateTotal, displayMoney } from '../helpers/utils';
import useDocTitle from '../hooks/useDocTitle';
import cartContext from '../contexts/cart/cartContext';
import CartItem from '../components/cart/CartItem';
import EmptyView from '../components/common/EmptyView';
import { useTheme } from '../contexts/themeContext'; // Import the useTheme hook

const Cart = () => {
    useDocTitle('Cart');
    // const { cartItems } = useContext(cartContext);
    const { cartItems } = useContext(cartContext);
    const cartQuantity = cartItems.length;
    const { theme } = useTheme(); // Access the theme context

    // Total original price
    const cartTotal = cartItems.map(item => item.originalPrice * item.quantity);
    const calculateCartTotal = calculateTotal(cartTotal);
    const displayCartTotal = displayMoney(calculateCartTotal);

    // Total discount
    const cartDiscount = cartItems.map(item => (item.originalPrice - item.finalPrice) * item.quantity);
    const calculateCartDiscount = calculateTotal(cartDiscount);
    const displayCartDiscount = displayMoney(calculateCartDiscount);

    // Final total amount
    const totalAmount = calculateCartTotal - calculateCartDiscount;
    const displayTotalAmount = displayMoney(totalAmount);

    return (
        <section id="cart" className={`section ${theme === 'light' ? 'light-theme' : 'dark-theme'}`}>
            <div className="container">
                {
                    cartQuantity === 0 ? (
                        <EmptyView
                            icon={<BsCartX />}
                            msg="Your Cart is Empty"
                            link="/all-products"
                            btnText="Start Shopping"
                        />
                    ) : (
                        <div className="wrapper cart_wrapper">
                            <div className={`cart_left_col ${theme === 'light' ? 'light-theme' : 'dark-theme'}`}>
                                {cartItems.map(item => <CartItem key={item.id} {...item} />)}
                            </div>
                            <div className="cart_right_col">
                                <div className="order_summary">
                                    <h3>
                                        Order Summary &nbsp;
                                        ( {cartQuantity} {cartQuantity > 1 ? 'items' : 'item'} )
                                    </h3>
                                    <div className="order_summary_details">
                                        <div className="price">
                                            <span>Original Price</span>
                                            <b>{displayCartTotal}</b>
                                        </div>
                                        <div className="discount">
                                            <span>Discount</span>
                                            <b>- {displayCartDiscount}</b>
                                        </div>
                                        <div className="delivery">
                                            <span>Delivery</span>
                                            <b>Free</b>
                                        </div>
                                        <div className="separator"></div>
                                        <div className="total_price">
                                            <b><small>Total Price</small></b>
                                            <b>{displayTotalAmount}</b>
                                        </div>
                                    </div>
                                    <button type="button" className="btn checkout_btn">Checkout</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </section>
    );
};

export default Cart;
