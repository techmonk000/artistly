'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleCardClick = (category: string) => {
    router.push(`/artists?category=${encodeURIComponent(category)}`);
  };

  return (
    <section className="pt-60 min-h-screen w-full bg-gradient-to-br from-[#1c1c1e] via-[#2e2e2f] to-[#0a0a0a] text-white py-16 px-6">

      <div className="max-w-5xl mx-auto text-center mb-20">
        <h1 className="text-3xl sm:text-3xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Discover & Book Top Artists for Your Next Event
        </h1>
        <p className="text-base sm:text-2xl  md:text-xl text-gray-300 mb-8">
          Artistly helps event planners connect with singers, dancers, DJs, and speakers effortlessly.
        </p>
        <a
          href="/artists"
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition"
        >
          Explore Artists
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 mt-5 lg:grid-cols-4 gap-12 sm:gap-12 max-w-6xl mx-auto">
        {[
          { title: 'Singer', image: '/images/singer.jpg' },
          { title: 'Dancer', image: '/images/dancer.jpg' },
          { title: 'DJ', image: '/images/dj.jpg' },
          { title: 'Speaker', image: '/images/speaker.jpg' },
        ].map((category) => (
          <div
            key={category.title}
            onClick={() => handleCardClick(category.title)}
            className="cursor-pointer bg-[#1a1a1a] hover:bg-[#222] transform hover:scale-105 transition-all duration-300 p-6 rounded-xl shadow-lg text-center"
          >
            <Image
              src={category.image}
              alt={category.title}
              width={600}
              height={400}
              className="h-40 sm:h-56 md:h-64 w-full object-cover rounded-md mb-4"
              priority
            />
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">{category.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
