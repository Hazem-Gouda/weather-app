/**
 * API route to fetch weather data from OpenWeather API
 * This is a server-side proxy so the API key remains secure
 */

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('q');
  const units = searchParams.get('units') || 'metric';
  const lang = searchParams.get('lang') || 'en';

  if (!city) {
    return Response.json(
      { message: 'City parameter is required' },
      { status: 400 }
    );
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return Response.json(
      { message: 'API key not configured' },
      { status: 500 }
    );
  }

  try {
    const url = new URL('https://api.openweathermap.org/data/2.5/weather');
    url.searchParams.append('q', city);
    url.searchParams.append('units', units);
    url.searchParams.append('lang', lang);
    url.searchParams.append('appid', apiKey);

    const res = await fetch(url.toString());

    if (!res.ok) {
      const errorData = await res.json();
      return Response.json(
        { message: errorData.message || 'Failed to fetch weather' },
        { status: res.status }
      );
    }

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.error('Weather API error:', error);
    return Response.json(
      { message: 'Error fetching weather' },
      { status: 500 }
    );
  }
}
