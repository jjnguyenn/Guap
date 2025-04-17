'use client';

import { useEffect, useState } from 'react';

interface VirtualCard {
  id: number;
  card_number: string;
  expiry_date: string;
  cvv: string;
  balance: number;
  name: string;  
  email: string; 
}

export default function CardsPage() {
  const [cards, setCards] = useState<VirtualCard[]>([]);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [selectedCard, setSelectedCard] = useState<VirtualCard | null>(null);

  useEffect(() => {
    // Fetch existing cards from the API
    const fetchCards = async () => {
      const response = await fetch('/api/cards');
      const data = await response.json();
      setCards(data);
    };
    
    fetchCards();
  }, []);



  
  const handlePayment = async () => {
    if (!selectedCard || paymentAmount <= 0) return;

    const response = await fetch('/api/cards', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        card_id: selectedCard.id,
        amount: paymentAmount,
      }),
    });

    if (response.ok) {
      const updatedCard = await response.json();
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === updatedCard.id ? updatedCard : card
        )
      );
      alert('Payment successful!');
    } else {
      alert('Payment failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Virtual Cards</h1>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Existing Cards</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <li key={card.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="relative w-full h-48 max-w-sm rounded-xl bg-gradient-to-r from-blue-600 to-indigo-800 p-4 text-white">
                {/* Card Number */}
                <div className="text-2xl font-bold tracking-wider">{card.card_number}</div>

                <div className="text-sm mt-2">{card.name}: {card.email}</div>
                <div className="absolute bottom-4 left-4 text-sm">{card.expiry_date}</div>

                <div className="absolute top-4 right-4 text-xs">
                  <span className="text-lg font-semibold">VISA</span>
                </div>

                <div className="absolute bottom-4 right-4 text-xl font-semibold">${card.balance.toFixed(2)}</div>
              </div>
        
              <button
                onClick={() => setSelectedCard(card)}
                className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
              >
                Select
              </button>
           

            </li>
          ))}
        </ul>
      </div>

      {selectedCard && (
        <div className="mt-12 bg-white p-8 rounded-lg shadow-lg w-full sm:w-96 mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Selected Card: {selectedCard.card_number}</h2>
          <div className="space-y-4">
            <input
              type="number"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(Number(e.target.value))}
              placeholder="Amount to pay"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handlePayment}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
            >
              Make Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
