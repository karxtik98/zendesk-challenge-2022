const axios = require("axios");
const config = require("../config");

const getAllTickets = async (req, res) => {
  const { next, cursor } = req.query;

  try {
    const { data } = await axios.get(
      `${process.env.ZENDESK_DOMAIN}/tickets.json?page[size]=25${
        !!cursor
          ? `&page[${next === "true" ? "after" : "before"}]=${cursor}`
          : ""
      }`,
      config
    );
    res.status(200).json({ message: "success", data });
  } catch (e) {
    res.status(e?.response?.status || 500).send({ message: e.message });
  }
};

const getTicketById = async (req, res) => {
  const { id } = req.params;
  try {
    const { data } = await axios.get(
      `${process.env.ZENDESK_DOMAIN}/tickets/${id}`,
      config
    );
    res.status(200).send({ message: "success", data });
  } catch (e) {
    res.status(e?.response?.status || 500).send({ message: e.message });
  }
};

module.exports = {
  getAllTickets,
  getTicketById,
};
