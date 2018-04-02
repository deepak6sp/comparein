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
            simulatedValue: '',
            siBands: [{ siBand: '', simulatedValue: '' }],
        };
    }

    _handleSiBandValue(idx,evt) {
        const newSiBands = this.state.siBands.map((siBand, sidx) => {
            if (idx !== sidx) return siBand;
            let sv, sb;
            if(evt.target.type == 'text') {
                sv = evt.target.value;
                return { ...siBand, simulatedValue: sv };
            } else {
                sb = evt.target.value;
                return { ...siBand, siBand: sb };
            }
            
        });
            
        this.setState({ siBands: newSiBands });
        console.log(newSiBands);

        // pass back to parent - simulation.js
        this.props.onSiBandChanges(newSiBands);
    }
    
    _handleAddSiBand() {
        this.setState({ siBands: this.state.siBands.concat([{ simulatedValue: '' }]) });
    }
    
    _handleRemoveSiBand(idx) {
        if(idx != 0) {
            this.setState({ siBands: this.state.siBands.filter((s, sidx) => idx !== sidx) });
        }
    }

    render() {
       // this is for si quotes and relativity values
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

        // this is for si quotes and relativity values
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
                        siQtesAndRel.numberOfQuotes.push({"count": ++k, "quotes": ele.quotes, label:  "quotes "+ele.quotes});
                        siQtesAndRel.numberOfWins.push({"count": k, "wins": ele.wins, label: "Actual wins "+ele.wins});
                        siQtesAndRel.quotedPremium.push({"count": k, "quotedPremium": parseInt(ele.asp)});
                        siQtesAndRel.XaxisDisplayText.push(ele.siBand);
                        siQtesAndRel.numberOfDisplayBars.push(k);
                      }
                    });
                }
                
            });
            

            // for simulation values
            let si=0, sj=0, sk=0, sl=0;
            this.props.simulatedResults.map(element => {
                if(element.siQtes) {
                    element.siQtes.map(ele => {
                        if(ele.rank == this.state.siBasedRank) {
                            simulaltedSiQtesAndRel.numberOfQuotes.push({"count": ++sk, "quotes": ele.quotes});
                            simulaltedSiQtesAndRel.numberOfWins.push({"count": sk, "wins": ele.wins,  label: "Simulated wins "+ele.wins});
                            simulaltedSiQtesAndRel.quotedPremium.push({"count": sk, "quotedPremium": parseInt(ele.asp)});
                            simulaltedSiQtesAndRel.XaxisDisplayText.push(ele.siBand);
                            simulaltedSiQtesAndRel.numberOfDisplayBars.push(sk);
                        }
                    });
                }
            });

            const siBandsAvailable= ['Select Si Group', 'Below 5K', '5K-10K', '10K-20K', '20K-30K', '30K-40K', '40K-60K', '60K Plus']

            let options = siBandsAvailable.map((ele, key) => {
                    return <option key={key} value={ele}>{ele}</option>;
            });

            return (
                <div>
                    {(this.props.editMode) && 
                    <div>
                        {this.state.siBands.map((siBandSingle, id) => {
                            return (
                                <div className="si-band-input-holder" key={id}>
                                    <select 
                                        onChange={this._handleSiBandValue.bind(this,id)}
                                        value={siBandSingle.siBand}>
                                        {options}
                                    </select>
                                    <input
                                        id={id}
                                        type="text"
                                        placeholder={`value`}
                                        value={siBandSingle.simulatedValue}
                                        onChange={this._handleSiBandValue.bind(this,id)}/>
                                    <span>%</span>
                                    <button type="button" onClick={this._handleAddSiBand.bind(this)} className="add-si-band">+</button>
                                    <button type="button" onClick={this._handleRemoveSiBand.bind(this,id)} className="remove-si-band">-</button>
                                </div>
                            )})
                        }
                    </div>
                    }
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
                </div>
            )
        } else {
            return <div> Generating Graph ... </div>
        }
    
    }
}

export default SiQuotes;