import axios from "axios";

const API_KEY = "3b7292075ed081c57aedfa519aeed2ef";

export const getWeather = async (city: string) => {

  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );

  return res.data;
};