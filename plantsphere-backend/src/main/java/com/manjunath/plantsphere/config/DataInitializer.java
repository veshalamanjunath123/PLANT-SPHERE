package com.manjunath.plantsphere.config;

import com.manjunath.plantsphere.entity.Category;
import com.manjunath.plantsphere.entity.Product;
import com.manjunath.plantsphere.repository.CategoryRepository;
import com.manjunath.plantsphere.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

/**
 * Seeds initial categories and realistic demonstration products into MySQL on startup.
 */
@Configuration
public class DataInitializer implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    public DataInitializer(CategoryRepository categoryRepository, ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) {
        if (categoryRepository.count() == 0) {
            seedCategoriesAndProducts();
        }
    }

    private void seedCategoriesAndProducts() {
        Map<String, Category> categories = new HashMap<>();

        String[][] categoryData = {
                {"Indoor Plants", "Air-purifying and decorative plants ideal for homes and offices."},
                {"Outdoor Plants", "Resilient plants suited for gardens, patios, and outdoor sunlight."},
                {"Flowering Plants", "Vibrant, blooming plants that bring natural color and fragrance."},
                {"Succulents and Cacti", "Low-maintenance, drought-tolerant plants that thrive with minimal watering."},
                {"Seeds", "High-germination organic vegetable, herb, and flower seeds."},
                {"Pots and Planters", "Aesthetic ceramic, terracotta, and biodegradable plant containers."},
                {"Soil and Fertilizers", "Nutrient-rich potting mixes, compost, and organic plant food."},
                {"Gardening Tools", "Ergonomic shears, trowels, watering cans, and gardening essentials."}
        };

        for (String[] data : categoryData) {
            Category category = new Category(data[0], data[1]);
            Category saved = categoryRepository.save(category);
            categories.put(saved.getName(), saved);
        }

        // Realistic seed products with stable botanical photography
        createProduct("Monstera Deliciosa",
                "Famous Swiss Cheese plant with iconic split leaves. Adds a tropical feel to any room.",
                new BigDecimal("29.99"), 25,
                "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80",
                categories.get("Indoor Plants"),
                "Bright Indirect Light", "Weekly when top 2 inches feel dry", "Beginner Friendly", false, "Living Room / Office Corner");

        createProduct("Sansevieria Snake Plant",
                "Extremely hardy air-purifier that releases oxygen at night. Nearly indestructible.",
                new BigDecimal("19.99"), 40,
                "https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&w=800&q=80",
                categories.get("Indoor Plants"),
                "Low to Bright Indirect Light", "Every 2-3 weeks", "Beginner Friendly", false, "Bedroom / Study Desk");

        createProduct("Peace Lily (Spathiphyllum)",
                "Graceful white blooms and lush foliage. Excellent natural toxin filter.",
                new BigDecimal("24.50"), 15,
                "https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&w=800&q=80",
                categories.get("Indoor Plants"),
                "Medium Filtered Light", "Weekly (droops gently when thirsty)", "Intermediate", false, "Indoor Living Spaces");

        createProduct("Fiddle Leaf Fig",
                "Dramatic violin-shaped leaves that make a bold statement in architectural design.",
                new BigDecimal("45.00"), 10,
                "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80",
                categories.get("Indoor Plants"),
                "Bright Consistent Light", "Weekly", "Intermediate", false, "Well-lit Living Room");

        createProduct("Aloe Vera Medicinal",
                "Natural soothing gel inside plump succulent leaves. Thrives on sunshine.",
                new BigDecimal("14.99"), 50,
                "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=800&q=80",
                categories.get("Succulents and Cacti"),
                "Direct Sunlight", "Every 2-3 weeks", "Beginner Friendly", false, "Sunny Kitchen Window");

        createProduct("Crassula Jade Plant",
                "Symbol of prosperity and good luck. Thick woody stems and coin-shaped leaves.",
                new BigDecimal("18.00"), 30,
                "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80",
                categories.get("Succulents and Cacti"),
                "Bright Light", "Every 2 weeks", "Beginner Friendly", false, "Work Desk / Balcony");

        createProduct("Golden Pothos Hanging Vine",
                "Fast-growing trailing vine with heart-shaped variegated leaves. Easy to propagate.",
                new BigDecimal("15.99"), 35,
                "https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=800&q=80",
                categories.get("Indoor Plants"),
                "Low to Bright Indirect Light", "Weekly", "Beginner Friendly", false, "Bookshelf / Hanging Basket");

        createProduct("English Lavender Plant",
                "Calming aromatic purple blossoms attractive to beneficial pollinators.",
                new BigDecimal("12.50"), 20,
                "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=800&q=80",
                categories.get("Outdoor Plants"),
                "Full Sunlight", "Moderate (well-drained)", "Beginner Friendly", true, "Outdoor Garden / Balcony");

        createProduct("Red Hibiscus Shrub",
                "Tropical showstopper producing large vibrant flowers throughout warm seasons.",
                new BigDecimal("22.00"), 18,
                "https://images.unsplash.com/photo-1550950158-d0d960dff51b?auto=format&fit=crop&w=800&q=80",
                categories.get("Flowering Plants"),
                "Full Sun (6+ hours)", "Daily in summer", "Intermediate", true, "Garden Bed / Sunny Patio");

        createProduct("Artisan Terracotta Planter 8-inch",
                "Handcrafted breathable clay pot with matching drainage saucer for root health.",
                new BigDecimal("16.99"), 60,
                "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80",
                categories.get("Pots and Planters"),
                null, null, null, null, null);

        createProduct("Premium Organic Potting Soil 5kg",
                "Enriched with perlite, peat moss, and vermicompost for optimal aeration and drainage.",
                new BigDecimal("11.50"), 100,
                "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80",
                categories.get("Soil and Fertilizers"),
                null, null, null, null, null);

        createProduct("Ergonomic Stainless Garden Trowel",
                "Heavy-duty rust-resistant hand trowel with comfortable rubber grip handle.",
                new BigDecimal("13.99"), 45,
                "https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?auto=format&fit=crop&w=800&q=80",
                categories.get("Gardening Tools"),
                null, null, null, null, null);
    }

    private void createProduct(String name, String description, BigDecimal price, int stock,
                              String imageUrl, Category category,
                              String sunlight, String watering, String difficulty,
                              Boolean petFriendly, String suitableLocation) {
        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setStockQuantity(stock);
        product.setImageUrl(imageUrl);
        product.setCategory(category);
        product.setActive(true);
        product.setSellerId(1L);
        product.setSunlightRequirement(sunlight);
        product.setWateringFrequency(watering);
        product.setDifficultyLevel(difficulty);
        product.setPetFriendly(petFriendly);
        product.setSuitableLocation(suitableLocation);

        productRepository.save(product);
    }
}