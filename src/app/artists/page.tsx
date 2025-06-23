'use client';
import dynamic from 'next/dynamic';

const ArtistListingPage = dynamic(() => import('@/components/ArtistListingPage'), {
  ssr: false,
});

export default function ArtistsPage() {
  return <ArtistListingPage />;
}
