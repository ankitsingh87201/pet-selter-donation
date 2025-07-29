import { Link } from "react-router-dom";
import cat_shelter from "../assets/images/cat_shelter.png";
import cow_eat from "../assets/images/cow_eat.png";
import cow_medical from "../assets/images/cow_medical.png";
import cow_shelter from "../assets/images/cow_shelter.png";
import donation_box from "../assets/images/donation_box.png";
import dontate_today from "../assets/images/dontate_today.png";

const stories = [
  {
    _id: "1",
    name: "Safe Haven for Street Cats 🐱",
    image: cat_shelter,
    story: `This little cat was found hiding under a broken rickshaw, shivering and malnourished. She had no idea what a full meal or a gentle touch felt like.

Now, she's one of many cats who’ve found safety in our shelter. With soft bedding, daily meals, and playmates, she's living the life she was meant to.

Your donations help us keep the shelter warm, fed, and full of second chances.`,
    createdAt: "2024-06-20T00:00:00Z",
  },
  {
    _id: "2",
    name: "Feeding the Forgotten 🐄",
    image: cow_eat,
    story: `Every day, we come across cows abandoned on roadsides, searching for scraps of food near dustbins.

Thanks to kind donors, we now provide a steady supply of fodder, fruits, and clean water to these gentle beings.

Your support puts real food on empty stomachs—and dignity back into their lives.`,
    createdAt: "2024-05-12T00:00:00Z",
  },
  {
    _id: "3",
    name: "Healing With Compassion ❤️‍🩹",
    image: cow_medical,
    story: `This injured cow was found limping with an open wound near the highway. Her pain was silent, but unbearable.

With prompt medical attention and daily care at our shelter, she began to heal—slowly, but surely.

Your donations provide medicine, vet care, and hope for animals who can’t speak for themselves.`,
    createdAt: "2024-07-05T00:00:00Z",
  },
  {
    _id: "4",
    name: "A Shelter for Every Soul 🏠",
    image: cow_shelter,
    story: `Heat, rain, or cold—homeless cows suffer in every season. We built our cow shelter to give them protection and peace.

Now, dozens of rescued cows rest in clean sheds, sleep on dry hay, and live without fear.

Help us shelter more lives—because every animal deserves a roof and respect.`,
    createdAt: "2024-06-10T00:00:00Z",
  },
  {
    _id: "5",
    name: "Small Box, Big Impact 📦",
    image: donation_box,
    story: `Our donation box might look simple, but it changes lives. One evening’s collection helped us rescue a litter of kittens from a flooded gutter.

Every coin, every note counts. It gives food, vaccines, and emergency rescue when it matters most.

Your small act can mean a new beginning for an innocent life.`,
    createdAt: "2024-05-01T00:00:00Z",
  },
  {
    _id: "6",
    name: "Why Donate Today? 🌟",
    image: dontate_today,
    story: `Every minute counts. When an animal is hit by a vehicle or left to starve, time is everything.

Your donation today means we can act immediately—rescue, treat, and heal.

Don’t wait for tomorrow. Help us change a life today.`,
    createdAt: "2024-04-15T00:00:00Z",
  },
];

const HomePetAnimal = () => {
return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-orange-600 text-center">
        OUR WORK
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {stories.map((story) => (
          <Link to="/donate" key={story._id}>
            <div className="bg-white rounded-xl overflow-hidden shadow-md transition hover:shadow-lg cursor-pointer flex flex-col h-full min-h-[500px]">
              <img
                src={story.image}
                alt={story.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 sm:p-5 flex flex-col flex-grow">
                <h3 className="text-lg sm:text-xl font-semibold text-orange-500 mb-2">
                  {story.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-700 whitespace-pre-line flex-grow">
                  {story.story}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Posted on {new Date(story.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePetAnimal;
