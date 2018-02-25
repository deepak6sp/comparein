
export const getPremiumWins = () => {
  let response = fetch('http://localhost:8080/api/getPremiumWins')
  .then((res) => res.json())
  .then(val => val);

  return({
  	type : 'GET_PREMIUM_WINS',
	  payload : response
  });
}
