const { useQuery } = require("react-query");
const axios = require("axios");

export default function useTickets({ cursor, next }) {
  return useQuery(
    ["tickets", { cursor, next }],
    async () => {
      return axios
        .get(`${process.env.REACT_APP_SERVER_URL}/tickets`, {
          params: {
            cursor,
            next,
          },
        })
        .then((res) => res.data)
        .catch((err) => {
          console.log(err);
        });
    },
    { fetchPolicy: "no-cache" }
  );
}
