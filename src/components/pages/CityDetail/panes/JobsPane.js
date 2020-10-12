import React, { useState, useEffect } from "react";
import { lineGraph } from "../../../common/Graphs/graphType";
import Plot from "react-plotly.js";
import LoadingSkeleton from "./LoadingSkeleton";
//icon
import jobIcon from "../../../../styles/icons/jobs-96.png";

export default function JobsPane({ jobs, unemployment }) {
  let style = { width: "100%", height: "100%" };
  const [width, setWidth] = useState(window.innerWidth);
  const [pieStyle, setPieStyle] = useState({ width: "100%", height: "100%" });

  useEffect(() => {
    // timeoutId for debounce mechanism
    let timeoutId = null;
    function handleResize() {
      // prevent execution of previous setTimeout
      clearTimeout(timeoutId);
      // change width from the state object after 500 milliseconds
      timeoutId = setTimeout(() => setWidth(window.innerWidth), 500);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  useEffect(() => {
    console.log(width);
  }, [width]);

  // function that parses and renders the given pie chart
  const renderPie = () => {
    const data = JSON.parse(jobs.viz).data[0];
    const pieData = [
      {
        // additional properties for pie chart
        ...data,
        domain: width < 1000 ? { x: [-10, 0] } : { x: [1, 0] },
        automargin: true,
        hoverinfo: "label",
        textinfo: "percent",
        insidetextorientation: "radial"
      }
    ];
    // custom layout for pie chart

    const layout = {
      title: "Top Industries",
      showlegend: width < 800 ? false : true,
      legend: { x: -10.4, font: { size: "10px" } },
      paper_bgcolor: "transparent",
      plot_bgcolor: "transparent",
      yaxis: {
        showgrid: false
      },
      xaxis: {
        showgrid: false
      },
      autosize: true
    };
    return <Plot data={pieData} layout={layout} style={style} />;
  };
  const generateTrendGraph = () => {
    const { dataPlot, layout } = lineGraph({
      name: "",
      plotX: JSON.parse(unemployment.viz).data[0].x,
      plotY: JSON.parse(unemployment.viz).data[0].y,
      graphName: "Unemployment Rate"
    });
    return (
      <Plot
        data={dataPlot}
        layout={{ ...layout, showlegend: false }}
        style={style}
      />
    );
  };
  return (
    <div className="one-render-p">
      <div className="main-detail-content">
        <div className="detail-header">
          <img
            className="detail-pane-icon"
            src={jobIcon}
            alt="briefcase to represent the job industry icon"
          />
          <h2>Jobs:</h2>
        </div>
        {jobs && unemployment ? (
          <div className="job-info-container">
            <div className="job-charts">{renderPie()}</div>
            <div className="job-charts-unemploy">{generateTrendGraph()}</div>
          </div>
        ) : (
          <LoadingSkeleton />
        )}
      </div>
    </div>
  );
}
