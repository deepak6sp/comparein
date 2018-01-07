export const getAgeWins = () => {
  let response = fetch('http://localhost:8080/api/getAgeWins')
  .then((res) => res.json())
  .then(val => val);

  return({
  	type : 'GET_AGE_WINS',
	  payload : response
  });
}


export const generateAgeWinsApi = (brandName) => {
  var data = {'brandName':brandName};
  let response = fetch('http://localhost:8080/api/getAgeWins', {
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
