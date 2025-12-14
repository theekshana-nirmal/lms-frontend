import { FOOTER_CONTENT } from "@/constants/data";

const Footer = () => {
  return (
    <footer className="mt-auto w-full bg-accent/50 border-t border-border/40">
      <div className="flex justify-center items-center flex-col text-center p-4">
        <p className="text-sm text-muted-foreground">{FOOTER_CONTENT.text}</p>
      </div>
    </footer>
  );
};

export default Footer;
