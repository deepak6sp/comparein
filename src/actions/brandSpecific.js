export const getAgeQtesWins = () => {
  let response = fetch('http://localhost:8080/api/getAgeQtesWins')
  .then((res) => res.json())
  .then(val => val);

  return({
  	type : 'GET_AGE_WINS',
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
  	type : 'GENERATE_AGE_API_WINS',
	  payload : response
  });
}
