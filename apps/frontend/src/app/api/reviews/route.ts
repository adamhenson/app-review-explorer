import { type NextRequest, NextResponse } from 'next/server';

const EXTERNAL_API_URL = process.env.REVIEWS_API_URL;

/**
 * API route to proxy requests to the external reviews API
 * This avoids CORS issues by making the request from the server side
 */
export async function GET(request: NextRequest) {
  try {
    if (!EXTERNAL_API_URL) {
      console.error('REVIEWS_API_URL environment variable is not set');
      return NextResponse.json(
        { error: 'API configuration error' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);

    // Build the external API URL with query parameters
    const externalUrl = new URL(EXTERNAL_API_URL);

    // Forward all query parameters to the external API
    searchParams.forEach((value, key) => {
      externalUrl.searchParams.append(key, value);
    });

    console.log('Proxying request to:', externalUrl.toString());

    // Make the request to the external API
    const response = await fetch(externalUrl.toString(), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(
        'External API error:',
        response.status,
        response.statusText
      );
      return NextResponse.json(
        {
          error: 'Failed to fetch reviews from external API',
          status: response.status,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Return the data with proper CORS headers
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('Proxy API error:', error);
    return NextResponse.json(
      { error: 'Internal server error while fetching reviews' },
      { status: 500 }
    );
  }
}

/**
 * Handle preflight OPTIONS requests for CORS
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
