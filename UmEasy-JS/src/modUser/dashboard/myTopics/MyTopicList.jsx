import { useState } from "react";
import MyTopic from "./MyTopic";
import VtoRocksList from "./VtoRocksList";
import MeetingTodoList from "./MeetingTodoList";
import MeetingRocksList from "./MeetingRocksList";
import VtoIssueList from "./VtoIssueList";
import MeetingIssueList from "./MeetingIssueList";
import MeetingHeadlineList from "./MeetingHeadlineList";
import TodoPersonalList from "./TodoPersonalList";

const myTopicList = [
  {
    title: "Personal Todo",
    content: <TodoPersonalList />,
  },
  {
    title: "Meeting Todo",
    content: <MeetingTodoList />,
  },
  {
    title: "Meeting Headline",
    content: <MeetingHeadlineList />,
  },
  {
    title: "Meeting Rocks",
    content: <MeetingRocksList />,
  },
  {
    title: "Meeting Measurables",
    content: "Up Coming",
  },

  {
    title: "Meeting Issue",
    content: <MeetingIssueList />,
  },
  {
    title: "Vto Rocks",
    content: <VtoRocksList />,
  },

  {
    title: "Vto Issue",
    content: <VtoIssueList />,
  },
];

const MyTopicList = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div>
      {myTopicList.map((member, index) => (
        <MyTopic
          key={index}
          title={member.title}
          image={member.image}
          content={member.content}
          isExpanded={expandedIndex === index}
          onClick={() => toggleExpand(index)}
        />
      ))}
    </div>
  );
};

export default MyTopicList;
