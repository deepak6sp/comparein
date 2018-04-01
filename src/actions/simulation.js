export const getSimulatedPremiumWins = () => {
    let response = fetch('/api/getSimulatedPremiumWins')
    .then((res) => res.json())
    .then(val => val);
  
    return({
        type : 'GET_SIMULATED_PREMIUM_WINS',
        payload : response
    });
  }

  

export const getSimulatedAgeQtesWins = (brandName) => {
    var data = {brandName:brandName};
    let response = fetch('/api/getSimulatedAgeQtesWins', {
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
        type : 'GET_SIMULATED_AGE_QTES_WINS',
        payload : response
    });
}


export const getSimulatedSiQtesWins = (brandName) => {
    var data = {brandName:brandName};
    let response = fetch('/api/getSimulatedSiQtesWins', {
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
        type : 'GET_SIMULATED_SI_QTES_WINS',
        payload : response
    });
}

export const generateSimulatedDataRanks = (data) => {
    console.log('in actions');
    console.log(data);
    var data = data;
    let response = fetch('/api/generateSimulatedDataRanks', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}