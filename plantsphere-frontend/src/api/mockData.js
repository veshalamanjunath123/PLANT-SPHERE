/**
 * Botanical Nursery Collection Mock Store
 * Provides rich fallback data matching the Spring Boot entity schema
 * when the remote backend is offline or unreachable.
 */

export const MOCK_CATEGORIES = [
  { id: 1, name: 'Indoor Plants', description: 'Air-purifying and decorative plants ideal for homes and offices.' },
  { id: 2, name: 'Outdoor Plants', description: 'Resilient plants suited for gardens, patios, and outdoor sunlight.' },
  { id: 3, name: 'Flowering Plants', description: 'Vibrant, blooming plants that bring natural color and fragrance.' },
  { id: 4, name: 'Succulents and Cacti', description: 'Low-maintenance, drought-tolerant plants that thrive with minimal watering.' },
  { id: 5, name: 'Seeds', description: 'High-germination organic vegetable, herb, and flower seeds.' },
  { id: 6, name: 'Pots and Planters', description: 'Aesthetic ceramic, terracotta, and biodegradable plant containers.' },
  { id: 7, name: 'Soil and Fertilizers', description: 'Nutrient-rich potting mixes, compost, and organic plant food.' },
  { id: 8, name: 'Gardening Tools', description: 'Ergonomic shears, trowels, watering cans, and gardening essentials.' }
];

export const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Monstera Deliciosa',
    description: 'Famous Swiss Cheese plant with iconic split leaves. Adds a striking tropical aesthetic to any room.',
    price: 1499.00,
    stockQuantity: 25,
    imageUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
    categoryId: 1,
    categoryName: 'Indoor Plants',
    sunlightRequirement: 'Bright Indirect Light',
    wateringFrequency: 'Once a Week',
    difficultyLevel: 'Easy',
    petFriendly: false,
    suitableLocation: 'Indoor, Living Room, Office',
    createdAt: '2026-01-10T10:00:00Z'
  },
  {
    id: 2,
    name: 'Sansevieria Snake Plant',
    description: 'Extremely hardy air-purifier that releases oxygen at night. Near-indestructible specimen for beginners.',
    price: 799.00,
    stockQuantity: 40,
    imageUrl: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&w=800&q=80',
    categoryId: 1,
    categoryName: 'Indoor Plants',
    sunlightRequirement: 'Low Light',
    wateringFrequency: 'Every 2 Weeks',
    difficultyLevel: 'Easy',
    petFriendly: false,
    suitableLocation: 'Indoor, Bedroom, Office',
    createdAt: '2026-01-12T10:00:00Z'
  },
  {
    id: 3,
    name: 'Peace Lily (Spathiphyllum)',
    description: 'Graceful white spathes and lush emerald foliage. Outstanding natural filter for volatile airborne compounds.',
    price: 999.00,
    stockQuantity: 18,
    imageUrl: 'https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&w=800&q=80',
    categoryId: 1,
    categoryName: 'Indoor Plants',
    sunlightRequirement: 'Indirect Light',
    wateringFrequency: 'Once a Week',
    difficultyLevel: 'Moderate',
    petFriendly: false,
    suitableLocation: 'Indoor, Living Room',
    createdAt: '2026-01-14T10:00:00Z'
  },
  {
    id: 4,
    name: 'Fiddle Leaf Fig',
    description: 'Dramatic violin-shaped leaves making a bold statement in architectural design and modern interiors.',
    price: 2499.00,
    stockQuantity: 12,
    imageUrl: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80',
    categoryId: 1,
    categoryName: 'Indoor Plants',
    sunlightRequirement: 'Bright Indirect Light',
    wateringFrequency: 'Once a Week',
    difficultyLevel: 'Moderate',
    petFriendly: false,
    suitableLocation: 'Indoor, Living Room',
    createdAt: '2026-01-15T10:00:00Z'
  },
  {
    id: 5,
    name: 'Aloe Vera Medicinal',
    description: 'Plump succulent spears packed with soothing natural gel. Loves sunshine and demands very little care.',
    price: 499.00,
    stockQuantity: 50,
    imageUrl: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=800&q=80',
    categoryId: 4,
    categoryName: 'Succulents and Cacti',
    sunlightRequirement: 'Direct Sunlight',
    wateringFrequency: 'Every 2 Weeks',
    difficultyLevel: 'Easy',
    petFriendly: false,
    suitableLocation: 'Balcony, Living Room, Terrace',
    createdAt: '2026-01-18T10:00:00Z'
  },
  {
    id: 6,
    name: 'Crassula Jade Plant',
    description: 'Traditional symbol of prosperity with woody bonsai-like stems and glossy coin-shaped leaves.',
    price: 699.00,
    stockQuantity: 30,
    imageUrl: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80',
    categoryId: 4,
    categoryName: 'Succulents and Cacti',
    sunlightRequirement: 'Direct Sunlight',
    wateringFrequency: 'Every 2 Weeks',
    difficultyLevel: 'Easy',
    petFriendly: false,
    suitableLocation: 'Indoor, Balcony, Office',
    createdAt: '2026-01-20T10:00:00Z'
  },
  {
    id: 7,
    name: 'Golden Pothos Vine',
    description: 'Cascading vine with heart-shaped golden variegated foliage. Thrives in low light and hanging displays.',
    price: 549.00,
    stockQuantity: 35,
    imageUrl: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=800&q=80',
    categoryId: 1,
    categoryName: 'Indoor Plants',
    sunlightRequirement: 'Low Light',
    wateringFrequency: 'Once a Week',
    difficultyLevel: 'Easy',
    petFriendly: false,
    suitableLocation: 'Indoor, Living Room, Office',
    createdAt: '2026-01-22T10:00:00Z'
  },
  {
    id: 8,
    name: 'English Lavender',
    description: 'Intensely fragrant purple flowering shrub renowned for natural relaxation and attracting pollinators.',
    price: 599.00,
    stockQuantity: 20,
    imageUrl: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=800&q=80',
    categoryId: 2,
    categoryName: 'Outdoor Plants',
    sunlightRequirement: 'Direct Sunlight',
    wateringFrequency: 'Twice a Week',
    difficultyLevel: 'Easy',
    petFriendly: true,
    suitableLocation: 'Outdoor, Balcony, Terrace',
    createdAt: '2026-01-25T10:00:00Z'
  },
  {
    id: 9,
    name: 'Red Hibiscus Shrub',
    description: 'Exotic tropical bloomer producing enormous crimson blossoms from spring through autumn.',
    price: 799.00,
    stockQuantity: 15,
    imageUrl: 'https://images.unsplash.com/photo-1550950158-d0d960dff51b?auto=format&fit=crop&w=800&q=80',
    categoryId: 3,
    categoryName: 'Flowering Plants',
    sunlightRequirement: 'Direct Sunlight',
    wateringFrequency: 'Daily',
    difficultyLevel: 'Moderate',
    petFriendly: true,
    suitableLocation: 'Outdoor, Terrace, Balcony',
    createdAt: '2026-01-28T10:00:00Z'
  },
  {
    id: 10,
    name: 'Zamioculcas ZZ Plant',
    description: 'Glossy dark green architectural leaves that flourish in deep shade and require watering only once a month.',
    price: 1199.00,
    stockQuantity: 22,
    imageUrl: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=800&q=80',
    categoryId: 1,
    categoryName: 'Indoor Plants',
    sunlightRequirement: 'Full Shade',
    wateringFrequency: 'Monthly',
    difficultyLevel: 'Easy',
    petFriendly: false,
    suitableLocation: 'Indoor, Office, Bedroom',
    createdAt: '2026-02-01T10:00:00Z'
  },
  {
    id: 11,
    name: 'Calathea Orbifolia',
    description: 'Exquisite silver-striped round leaves that rhythmically raise and fold in nocturnal prayer movement.',
    price: 1399.00,
    stockQuantity: 8,
    imageUrl: 'https://images.unsplash.com/photo-1599685315640-9ceab2f58944?auto=format&fit=crop&w=800&q=80',
    categoryId: 1,
    categoryName: 'Indoor Plants',
    sunlightRequirement: 'Indirect Light',
    wateringFrequency: 'Twice a Week',
    difficultyLevel: 'Expert',
    petFriendly: true,
    suitableLocation: 'Indoor, Living Room',
    createdAt: '2026-02-03T10:00:00Z'
  },
  {
    id: 12,
    name: 'String of Pearls',
    description: 'Delicate succulent vine with trailing bead-like spherical leaves creating a cascading emerald curtain.',
    price: 849.00,
    stockQuantity: 14,
    imageUrl: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80',
    categoryId: 4,
    categoryName: 'Succulents and Cacti',
    sunlightRequirement: 'Bright Indirect Light',
    wateringFrequency: 'Every 10 Days',
    difficultyLevel: 'Moderate',
    petFriendly: false,
    suitableLocation: 'Indoor, Balcony',
    createdAt: '2026-02-05T10:00:00Z'
  },
  {
    id: 13,
    name: 'Bonsai Ficus Microcarpa',
    description: 'Artistically sculpted miniature tree with exposed aerial roots evoking centuries of traditional cultivation.',
    price: 3299.00,
    stockQuantity: 5,
    imageUrl: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=800&q=80',
    categoryId: 1,
    categoryName: 'Indoor Plants',
    sunlightRequirement: 'Bright Indirect Light',
    wateringFrequency: 'Twice a Week',
    difficultyLevel: 'Expert',
    petFriendly: false,
    suitableLocation: 'Indoor, Office, Living Room',
    createdAt: '2026-02-07T10:00:00Z'
  },
  {
    id: 14,
    name: 'Artisan Terracotta Planter 8-inch',
    description: 'Handcrafted porous terracotta pot with matching saucer ensuring optimal root aeration and natural moisture control.',
    price: 649.00,
    stockQuantity: 45,
    imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80',
    categoryId: 6,
    categoryName: 'Pots and Planters',
    sunlightRequirement: null,
    wateringFrequency: null,
    difficultyLevel: 'Easy',
    petFriendly: true,
    suitableLocation: 'Indoor, Outdoor, Balcony, Terrace',
    createdAt: '2026-02-08T10:00:00Z'
  },
  {
    id: 15,
    name: 'Premium Organic Potting Soil 5kg',
    description: 'Microbiologically active blend enriched with worm castings, perlite, and neem cake for robust root systems.',
    price: 399.00,
    stockQuantity: 100,
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80',
    categoryId: 7,
    categoryName: 'Soil and Fertilizers',
    sunlightRequirement: null,
    wateringFrequency: null,
    difficultyLevel: 'Easy',
    petFriendly: true,
    suitableLocation: 'Balcony, Terrace, Outdoor',
    createdAt: '2026-02-09T10:00:00Z'
  },
  {
    id: 16,
    name: 'Ergonomic Stainless Garden Trowel',
    description: 'Rust-proof mirror-polished stainless steel hand trowel with contoured ash-wood ergonomic grip.',
    price: 499.00,
    stockQuantity: 35,
    imageUrl: 'https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?auto=format&fit=crop&w=800&q=80',
    categoryId: 8,
    categoryName: 'Gardening Tools',
    sunlightRequirement: null,
    wateringFrequency: null,
    difficultyLevel: 'Easy',
    petFriendly: true,
    suitableLocation: 'Outdoor, Terrace, Balcony',
    createdAt: '2026-02-10T10:00:00Z'
  }
];

/**
 * Filter, sort, and paginate products using query params
 */
export function queryMockProducts(params = {}, queryString = '') {
  let combinedParams = { ...params };
  if (queryString) {
    const sp = new URLSearchParams(queryString);
    for (const [key, val] of sp.entries()) {
      if (!combinedParams[key]) combinedParams[key] = val;
    }
  }

  let list = [...MOCK_PRODUCTS];

  // Category filter (by ID or slug)
  const categoryId = combinedParams.categoryId || combinedParams.category;
  if (categoryId) {
    const catLower = String(categoryId).toLowerCase();
    if (catLower === 'indoor') {
      list = list.filter((p) => p.categoryName === 'Indoor Plants');
    } else if (catLower === 'outdoor') {
      list = list.filter((p) => p.categoryName === 'Outdoor Plants');
    } else if (catLower === 'flowering') {
      list = list.filter((p) => p.categoryName === 'Flowering Plants');
    } else if (catLower === 'succulent') {
      list = list.filter((p) => p.categoryName === 'Succulents and Cacti');
    } else if (catLower === 'air') {
      list = list.filter((p) => p.categoryName === 'Indoor Plants' || p.categoryName === 'Outdoor Plants');
    } else {
      list = list.filter((p) => String(p.categoryId) === String(categoryId));
    }
  }

  // Keyword search
  const search = combinedParams.search || '';
  if (search.trim()) {
    const q = search.trim().toLowerCase();
    list = list.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.categoryName && p.categoryName.toLowerCase().includes(q))
    );
  }

  // Price range
  if (combinedParams.minPrice) {
    const min = parseFloat(combinedParams.minPrice);
    if (!isNaN(min)) list = list.filter((p) => p.price >= min);
  }
  if (combinedParams.maxPrice) {
    const max = parseFloat(combinedParams.maxPrice);
    if (!isNaN(max)) list = list.filter((p) => p.price <= max);
  }

  // Sorting
  const sortBy = combinedParams.sortBy || 'createdAt';
  const direction = (combinedParams.direction || 'DESC').toUpperCase();
  list.sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];
    if (sortBy === 'price') {
      valA = Number(valA);
      valB = Number(valB);
    } else if (typeof valA === 'string') {
      valA = valA.toLowerCase();
      valB = (valB || '').toLowerCase();
    }
    if (valA < valB) return direction === 'ASC' ? -1 : 1;
    if (valA > valB) return direction === 'ASC' ? 1 : -1;
    return 0;
  });

  const totalElements = list.length;
  const page = parseInt(combinedParams.page || 0, 10);
  const size = parseInt(combinedParams.size || 12, 10);
  const totalPages = Math.ceil(totalElements / size);
  const startIndex = page * size;
  const content = list.slice(startIndex, startIndex + size);

  return {
    content,
    totalPages,
    totalElements,
    number: page,
    size
  };
}

export function getMockProductById(id) {
  const match = MOCK_PRODUCTS.find((p) => String(p.id) === String(id));
  return match || MOCK_PRODUCTS[0];
}
