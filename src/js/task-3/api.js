const API_KEY = process.env.API_KEY;
export const PER_PAGE = 20;
const API_URL = `https://pixabay.com/api/?key=${API_KEY}&per_page=${PER_PAGE}`;

export const fetchData = async ({ query }) => {
  const response = await fetch(`${API_URL}&q=${query}`);

  return response.json();
};

export const fetchNextPage = async ({ page, query }) => {
  const response = await fetch(`${API_URL}&q=${query}&page=${page}`);

  return response.json();
};
