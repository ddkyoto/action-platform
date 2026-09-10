'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session?.user) {
    return null;
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
            <Link href="/profile" className="text-emerald-600 font-semibold">
              Profile
            </Link>
          </nav>
        </div>
      </header>

      <section className="container max-w-2xl py-10">
        <div className="card">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {session.user.name}
              </h1>
              <p className="text-gray-600">{session.user.email}</p>
            </div>
            <button
              onClick={() => signOut()}
              className="btn btn-secondary"
            >
              Sign Out
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-emerald-600">0</div>
              <div className="text-sm text-gray-600">Petitions Created</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-emerald-600">0</div>
              <div className="text-sm text-gray-600">Signatures</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-emerald-600">0</div>
              <div className="text-sm text-gray-600">Events Attended</div>
            </div>
          </div>

          <div className="space-y-4">
            <Link href="/petitions/create" className="btn btn-primary w-full">
              Create a Petition
            </Link>
            <Link href="/events/create" className="btn btn-secondary w-full">
              Organize an Event
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
