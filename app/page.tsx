'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-emerald-700">✓ Action</div>
          <nav className="flex gap-4">
            {session ? (
              <>
                <Link href="/petitions" className="btn btn-secondary">
                  Petitions
                </Link>
                <Link href="/feed" className="btn btn-secondary">
                  Feed
                </Link>
                <Link href="/profile" className="btn btn-secondary">
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/signin" className="btn btn-ghost">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="btn btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-20 text-center">
        <h1 className="text-5xl font-bold text-emerald-900 mb-4">
          Make Your Voice Heard
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Create petitions, gather support locally and worldwide, and coordinate real-world action together.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href={session ? "/petitions/create" : "/auth/signup"} className="btn btn-primary text-lg px-8 py-3">
            Start a Petition
          </Link>
          <Link href="/petitions" className="btn btn-secondary text-lg px-8 py-3">
            Explore Petitions
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <div className="container grid grid-cols-3 gap-8">
          <div className="card text-center">
            <h3 className="text-2xl font-bold text-emerald-700 mb-2">Create</h3>
            <p className="text-gray-600">Start a petition and set a supporter goal.</p>
          </div>
          <div className="card text-center">
            <h3 className="text-2xl font-bold text-emerald-700 mb-2">Gather</h3>
            <p className="text-gray-600">Build support locally and globally.</p>
          </div>
          <div className="card text-center">
            <h3 className="text-2xl font-bold text-emerald-700 mb-2">Act</h3>
            <p className="text-gray-600">Generate reports and coordinate action.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
