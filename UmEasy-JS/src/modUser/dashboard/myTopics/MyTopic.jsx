const MyTopic = ({ title, content, isExpanded, onClick }) => (
  <div className="w-full h-full">
    <div
      className="flex items-center cursor-pointer rounded w-full transition duration-300 hover:bg-gray-100" // Add hover effect on the entire div
      onClick={onClick}
      style={{ userSelect: "none" }}
    >
      <span
        className={`transform transition-transform duration-500 ease-in-out text-4xl ${
          isExpanded ? "rotate-180 text-umojablue" : "text-umojayellow"
        }`}
        style={{ display: "flex", alignItems: "end", marginRight: "16px" }} // Increase the margin right for more gap
      >
        {isExpanded ? "−" : "+"}
      </span>
      <h3
        className={`text-2xl font-bold flex-grow text-left ${
          isExpanded ? "text-umojayellow" : "text-black"
        } transition-colors duration-300`}
      >
        {title}
      </h3>
    </div>
    <hr className="border-umojayellow" />
    <div
      className={`overflow-hidden transition-all duration-500 ease-in-out ${
        isExpanded ? "max-h-[30rem] opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div>{content}</div>
    </div>
  </div>
);

export default MyTopic;
