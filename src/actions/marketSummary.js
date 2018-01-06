
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
  var data = {'name':brandName};
  let response = fetch('http://localhost:8080/api/getAgeWins', {
    method: 'post',
    body: JSON.stringify(data)
  })
  .then((res) => res.json())
  .then(val => val);

  return({
  	type : 'GET_AGE_WINS',
	  payload : response
  });
}
