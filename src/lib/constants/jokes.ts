export interface Joke {
  id: string;
  comedian: 'rodney' | 'george' | 'don';
  category: 'marriage' | 'aging' | 'money' | 'family' | 'no_respect' | 'truth' | 'roast' | 'wajed';
  text: string;
  attribution: string;
}

export const jokes: Joke[] = [
  // Rodney Dangerfield Jokes
  {
    id: "rodney_001",
    comedian: "rodney",
    category: "marriage",
    text: "My wife and I were happy for twenty years. Then we met.",
    attribution: "Rodney Dangerfield"
  },
  {
    id: "rodney_002",
    comedian: "rodney",
    category: "marriage",
    text: "I take my wife everywhere, but she keeps finding her way back.",
    attribution: "Rodney Dangerfield"
  },
  {
    id: "rodney_003",
    comedian: "rodney",
    category: "marriage",
    text: "My wife's cooking is so bad, the flies pitched in to fix the screen door.",
    attribution: "Rodney Dangerfield"
  },
  {
    id: "rodney_004",
    comedian: "rodney",
    category: "aging",
    text: "At my age, 'getting lucky' means finding my car in the parking lot.",
    attribution: "Rodney Dangerfield"
  },
  {
    id: "rodney_005",
    comedian: "rodney",
    category: "aging",
    text: "I'm at the age where my back goes out more than I do.",
    attribution: "Rodney Dangerfield"
  },
  {
    id: "rodney_006",
    comedian: "rodney",
    category: "money",
    text: "I get no respect. My psychiatrist told me I was crazy. I said I wanted a second opinion. He said, 'Okay, you're ugly too.'",
    attribution: "Rodney Dangerfield"
  },
  {
    id: "rodney_007",
    comedian: "rodney",
    category: "wajed",
    text: "My son calls himself 'Melo.' I said, 'You know what else is mellow? Your bank account.'",
    attribution: "Rodney Dangerfield"
  },
  {
    id: "rodney_008",
    comedian: "rodney",
    category: "wajed",
    text: "My son Wajed—he's an entrepreneur. That's unemployed with a website.",
    attribution: "Rodney Dangerfield"
  },
  {
    id: "rodney_009",
    comedian: "rodney",
    category: "wajed",
    text: "I call him Hoover. Not because he's powerful—because he sucks up everything on the table.",
    attribution: "Rodney Dangerfield"
  },
  
  // George Carlin Jokes
  {
    id: "george_001",
    comedian: "george",
    category: "truth",
    text: "Think about how stupid the average person is, and realize half of them are stupider than that.",
    attribution: "George Carlin"
  },
  {
    id: "george_002",
    comedian: "george",
    category: "truth",
    text: "The reason they call it the American Dream is because you have to be asleep to believe it.",
    attribution: "George Carlin"
  },
  {
    id: "george_003",
    comedian: "george",
    category: "aging",
    text: "Eventually you will reach a point when you stop lying about your age and start bragging about it.",
    attribution: "George Carlin"
  },
  {
    id: "george_004",
    comedian: "george",
    category: "money",
    text: "Most people work just hard enough not to get fired and get paid just enough money not to quit.",
    attribution: "George Carlin"
  },
  {
    id: "george_005",
    comedian: "george",
    category: "wajed",
    text: "Ahmad's son Wajed speaks in philosophy. Which is interesting, because philosophers are just people too confused to get regular jobs.",
    attribution: "George Carlin"
  },
  {
    id: "george_006",
    comedian: "george",
    category: "wajed",
    text: "He calls himself an entrepreneur. You know what entrepreneur means? It's French for 'ask your father for money.'",
    attribution: "George Carlin"
  },
  
  // Don Rickles Jokes
  {
    id: "don_001",
    comedian: "don",
    category: "roast",
    text: "When you enter a room, you have to kiss his ring. I don't mind, but he has it in his back pocket.",
    attribution: "Don Rickles"
  },
  {
    id: "don_002",
    comedian: "don",
    category: "roast",
    text: "Some people say funny things, but I say things funny.",
    attribution: "Don Rickles"
  },
  {
    id: "don_003",
    comedian: "don",
    category: "marriage",
    text: "My wife and I have been married forty-eight years. I love her, but if you're asking me if I like her—let me think about that.",
    attribution: "Don Rickles"
  },
  {
    id: "don_004",
    comedian: "don",
    category: "wajed",
    text: "Wajed—look at this kid. He's got more websites than income. MrMelo.com? More like MrWhereDidTheMoneyGo.com.",
    attribution: "Don Rickles"
  },
  {
    id: "don_005",
    comedian: "don",
    category: "wajed",
    text: "They call him Hoover. He eats like a vacuum and thinks like a philosophy professor. Somewhere in the middle is a human being.",
    attribution: "Don Rickles"
  },
  {
    id: "don_006",
    comedian: "don",
    category: "wajed",
    text: "Ahmad's son is an entrepreneur. That's a fancy word for 'Dad, can I borrow money?' He's been entrepreneuring for years.",
    attribution: "Don Rickles"
  }
];