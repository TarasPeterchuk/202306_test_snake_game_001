const baseUrl = 'https://api.iev.aero/api/flights';

export default flightsDate => {
  return fetch(`${baseUrl}/${flightsDate}`)
    .then(response => {
      if (!response.ok) {
        throw Error(`data acquisition error. Server error ${response.status}`);
      }
      return response.json();
    })
    .catch(error => alert(error.message));
};
