import { useState, Suspense, lazy } from "react";
import Slider from "react-slick";
import Modal from "react-modal";

const DonationForm = lazy(() => import("../components/DonationForm"));
import banner1 from "../assets/images/donte_make_diffrence.png";
import banner2 from "../assets/images/cow_shelter.png";
import banner3 from "../assets/images/cow_eat.png";
import HomePetAnimal from "../components/HomePetAnimal";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToDonate = () => {
    const form = document.getElementById("donate-form");
    if (form) {
      form.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    arrows: false,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="px-2 sm:px-4 md:px-8">
      {/*  Carousel Banner */}
      <div className="relative w-full">
        <Slider {...sliderSettings}>
          {[banner1, banner2, banner3].map((img, idx) => (
            <div key={idx}>
              <div className="relative w-full h-72 sm:h-96 md:h-[500px] overflow-hidden">
                <img
                  loading="lazy"
                  src={img}
                  alt={`Banner ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center p-4">
                  <h1 className="text-xl sm:text-2xl md:text-4xl font-bold leading-tight mb-4 max-w-2xl">
                    Please save our 200+ dogs from becoming homeless. <br />
                    Help us build a permanent home!
                  </h1>
                  <button
                    onClick={scrollToDonate}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-5 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-semibold shadow-md"
                  >
                    Donate Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        <span className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow">
          Urgent Funds Required
        </span>
      </div>

      {/*  Donation Box */}
      <div className="max-w-md mx-auto -mt-14 sm:-mt-16 z-10 relative bg-white border rounded-xl shadow-lg p-5 sm:p-6 text-center">
        <h2 className="font-logo text-xl sm:text-2xl text-gray-700 mb-2">
          Pet Shelter
        </h2>
        <button className="border border-blue-500 text-blue-500 px-3 py-1 rounded-full text-xs sm:text-sm mb-3">
          80G Tax Benefits
        </button>

        <div className="space-y-3 mb-4">
          <button
            onClick={scrollToDonate}
            className="w-full bg-orange-500 text-white py-2 rounded-full text-sm font-semibold"
          >
            Donate Monthly
          </button>
          <button
            onClick={scrollToDonate}
            className="w-full border border-orange-500 text-orange-500 py-2 rounded-full text-sm font-semibold"
          >
            Donate One-time
          </button>
        </div>

        <p className="text-xs sm:text-sm text-gray-600 mb-2">
          Donate via Card, Netbanking, UPI & Wallet
        </p>
        <p className="text-xs sm:text-sm text-gray-700 mb-2 font-medium">
          Share this campaign
        </p>

        <div className="flex justify-center space-x-3 text-lg sm:text-xl relative z-20">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="z-30"
          >
            <i className="fab fa-facebook-f text-blue-600 cursor-pointer"></i>
          </a>

          <a
            href="https://wa.me/919511576324"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="z-30"
          >
            <i className="fab fa-whatsapp text-green-500 cursor-pointer"></i>
          </a>

          <a
            href="https://x.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="z-30"
          >
            <i className="fab fa-twitter text-sky-500 cursor-pointer"></i>
          </a>

          <a
            href="mailto:ankitsingh87201@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
            className="z-30"
          >
            <i className="fas fa-envelope text-red-500 cursor-pointer"></i>
          </a>
        </div>

        <p className="text-xs text-gray-400 mt-2">
          Every share can bring Rs.3000
        </p>
      </div>

      {/* Impact Stats */}
      <div className="max-w-6xl mx-auto mt-16 sm:mt-20 px-2 sm:px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 text-center">
        <div className="bg-white shadow p-4 sm:p-6 rounded-lg">
          <h3 className="text-orange-600 font-bold text-lg sm:text-xl mb-2">
            Rs.500
          </h3>
          <p className="text-gray-700 text-sm sm:text-base">
            Feeds 5 dogs for a week
          </p>
        </div>
        <div className="bg-white shadow p-4 sm:p-6 rounded-lg">
          <h3 className="text-orange-600 font-bold text-lg sm:text-xl mb-2">
            Rs.2000
          </h3>
          <p className="text-gray-700 text-sm sm:text-base">
            Covers one dog's medical treatment
          </p>
        </div>
        <div className="bg-white shadow p-4 sm:p-6 rounded-lg">
          <h3 className="text-orange-600 font-bold text-lg sm:text-xl mb-2">
            Rs.10,000
          </h3>
          <p className="text-gray-700 text-sm sm:text-base">
            Helps build kennel infrastructure
          </p>
        </div>
      </div>

      <HomePetAnimal />

      {/*  Donation Form */}
      <div
        id="donate-form"
        className="max-w-3xl mx-auto mt-16 sm:mt-20 border rounded-lg p-4 sm:p-6 shadow-md bg-white"
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-orange-600 mb-4 text-center">
          ❤️ Make a Donation
        </h2>

        <Suspense fallback={<div className="text-center">Loading form...</div>}>
          <DonationForm />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
