
export const getPremiumWins = () => {
  let response = fetch('/api/getPremiumWins')
  .then((res) => res.json())
  .then(val => val);

  console.log("reponse");
  console.log(response);
  return({
  	type : 'GET_PREMIUM_WINS',
	  payload : response
  });
}
