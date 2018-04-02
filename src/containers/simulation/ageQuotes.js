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
            simulatedValue: '',
            ageBands: [{ ageBand: '', simulatedValue: '' }],
        };
    }



    _handleAgeBandValue(idx,evt) {
        const newAgeBands = this.state.ageBands.map((ageBand, sidx) => {
            if (idx !== sidx) return ageBand;
            let sv, ab;
            if(evt.target.type == 'text') {
                sv = evt.target.value;
                return { ...ageBand, simulatedValue: sv };
            } else {
                ab = evt.target.value;
                return { ...ageBand, ageBand: ab };
            }
            
            // return { ...ageBand, ageBand: ab, simulatedValue: sv };
        });
            
        this.setState({ ageBands: newAgeBands });
        console.log(newAgeBands);

        // pass back to parent - simulation.js
        this.props.onAgeBandChanges(newAgeBands);
    }
    
    _handleAddAgeBand() {
        this.setState({ ageBands: this.state.ageBands.concat([{ simulatedValue: '' }]) });
    }
    
    _handleRemoveAgeBand(idx) {
        if(idx != 0) {
            this.setState({ ageBands: this.state.ageBands.filter((s, sidx) => idx !== sidx) });
        }
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

        // console.log("this.props.simulatedResults");
        // console.log(this.props.simulatedResults);
        // console.log("this.props.brandSpecificDetails");
        // console.log(this.props.brandSpecificDetails);

        if(this.props.brandSpecificDetails.length == 2) {

            let i=0, j=0, k=0, l=0;
            
            this.props.brandSpecificDetails.forEach(element => {
    
                if(element.ageQtes) {
                    element.ageQtes.map(ele => {
                        if(ele.rank == this.state.ageBasedRank) {
                            ageQtesAndRel.numberOfQuotes.push({"count": ++i, "quotes": ele.quotes, label:  "quotes "+ele.quotes});
                            ageQtesAndRel.numberOfWins.push({"count": i, "wins": ele.wins, label: "Actual wins "+ele.wins});
                            ageQtesAndRel.quotedPremium.push({"count": i, "quotedPremium": parseInt(ele.asp)});
                            ageQtesAndRel.XaxisDisplayText.push(ele.ageBand);
                            ageQtesAndRel.numberOfDisplayBars.push(i);
                        }
                    });
                }
                
            });

            // for simulation values
            let si=0, sj=0, sk=0, sl=0;
            this.props.simulatedResults.map(element => {
                if(element.ageQtes) {
                    element.ageQtes.map(ele => {
                        if(ele.rank == this.state.ageBasedRank) {
                            simulatedAgeQtesAndRel.numberOfQuotes.push({"count": ++si, "quotes": ele.quotes});
                            simulatedAgeQtesAndRel.numberOfWins.push({"count": si, "wins": ele.wins, label: "Simulated wins "+ele.wins});
                            simulatedAgeQtesAndRel.quotedPremium.push({"count": si, "quotedPremium": parseInt(ele.asp)});
                            simulatedAgeQtesAndRel.XaxisDisplayText.push(ele.ageBand);
                            simulatedAgeQtesAndRel.numberOfDisplayBars.push(si);
                        }
                    });
                }
            });

            const ageBandsAvailable= ['Select Age Group', 'Below 25', '25-34', '35-44', '45-54', '55-64', '65-74', '75 Plus']

            let options = ageBandsAvailable.map((ele, key) => {
                    return <option key={key} value={ele}>{ele}</option>;
            });

            return (
                <div>
                    {(this.props.editMode) && 
                    <div>
                        {this.state.ageBands.map((ageBandSingle, id) => {
                            return (
                                <div className="age-band-input-holder" key={id}>
                                    <select 
                                        className="ageBandSelect" 
                                        onChange={this._handleAgeBandValue.bind(this,id)}
                                        value={ageBandSingle.ageBand}>
                                        {options}
                                    </select>
                                    <input
                                        id={id}
                                        type="text"
                                        placeholder={`value`}
                                        value={ageBandSingle.simulatedValue}
                                        onChange={this._handleAgeBandValue.bind(this,id)}/>
                                    <span>%</span>
                                    <button type="button" onClick={this._handleAddAgeBand.bind(this)} className="add-age-band">+</button>
                                    <button type="button" onClick={this._handleRemoveAgeBand.bind(this,id)} className="remove-age-band">-</button>
                                </div>
                            )})
                        }
                    </div>
                    }
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
                </div>
            )
        } else {
            return <div> Generating Graph ... </div>
        }
        
    }
}

export default AgeQuotes;