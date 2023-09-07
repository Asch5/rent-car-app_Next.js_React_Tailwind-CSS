import { CarProps, FilterProps } from '@/types';

export async function fetchCars(filter: FilterProps) {
  const { manufacturer, model, year, fuel, limit } = filter;
  const headers = {
    'X-RapidAPI-Key': 'be87a26718msh23e76ecf5c7aee9p158859jsn1432310af384',
    'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com',
  };

  const url = new URL(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`
  );
  // url.searchParams.append('make', manufacturer);
  // url.searchParams.append('model', model);
  // url.searchParams.append('year', `${year}`);
  // url.searchParams.append('fuel', fuel);
  // url.searchParams.append('limit', `${limit}`);

  try {
    const response = await fetch(url, {
      headers: headers,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const result = await response.json();

    return result;
  } catch (error) {
    // Handle errors here, e.g., log the error or show a user-friendly message
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error to let the caller handle it
  }
}

export const generateCareImageUrl = (car: CarProps, angle?: string): string => {
  const url = new URL('https://cdn.imagin.studio/getimage');

  const { make, year, model } = car;
  url.searchParams.append('customer', 'hrjavascript-mastery');
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(' ')[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  // url.searchParams.append('zoomLevel', zoomLevel);
  url.searchParams.append('angle', `${angle}`);
  return `${url}`;
};

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const updateSearchParams = (type: string, value: string) => {
  // Get the current URL search params
  const searchParams = new URLSearchParams(window.location.search);

  // Set the specified search parameter to the given value
  searchParams.set(type, value);

  // Set the specified search parameter to the given value
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};
