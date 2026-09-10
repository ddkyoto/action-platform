'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import axios from 'axios';

export default function CreatePetitionPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'infrastructure',
    location: '',
    country: 'United States',
    targetOfficial: '',
    supporterGoal: 1000,
    showInternational: true,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!session) {
      router.push('/auth/signin');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/petitions', formData);
      router.push(`/petitions/${response.data.id}`);
    } catch (error) {
      console.error('Failed to create petition:', error);
      alert('Failed to create petition');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-emerald-700">
            ✓ Action
          </Link>
          <nav className="flex gap-4">
            <Link href="/petitions" className="text-gray-600 hover:text-gray-900">
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

      <section className="container max-w-2xl py-10">
        <div className="card">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Create a Petition
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Petition Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="input"
                placeholder="What is your petition about?"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="textarea"
                placeholder="Describe your petition in detail..."
                rows={5}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="input"
                >
                  <option value="infrastructure">Infrastructure</option>
                  <option value="environment">Environment</option>
                  <option value="public_safety">Public Safety</option>
                  <option value="education">Education</option>
                  <option value="housing">Housing</option>
                  <option value="transportation">Transportation</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="input"
                  placeholder="City or Region"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Country
                </label>
                <select
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                  className="input"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Supporter Goal
                </label>
                <input
                  type="number"
                  value={formData.supporterGoal}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      supporterGoal: parseInt(e.target.value),
                    })
                  }
                  className="input"
                  min="10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Target Official
              </label>
              <input
                type="text"
                value={formData.targetOfficial}
                onChange={(e) =>
                  setFormData({ ...formData, targetOfficial: e.target.value })
                }
                className="input"
                placeholder="e.g., Mayor, Governor, Representative"
                required
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="international"
                checked={formData.showInternational}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    showInternational: e.target.checked,
                  })
                }
              />
              <label htmlFor="international" className="text-gray-700">
                Allow international support
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? 'Creating...' : 'Create Petition'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
