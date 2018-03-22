export const getSimulatedPremiumWins = () => {
    let response = fetch('http://localhost:8080/api/getSimulatedPremiumWins')
    .then((res) => res.json())
    .then(val => val);
  
    return({
        type : 'GET_SIMULATED_PREMIUM_WINS',
        payload : response
    });
  }
  