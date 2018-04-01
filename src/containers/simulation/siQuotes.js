import React, {Component} from 'react';
import AgeSiGraph from './ageSiGraph';

class SiQuotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ageBasedRank: 1,
            ageBasedSwitchStatus: "off",
            siBasedRank : 1,
            siBasedSwitchStatus: "off",
            ageRedLabel: "Quoted Premium",
            siRedLabel: "Quoted Premium",
            showAgeRankSlider: true,
            showSiRankSlider: true,
        };
    }

    render() {
       // this is for age quotes and relativity values
        let siQtesAndRel = {
            numberOfQuotes : [],
            numberOfWins : [],
            XaxisDisplayText : [],
            numberOfDisplayBars : [],
            quotedPremium : [],
            relativityPremium : [],
            quotedPremiumOrRelativityValue : [],
            YquotedPremiumOrRelativityText: ''
        }

        // this is for age quotes and relativity values
        let simulaltedSiQtesAndRel = {
            numberOfQuotes : [],
            numberOfWins : [],
            XaxisDisplayText : [],
            numberOfDisplayBars : [],
            quotedPremium : [],
            relativityPremium : [],
            quotedPremiumOrRelativityValue : [],
            YquotedPremiumOrRelativityText: ''
        }

        if(this.props.brandSpecificDetails.length == 2) {

            let i=0, j=0, k=0, l=0;
            
            this.props.brandSpecificDetails.forEach(element => {

                if(element.siQtes) {
                    element.siQtes.map(ele => {
                      if(ele.rank == this.state.siBasedRank) {
                        siQtesAndRel.numberOfQuotes.push({"count": ++k, "quotes": ele.quotes});
                        siQtesAndRel.numberOfWins.push({"count": k, "wins": ele.wins});
                        siQtesAndRel.quotedPremium.push({"count": k, "quotedPremium": parseInt(ele.asp)});
                        siQtesAndRel.XaxisDisplayText.push(ele.siBand);
                        siQtesAndRel.numberOfDisplayBars.push(k);
                      }
                    });
                }
                
            });
            

            // for simulation values
            let si=0, sj=0, sk=0, sl=0;
            this.props.simulatedResults.map(ele => {

                if(ele.rank == this.state.siBasedRank) {
                    simulaltedSiQtesAndRel.numberOfQuotes.push({"count": ++sk, "quotes": ele.quotes});
                    simulaltedSiQtesAndRel.numberOfWins.push({"count": sk, "wins": ele.wins});
                    simulaltedSiQtesAndRel.quotedPremium.push({"count": sk, "quotedPremium": parseInt(ele.asp)});
                    simulaltedSiQtesAndRel.XaxisDisplayText.push(ele.siBand);
                    simulaltedSiQtesAndRel.numberOfDisplayBars.push(sk);
                }
                
            });

            return (
                <AgeSiGraph
                    numberOfQuotes= {siQtesAndRel.numberOfQuotes}
                    numberOfWins = {siQtesAndRel.numberOfWins}
                    quotedPremiumOrRelativityValue = {siQtesAndRel.quotedPremiumOrRelativityValue}
                    XaxisDisplayText = {siQtesAndRel.XaxisDisplayText}
                    numberOfDisplayBars = {siQtesAndRel.numberOfDisplayBars}
                    YquotedPremiumOrRelativityText = {siQtesAndRel.YquotedPremiumOrRelativityText}
                    
                    simulatedNumberOfQuotes= {simulaltedSiQtesAndRel.numberOfQuotes}
                    simulatedNumberOfWins = {simulaltedSiQtesAndRel.numberOfWins}
                    simulatedQuotedPremiumOrRelativityValue = {simulaltedSiQtesAndRel.quotedPremiumOrRelativityValue}
                    simulatedXaxisDisplayText = {simulaltedSiQtesAndRel.XaxisDisplayText}
                    simulatedNumberOfDisplayBars = {simulaltedSiQtesAndRel.numberOfDisplayBars}
                    simulatedYquotedPremiumOrRelativityText = {simulaltedSiQtesAndRel.YquotedPremiumOrRelativityText}/>
            )
        } else {
            return <div> Generating Graph </div>
        }
    
    }
}

export default SiQuotes;