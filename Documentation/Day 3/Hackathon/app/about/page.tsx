import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Image from "next/image";

export default function About() {
  const stats = [
    { number: "10k+", label: "Happy Customers" },
    { number: "1000+", label: "Products" },
    { number: "50+", label: "Store Locations" },
    { number: "24/7", label: "Customer Support" },
  ];

  const values = [
    {
      title: "Quality Craftsmanship",
      description:
        "Every piece is crafted with premium materials and attention to detail",
    },
    {
      title: "Sustainable Materials",
      description:
        "We source eco-friendly materials to protect our environment",
    },
    {
      title: "Customer Satisfaction",
      description: "Your comfort and satisfaction are our top priorities",
    },
    {
      title: "Innovation in Design",
      description: "Blending modern aesthetics with timeless functionality",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 sm:mb-16">
          <div className="relative w-full h-64 md:h-96">
            <Image 
              src="/images/TextBlock.png"
              alt="Text Block"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="relative w-full h-64 md:h-96">
            <Image 
              src="/images/chair.png"
              alt="Chair"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            Crafting Comfort Since 2022
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Comforty has been dedicated to providing high-quality furniture that
            combines style, comfort, and durability. Our mission is to help create
            beautiful living spaces that reflect your personal style.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 sm:mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 text-center"
            >
              <div className="text-2xl sm:text-3xl font-bold text-[#2B9DC3] mb-2">
                {stat.number}
              </div>
              <div className="text-sm sm:text-base text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-12 text-center">
            What Makes Our Brand Different
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-bold text-lg text-[#2B9DC3]">
                  {value.title}
                </h3>
                <p className="text-[#2B9DC3] text-sm sm:text-base">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 sm:mt-16 text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">
            Our Popular Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="relative w-70 h-100">
              <Image 
                src="/images/Product Card.png"
                alt="Popular Product"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="relative w-full h-64">
              <Image 
                src="/images/Product Card (1).png"
                alt="Popular Product 2"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="relative w-full h-64">
              <Image 
                src="/images/Product Card (2).png"
                alt="Popular Product 3"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-gray-600 mb-6">
            Explore our collection and find the perfect pieces for your home
          </p>
          <a
            href="/shop"
            className="inline-block bg-[#2B9DC3] hover:bg-[#2589ab] text-white px-8 py-3 rounded-lg transition-colors"
          >
            Shop Now
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}
