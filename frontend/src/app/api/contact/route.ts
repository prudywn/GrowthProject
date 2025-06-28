import { NextRequest, NextResponse } from 'next/server';

// Get the backend URL from environment variables
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL?.split('||').map(s => s.trim())[0] || 'http://localhost:3001';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Forward the request to your backend server
    const response = await fetch(`${BACKEND_URL}/api/v1/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // If the response is not ok, get the error message from the backend
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        // If we can't parse JSON, use the status text as the error message
        console.error('Error parsing error response:', e);
        errorData = { 
          message: response.statusText || 'Failed to submit form',
          status: response.status,
          url: response.url
        };
      }
      
      console.error('Backend error:', errorData);
      return NextResponse.json(
        { 
          message: errorData.message || 'Failed to submit form',
          status: response.status 
        },
        { status: response.status }
      );
    }

    // If successful, return the response from the backend
    const data = await response.json();
    return NextResponse.json(
      { 
        ...data,
        status: 201 
      }, 
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}