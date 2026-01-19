export interface Quote {
  id: string;
  text: string;
  author: string;
  category: string;
}

export const quotes: Quote[] = [
  // Business Titans
  {
    id: "buffett_001",
    text: "Price is what you pay. Value is what you get.",
    author: "Warren Buffett",
    category: "wealth"
  },
  {
    id: "buffett_002",
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb",
    category: "wisdom"
  },
  {
    id: "buffett_003",
    text: "Be fearful when others are greedy, and greedy when others are fearful.",
    author: "Warren Buffett",
    category: "investing"
  },
  {
    id: "munger_001",
    text: "Take a simple idea and take it seriously.",
    author: "Charlie Munger",
    category: "wisdom"
  },
  {
    id: "drucker_001",
    text: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
    category: "leadership"
  },
  {
    id: "dalio_001",
    text: "Pain + Reflection = Progress.",
    author: "Ray Dalio",
    category: "wisdom"
  },
  {
    id: "walton_001",
    text: "High expectations are the key to everything.",
    author: "Sam Walton",
    category: "leadership"
  },
  {
    id: "iacocca_001",
    text: "Iacocca's Law: Management consists of persuading people to do what they don't want to do, while loving it.",
    author: "Lee Iacocca",
    category: "management"
  },
  
  // Classic Wisdom
  {
    id: "franklin_001",
    text: "An investment in knowledge pays the best interest.",
    author: "Benjamin Franklin",
    category: "wisdom"
  },
  {
    id: "carnegie_001",
    text: "The man who does not read good books has no advantage over the man who cannot read them.",
    author: "Andrew Carnegie",
    category: "wisdom"
  },
  {
    id: "morgan_001",
    text: "A man always has two reasons for doing anything: a good reason and the real reason.",
    author: "J.P. Morgan",
    category: "wisdom"
  },
  {
    id: "rockefeller_001",
    text: "I believe in the supreme worth of the individual and in his right to life, liberty, and the pursuit of happiness.",
    author: "John D. Rockefeller",
    category: "philosophy"
  },
  
  // Godfather Quotes
  {
    id: "corleone_001",
    text: "A man who doesn't spend time with his family can never be a real man.",
    author: "Don Corleone",
    category: "family"
  },
  {
    id: "corleone_002",
    text: "It's not personal, it's strictly business.",
    author: "Michael Corleone",
    category: "business"
  },
  {
    id: "corleone_003",
    text: "Leave the gun, take the cannoli.",
    author: "Peter Clemenza",
    category: "wisdom"
  },
  {
    id: "corleone_004",
    text: "Friendship is everything. Friendship is more than talent. It is more than government.",
    author: "Don Corleone",
    category: "friendship"
  },
  {
    id: "corleone_005",
    text: "Never tell anybody outside the family what you're thinking.",
    author: "Don Corleone",
    category: "wisdom"
  },
  
  // Modern Business
  {
    id: "bezos_001",
    text: "If you're competitor-focused, you have to wait until there's a competitor doing something. Being customer-focused means you're always searching for new ways to innovate.",
    author: "Jeff Bezos",
    category: "customer_focus"
  },
  {
    id: "schultz_001",
    text: "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
    author: "Howard Schultz",
    category: "happiness"
  },
  {
    id: "branson_001",
    text: "Business opportunities are like buses, there's always another one coming.",
    author: "Richard Branson",
    category: "opportunity"
  },
  {
    id: "jobs_001",
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "passion"
  },
  
  // Philosophers
  {
    id: "seneca_001",
    text: "It is not because things are difficult that we do not dare; it is because we do not dare that they are difficult.",
    author: "Seneca",
    category: "courage"
  },
  {
    id: "aurelius_001",
    text: "You have power over your mind - not outside events. Realize this, and you will find strength.",
    author: "Marcus Aurelius",
    category: "mindset"
  },
  {
    id: "hill_001",
    text: "Whatever the mind can conceive and believe, it can achieve.",
    author: "Napoleon Hill",
    category: "belief"
  },
  {
    id: "carnegie_002",
    text: "You can make more friends in two months by becoming interested in other people than you can in two years by trying to get other people interested in you.",
    author: "Dale Carnegie",
    category: "relationships"
  },
  
  // More quotes
  {
    id: "buffett_004",
    text: "Risk comes from not knowing what you're doing.",
    author: "Warren Buffett",
    category: "investing"
  },
  {
    id: "mandela_001",
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
    category: "perseverance"
  },
  {
    id: "einstein_001",
    text: "Imagination is more important than knowledge.",
    author: "Albert Einstein",
    category: "creativity"
  }
];

// Add 100+ more quotes following the pattern above...