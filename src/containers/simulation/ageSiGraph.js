import React, {Component} from 'react';
import { VictoryBar, VictoryLine, VictoryChart, VictoryAxis, VictoryScatter,
        VictoryTheme, VictoryStack, VictoryGroup, VictoryTooltip} from 'victory';

const AgeSiGraph = (props) => (

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

          <VictoryBar
              style={{
                data: { width: 40, stroke: "#000000", strokeWidth: 3, fillOpacity:0.1 }
              }}
              data={props.simulatedNumberOfWins}
              x="count"
              y="wins" />

        </VictoryChart>
      );

// Bind actions, states and component to the store
export default AgeSiGraph;
