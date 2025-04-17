// app/api/cards/route.ts

const virtualCards = [
    {
      id: 1,
      card_number: '4111111111111111',
      expiry_date: '12/25',
      cvv: '123',
      balance: 100.00, 
    },
  ];
  
  // Create a virtual card
  export async function POST() {
    const newCard = {
      id: virtualCards.length + 1,
      card_number: `411111111111${(1000000000000000 + virtualCards.length + 1).toString().slice(1)}`, // Generate a dummy card number
      expiry_date: '12/25',
      cvv: '123',
      balance: 100.00, 
    };
  
    virtualCards.push(newCard);
    return new Response(JSON.stringify(newCard), { status: 201 });

    
  }
  
  // Simulate a payment authorization and update the balance
  export async function PATCH(request: Request) {
    const { card_id, amount } = await request.json();
  
    const card = virtualCards.find((c) => c.id === card_id);
  
    if (!card) {
      return new Response('Card not found', { status: 404 });
    }
  
    if (card.balance < amount) {
      return new Response('Insufficient balance', { status: 400 });
    }
  
    card.balance -= amount; 
  
    return new Response(JSON.stringify(card), { status: 200 });
  }
  
  // Get all cards
  export async function GET() {
    return new Response(JSON.stringify(virtualCards), { status: 200 });
  }
  