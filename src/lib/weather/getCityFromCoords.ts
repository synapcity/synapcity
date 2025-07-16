export async function getCityFromCoords(
	lat: number,
	lon: number
): Promise<string | null> {
	try {
		const res = await fetch(
			`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
			{
				headers: {
					"User-Agent": "SynapcityWeather/1.0", // required
				},
			}
		);

		if (!res.ok) return null;

		const data = await res.json();

		const { city, town, village, state, country } = data.address;

		const place = city || town || village || state;
		return place && country ? `${place}, ${country}` : null;
	} catch {
		return null;
	}
}
