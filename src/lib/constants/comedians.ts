export const comedians = [
  {
    id: "rodney",
    name: "Rodney Dangerfield",
    tagline: "I Get No Respect!",
    image_url: "/comedians/Rodney Dangerfield.png",
    categories: ["marriage", "aging", "money", "family", "no_respect", "wajed"]
  },
  {
    id: "george",
    name: "George Carlin",
    tagline: "The Truth Hurts... But It's Funny",
    image_url: "/comedians/George Carlin.png",
    categories: ["marriage", "aging", "money", "family", "truth", "wajed"]
  },
  {
    id: "don",
    name: "Don Rickles",
    tagline: "The Roast Master",
    image_url: "/comedians/Don Rickles.png",
    categories: ["marriage", "aging", "money", "family", "roast", "wajed"]
  }
] as const;

export type ComedianId = typeof comedians[number]['id'];
export type CategoryId = 'marriage' | 'aging' | 'money' | 'family' | 'no_respect' | 'truth' | 'roast' | 'wajed';