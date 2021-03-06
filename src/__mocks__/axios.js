// A list of dummy data to get the search form functional
// Data pulled from: https://simple.wikipedia.org/wiki/List_of_United_States_cities_by_population#Cities_that_used_to_have_100,000_people
import axios from "axios";
const cities = [
  { id: 1, name: "Albany", state: "NY" },
  { id: 2, name: "Allegheny", state: "PA" },
  { id: 3, name: "Brooklyn", state: "NY" },
  { id: 4, name: "Camden", state: "NJ" },
  { id: 5, name: "Canton", state: "OH" },
  { id: 6, name: "Dearborn", state: "MI" },
  { id: 7, name: "Duluth", state: "MN" },
  { id: 8, name: "Erie", state: "PA" },
  { id: 9, name: "Fall River", state: "MA" },
  { id: 10, name: "Flint", state: "MI" },
  { id: 11, name: "Gary", state: "IN" },
  { id: 12, name: "Hammond", state: "IN" },
  { id: 13, name: "Kenosha", state: "WI" },
  { id: 14, name: "Livonia", state: "MI" },
  { id: 15, name: "Lynn", state: "MA" },
  { id: 16, name: "New Bedford", state: "MA" },
  { id: 17, name: "Niagara Falls", state: "NY" },
  { id: 18, name: "Parma", state: "OH" },
  { id: 19, name: "Portsmouth", state: "VI" },
  { id: 20, name: "Reading", state: "PA" },
  { id: 21, name: "Roanoke", state: "VA" },
  { id: 22, name: "Scranton", state: "PA" },
  { id: 23, name: "Somerville", state: "MA" },
  { id: 24, name: "St. Joseph", state: "MO" },
  { id: 25, name: "Trenton", state: "NJ" },
  { id: 26, name: "Utica", state: "NY" },
  { id: 27, name: "Wilmington", state: "DW" },
  { id: 28, name: "Youngstown", state: "OH" }
];
export default {
  get: jest.fn().mockImplementation(url => {
    switch (url) {
      case "https://citrics-ds.herokuapp.com/cities/":
        return Promise.resolve({ data: { cities } });
      case "https://citrics-ds.herokuapp.com/cities":
        return Promise.resolve({ data: { cities } });
      default:
        console.warn(
          `Request not mocked: ${url}. Please update __mocks__/axios.js`
        );
        return axios.get(url);
    }
  })
};
