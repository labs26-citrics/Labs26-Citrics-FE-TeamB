//Library imports
import React from "react";
import { Typography, Card, Button } from "antd";
import { connect } from "react-redux";
import { toggleDrawer } from "../../../state/actions";
//Styles
import {
  EnvironmentFilled,
  CloudFilled,
  ProfileFilled
} from "@ant-design/icons";

const { Text } = Typography;

function RenderHomePage({ toggleDrawer }) {
  const openNav = () => {
    toggleDrawer();
  };
  return (
    <>
      <div className="home-container" role="img" />
      <Card className="title-card">
        <h1>Citrics</h1>
        <h2>One-stop for City Metrics!</h2>
        <br />
        <EnvironmentFilled className="bullet-points" />
        &nbsp;<Text className="bullet-points">Search for a city</Text>
        <br />
        <CloudFilled className="bullet-points" />
        &nbsp;<Text className="bullet-points">View popular demographics</Text>
        <br />
        <ProfileFilled className="bullet-points" />
        &nbsp;<Text className="bullet-points">Compare with other cities</Text>
        <br />
        <br />
        <Button type="primary" className="GSbutton" onClick={openNav}>
          Get Started
        </Button>
      </Card>
    </>
  );
}
export default connect(null, { toggleDrawer })(RenderHomePage);
