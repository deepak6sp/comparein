module.exports =  {
      createRankDb : (docs) => {
        let newSortedValuesArray = [];
        let newSortedValuesRank = [];
        // sort array and rearrage brandname 
        docs.forEach((doc, index) => {
          newSortedValuesArray.push(
            Object.keys(doc).sort((a,b) => doc[a]-doc[b])
          );
        });
      
        //assign key according to sorted array
        newSortedValuesArray.forEach((doc,index) => {
          for(key in doc) {
            newSortedValuesRank.push({"brandName": doc[key], "rank":++key});
          }
        });
        let index = 1;
        let ranksArray = [];
        var createObj = {};
        newSortedValuesRank.forEach((doc) => {
          
          switch(doc.brandName) {
            case "AAMI":
              createObj.AAMIRank = doc.rank;
              break;
            case "Allianz":
              createObj.AllianzRank = doc.rank;
              break;
            case "Bingle":
              createObj.BingleRank = doc.rank;
              break;
            case "Coles":
              createObj.ColesRank = doc.rank;
              break;
            case "RACV":
              createObj.RACVRank = doc.rank;
              break;
            default :
              break;
          }
      
          if(index % 5 == 0 && index!=0) {
            ranksArray.push(createObj);
            createObj = {};
          }
          index ++;
      
        });
      
        return ranksArray;
      },
    
      calculatePremiumWins : (docs) => {
        let wins = {AAMI: 0, Allianz: 0, Bingle: 0, Coles:0, RACV:0};
        let premium = { AAMI: 0, Allianz: 0, Bingle: 0, Coles:0, RACV:0};
  
        Object.entries(docs).forEach(([key,brand]) => {
          // get 1st ranks occurances
          
          if(brand.AAMIRank == 1) {
            wins.AAMI++;
            premium.AAMI += brand.AAMI;
          }
          if(brand.AllianzRank == 1) {
            wins.Allianz++;
            premium.Allianz += brand.Allianz;
          }
          if(brand.BingleRank == 1) {
            wins.Bingle++;
            premium.Bingle += brand.Bingle;
          }
          if(brand.ColesRank == 1) {
            wins.Coles++;
            premium.Coles += brand.Coles;
          }
          if(brand.RACVRank == 1) {
            wins.RACV++;
            premium.RACV += brand.RACV;
          }
      
        });
       
        let premiumWins = [];
        Object.entries(wins).forEach(([key,val]) => {
          premiumWins.push({brand: key, wins: val, premium: parseInt((premium[key]/val).toFixed(2))})
        });
  
        return premiumWins;
      },

      assignAgeGroupAndSiGroup: (doc) => {
        
        switch(doc.ageBand) {
          case 'Below 25':
            doc.ageGroup = 1;
            break;
          case '25-34':
            doc.ageGroup = 2;
            break;
          case '35-44':
            doc.ageGroup = 3;
            break;
          case '45-54':
            doc.ageGroup = 4;
            break;
          case '55-64':
            doc.ageGroup = 5;
            break;
          case '65-74':
            doc.ageGroup = 6;
            break;
          case '75 Plus':
            doc.ageGroup = 7;
            break;
          default :
            break;
        }

        switch(doc.siBand) {
          case 'Below 5K':
            doc.siGroup = 1;
            break;
          case '5K-10K':
            doc.siGroup = 2;
            break;
          case '10K-20K':
            doc.siGroup = 3;
            break;
          case '20K-30K':
            doc.siGroup = 4;
            break;
          case '30K-40K':
            doc.siGroup = 5;
            break;
          case '40K-60K':
            doc.siGroup = 6;
            break;
          case '60K Plus':
            doc.siGroup = 7;
            break;
          default :
            break;
        }

        return doc;
          
      }
  }
