import MeetingList from "../meeting/list/MeetingList";
import MyTopicList from "./myTopics/MyTopicList";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <div className="card w-full max-w-screen-xl mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col items-start">
            <div className="w-full flex flex-row items-center justify-between">
              <p className="text-3xl">My Meeting</p>

              <Link to="/createmeeting">
                <p className="bg-blue-500 px-4 py-2 text-white text-lg rounded hover:bg-blue-700 transition-colors duration-300">
                  Create Meeting
                </p>
              </Link>
            </div>
            <div className="w-full">
              <MeetingList />
            </div>
          </div>
          <div className="h-full">
            <MyTopicList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
