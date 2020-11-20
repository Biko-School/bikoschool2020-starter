const apiUrlBase = `${process.env.REACT_APP_DEV_PROTOCOL}://${process.env.REACT_APP_DEV_API_HOST}:${process.env.REACT_APP_DEV_API_PORT}`;

const apiUrl = {
  base: () => `${apiUrlBase}/api`,
  recentMemes: () => `${apiUrlBase}/api/memes`,
  searchMemes: (searchTerm: string) => `${apiUrlBase}/api/search/${searchTerm}`,
};

export default apiUrl;
