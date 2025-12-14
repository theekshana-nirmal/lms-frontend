import { ABOUT_CONTENT } from "@/constants/data";

const About = () => {
  return (
    <div id="about" className="flex flex-col justify-center gap-y-4 max-w-7xl mx-auto text-center whitespace-break-spaces py-16 border-t border-gray-200">
      <h2>{ABOUT_CONTENT.title}</h2>
      <p>{ABOUT_CONTENT.description}</p>
    </div>
  );
};

export default About;
