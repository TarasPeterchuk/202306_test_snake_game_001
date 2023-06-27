const baseUrl =
  'https://6374b55948dfab73a4e65042.mockapi.io/todo_list/events_react_project/2';

export const fetchResultsList = () => {
  return fetch(baseUrl).then((response) => response.json());
};

export const updateResults = (updatedResults) => {
  return fetch(`${baseUrl}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(updatedResults),
  });
};
