import React, { useState } from "react";
import { AutoComplete, Input, Switch, Slider } from "antd";
import useLocalStorage from "../../../hooks/useLocalStorage";

const POP_MIN = 10000;
const POP_MAX = 2100000;
const RENT_MIN = 100;
const RENT_MAX = 5100;
const WEATHER_MIN = 15;
const WEATHER_MAX = 105;

const initialSearchPrefs = {
  rooms: "1br",
  pop_min: POP_MIN,
  pop_max: POP_MAX,
  rent_min: RENT_MIN,
  rent_max: RENT_MAX,
  weather_min: WEATHER_MIN,
  weather_max: WEATHER_MAX
};

export default function RenderSearchBar({
  searchTerm,
  options,
  onChange,
  onSelect
}) {
  const [showAdvancedView, setShowAdvancedView] = useState(false);
  const toggleAdvancedView = () => setShowAdvancedView(!showAdvancedView);

  // I opted to store searchPrefs in an object to simplify getting/setting values
  // Otherwise we'd need many different useLocalStorage calls
  // It can potentially impact performance, but in my testing everything was plenty fast
  const [searchPrefs, setSearchPrefs] = useLocalStorage(
    "searchPrefs",
    initialSearchPrefs
  );
  // useLocalStorage is a custom hook made by David Horstman
  // For more info hover over it or see the docs in /hooks/useLocalStorage.js

  // This function expects an event triggered by an element with 'name' and 'value' attributes
  // that match a key-value pair in the searchPrefs object
  const processSearchPrefsEvent = ({ target: { name, value } }) =>
    updateNamedSearchPrefs({ [name]: value });

  // Simultaneously update any number of search prefs
  // based on key-value pairs on the object passed in
  // This is used by sliders to set both ends at once
  const updateNamedSearchPrefs = changes =>
    setSearchPrefs({ ...searchPrefs, ...changes });

  const formatPop = pop => {
    if (pop >= POP_MAX) {
      return ">2 million";
    } else if (pop >= 1000000) {
      return `${(pop / 1000000).toFixed(1)} million`;
    } else {
      return pop.toLocaleString();
    }
  };
  const formatMoney = price =>
    price >= RENT_MAX ? ">$5,000" : `$ ${price.toLocaleString()}`;
  const formatWeather = temp => {
    if (temp >= WEATHER_MAX) {
      return ">100°F";
    } else if (temp <= WEATHER_MIN) {
      return "<20°F";
    } else {
      return `${temp}°F`;
    }
  };

  return (
    <div className="search-bar">
      <label>
        <Switch onChange={toggleAdvancedView} checked={showAdvancedView} />
        {showAdvancedView ? "Advanced Search" : "Basic Search"}
      </label>
      {/* If we're not in advanced view, show the city autocomplete */}
      {!showAdvancedView ? (
        <AutoComplete
          value={searchTerm}
          options={options}
          style={{ width: 200 }}
          onSelect={onSelect}
          onChange={onChange}
          placeholder="Enter City.."
        />
      ) : (
        <>
          {/* If we are in advanced view, show the preferences pane */}
          <div className="site-input-group-wrapper">
            {/* Population*/}
            <br />
            <label>
              Population:
              <Slider
                range
                min={POP_MIN}
                max={POP_MAX}
                step={10000}
                value={[searchPrefs.pop_min, searchPrefs.pop_max]}
                tipFormatter={formatPop}
                onChange={([pop_min, pop_max]) =>
                  updateNamedSearchPrefs({
                    pop_min,
                    pop_max
                  })
                }
              />
            </label>
            <div className="advanced-search-range-display">
              <span>{formatPop(searchPrefs.pop_min)}</span>
              <span> to </span>
              <span>{formatPop(searchPrefs.pop_max)}</span>
            </div>
          </div>

          {/* Weather */}
          <br />
          <label htmlFor="weather">Weather:</label>
          <Slider
            id="weather"
            range
            min={WEATHER_MIN}
            max={WEATHER_MAX}
            step={5}
            value={[searchPrefs.weather_min, searchPrefs.weather_max]}
            tipFormatter={formatWeather}
            onChange={([weather_min, weather_max]) =>
              updateNamedSearchPrefs({
                weather_min,
                weather_max
              })
            }
          />
          <div className="advanced-search-range-display">
            <span>{formatWeather(searchPrefs.weather_min)}</span>
            <span> to </span>
            <span>{formatWeather(searchPrefs.weather_max)}</span>
          </div>

          {/* Rent */}
          <br />
          <label htmlFor="rent">
            {"Rent for "}
            <select
              id="rooms"
              name="rooms"
              onChange={processSearchPrefsEvent}
              value={searchPrefs.rooms}
            >
              <option value="studio">Studio</option>
              <option value="1br">1BR</option>
              <option value="2br">2BR</option>
              <option value="3br">3BR</option>
              <option value="4br">4BR</option>
            </select>
            {" apt:"}
          </label>
          <Slider
            id="rent"
            range
            min={RENT_MIN}
            max={RENT_MAX}
            step={100}
            value={[searchPrefs.rent_min, searchPrefs.rent_max]}
            tipFormatter={formatMoney}
            onChange={([rent_min, rent_max]) =>
              updateNamedSearchPrefs({
                rent_min,
                rent_max
              })
            }
          />
          <div className="advanced-search-range-display">
            <span>{formatMoney(searchPrefs.rent_min)}</span>
            <span> to </span>
            <span>{formatMoney(searchPrefs.rent_max)}</span>
          </div>

          {/* Job industries */}
          <br />
          <Input.Group compact>
            <label htmlFor="jobs">Job Industries:</label>
            <br />
            <Input
              style={{ width: "50%" }}
              placeholder="Ex: Tech"
              name="jobs"
              onChange={processSearchPrefsEvent}
              value={searchPrefs.jobs}
            />
          </Input.Group>
        </>
      )}
    </div>
  );
}
