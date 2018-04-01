import React, {Component} from 'react';
import { VictoryTooltip, VictoryStack, VictoryChart, VictoryGroup, VictoryLine, VictoryScatter, VictoryBar, VictoryAxis } from 'victory';


class MarketSummary extends Component {

    render() {
        if(this.props.newSummary.length != 0) {
            let numberOfWins = [];
            let brandNames = [];
            let numberOfDisplayBars = [];
            let premium = [];
  
            this.props.newSummary[0].forEach((ele,i) => {
              brandNames.push(ele.brand);
              numberOfDisplayBars.push(i++);
              numberOfWins.push({'brand':ele.brand,'wins':ele.wins, label: "wins "+ele.wins});
              premium.push({'brand':ele.brand,'premium':ele.premium});
            })
  
            let simulatedNumberOfWins = [];
            let simulatedBrandNames = [];
            let simulatedNumberOfDisplayBars = [];
  
            if(this.props.simulatedResults.length != 0) {
              this.props.simulatedResults.forEach((ele,i) => {
                simulatedBrandNames.push(ele.brand);
                simulatedNumberOfDisplayBars.push(i++);
                simulatedNumberOfWins.push({'brand':ele.brand,'wins':ele.wins, label:  "wins "+ele.wins});
              })
            }
            return (
                <VictoryChart  animate={{ delay: 0, duration: 500, easing: "bounce" }}>
                    
                <VictoryAxis
                tickValues={numberOfDisplayBars}
                tickFormat={brandNames}
                />
        
                <VictoryAxis
                dependentAxis
                tickFormat={(x) => (`${x}`)}
                />
        
                <VictoryBar
                    style={{
                        data: { fill: "#4DB6AC", width: 40 }
                    }}
                    labelComponent={<VictoryTooltip/>}
                    data={numberOfWins}
                    x="brand"
                    y="wins"
                    events={[{
                        target: "data",
                        eventHandlers: {
                        onClick: () => {
                            return [{
                            mutation: (props) => {
                                this._handleSelectedBrand(props.datum.brand);
                            }
                            }];
                        },
                        onMouseEnter: () => {
                            return [{
                            mutation: (props) => {
                                return {style: Object.assign(props.style, {fill: "#1f4b47"})}
                            }
                            }];
                        },
                        onMouseLeave: () => {
                            return [{
                            mutation: (props) => {
                                return {style: Object.assign(props.style, {fill: "#4DB6AC"})}
                            }
                            }];
                        }
                        }
                    }]} />
        
                <VictoryBar
                style={{
                    data: { width: 40, stroke: "#000000", strokeWidth: 3, fillOpacity:0.1 }
                }}
                labelComponent={<VictoryTooltip/>}
                data={simulatedNumberOfWins}
                x="brand"
                y="wins"
                events={[{
                    target: "data",
                    eventHandlers: {
                    onClick: () => {
                        return [{
                        mutation: (props) => {
                            this._handleSelectedBrand(props.datum.brand);
                        }
                        }];
                    },
                    onMouseEnter: () => {
                        return [{
                        mutation: (props) => {
                            return {style: Object.assign(props.style, {fill: "#1f4b47"})}
                        }
                        }];
                    },
                    onMouseLeave: () => {
                        return [{
                        mutation: (props) => {
                            return {style: Object.assign(props.style, {fill: "#4DB6AC"})}
                        }
                        }];
                    }
                    }
                }]} />
            </VictoryChart>
            )
        }
        else {
            return <div>Market Summary loading....</div>
        }
    }
}
export default MarketSummary