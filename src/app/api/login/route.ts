// api/login/route.tsx
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    console.log("Received email:", email); // Debugging
    console.log("Received password:", password); 

    // Ensure email is passed as username for Auth0 authentication
    const response = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'password',
        username: email,  
        password,
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET, 
        scope: 'openid profile email',
      }),
    });

    const data = await response.json();
    console.log('Auth0 Response:', data); // Debugging

    if (!response.ok) {
      return NextResponse.json({ error: data.error_description || 'Auth failed' }, { status: 401 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
