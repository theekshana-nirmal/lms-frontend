import { FAQ_CONTENT } from "@/constants/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const FAQ = () => {
  return (
    <div className="flex items-center max-w-7xl mx-auto gap-8 py-8 min-h-screen">
      <div className="flex flex-col flex-1">
        <img
          src={FAQ_CONTENT.image}
          alt="FAQ image"
          width="640px"
          className="border border-gray-200 rounded-2xl"
        />
      </div>
      <div className="flex flex-col flex-1 gap-8">
        <h2>{FAQ_CONTENT.title}</h2>
        <div>
          <Accordion type="single" collapsible className="space-y-2">
            {FAQ_CONTENT.faqs.map((item, index) => (
              <AccordionItem
                value={`item-${index}`}
                key={index}
                className="border! border-gray-100! rounded-xl p-4"
              >
                <AccordionTrigger className="text-lg font-semibold">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-lg text-gray-600 pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
