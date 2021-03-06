import Nav from "../components/pages/Nav/NavContainer";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { render, fireEvent } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { toggleDrawer } from "../state/actions";
const mockStore = configureStore([]);
describe("<NavContainer />", () => {
  // Tests are split into two sections since the mock Redux store is immutable
  describe("Closed Nav Tests", () => {
    let store, component;
    beforeEach(() => {
      store = mockStore({
        drawer: { isOpen: false },
        cities: { selectedCities: [] }
      });
      store.dispatch = jest.fn();
      component = render(
        <Router>
          <Provider store={store}>
            <Nav />
          </Provider>
        </Router>
      );
    });

    it("Renders navbar without errors", () => {
      const div = document.createElement("div");
      ReactDOM.render(
        <Provider store={store}>
          <Nav />
        </Provider>,
        div
      );
      ReactDOM.unmountComponentAtNode(div);
    });
    it("Shows only the button when closed", async done => {
      const { findByTestId, queryByText } = component;
      const visibilityButton = await findByTestId("floating-visibility-button");
      expect(visibilityButton).toBeInTheDocument();
      const header = queryByText(/city search/i);
      expect(header).toBeNull();
      done();
    });
    it("Opens and closes when the button is pressed", async done => {
      const { findByTestId } = component;
      const visibilityButton = await findByTestId("floating-visibility-button");
      fireEvent.click(visibilityButton);
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(toggleDrawer());
      fireEvent.click(visibilityButton);
      expect(store.dispatch).toHaveBeenCalledTimes(2);
      expect(store.dispatch).toHaveBeenCalledWith(toggleDrawer());
      done();
    });
  });
  describe("Open nav tests", () => {
    let store, component;
    beforeEach(() => {
      store = mockStore({
        drawer: { isOpen: true },
        cities: { selectedCities: [] }
      });
      store.dispatch = jest.fn();
      component = render(
        <Router>
          <Provider store={store}>
            <Nav />
          </Provider>
        </Router>
      );
    });

    it("Shows the correct title", async done => {
      const { findByText } = component;
      const header = await findByText(/city search/i);
      expect(header).toBeInTheDocument();
      done();
    });
  });
});
