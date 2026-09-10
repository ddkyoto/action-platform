'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { formatDistanceToNow } from '@/lib/utils';

interface Event {
  id: string;
  title: string;
  description: string;
  type: string;
  location: string;
  country: string;
  startDate: string;
  endDate: string;
  organizer: { name: string; avatarColor: string };
  attendees: any[];
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    fetchEvents();
  }, [country, type]);

  async function fetchEvents() {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (country) params.append('country', country);
      if (type) params.append('type', type);
      
      const response = await axios.get(`/api/events?${params.toString()}`);
      setEvents(response.data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
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
            <Link href="/events" className="text-emerald-600 font-semibold">
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
            </select>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="input max-w-xs"
            >
              <option value="">All Types</option>
              <option value="protest">Protest</option>
              <option value="meeting">Meeting</option>
              <option value="town_hall">Town Hall</option>
              <option value="community_gathering">Community Gathering</option>
              <option value="workshop">Workshop</option>
            </select>
            <Link href="/events/create" className="btn btn-primary ml-auto">
              + Create Event
            </Link>
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="container py-10">
        {loading ? (
          <div className="text-center text-gray-600">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="text-center text-gray-600 py-10">
            <p className="text-lg">No upcoming events</p>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="card hover:shadow-md transition-shadow flex gap-4"
              >
                <div
                  className="w-16 h-16 rounded-lg flex-shrink-0 flex items-center justify-center text-2xl"
                  style={{ backgroundColor: event.organizer.avatarColor }}
                >
                  📅
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(event.startDate).toLocaleDateString()} at{' '}
                    {new Date(event.startDate).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                      {event.type}
                    </span>
                    <span className="text-xs text-gray-500">
                      {event.attendees.length} attending
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
