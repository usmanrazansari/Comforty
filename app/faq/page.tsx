import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function FAQPage() {
  const leftFaqs = [
    {
      question: "What is your delivery policy?",
      answer: "We offer free delivery on orders over $999. Standard delivery typically takes 5-7 business days."
    },
    {
      question: "Do you offer assembly services?",
      answer: "Yes, we offer professional assembly services for an additional fee."
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns within 30 days of delivery. Items must be in original condition."
    }
  ];

  const rightFaqs = [
    {
      question: "Do you offer warranty?",
      answer: "Yes, we offer a 1-year warranty on all our furniture against manufacturing defects."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to select international destinations. Shipping costs vary by location."
    }
  ];

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {leftFaqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-3">{faq.question}</h2>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
          {/* Right Column */}
          <div className="space-y-6">
            {rightFaqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-3">{faq.question}</h2>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <div className="bg-white">
        <Footer variant="light" />
      </div>
    </>
  );
}
