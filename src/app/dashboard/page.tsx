'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type Artist = {
  id: string;
  name: string;
  bio: string;
  category: string;
  languages: string;
  feeRange: string;
  location: string;
  image: string;
};

export default function Dashboard() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      fetch('https://6859a4e39f6ef9611153cb5a.mockapi.io/artists/artists')
        .then((res) => res.json())
        .then((data) => {
          setArtists(data);
          setLoading(false);
        });
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    if (username === 'manager' && password === 'event123') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  const deleteArtist = async (id: string) => {
    await fetch(`https://6859a4e39f6ef9611153cb5a.mockapi.io/artists/artists/${id}`, {
      method: 'DELETE',
    });
    setArtists((prev) => prev.filter((a) => a.id !== id));
  };

  if (!isLoggedIn) {
    return (
      <div className="pt-60 px-6 min-h-screen bg-gradient-to-br from-[#1c1c1e] via-[#2e2e2f] to-[#0a0a0a] text-white flex flex-col items-center justify-start">
        <h1 className="text-4xl font-bold mb-8 text-center">Manager Login</h1>
        <div className="bg-[#1a1a1a] p-8 rounded-xl shadow-lg w-full max-w-md space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-[#2a2a2a] outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-[#2a2a2a] outline-none"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition"
          >
            Sign In
          </button>
          {error && <p className="text-red-400 text-center">{error}</p>}
          <div className="text-sm text-gray-400 mt-4 text-center">
            <p>Demo Username: <span className="font-mono">manager</span></p>
            <p>Demo Password: <span className="font-mono">event123</span></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-60 px-6 min-h-screen bg-gradient-to-br from-[#1c1c1e] via-[#2e2e2f] to-[#0a0a0a] text-white">
      <h1 className="text-4xl font-bold mb-10 text-center">Artist Submissions</h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading artists...</p>
      ) : artists.length === 0 ? (
        <p className="text-center text-gray-400">No artist submissions yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border border-gray-700">
            <thead className="bg-[#2a2a2a] text-white">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Fee</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {artists.map((artist) => (
                <tr key={artist.id} className="border-t border-gray-700 hover:bg-[#333] transition">
                  <td className="px-4 py-3">{artist.name}</td>
                  <td className="px-4 py-3">{artist.category}</td>
                  <td className="px-4 py-3">{artist.location}</td>
                  <td className="px-4 py-3">₹{artist.feeRange}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => setSelectedArtist(artist)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
                    >
                      View
                    </button>
                    <button
                      onClick={() => alert('Edit functionality coming soon')}
                      className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded-md text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteArtist(artist.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedArtist && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] p-6 rounded-xl shadow-xl max-w-xl w-full text-white relative">
            <button
              onClick={() => setSelectedArtist(null)}
              className="absolute top-3 right-4 text-white text-xl"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedArtist.name}</h2>
            <Image
              src={selectedArtist.image}
              alt={selectedArtist.name}
              width={500}
              height={300}
              className="rounded-md mb-4"
            />
            <p className="mb-2 text-gray-400">{selectedArtist.bio}</p>
            <p className="mb-1"><span className="font-semibold">Category:</span> {selectedArtist.category}</p>
            <p className="mb-1"><span className="font-semibold">Languages:</span> {selectedArtist.languages}</p>
            <p className="mb-1"><span className="font-semibold">Fee Range:</span> ₹{selectedArtist.feeRange}</p>
            <p><span className="font-semibold">Location:</span> {selectedArtist.location}</p>
          </div>
        </div>
      )}
    </div>
  );
}
