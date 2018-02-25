import React, {Component} from 'react';
import { VictoryBar, VictoryLine, VictoryChart, VictoryAxis, VictoryScatter,
        VictoryTheme, VictoryStack, VictoryGroup, VictoryTooltip} from 'victory';

const AgeQtesWins = (props) => (

              <VictoryChart
                domainPadding={30}
                animate={{ delay: 0, duration: 500, easing: "bounce" }}
                theme={VictoryTheme.material}
                width = {600}
              >
                <VictoryAxis
                  tickValues={props.numberOfDisplayBars}
                  tickFormat={props.XaxisDisplayText}
                />

                <VictoryAxis
                  dependentAxis
                  tickFormat={(x) => (`${x}`)} />

                <VictoryBar
                  style={{
                    data: { fill: "#1f4b47", width: 40 }
                  }}
                  data={props.numberOfQuotes}
                  x="count"
                  y="quotes" />

                <VictoryBar
                   style={{
                     data: { fill: "#4DB6AC", width: 40 }
                   }}
                   data={props.numberOfWins}
                   x="count"
                   y="wins" />

               <VictoryLine
                  style={{
                    data: { stroke: "#c43a31" },
                  }}
                  data={props.quotedPremiumOrRelativityValue}
                  x="count"
                  y={props.YquotedPremiumOrRelativityText} />

                <VictoryScatter
                  labels={(d) => `$${d.y}`}
                  style={{
                    data: { fill: "#000000" },
                  }}
                  data={props.quotedPremiumOrRelativityValue}
                  x="count"
                  y={props.YquotedPremiumOrRelativityText} />

              </VictoryChart>
      );

// Bind actions, states and component to the store
export default AgeQtesWins;
