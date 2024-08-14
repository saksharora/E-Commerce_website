import { FOOTER_INFO } from "~/constants";

const Footer = () => {
  const { content } = FOOTER_INFO;
  return (
    <footer className="bg-primary py-8 md:py-12">
      <div className="container mx-auto px-4">
        <p className="text-white text-center text-sm md:text-base lg:text-lg">
          {content}
        </p>
      </div>
    </footer>
  );
};

export default Footer;

