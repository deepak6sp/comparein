export const getSimulatedPremiumWins = () => {
    let response = fetch('/api/getSimulatedPremiumWins')
    .then((res) => res.json())
    .then(val => val);
  
    return({
        type : 'GET_SIMULATED_PREMIUM_WINS',
        payload : response
    });
  }
  