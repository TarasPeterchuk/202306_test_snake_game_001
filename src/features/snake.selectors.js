import { createSelector } from 'reselect';

export const flights = (state) => state.flights.flightsListData.body;

export const filterData = (state) => state.flights.filterData;

export const isFetching = (state) => state.flights.isFetching;

export const filteredFlights = createSelector(
  [flights, filterData],
  (flightsList, filterParams) => {
    if (flightsList) {
      return flightsList[filterParams.course].filter(
        (flight) =>
          flight.codeShareData[0]['codeShare']
            .toLowerCase()
            .includes(filterParams.filterText.toLowerCase()) ||
          (flight['airportToID.city']
            ? flight['airportToID.city']
                .toLowerCase()
                .includes(filterParams.filterText.toLowerCase())
            : flight['airportFromID.city']
                .toLowerCase()
                .includes(filterParams.filterText.toLowerCase()))
      );
    } else return;
  }
);
