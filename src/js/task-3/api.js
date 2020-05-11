const API_KEY = process.env.API_KEY;
export const PER_PAGE = 20;
const API_URL = `https://pixabay.com/api/?key=${API_KEY}&per_page=${PER_PAGE}`;

export const fetchData = ({ query }) =>
  fetch(`${API_URL}&q=${query}`).then((response) => response.json());

export const fetchNextPage = ({ page, query }) =>
  fetch(`${API_URL}&q=${query}&page=${page}`).then((response) =>
    response.json()
  );
