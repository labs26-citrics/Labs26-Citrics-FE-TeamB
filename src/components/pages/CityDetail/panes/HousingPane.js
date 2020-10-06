import React from "react";
import { Tabs } from "antd";
import { HomeOutlined } from "@ant-design/icons";
export default function HousingPane({ rent }) {
  // console.log(rent);
  const { TabPane } = Tabs;
  // This list will be the titles of the tabs
  // it also matches the keys in rent (although they're all lowercase in rent)
  const aptTypes = ["Studio", "1BR", "2BR", "3BR", "4BR"];

  // Make a color-coded price change display
  const generatePriceDisplay = change => {
    change = Math.round(change * 100);
    let indicator = "";
    if (change < 0) {
      indicator = " down";
      change += "%";
    } else {
      change = "+" + change + "%";
      if (change > 0) {
        indicator = " up";
      }
    }
    return <div className={"rent-percent-change" + indicator}>{change}</div>;
  };

  return (
    <div className="one-render-p">
      <div className="main-detail-content">
        <div className="detail-header">
          <HomeOutlined className="detail-pane-icon" />
          <h2>Rental Prices:</h2>
        </div>
        <div className="housing-pane">
          {generatePriceDisplay(rent.rental_pct_chg)}
          <Tabs defaultActiveKey="1">
            {aptTypes.map((name, idx) => (
              <TabPane key={idx} tab={name} className="rental-price-tab">
                ${rent[name.toLowerCase()]}
              </TabPane>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
