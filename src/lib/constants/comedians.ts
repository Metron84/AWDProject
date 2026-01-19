export const comedians = [
  {
    id: "rodney",
    name: "Rodney Dangerfield",
    tagline: "I Get No Respect!",
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    categories: ["marriage", "aging", "money", "family", "no_respect", "wajed"]
  },
  {
    id: "george",
    name: "George Carlin",
    tagline: "The Truth Hurts... But It's Funny",
    image_url: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop",
    categories: ["marriage", "aging", "money", "family", "truth", "wajed"]
  },
  {
    id: "don",
    name: "Don Rickles",
    tagline: "The Roast Master",
    image_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    categories: ["marriage", "aging", "money", "family", "roast", "wajed"]
  }
] as const;

export type ComedianId = typeof comedians[number]['id'];
export type CategoryId = 'marriage' | 'aging' | 'money' | 'family' | 'no_respect' | 'truth' | 'roast' | 'wajed';