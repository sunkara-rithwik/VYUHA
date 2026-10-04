// Definitions for the Five Sacred Formations (Vyuhas)

export const LEVELS = [
  {
    id: 1,
    key: 'ardhachandra',
    name: 'Ardhachandravyuha',
    sanskrit: 'अर्धचन्द्रव्यूह',
    meaning: 'The Crescent Formation',
    difficulty: 'Easy',
    difficultyColor: '#7EDCEB', // Celestial cyan
    theme: 'Balance, discipline, and responsibility',
    questionCount: 5,
    timePerQuestion: 30, // seconds
    entryNarration: "You have entered the Ardhachandravyuha, the formation of balance. Every path presents a choice. Every choice reveals your wisdom.",
    exitNarration: "The golden crescent illuminates your path. You have mastered balance and self-discipline, standing firm amidst distractions.",
    description: "Arranged in the shape of a waxing crescent moon, this formation balances offense and defense. In the Mahabharata, Arjuna countered the Kauravas with this agile formation on Day 12.",
    symbol: "🌙",
    accentColor: "#7EDCEB",
    glowColor: "rgba(126, 220, 235, 0.4)",
    nodeCount: 5,
    gatewayName: "The Gate of Moderation"
  },
  {
    id: 2,
    key: 'garuda',
    name: 'Garudavyuha',
    sanskrit: 'गरुडव्यूह',
    meaning: 'The Golden Eagle Formation',
    difficulty: 'Moderate',
    difficultyColor: '#FFD778', // Divine gold
    theme: 'Teamwork, leadership, and trust',
    questionCount: 6,
    timePerQuestion: 25,
    entryNarration: "You have entered Garudavyuha, the formation of strength and coordination. Alone, your strength is limited. With wisdom and teamwork, you can overcome greater challenges.",
    exitNarration: "The wings of Garuda spread wide in golden radiance. Through mutual respect, clear communication, and shared purpose, your team has triumphed.",
    description: "Modeled after the divine eagle mount of Vishnu, Garudavyuha possesses an impenetrable beak at its vanguard and wide protective wings. Deployed by Bhishma Pitamaha on Day 3 of the Great War.",
    symbol: "🦅",
    accentColor: "#FFD778",
    glowColor: "rgba(255, 215, 120, 0.45)",
    nodeCount: 6,
    gatewayName: "The Gate of Fellowship"
  },
  {
    id: 3,
    key: 'suchimukha',
    name: 'Suchimukhavyuha',
    sanskrit: 'सूचीमुखव्यूह',
    meaning: 'The Needle-Eye Formation',
    difficulty: 'Hard',
    difficultyColor: '#E68A24', // Sacred saffron
    theme: 'Focus, patience, and precision',
    questionCount: 7,
    timePerQuestion: 20,
    entryNarration: "You have entered Suchimukhavyuha, the formation of precision. One careless decision may lead you astray. Focus your mind and choose wisely.",
    exitNarration: "You have pierced through the narrowest canyon of doubts and mental clutter with unshakeable concentration. The lotus gateway unfolds before you.",
    description: "A piercing needle-pointed formation engineered to drill deep through enemy ranks with razor-sharp single-pointed concentration. Mentioned in the Dhanurveda and employed on Day 14.",
    symbol: "🪡",
    accentColor: "#E68A24",
    glowColor: "rgba(230, 138, 36, 0.5)",
    nodeCount: 7,
    gatewayName: "The Gate of Single-Pointed Mind"
  },
  {
    id: 4,
    key: 'padma',
    name: 'Padmavyuha',
    sanskrit: 'पद्मव्यूह',
    meaning: 'The Blooming Lotus Formation',
    difficulty: 'Very Hard',
    difficultyColor: '#E8A5B6', // Lotus pink
    theme: 'Complex decisions, strategic thinking, and resilience',
    questionCount: 8,
    timePerQuestion: 15,
    entryNarration: "You have entered Padmavyuha, the layered formation. Its beauty hides complexity. Every decision opens one path while closing another. Wisdom is your greatest weapon.",
    exitNarration: "The thousand-petaled celestial lotus unfolds in radiant bloom! You have navigated layered dilemmas with moral courage, integrity, and resilience.",
    description: "An intricate multi-layered circular labyrinth resembling the concentric petals of a blooming lotus flower. Each petal shifts dynamically to confuse intruders, deployed by Guru Dronacharya.",
    symbol: "🪷",
    accentColor: "#E8A5B6",
    glowColor: "rgba(232, 165, 182, 0.5)",
    nodeCount: 8,
    gatewayName: "The Gate of Discernment"
  },
  {
    id: 5,
    key: 'chakra',
    name: 'Chakravyuha',
    sanskrit: 'चक्रव्यूह',
    meaning: 'The Wheel of Destiny',
    difficulty: 'Extreme',
    difficultyColor: '#D6A64B', // Antique Gold
    theme: 'Survival, courage, strategic thinking, and ultimate wisdom',
    questionCount: 10,
    timePerQuestion: 10,
    entryNarration: "You have entered Chakravyuha, the ultimate trial. Every ring tests your judgment. The path inward is difficult, but the path outward demands even greater wisdom. Your final challenge begins now.",
    exitNarration: "YOU HAVE CONQUERED THE CHAKRAVYUHA! The rotating rings part as the golden dawn breaks over Kurukshetra. True victory is not defeating every obstacle—it is choosing wisely when the path is uncertain.",
    description: "The most legendary and formidable circular defensive formation of the epic, engineered by Acharya Drona on Day 13. Seven concentric rings rotating in opposing directions with guarded gateways.",
    symbol: "☸️",
    accentColor: "#D6A64B",
    glowColor: "rgba(214, 166, 75, 0.6)",
    nodeCount: 10,
    gatewayName: "The Gate of Moksha & Ultimate Wisdom"
  }
];

export const TOTAL_LIVES = 3;
export const BLESSING_TRIVIA_COUNT = 3;
