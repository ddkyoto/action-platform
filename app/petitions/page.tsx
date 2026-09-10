'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import axios from 'axios';

interface Petition {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  country: string;
  currentSignatures: number;
  supporterGoal: number;
  createdAt: string;
  organizer: { name: string; avatarColor: string };
}

export default function PetitionsPage() {
  const { data: session } = useSession();
  const [petitions, setPetitions] = useState<Petition[]>([]);
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchPetitions();
  }, [country, category]);

  async function fetchPetitions() {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (country) params.append('country', country);
      if (category) params.append('category', category);
      
      const response = await axios.get(`/api/petitions?${params.toString()}`);
      setPetitions(response.data);
    } catch (error) {
      console.error('Failed to fetch petitions:', error);
    } finally {
      setLoading(false);
    }
  }

  const progress = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-emerald-700">
            ✓ Action
          </Link>
          <nav className="flex gap-4">
            <Link href="/petitions" className="text-emerald-600 font-semibold">
              Petitions
            </Link>
            <Link href="/feed" className="text-gray-600 hover:text-gray-900">
              Feed
            </Link>
            <Link href="/events" className="text-gray-600 hover:text-gray-900">
              Events
            </Link>
            <Link href="/profile" className="btn btn-secondary">
              Profile
            </Link>
          </nav>
        </div>
      </header>

      {/* Filters */}
      <section className="bg-white py-6 border-b">
        <div className="container">
          <div className="flex gap-4 flex-wrap">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="input max-w-xs"
            >
              <option value="">All Countries</option>
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Australia">Australia</option>
            </select>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input max-w-xs"
            >
              <option value="">All Categories</option>
              <option value="infrastructure">Infrastructure</option>
              <option value="environment">Environment</option>
              <option value="public_safety">Public Safety</option>
              <option value="education">Education</option>
              <option value="housing">Housing</option>
              <option value="transportation">Transportation</option>
            </select>
            <Link href="/petitions/create" className="btn btn-primary ml-auto">
              + Create Petition
            </Link>
          </div>
        </div>
      </section>

      {/* Petitions Grid */}
      <section className="container py-10">
        {loading ? (
          <div className="text-center text-gray-600">Loading petitions...</div>
        ) : petitions.length === 0 ? (
          <div className="text-center text-gray-600 py-10">
            <p className="text-lg">No petitions found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {petitions.map((petition) => (
              <Link
                key={petition.id}
                href={`/petitions/${petition.id}`}
                className="card hover:shadow-md transition-shadow"
              >
                <div
                  className="w-12 h-12 rounded-full mb-4"
                  style={{ backgroundColor: petition.organizer.avatarColor }}
                />
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {petition.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {petition.description}
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Support</span>
                    <span className="font-semibold">
                      {petition.currentSignatures} / {petition.supporterGoal}
                    </span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full transition-all"
                      style={{ width: `${progress(petition.currentSignatures, petition.supporterGoal)}%` }}
                    />
                  </div>
                </div>
                <div className="flex gap-2 text-xs text-gray-500">
                  <span className="bg-gray-100 px-2 py-1 rounded">
                    {petition.category}
                  </span>
                  <span className="bg-gray-100 px-2 py-1 rounded">
                    {petition.location}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
