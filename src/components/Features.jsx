import { FEATURES_CONTENT } from "@/constants/data";

const Features = () => {
  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto gap-8 py-8 md:py-16 px-4 sm:px-8">
      <div className="flex flex-col flex-1 gap-8 p-4 sm:p-8 md:p-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl">
          {FEATURES_CONTENT.title}
        </h2>
        <div className="ml-4 sm:ml-8 space-y-2">
          {FEATURES_CONTENT.bulletPoints.map((item, index) => (
            <li key={index} className="text-sm sm:text-base">
              {item}
            </li>
          ))}
        </div>
      </div>
      <div className="flex flex-col flex-1 md:flex-2 items-center md:items-end">
        <img
          src={FEATURES_CONTENT.image}
          alt="Features"
          className="w-full max-w-160 border border-gray-200 rounded-2xl"
        />
      </div>
    </div>
  );
};

export default Features;
