import { FEATURES_CONTENT } from "@/constants/data";

const Features = () => {
  return (
    <div className="flex max-w-7xl mx-auto gap-8 py-16">
      <div className="flex flex-col flex-1 gap-8">
        <h2>{FEATURES_CONTENT.title}</h2>
        <div className="ml-8">
          {FEATURES_CONTENT.bulletPoints.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <img
          src={FEATURES_CONTENT.image}
          alt="Features"
          width="640px"
          className="border border-gray-200 rounded-2xl"
        />
      </div>
    </div>
  );
};

export default Features;
