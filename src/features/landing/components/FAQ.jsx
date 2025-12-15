import { FAQ_CONTENT } from "@/features/landing/constants/landingContent";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div
      id="faq"
      className="flex flex-col md:flex-row items-center max-w-7xl mx-auto gap-8 py-8 md:py-16 px-4 sm:px-8 border-t border-gray-200"
    >
      <div className="flex flex-col flex-1 order-2 md:order-1">
        <img
          src={FAQ_CONTENT.image}
          alt="FAQ image"
          loading="lazy"
          className="w-full max-w-160 border border-gray-200 rounded-2xl"
        />
      </div>
      <div className="flex flex-col flex-1 gap-8 order-1 md:order-2">
        <h2 className="text-2xl sm:text-3xl md:text-4xl">
          {FAQ_CONTENT.title}
        </h2>
        <div>
          <Accordion type="single" collapsible className="space-y-2">
            {FAQ_CONTENT.faqs.map((item, index) => (
              <AccordionItem
                value={`item-${index}`}
                key={index}
                className="border! border-gray-100! rounded-xl p-4"
              >
                <AccordionTrigger className="text-base sm:text-lg font-semibold">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base md:text-lg text-gray-600 pb-4">
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
