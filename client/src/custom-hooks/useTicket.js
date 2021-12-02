const { useQuery } = require("react-query");
const axios = require("axios");

export default function useTickets(id) {
  return useQuery(
    ["ticket", id],
    async () => {
      return axios
        .get(`${process.env.REACT_APP_SERVER_URL}/tickets/${id}`)
        .then((res) => res.data)
        .catch((err) => alert(`Error loading ticket ${id} data`));
    },
    { enabled: !!id }
  );
}
