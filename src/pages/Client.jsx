import React, { useContext } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Navbar from "../components/Navbar";
import Bank from "../components/Bank";
import Requests from "../components/Requests";
import { ClientContext } from "../contexts/client";
import { Skeleton } from "@mui/material";

export default function Client() {
  const [value, setValue] = React.useState(0);
  const { userRequests, loadingUserRequests } = useContext(ClientContext);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // if (!loadingUserRequests) {
  //   console.log(userRequests["all"]);
  // }
  const style = {
    marginLeft: "55px",
  };

  return (
    <section className="section section-center">
      <Navbar />
      <Box sx={{ bgcolor: "background.paper", display: "flex" }}>
        <Tabs
          orientation="vertical"
          // variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider", width: "250px", maxWidth: "300px" }}
        >
          <Tab className="text" label="All blood banks" {...a11yProps(0)} />
          <Tab className="text" label="Requests" {...a11yProps(1)} />
          <Tab className="text" label="Approved" {...a11yProps(4)} />
          <Tab className="text" label="Pending" {...a11yProps(3)} />
          <Tab className="text" label="Rejected" {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Bank />
        </TabPanel>
        <TabPanel style={style} value={value} index={1}>
          {!loadingUserRequests ? (
            <Requests type="all" data={userRequests} />
          ) : (
            <Skeleton variant="rectangular" width={410} height={118} />
          )}
        </TabPanel>
        <TabPanel style={style} value={value} index={2}>
          {loadingUserRequests ? (
            <Skeleton variant="rectangular" width={410} height={118} />
          ) : (
            <Requests type="approved" data={userRequests} />
          )}
        </TabPanel>
        <TabPanel style={style} value={value} index={3}>
          {loadingUserRequests ? (
            <Skeleton variant="rectangular" width={410} height={118} />
          ) : (
            <Requests type="pending" data={userRequests} />
          )}
        </TabPanel>
        <TabPanel style={style} value={value} index={4}>
          {loadingUserRequests ? (
            <Skeleton variant="rectangular" width={410} height={118} />
          ) : (
            <Requests type="rejected" data={userRequests} />
          )}
        </TabPanel>
      </Box>
    </section>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
