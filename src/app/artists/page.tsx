'use client';

import { useState } from 'react';
import { artists } from '@/data/artistData';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';


const categories = ['All', 'Singer', 'DJ', 'Dancer', 'Speaker'];
const locations = ['All', 'Delhi', 'Mumbai', 'Bangalore', 'Chennai'];
const priceRanges = ['All', '0-9999', '10000-14999', '15000+'];





export default function ArtistListingPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');

  
    


  const filteredArtists = artists.filter((artist) => {
  const matchCategory =
    selectedCategory === 'All' || artist.category === selectedCategory;

  const matchLocation =
    selectedLocation === 'All' || artist.location === selectedLocation;

  const matchPrice =
    selectedPrice === 'All' ||
    (selectedPrice === '0-9999' && artist.price <= 9999) ||
    (selectedPrice === '10000-14999' && artist.price >= 10000 && artist.price <= 14999) ||
    (selectedPrice === '15000+' && artist.price >= 15000);

  return matchCategory && matchLocation && matchPrice;
});

  return (
    <div className="pt-60 px-6 min-h-screen bg-gradient-to-br from-[#1c1c1e] via-[#2e2e2f] to-[#0a0a0a] text-white">
      <h1 className="text-5xl font-bold mb-8 bg-clip-text bg-gradient-to-r text-transparent from-purple-600 to-pink-600  text-center">Explore Artists</h1>

      
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-10">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-[#0f0f0f] text-white px-4 py-2 rounded-md"
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="bg-[#0f0f0f] text-white px-4 py-2 rounded-md"
        >
          {locations.map((loc) => (
            <option key={loc}>{loc}</option>
          ))}
        </select>
        <select
          value={selectedPrice}
          onChange={(e) => setSelectedPrice(e.target.value)}
          className="bg-[#0f0f0f] text-white px-4 py-2 rounded-md"
        >
          {priceRanges.map((range) => (
            <option key={range}>{range}</option>
          ))}
        </select>

      </div>

      {/* Artists Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {filteredArtists.map((artist) => (
          <div
            key={artist.id}
            className="bg-[#1a1a1a] hover:bg-[#222] transition p-5 rounded-xl shadow-lg text-center"
          >
            <Image
              src={artist.image}
              alt={`Book ${artist.name} - ${artist.category}`}
              width={600}
              height={400}
              className="h-52 w-full object-cover rounded-md mb-4"
              loading="lazy"
            />
            <h3 className="text-xl font-semibold">{artist.name}</h3>
            <p className="text-gray-400">{artist.category} • {artist.location}</p>
            <p className="text-purple-400 font-semibold mt-2">₹{artist.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
