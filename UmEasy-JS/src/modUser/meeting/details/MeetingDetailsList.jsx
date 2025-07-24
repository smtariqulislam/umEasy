import TopHeader from "../../../components/TopHeader";
import MeetingList from "../list/MeetingList";

const MeetingDetailsList = () => {
  return (
    <>
      <div className="card w-full max-w-screen-xl">
        <TopHeader title="Meeting" path="/createmeeting" btn="Save" />

        <div>
          <MeetingList />
        </div>
      </div>
    </>
  );
};

export default MeetingDetailsList;
