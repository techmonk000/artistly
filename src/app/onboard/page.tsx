'use client';

import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useState } from 'react';

type FormData = {
  name: string;
  bio: string;
  category: string[];
  languages: string[];
  feeRange: string;
  location: string;
  image: FileList;
};

const categories = ['Singer', 'DJ', 'Dancer', 'Speaker'];
const languages = ['English', 'Hindi', 'Bengali', 'Tamil', 'Telegu', 'Punjabi'];
const feeRanges = ['0-9999', '10000-14999', '15000+'];

export default function OnboardArtist() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    const artistData = {
      name: data.name,
      bio: data.bio,
      category: data.category.join(', '),
      languages: data.languages.join(', '),
      feeRange: data.feeRange,
      location: data.location,
      image: imagePreview || '',
    };

    try {
      const res = await fetch('https://6859a4e39f6ef9611153cb5a.mockapi.io/artists/artists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(artistData),
      });

      if (!res.ok) throw new Error('Submission failed');

      alert('Artist onboarded successfully!');
      reset();
      setImagePreview(null);
    } catch (err) {
      alert('Something went wrong. Try again.');

      console.log(err);
    }
  };

  return (
    <div className="pt-60 px-6 min-h-screen bg-gradient-to-br from-[#1c1c1e] via-[#2e2e2f] to-[#0a0a0a] text-white">
      <h1 className="text-4xl font-bold mb-10 text-center">Onboard an Artist</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl mx-auto bg-[#1a1a1a] p-8 rounded-xl shadow-xl space-y-6"
      >
        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            {...register('name', { required: true })}
            className="w-full px-4 py-2 bg-[#2a2a2a] rounded-md outline-none"
            placeholder="Enter artist's full name"
          />
          {errors.name && <span className="text-red-400 text-sm">Name is required.</span>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Short Bio</label>
          <textarea
            {...register('bio', { required: true })}
            rows={4}
            className="w-full px-4 py-2 bg-[#2a2a2a] rounded-md outline-none"
            placeholder="Write a brief description"
          />
          {errors.bio && <span className="text-red-400 text-sm">Bio is required.</span>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-2">
                <input type="checkbox" value={cat} {...register('category')} />
                {cat}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Languages Spoken</label>
          <div className="grid grid-cols-2 gap-3">
            {languages.map((lang) => (
              <label key={lang} className="flex items-center gap-2">
                <input type="checkbox" value={lang} {...register('languages')} />
                {lang}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Fee Range</label>
          <select
            {...register('feeRange', { required: true })}
            className="w-full px-4 py-2 bg-[#2a2a2a] rounded-md"
          >
            <option value="">Select</option>
            {feeRanges.map((fee) => (
              <option key={fee} value={fee}>
                ₹{fee}
              </option>
            ))}
          </select>
          {errors.feeRange && <span className="text-red-400 text-sm">Fee range is required.</span>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            {...register('location', { required: true })}
            className="w-full px-4 py-2 bg-[#2a2a2a] rounded-md outline-none"
            placeholder="Enter city name"
          />
          {errors.location && <span className="text-red-400 text-sm">Location is required.</span>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Upload Profile Image</label>
          <div className="flex items-center gap-4">
            <label
              htmlFor="imageUpload"
              className="bg-white text-black font-medium px-4 py-2 rounded-md cursor-pointer hover:bg-gray-200 transition"
            >
              Choose File
            </label>
            <span className="text-sm text-gray-400">
              {imagePreview ? 'File selected ✅' : 'No file chosen'}
            </span>
          </div>

          <input
            type="file"
            accept="image/*"
            id="imageUpload"
            {...register('image')}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                  setImagePreview(reader.result as string);
                };
                reader.readAsDataURL(file);
              }
            }}
            className="hidden"
          />

          {imagePreview && (
            <div className="mt-4">
              <Image
                src={imagePreview}
                alt="Preview"
                width={400}
                height={300}
                className="rounded-md"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-md transition"
        >
          Submit Artist
        </button>
      </form>
    </div>
  );
}
