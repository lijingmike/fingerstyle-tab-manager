import React, {useState, useEffect} from "react";
import TabTable from "./Component/TabTable";
import TabUploadButton from "./Component/TabUploadButton";
import axiosCall from "./Utils/axiosCall";

function App() {
  const [tabListChanged, setTabListChanged] = useState(false);
  const [tabs, setTabs] = useState([]);
  const [tunings, setTunings] = useState([]);
  
  useEffect(() => {
    axiosCall('GET', 'tabs', null, ((responseData) => setTabs(responseData)));
  }, [tabListChanged])
  
  useEffect(() => {
    axiosCall('GET', 'tunings', null, ((responseData) => setTunings(responseData))); 
  }, [])
  

  return (
    <div className="tab-container">
      <TabUploadButton tabListChanged={tabListChanged} setTabListChanged={setTabListChanged} tunings={tunings} />
      <TabTable tabs={tabs} tabListChanged={tabListChanged} setTabListChanged={setTabListChanged} />
    </div>
  );
}

export default App;
