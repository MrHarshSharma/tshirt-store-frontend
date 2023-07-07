import { API_URL, STRAPI_API_TOKEN } from "./urls";

export const fetchDataFromAPI = async (endpoint) => {
  var options = {
    method: "GET",
    headers: {
      Authorization:
        "Bearer "+ STRAPI_API_TOKEN,
    },
  };

  const res = await fetch(`${API_URL}${endpoint}`, options);
  const data = await res.json();

  return data;
};


export const makePaymentRequest = async (endpoint, payload) => {
  var options = {
    method: "POST",
    headers: {
      Authorization:
        "Bearer "+ STRAPI_API_TOKEN,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  }
  const res = await fetch(`${API_URL}${endpoint}`, options);
  const data = await res.json();

  return data;

}


export const addproduct = async (endpoint, payload) => {
  var options = {
    method: 'POST',
    headers: {
      Authorization:
        "Bearer "+ STRAPI_API_TOKEN,

    },
    body: payload
  };
  
  const res = await fetch(`${API_URL}${endpoint}`, options);
  const data = await res.json();

  return data;
}


export const editproduct = async (endpoint, payload) => {
  var options = {
    method: 'PUT',
    headers: {
      Authorization:
        "Bearer "+ STRAPI_API_TOKEN,
    },
    body: payload
  };
  
  const res = await fetch(`${API_URL}${endpoint}`, options);
  const data = await res.json();

  return data;
}

export const deleteproduct = async (endpoint)=>{
  var options = {
    method: 'DELETE',
    headers: {
      Authorization:
        "Bearer "+ STRAPI_API_TOKEN,
    },
 
  };
  
  const res = await fetch(`${API_URL}${endpoint}`, options);
  const data = await res.json();

  return data;
}