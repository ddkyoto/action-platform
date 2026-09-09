import { z } from "zod";

export const createPetitionSchema = z.object({
  title: z.string().min(5).max(255),
  description: z.string().min(20).max(5000),
  category: z.enum([
    "infrastructure",
    "environment",
    "public_safety",
    "education",
    "housing",
    "transportation",
    "civic_rights",
    "other",
  ]),
  location: z.string().min(2).max(100),
  country: z.string().min(2).max(100),
  province: z.string().optional(),
  targetOfficial: z.string().min(2).max(200),
  supporterGoal: z.number().min(10).max(1000000),
  showInternational: z.boolean().default(true),
});

export const signPetitionSchema = z.object({
  name: z.string().min(2).max(100),
  location: z.string().min(2).max(100),
  comment: z.string().max(500).optional(),
});

export const createPostSchema = z.object({
  content: z.string().min(1).max(280),
  category: z.string().optional(),
  location: z.string().optional(),
  image: z.string().optional(),
  video: z.string().optional(),
});

export const createEventSchema = z.object({
  title: z.string().min(5).max(255),
  description: z.string().min(20).max(5000),
  type: z.enum([
    "protest",
    "meeting",
    "town_hall",
    "community_gathering",
    "workshop",
  ]),
  location: z.string().min(2).max(100),
  country: z.string().min(2).max(100),
  province: z.string().optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  image: z.string().optional(),
});

export const updateProfileSchema = z.object({
  name: z.string().min(2).max(100),
  bio: z.string().max(500).optional(),
  location: z.string().max(100).optional(),
  avatarColor: z.string().regex(/^#[0-9A-F]{6}$/i),
});
