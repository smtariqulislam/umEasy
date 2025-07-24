import React from "react";

// Update the image paths according to your project structure
const values = [
  {
    image: "/icons/Core-Values-Consistency.svg", // Corrected path
    title: "Consistency",
    subTitle: "Be Consistent",
    description: "Do the simple tasks right every day, every time.",
  },
  {
    image: "/icons/Core-Values-Integrity.svg", // Corrected path
    title: "Integrity",
    subTitle: "Have Integrity",
    description: "Do the right thing all the time even when no one is looking.",
  },
  {
    image: "/icons/Core-Values-Ambition.svg", // Corrected path
    title: "Ambition",
    subTitle: "Be Ambitious",
    description: "Strive to Innovate, grow, and improve in all you do.",
  },
  {
    image: "/icons/Core-Values-Positivity.svg", // Corrected path
    title: "Positivity",
    subTitle: "Be Positive",
    description: "Stay upbeat and keep a fun attitude.",
  },
  {
    image: "/icons/Core-Values-Unity.svg", // Updated to a valid image path
    title: "Unity",
    subTitle: "Be United",
    description: "United as one team in all that we do.",
  },
];

const CoreValues = () => {
  return (
    <>
      <div className="grid gap-4 text-umojablue py-10">
        <div className="text-center">
          <div className="text-3xl">Core Values</div>
          <div>
            At Umoja, our core values are the driving force behind how we do
            business and how we treat each other and our clients. By following
            these guiding principles, we believe we will always do our best to
            do the right thing in the right way and build fulfilling careers for
            our team members.
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {values.map((value, index) => (
            <div
              key={index}
              className="group rounded-bl-[10px] rounded-tl-[20px] rounded-br-[20px] rounded-tr-[10px] relative p-6 shadow-lg flex flex-col items-center bg-transparent border border-white transition-all duration-700 overflow-hidden cursor-pointer h-[200px]"
            >
              {/* Image and Title (initial view) */}
              <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center opacity-100 group-hover:opacity-0 group-hover:-translate-y-full transition-all duration-700">
                <img
                  src={value.image}
                  alt={value.title}
                  className="mb-4 w-24 h-24 object-contain"
                />
                <h3 className="text-xl font-semibold">{value.title}</h3>
              </div>

              {/* Subtitle and Description (hover view, moves up into place) */}
              <div className="absolute top-full left-0 right-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 group-hover:top-12 transition-all duration-700">
                <h4 className="text-lg font-medium mb-2">{value.subTitle}</h4>
                <div className="text-center px-4">{value.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CoreValues;
