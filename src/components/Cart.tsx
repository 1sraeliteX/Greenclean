'use client';

import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, isOpen, toggleCart, totalItems } = useCart();
  
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={toggleCart}
        />
        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <div className="w-screen max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
              <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Shopping cart</h2>
                  <div className="ml-3 h-7 flex items-center">
                    <button
                      type="button"
                      className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                      onClick={toggleCart}
                    >
                      <span className="sr-only">Close panel</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flow-root">
                    {items.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">Your cart is empty</p>
                    ) : (
                      <ul className="-my-6 divide-y divide-gray-200">
                        {items.map((item) => (
                          <li key={item.id} className="py-6 flex">
                            <div className="flex-1">
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>{item.name}</h3>
                                <p className="ml-4">₦{(item.price * item.quantity).toLocaleString()}</p>
                              </div>
                              <div className="mt-2 flex items-center space-x-4">
                                <div className="flex items-center border rounded-md">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                  >
                                    <Minus className="h-4 w-4" />
                                  </button>
                                  <span className="px-2">{item.quantity}</span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                  >
                                    <Plus className="h-4 w-4" />
                                  </button>
                                </div>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-red-600 hover:text-red-800 flex items-center"
                                >
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Remove
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              {items.length > 0 && (
                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>₦{totalPrice.toLocaleString()}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                  <div className="mt-6">
                    <a
                      href="#"
                      className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700"
                    >
                      Checkout
                    </a>
                  </div>
                  <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                    <p>
                      or{' '}
                      <button
                        type="button"
                        className="text-green-600 font-medium hover:text-green-500"
                        onClick={toggleCart}
                      >
                        Continue Shopping<span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
