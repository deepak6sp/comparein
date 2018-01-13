import React, {Component} from 'react';
import { VictoryBar, VictoryLine, VictoryChart, VictoryAxis, VictoryScatter,
        VictoryTheme, VictoryStack, VictoryGroup, VictoryTooltip} from 'victory';

import UI from '../../components/ui';

class AgeQtesWins extends Component {

    render() {

      return (
              <VictoryChart
                domainPadding={30}
                animate={{ delay: 0, duration: 500, easing: "bounce" }}
                theme={VictoryTheme.material}
                width = {600}
              >
                <VictoryAxis
                  tickValues={numberOfDisplayBars}
                  tickFormat={XaxisDisplayText}
                />

                <VictoryAxis
                  dependentAxis
                  tickFormat={(x) => (`${x}`)} />

                <VictoryBar
                  style={{
                    data: { fill: "#1f4b47", width: 40 }
                  }}
                  data={numberOfQuotes}
                  x="count"
                  y="quotes" />

                <VictoryBar
                   style={{
                     data: { fill: "#4DB6AC", width: 40 }
                   }}
                   data={numberOfWins}
                   x="count"
                   y="wins" />

               <VictoryLine
                  style={{
                    data: { stroke: "#c43a31" },
                  }}
                  data={quotedPremium}
                  x="count"
                  y="quotedPremium" />

                <VictoryScatter
                  labels={(d) => `$${d.y}`}
                  style={{
                    data: { fill: "#000000" },
                  }}
                  data={quotedPremium}
                  x="count"
                  y="quotedPremium" />


              </VictoryChart>
      );
    }
}

// Bind actions, states and component to the store
export default AgeQtesWins;
