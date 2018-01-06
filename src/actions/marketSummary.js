
export const getPremiumWins = () => {
  let response = fetch('http://localhost:8080/api/getPremiumWins')
  .then((res) => res.json())
  .then(val => val);

  return({
  	type : 'GET_PREMIUM_WINS',
	  payload : response
  });
}

export const getAgeWins = (brandName) => {
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
  	type : 'GET_AGE_WINS',
	  payload : response
  });
}
