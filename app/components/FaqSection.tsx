export default function FAQSection() {
    const faqs = [
      {
        question: "What is your delivery policy?",
        answer: "We offer free delivery on orders over $999. Standard delivery typically takes 5-7 business days."
      },
      // ... other FAQs
    ];

    return (
      <section className="py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
}