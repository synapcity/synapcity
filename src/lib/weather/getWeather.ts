export interface WeatherData {
  temperature: {
    celsius: number;
    fahrenheit: number;
  };
  description: string;
  icon: string;
  rainSoon: boolean;
}

interface WeatherOptions {
  lat?: number;
  lon?: number;
  zip?: string;
  unit: "celsius" | "fahrenheit";
  gps?: { lat: number; lon: number } | null;
}

export async function getWeather(options: WeatherOptions): Promise<WeatherData | null> {
  let lat = options.lat ?? options.gps?.lat;
  let lon = options.lon ?? options.gps?.lon;

  if (!lat || !lon) {
    if (!options.zip) return null;

    const geo = await fetch(
      `https://nominatim.openstreetmap.org/search?postalcode=${options.zip}&format=json&limit=1`,
      {
        headers: { "User-Agent": "SynapcityWeather/1.0" },
      }
    );
    const geoData = await geo.json();
    if (!geoData[0]) return null;
    lat = parseFloat(geoData[0].lat);
    lon = parseFloat(geoData[0].lon);
  }

  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=precipitation_probability&timezone=auto`
  );

  if (!res.ok) return null;
  const data = await res.json();

  const current = data.current_weather;
  const nextHourRainChance = data.hourly?.precipitation_probability?.[1] ?? 0;

  const celsius = current.temperature;
  const fahrenheit = (celsius * 9) / 5 + 32;

  return {
    temperature: {
      celsius: Math.round(celsius),
      fahrenheit: Math.round(fahrenheit),
    },
    description: current.weathercode,
    icon: getWeatherIcon(current.weathercode),
    rainSoon: nextHourRainChance >= 50,
  };
}

function getWeatherIcon(code: number): string {
  if (code === 0) return "☀️";
  if (code >= 1 && code <= 3) return "⛅";
  if (code >= 45 && code <= 48) return "ἲb";
  if (code >= 51 && code <= 67) return "☔";
  if (code >= 71 && code <= 86) return "❄";
  return "ἲ7";
}
