import { useState } from "react";
import AddSession from "./AddSession/AddSession";
import Header from "./Header/Header";
import StudentSession from "./StudentSession/StudentSession";
import CollapseButton from "./CollapseButton/CollapseButton";
import "./Session.css";

const Session = () => {
  const [collapse, setCollapse] = useState<boolean>(false);
  const [addSession, setAddSession] = useState<boolean>(false);

  return (
    <div className="session">
      <Header title="Alice Lee" />
      <div className="session-content">
        <div className="session-buttons">
          <CollapseButton collapse={collapse} setCollapse={setCollapse} />
          <AddSession addSession={addSession} setAddSession={setAddSession} />
        </div>
        {addSession ? (
          <StudentSession
            teacherName=""
            role="Mentor"
            date=""
            startTime=""
            endTime=""
            reason=""
            summary=""
            collapse={false}
            newLog={true}
            removeSession={() => setAddSession(false)}
          />
        ) : (
          <></>
        )}
        <StudentSession
          teacherName="John Smith"
          role="Mentor"
          date="2022-09-30"
          startTime="16:00"
          endTime="18:00"
          reason="Reason 2"
          summary="hello world"
          collapse={collapse}
        />
        <StudentSession
          teacherName="John Smith"
          role="Tutor"
          date="2022-09-30"
          startTime="16:00"
          endTime="18:00"
          reason="Reason 2"
          summary="hello world"
          collapse={collapse}
        />
      </div>
    </div>
  );
};

export default Session;
