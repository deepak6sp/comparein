export const getAgeQtesWins = () => {
  let response = fetch('http://localhost:8080/api/getAgeQtesWins')
  .then((res) => res.json())
  .then(val => val);

  return({
  	type : 'GET_AGE_QTES_WINS',
	  payload : response
  });
}


export const generateAgeQtesWinsApi = (brandName) => {
  var data = {'brandName':brandName};
  let response = fetch('http://localhost:8080/api/getAgeQtesWins', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then((res) => res.json())
  .then(val => val);

  return({
  	type : 'GENERATE_AGE_QTES_WINS_API',
	  payload : response
  });
}


export const getAgeBandRel = () => {
  let response = fetch('http://localhost:8080/api/getAgeBandRel')
  .then((res) => res.json())
  .then(val => val);

  return({
  	type : 'GET_AGE_BAND_REL',
	  payload : response
  });
}


export const generateAgeBandRelApi = (brandName) => {
  var data = {'brandName':brandName};
  let response = fetch('http://localhost:8080/api/getAgeBandRel', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then((res) => res.json())
  .then(val => val);

  console.log(response);

  return({
  	type : 'GENERATE_AGE_BAND_REL_API',
	  payload : response
  });
}
