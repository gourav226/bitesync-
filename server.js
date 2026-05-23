const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Serve static frontend files from current directory
app.use(express.static(__dirname));

// Premium Food App Database (BiteSync)
const RESTAURANTS = [
    {
        id: 1,
        name: "The Grand Biryani Shahi",
        cuisines: ["Biryani", "Mughlai", "North Indian"],
        rating: 4.5,
        time: 30,
        costForTwo: 450,
        discount: "50% OFF up to ₹100",
        isVeg: false,
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=60",
        menu: [
            { id: 101, name: "Chicken Dum Biryani", price: 280, isVeg: false, recommended: true, description: "Slow-cooked long-grain basmati rice layered with juicy marinated chicken, exotic spices, and saffron.", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&auto=format&fit=crop&q=60" },
            { id: 102, name: "Paneer Tikka Biryani", price: 240, isVeg: true, recommended: true, description: "Fragrant basmati rice layered with charcoal-grilled paneer tikka, caramelized onions, and fresh mint.", image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=200&auto=format&fit=crop&q=60" },
            { id: 103, name: "Egg Dum Biryani", price: 210, isVeg: false, recommended: false, description: "A classic recipe featuring hard-boiled eggs cooked in spice-infused rice layers with fried onions.", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=200&auto=format&fit=crop&q=60" },
            { id: 104, name: "Mutton Seekh Kebab", price: 320, isVeg: false, recommended: true, description: "Minced goat meat combined with secret shahi spices, skewered and roasted to perfection in the tandoor.", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=200&auto=format&fit=crop&q=60" },
            { id: 105, name: "Shahi Tukda", price: 110, isVeg: true, recommended: true, description: "Rich double ka meetha bread pudding garnished with almonds, pistachios and saffron rabri.", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&auto=format&fit=crop&q=60" },
            { id: 106, name: "Veg Galouti Kebab", price: 220, isVeg: true, recommended: false, description: "Mouth-melting minced vegetable patties infused with aromatic Awadhi spices.", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=200&auto=format&fit=crop&q=60" },
            { id: 107, name: "Chicken Tikka Masala", price: 290, isVeg: false, recommended: false, description: "Tandoor-grilled chicken chunks cooked in a rich, creamy, spiced tomato gravy.", image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&auto=format&fit=crop&q=60" }
        ]
    },
    {
        id: 2,
        name: "Burger Lounge & Grill",
        cuisines: ["Burgers", "Fast Food", "Snacks"],
        rating: 4.3,
        time: 20,
        costForTwo: 350,
        discount: "40% OFF up to ₹80",
        isVeg: false,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60",
        menu: [
            { id: 201, name: "Crispy Chicken Whopper", price: 180, isVeg: false, recommended: true, description: "A toasted sesame seed bun loaded with a double crispy chicken patty, fresh lettuce, and our secret lounge sauce.", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&auto=format&fit=crop&q=60" },
            { id: 202, name: "Premium Veg Cheese Burger", price: 140, isVeg: true, recommended: true, description: "Rich vegetable patty topped with melted cheddar cheese slice, tomatoes, pickles, and dynamic burger cream.", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=200&auto=format&fit=crop&q=60" },
            { id: 203, name: "Spicy Paneer Burger", price: 160, isVeg: true, recommended: false, description: "Crispy fried cottage cheese patty dipped in hot peri-peri glaze with cooling lettuce and mayo.", image: "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=200&auto=format&fit=crop&q=60" },
            { id: 204, name: "Hand-cut Peri Peri Fries", price: 99, isVeg: true, recommended: false, description: "Golden, crispy hand-cut potatoes dusted with a hot and tangy peri-peri seasoning shake.", image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=200&auto=format&fit=crop&q=60" },
            { id: 205, name: "Classic Salted Fries", price: 80, isVeg: true, recommended: false, description: "Crisp golden-fried potato sticks lightly seasoned with sea salt.", image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=200&auto=format&fit=crop&q=60" },
            { id: 206, name: "Barbeque Chicken Wings", price: 180, isVeg: false, recommended: true, description: "Juicy chicken wings tossed in rich, smoky hickory BBQ sauce.", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=200&auto=format&fit=crop&q=60" },
            { id: 207, name: "Loaded Cheese Fries", price: 120, isVeg: true, recommended: false, description: "Golden fries topped with warm liquid cheese sauce, green onions, and jalapenos.", image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=200&auto=format&fit=crop&q=60" }
        ]
    },
    {
        id: 3,
        name: "Pizzeria Deluxe",
        cuisines: ["Pizza", "Italian", "Pastas"],
        rating: 4.6,
        time: 25,
        costForTwo: 500,
        discount: "FREE Delivery above ₹300",
        isVeg: true,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60",
        menu: [
            { id: 301, name: "Farmhouse Garden Special Pizza", price: 299, isVeg: true, recommended: true, description: "Overloaded with mozzarella cheese, green peppers, sweet corn, black olives, sliced onions, and juicy cherry tomatoes.", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&auto=format&fit=crop&q=60" },
            { id: 302, name: "Tandoori Paneer Fiesta Pizza", price: 349, isVeg: true, recommended: true, description: "Cottage cheese chunks in tandoori marinade, topped with green capsicum, red paprika, and dynamic cheese drizzle.", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&auto=format&fit=crop&q=60" },
            { id: 303, name: "Garlic Bread Sticks", price: 120, isVeg: true, recommended: false, description: "Warm, soft, freshly baked buttery garlic bread sticks served with premium cheesy jalapeno dipping sauce.", image: "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=200&auto=format&fit=crop&q=60" },
            { id: 304, name: "Chocolate Lava Cake", price: 90, isVeg: true, recommended: true, description: "Decadent, moist chocolate cake with a bursting hot, molten chocolate centre core.", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=200&auto=format&fit=crop&q=60" },
            { id: 305, name: "Double Cheese Margherita Pizza", price: 249, isVeg: true, recommended: false, description: "Classic thin crust topped with extra mozzarella cheese, basil leaves, and tomato sauce.", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&auto=format&fit=crop&q=60" },
            { id: 306, name: "Spicy Chicken Pepperoni Pizza", price: 399, isVeg: false, recommended: true, description: "Authentic Italian pepperoni with sliced chicken sausage, jalapenos, and mozzarella.", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&auto=format&fit=crop&q=60" },
            { id: 307, name: "Alfredo Cream White Sauce Pasta", price: 210, isVeg: true, recommended: false, description: "Penne pasta tossed in rich butter, garlic, cream, parmesan cheese, and broccoli.", image: "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=200&auto=format&fit=crop&q=60" }
        ]
    },
    {
        id: 4,
        name: "Sweet Bliss Waffles & Shakes",
        cuisines: ["Desserts", "Beverages", "Ice Creams"],
        rating: 4.4,
        time: 15,
        costForTwo: 300,
        discount: "20% OFF on all orders",
        isVeg: true,
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500&auto=format&fit=crop&q=60",
        menu: [
            { id: 401, name: "Classic Belgian Waffle", price: 150, isVeg: true, recommended: true, description: "Golden waffle loaded with premium warm Nutella chocolate spread, sliced bananas, and a scoop of vanilla bean cream.", image: "https://images.unsplash.com/photo-1562376502-6f769499c886?w=200&auto=format&fit=crop&q=60" },
            { id: 402, name: "Oreo Mudslide Shake", price: 130, isVeg: true, recommended: true, description: "Thick milk shake infused with crushed chocolate Oreos, chocolate fudge syrup, whipped cream, and cookie toppings.", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=200&auto=format&fit=crop&q=60" },
            { id: 403, name: "Red Velvet Pastry", price: 110, isVeg: true, recommended: false, description: "Layered sponge cake colored with premium cocoa, topped with rich, velvety whipped cream cheese.", image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=200&auto=format&fit=crop&q=60" },
            { id: 404, name: "Alphonso Mango Shake", price: 140, isVeg: true, recommended: false, description: "Seasonal premium Alphonso mango pulp blended with rich fresh cream and topped with fine chopped nuts.", image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=200&auto=format&fit=crop&q=60" },
            { id: 405, name: "Nutella & Strawberry Waffle", price: 170, isVeg: true, recommended: true, description: "Fresh waffle topped with premium warm Nutella, fresh strawberries, and dark chocolate chips.", image: "https://images.unsplash.com/photo-1562376502-6f769499c886?w=200&auto=format&fit=crop&q=60" },
            { id: 406, name: "Choco Hazelnut Shake", price: 130, isVeg: true, recommended: false, description: "Thick chocolate milkshake blended with roasted hazelnuts and chocolate syrup.", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=200&auto=format&fit=crop&q=60" },
            { id: 407, name: "Blueberry Cheesecake Slice", price: 150, isVeg: true, recommended: false, description: "Smooth cream cheese filling over a biscuit base, topped with sweet wild blueberry compote.", image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=200&auto=format&fit=crop&q=60" }
        ]
    },
    {
        id: 5,
        name: "Wok & Roll Asian Kitchen",
        cuisines: ["Chinese", "Asian", "Noodles"],
        rating: 4.1,
        time: 28,
        costForTwo: 400,
        discount: "30% OFF up to ₹75",
        isVeg: false,
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60",
        menu: [
            { id: 501, name: "Hakka Noodles Special", price: 160, isVeg: true, recommended: true, description: "Stir-fried wheat noodles with crisp spring veggies, light soy sauce, and aromatic garlic oils.", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=200&auto=format&fit=crop&q=60" },
            { id: 502, name: "Veg Manchurian Gravy", price: 150, isVeg: true, recommended: false, description: "Deep-fried premium mix-vegetable dumplings drenched in dark, tangy, sweet, spicy Manchurian sauce.", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=200&auto=format&fit=crop&q=60" },
            { id: 503, name: "Schezwan Chicken Fried Rice", price: 190, isVeg: false, recommended: true, description: "Fragrant rice stir-fried with juicy shredded chicken, fiery home-made Schezwan chili paste, and spring scallions.", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200&auto=format&fit=crop&q=60" },
            { id: 504, name: "Steamed Chicken Momos", price: 120, isVeg: false, recommended: true, description: "Handcrafted Asian dumplings stuffed with seasoned minced chicken, steamed soft and served with red pepper dip.", image: "https://images.unsplash.com/photo-1625220194771-7ebedd0b4a27?w=200&auto=format&fit=crop&q=60" },
            { id: 505, name: "Crispy Spring Rolls", price: 110, isVeg: true, recommended: false, description: "Crispy fried wrappers filled with seasoned cabbage, carrots, glass noodles, served with sweet chilli dip.", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=200&auto=format&fit=crop&q=60" },
            { id: 506, name: "Chilli Paneer Dry", price: 170, isVeg: true, recommended: false, description: "Wok-tossed paneer cubes with bell peppers, onions, green chilies, and dark soy sauce.", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=200&auto=format&fit=crop&q=60" },
            { id: 507, name: "Pan Fried Veg Momos", price: 130, isVeg: true, recommended: false, description: "Handcrafted momos pan-seared till golden, served with spicy Schezwan dipping chutney.", image: "https://images.unsplash.com/photo-1625220194771-7ebedd0b4a27?w=200&auto=format&fit=crop&q=60" }
        ]
    },
    {
        id: 6,
        name: "The Organic Salad & Soup Bar",
        cuisines: ["Healthy Food", "Salads", "Soups"],
        rating: 4.7,
        time: 18,
        costForTwo: 380,
        discount: "10% OFF + Pure Organic Guaranteed",
        isVeg: true,
        isNew: false,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60",
        menu: [
            { id: 601, name: "Avocado Quinoa Salad", price: 220, isVeg: true, recommended: true, description: "Fresh Hass avocados, premium white quinoa, cherry tomatoes, cucumbers, mixed greens with honey-lime mustard dressing.", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&auto=format&fit=crop&q=60" },
            { id: 602, name: "Wild Mushroom Soup", price: 140, isVeg: true, recommended: false, description: "A velvety, rich, earthy cream of roasted wild button mushrooms with fresh rosemary and roasted garlic toast.", image: "https://images.unsplash.com/photo-1547592165-e1d17fed6006?w=200&auto=format&fit=crop&q=60" },
            { id: 603, name: "Caesar Tofu Wrap", price: 170, isVeg: true, recommended: true, description: "Whole wheat wrap containing roasted organic tofu blocks, Romaine lettuce, shaved parmesan, and creamy caesar paste.", image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=200&auto=format&fit=crop&q=60" },
            { id: 604, name: "Fresh Green Detox Juice", price: 120, isVeg: true, recommended: false, description: "Cold-pressed extraction of fresh celery, baby spinach, green apples, cucumbers, ginger, and sour fresh lime drop.", image: "https://images.unsplash.com/photo-1610970881699-44a5587caaec?w=200&auto=format&fit=crop&q=60" },
            { id: 605, name: "Greek Feta Salad", price: 190, isVeg: true, recommended: false, description: "Crisp cucumbers, tomatoes, red onions, kalamata olives, and block feta cheese in olive oil dressing.", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&auto=format&fit=crop&q=60" },
            { id: 606, name: "Tomato Basil Soup", price: 120, isVeg: true, recommended: false, description: "Smooth roasted tomato soup simmered with fresh sweet basil and extra virgin olive oil.", image: "https://images.unsplash.com/photo-1547592165-e1d17fed6006?w=200&auto=format&fit=crop&q=60" },
            { id: 607, name: "Protein Power Chicken Salad", price: 240, isVeg: false, recommended: true, description: "Grilled chicken breast strips, organic baby spinach, hard-boiled egg, and avocado.", image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=200&auto=format&fit=crop&q=60" }
        ]
    },
    {
        id: 7,
        name: "Dakshin Tiffin & Dosa House",
        cuisines: ["South Indian", "Dosa", "Idli", "Filter Coffee"],
        rating: 4.6,
        time: 22,
        costForTwo: 250,
        discount: "25% OFF up to ₹60",
        isVeg: true,
        isNew: true,
        image: "https://images.unsplash.com/photo-1630383249896-483b1fbf4b4e?w=500&auto=format&fit=crop&q=60",
        menu: [
            { id: 701, name: "Masala Dosa with Chutney", price: 120, isVeg: true, recommended: true, description: "Crispy golden dosa stuffed with spiced potato masala, served with coconut chutney and piping hot sambar.", image: "https://images.unsplash.com/photo-1630383249896-483b1fbf4b4e?w=200&auto=format&fit=crop&q=60" },
            { id: 702, name: "Rava Uttapam", price: 90, isVeg: true, recommended: false, description: "Thick semolina pancake topped with fresh tomatoes, onions, green chilies, and coriander — served with 3 chutneys.", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=200&auto=format&fit=crop&q=60" },
            { id: 703, name: "Medu Vada Sambar", price: 80, isVeg: true, recommended: true, description: "Fluffy, crisp lentil doughnuts deep fried to perfection, dunked into tangy, spiced tamarind sambar.", image: "https://images.unsplash.com/photo-1605197788044-4f3e42ae08c2?w=200&auto=format&fit=crop&q=60" },
            { id: 704, name: "Ghee Roast Chicken Dosa", price: 180, isVeg: false, recommended: true, description: "Extra-crispy paper dosa roasted with clarified ghee, packed with spicy Mangalorean-style dry chicken roast.", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&auto=format&fit=crop&q=60" },
            { id: 705, name: "Filter Coffee Decoction", price: 60, isVeg: true, recommended: true, description: "Authentic South Indian filter kaapi — strong dark coffee decoction, mixed with frothy steamed milk, poured from height.", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&auto=format&fit=crop&q=60" },
            { id: 706, name: "Idli Sambar (2 Pieces)", price: 70, isVeg: true, recommended: false, description: "Soft, steamed fluffy rice cakes served with spicy sambar and fresh coconut chutney.", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=200&auto=format&fit=crop&q=60" },
            { id: 707, name: "Onion Rava Masala Dosa", price: 130, isVeg: true, recommended: false, description: "Crispy semolina dosa spiced with chopped onions and filled with potato masala.", image: "https://images.unsplash.com/photo-1630383249896-483b1fbf4b4e?w=200&auto=format&fit=crop&q=60" },
            { id: 708, name: "Sweet Pineapple Sheera", price: 80, isVeg: true, recommended: false, description: "Traditional roasted semolina sweet pudding cooked with ghee, sugar, and pineapple chunks.", image: "https://images.unsplash.com/photo-1605197788044-4f3e42ae08c2?w=200&auto=format&fit=crop&q=60" }
        ]
    },
    {
        id: 8,
        name: "Rollwala — Kathi Rolls & Wraps",
        cuisines: ["Rolls", "Wraps", "Kathi", "Snacks"],
        rating: 4.3,
        time: 17,
        costForTwo: 280,
        discount: "Buy 2 Get 1 FREE on Rolls",
        isVeg: false,
        isNew: true,
        image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&auto=format&fit=crop&q=60",
        menu: [
            { id: 801, name: "Egg Double Chicken Kathi Roll", price: 150, isVeg: false, recommended: true, description: "Flaky laccha paratha layered with egg, loaded with spiced chicken strips, onion salad, and zesty green chutney.", image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=200&auto=format&fit=crop&q=60" },
            { id: 802, name: "Paneer Tikka Kathi Roll", price: 130, isVeg: true, recommended: true, description: "Whole-wheat roomali roti tightly rolled with tandoori paneer cubes, capsicum, onions, and mint coriander mayo.", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&auto=format&fit=crop&q=60" },
            { id: 803, name: "Mutton Seekh Roll", price: 190, isVeg: false, recommended: true, description: "Two minced mutton seekh kebabs wrapped in a toasted tandoori roti with pickled onions, raw papaya and chutney.", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=200&auto=format&fit=crop&q=60" },
            { id: 804, name: "Veg Cheese Corn Roll", price: 110, isVeg: true, recommended: false, description: "A soft plain paratha stuffed with sweet corn, mozzarella cheese, mixed peppers, and mild peri-peri drizzle.", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=200&auto=format&fit=crop&q=60" },
            { id: 805, name: "Masala Lime Chaas", price: 50, isVeg: true, recommended: false, description: "Chilled buttermilk blended with roasted cumin, black salt, and fresh mint — the perfect post-roll cooldown drink.", image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=200&auto=format&fit=crop&q=60" },
            { id: 806, name: "Double Egg Roll", price: 90, isVeg: false, recommended: false, description: "Tavva paratha coated with double whisked eggs, wrapped with sliced onions and lime juice.", image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=200&auto=format&fit=crop&q=60" },
            { id: 807, name: "Aloo Masala Kathi Roll", price: 80, isVeg: true, recommended: false, description: "Spiced mashed potato stuffing wrapped in roomali roti with raw onions and green chutney.", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=200&auto=format&fit=crop&q=60" },
            { id: 808, name: "Chicken Seekh Kebab Roll", price: 160, isVeg: false, recommended: false, description: "Juicy minced chicken kebabs rolled with bell peppers, onions, and tandoori mayo.", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=200&auto=format&fit=crop&q=60" }
        ]
    },
    {
        id: 9,
        name: "The Coastal Catch — Seafood Grill",
        cuisines: ["Seafood", "Goan", "Coastal", "Fish Fry"],
        rating: 4.5,
        time: 35,
        costForTwo: 650,
        discount: "FREE Prawn Starter above ₹700",
        isVeg: false,
        isNew: true,
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=60",
        menu: [
            { id: 901, name: "Butter Garlic Prawns", price: 380, isVeg: false, recommended: true, description: "Jumbo tiger prawns sautéed in golden butter, crushed garlic, white wine reduction, finished with fresh parsley.", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&auto=format&fit=crop&q=60" },
            { id: 902, name: "Tandoori Fish Tikka", price: 280, isVeg: false, recommended: true, description: "Fresh Basa fish cubes marinated in hung curd, lemon, and secret spice paste — roasted in tandoor to a smoky char.", image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&auto=format&fit=crop&q=60" },
            { id: 903, name: "Goan Fish Curry & Rice", price: 320, isVeg: false, recommended: true, description: "Traditional Goan red coconut curry with fresh river fish, tamarind, kokum, and steamed Goa red rice.", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=200&auto=format&fit=crop&q=60" },
            { id: 904, name: "Crispy Calamari Rings", price: 240, isVeg: false, recommended: false, description: "Tender squid rings in a crispy seasoned breadcrumb coat, deep-fried until golden and served with garlic aioli.", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&auto=format&fit=crop&q=60" },
            { id: 905, name: "Coastal Veg Thali", price: 180, isVeg: true, recommended: false, description: "A hearty veg platter with coconut rice, sambar, rasam, dry sabzi, papad, pickle, and homemade buttermilk.", image: "https://images.unsplash.com/photo-1610970881699-44a5587caaec?w=200&auto=format&fit=crop&q=60" },
            { id: 906, name: "Surmai Fish Fry", price: 350, isVeg: false, recommended: false, description: "Kingfish steaks coated in spicy Konkani masala and semolina, shallow-fried crisp.", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&auto=format&fit=crop&q=60" },
            { id: 907, name: "Prawns Masala Fry", price: 380, isVeg: false, recommended: false, description: "Fresh prawns cooked in a thick spicy onion-tomato gravy with coastal spices.", image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&auto=format&fit=crop&q=60" },
            { id: 908, name: "Sol Kadi", price: 60, isVeg: true, recommended: false, description: "Traditional pink cooling drink made from kokum extract, coconut milk, fresh garlic, and chili.", image: "https://images.unsplash.com/photo-1610970881699-44a5587caaec?w=200&auto=format&fit=crop&q=60" }
        ]
    }
];

// API Endpoints
app.get('/api/restaurants', (req, res) => {
    res.json(RESTAURANTS);
});

app.post('/api/order', (req, res) => {
    const { items, totalAmount, paymentMethod, address } = req.body;
    
    // Simulate order processing
    const orderId = 'ORD-' + Math.floor(Math.random() * 900000 + 100000);
    const heroes = ["Rohan Sharma", "Aman Verma", "Rahul Gupta", "Vikram Rathore"];
    const chosenHero = heroes[Math.floor(Math.random() * heroes.length)];

    console.log(`[Order Received] ID: ${orderId}, Total: ₹${totalAmount}, Items: ${items.length}`);
    
    res.status(201).json({
        success: true,
        orderId,
        courierName: chosenHero,
        eta: "25 mins",
        message: "Order placed successfully on BiteSync backend!"
    });
});

// Fallback index.html router for SPA behavior (optional but good practice)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running in dynamic web service mode on port ${PORT}`);
});
