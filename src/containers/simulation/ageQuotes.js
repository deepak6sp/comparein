import React, {Component} from 'react';
import AgeSiGraph from './ageSiGraph';

class AgeQuotes extends Component {
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
        let ageQtesAndRel = {
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
        let simulatedAgeQtesAndRel = {
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
    
                if(element.ageQtes) {
                    element.ageQtes.map(ele => {
                    if(ele.rank == this.state.ageBasedRank) {
                        ageQtesAndRel.numberOfQuotes.push({"count": ++i, "quotes": ele.quotes});
                        ageQtesAndRel.numberOfWins.push({"count": i, "wins": ele.wins});
                        ageQtesAndRel.quotedPremium.push({"count": i, "quotedPremium": parseInt(ele.asp)});
                        ageQtesAndRel.XaxisDisplayText.push(ele.ageBand);
                        ageQtesAndRel.numberOfDisplayBars.push(i);
                    }
                    });
                }
                
            });

            // for simulation values
            let si=0, sj=0, sk=0, sl=0;
            this.props.simulatedResults.map(ele => {
    
                if(ele.rank == this.state.ageBasedRank) {
                    simulatedAgeQtesAndRel.numberOfQuotes.push({"count": ++si, "quotes": ele.quotes});
                    simulatedAgeQtesAndRel.numberOfWins.push({"count": si, "wins": ele.wins});
                    simulatedAgeQtesAndRel.quotedPremium.push({"count": si, "quotedPremium": parseInt(ele.asp)});
                    simulatedAgeQtesAndRel.XaxisDisplayText.push(ele.ageBand);
                    simulatedAgeQtesAndRel.numberOfDisplayBars.push(si);
                }
                
            });

            return (
                <AgeSiGraph
                    numberOfQuotes= {ageQtesAndRel.numberOfQuotes}
                    numberOfWins = {ageQtesAndRel.numberOfWins}
                    quotedPremiumOrRelativityValue = {ageQtesAndRel.quotedPremiumOrRelativityValue}
                    XaxisDisplayText = {ageQtesAndRel.XaxisDisplayText}
                    numberOfDisplayBars = {ageQtesAndRel.numberOfDisplayBars}
                    YquotedPremiumOrRelativityText = {ageQtesAndRel.YquotedPremiumOrRelativityText}
                    
                    simulatedNumberOfQuotes= {simulatedAgeQtesAndRel.numberOfQuotes}
                    simulatedNumberOfWins = {simulatedAgeQtesAndRel.numberOfWins}
                    simulatedQuotedPremiumOrRelativityValue = {simulatedAgeQtesAndRel.quotedPremiumOrRelativityValue}
                    simulatedXaxisDisplayText = {simulatedAgeQtesAndRel.XaxisDisplayText}
                    simulatedNumberOfDisplayBars = {simulatedAgeQtesAndRel.numberOfDisplayBars}
                    simulatedYquotedPremiumOrRelativityText = {simulatedAgeQtesAndRel.YquotedPremiumOrRelativityText}/>
            )
        } else {
            return <div> Generating Graph </div>
        }
        
    }
}

export default AgeQuotes;