import { FOOTER_CONTENT } from "@/constants/data";

const Footer = () => {
  return (
    <div className="flex justify-center items-center flex-col text-center bg-accent p-4">
      <p className="text-sm">{FOOTER_CONTENT.text}</p>
    </div>
  );
};

export default Footer;
