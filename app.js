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

// Carousel Cuisines items
const CUISINE_CATEGORIES = [
    { name: "Biryani", emoji: "🍛", keyword: "Biryani" },
    { name: "Burgers", emoji: "🍔", keyword: "Burgers" },
    { name: "Pizza", emoji: "🍕", keyword: "Pizza" },
    { name: "Desserts", emoji: "🍰", keyword: "Desserts" },
    { name: "Chinese", emoji: "🥢", keyword: "Chinese" },
    { name: "Healthy", emoji: "🥗", keyword: "Healthy" },
    { name: "North Indian", emoji: "🫓", keyword: "North Indian" },
    { name: "South Indian", emoji: "🥞", keyword: "South Indian" },
    { name: "Rolls", emoji: "🌯", keyword: "Rolls" },
    { name: "Seafood", emoji: "🦐", keyword: "Seafood" },
    { name: "Momos", emoji: "🥟", keyword: "Momos" },
    { name: "Coffee", emoji: "☕", keyword: "Coffee" }
];

// Application State
let appState = {
    restaurants: [...RESTAURANTS],
    filteredRestaurants: [...RESTAURANTS],
    cart: [], // Format: { restaurantId, item, quantity }
    activeFilter: 'all', // all, rating, veg, fast
    sortBy: 'relevance',
    searchQuery: '',
    selectedCategory: '',
    selectedRestaurant: null,
    couponApplied: null // Coupon details if loaded
};

// DOM References
const restaurantGrid = document.getElementById("restaurantGrid");
const categoryTrack = document.getElementById("categoryTrack");
const globalSearch = document.getElementById("globalSearch");
const sortBySelect = document.getElementById("sortBy");
const activeFiltersInfo = document.getElementById("activeFiltersInfo");
const filterButtons = document.querySelectorAll(".filter-btn");
const restaurantGridTitle = document.getElementById("restaurantGridTitle");

// Menu Modal Details
const menuOverlay = document.getElementById("menuOverlay");
const menuCloseBtn = document.getElementById("menuCloseBtn");
const menuHeaderBanner = document.getElementById("menuHeaderBanner");
const menuItemsList = document.getElementById("menuItemsList");
const menuTabs = document.getElementById("menuTabs");

// Cart Drawer Details
const cartTrigger = document.getElementById("cartTrigger");
const cartCount = document.getElementById("cartCount");
const cartDrawerOverlay = document.getElementById("cartDrawerOverlay");
const cartCloseBtn = document.getElementById("cartCloseBtn");
const cartItemsContainer = document.getElementById("cartItemsContainer");
const cartSummarySection = document.getElementById("cartSummarySection");
const fillCartBtn = document.getElementById("fillCartBtn");

// Receipt Breakdown Elements
const billItemTotal = document.getElementById("billItemTotal");
const billDeliveryFee = document.getElementById("billDeliveryFee");
const billTaxes = document.getElementById("billTaxes");
const billDiscountRow = document.getElementById("billDiscountRow");
const billDiscount = document.getElementById("billDiscount");
const billGrandTotal = document.getElementById("billGrandTotal");
const couponCodeInput = document.getElementById("couponCode");
const applyCouponBtn = document.getElementById("applyCouponBtn");
const couponMessage = document.getElementById("couponMessage");

// Checkout Modal
const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutModal = document.getElementById("checkoutModal");
const checkoutClose = document.getElementById("checkoutClose");
const finalPayAmount = document.getElementById("finalPayAmount");
const payNowBtn = document.getElementById("payNowBtn");
const addressCards = document.querySelectorAll(".address-card");
const paymentOptions = document.querySelectorAll(".payment-option");

// Tracking Modal
const trackingModal = document.getElementById("trackingModal");
const deliveryBike = document.getElementById("deliveryBike");
const courierName = document.getElementById("courierName");
const etaTime = document.getElementById("etaTime");
const dismissTrackingBtn = document.getElementById("dismissTrackingBtn");

// Sound Alerts Utility (TTS Synthesis)
function playSystemVoice(message) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Cancel any queueing speech
        const speech = new SpeechSynthesisUtterance(message);
        speech.rate = 1.05;
        speech.pitch = 1.0;
        speech.volume = 0.95;
        window.speechSynthesis.speak(speech);
    }
}

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
    loadCategoryCarousel();
    renderRestaurants();
    setupThemeToggle();
    setupEventListeners();
});

// Setup Dark/Light Theme Switching
function setupThemeToggle() {
    const themeToggle = document.getElementById("themeToggle");
    const storedTheme = localStorage.getItem("bitesync-theme") || "light";
    document.documentElement.setAttribute("data-theme", storedTheme);

    themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const nextTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", nextTheme);
        localStorage.setItem("bitesync-theme", nextTheme);
        
        // Dynamic micro-animation for theme switch
        themeToggle.style.transform = "rotate(360deg)";
        setTimeout(() => { themeToggle.style.transform = ""; }, 400);
    });
}

// Load Hero category items
function loadCategoryCarousel() {
    categoryTrack.innerHTML = "";
    CUISINE_CATEGORIES.forEach(cat => {
        const card = document.createElement("div");
        card.className = "category-card";
        card.innerHTML = `
            <div class="category-image-wrap">${cat.emoji}</div>
            <span>${cat.name}</span>
        `;
        card.addEventListener("click", () => {
            if (appState.selectedCategory === cat.keyword) {
                appState.selectedCategory = ""; // toggle clear
                card.querySelector(".category-image-wrap").style.borderColor = "";
                filterRestaurants();
            } else {
                // Clear any other active category styles first
                document.querySelectorAll(".category-card .category-image-wrap").forEach(item => {
                    item.style.borderColor = "";
                });
                appState.selectedCategory = cat.keyword;
                card.querySelector(".category-image-wrap").style.borderColor = "var(--primary)";
                filterRestaurants();
            }
        });
        categoryTrack.appendChild(card);
    });
}

// Main Render Function for Restaurant cards grid
function renderRestaurants() {
    restaurantGrid.innerHTML = "";
    
    if (appState.filteredRestaurants.length === 0) {
        restaurantGrid.innerHTML = `
            <div class="empty-state-container" style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; color: var(--text-secondary);">
                <h3>No kitchens matches your criteria</h3>
                <p>Try clearing filters or search queries to find gourmet chefs nearby!</p>
            </div>
        `;
        restaurantGridTitle.textContent = "No Matches Found";
        return;
    }

    restaurantGridTitle.textContent = appState.selectedCategory 
        ? `Popular ${appState.selectedCategory} Outlets` 
        : "Top Restaurant Chains in Mumbai";

    appState.filteredRestaurants.forEach(res => {
        const card = document.createElement("div");
        card.className = "restaurant-card";
        card.innerHTML = `
            <div class="res-image">
                <img src="${res.image}" alt="${res.name}">
                <div class="discount-tag">${res.discount}</div>
            </div>
            <div class="res-details">
                <h3 class="res-name">${res.name}</h3>
                <p class="res-cuisines">${res.cuisines.join(", ")}</p>
                <div class="res-meta">
                    <div class="res-rating">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192L12 .587z"/></svg>
                        <span>${res.rating}</span>
                    </div>
                    <div class="res-time">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:12px; height:12px;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        <span>${res.time} mins</span>
                    </div>
                    <div class="res-cost">₹${res.costForTwo} FOR TWO</div>
                </div>
            </div>
        `;
        card.addEventListener("click", () => openRestaurantMenu(res));
        restaurantGrid.appendChild(card);
    });
}

// Master Filters & Sorting Function
function filterRestaurants() {
    let result = [...appState.restaurants];

    // 1. Text Search Filter (Matches restaurant name, cuisines, or individual food menu items!)
    if (appState.searchQuery.trim() !== "") {
        const query = appState.searchQuery.toLowerCase();
        result = result.filter(res => {
            const matchesName = res.name.toLowerCase().includes(query);
            const matchesCuisine = res.cuisines.some(c => c.toLowerCase().includes(query));
            const matchesDishes = res.menu.some(dish => dish.name.toLowerCase().includes(query));
            return matchesName || matchesCuisine || matchesDishes;
        });
    }

    // 2. Carousel Category Selection Filter
    if (appState.selectedCategory !== "") {
        const categoryKeyword = appState.selectedCategory.toLowerCase();
        result = result.filter(res => 
            res.cuisines.some(c => c.toLowerCase().includes(categoryKeyword)) ||
            res.menu.some(dish => dish.name.toLowerCase().includes(categoryKeyword))
        );
    }

    // 3. Grid Filters (Ratings, Veg, Fast Delivery, New, Budget, Offers)
    if (appState.activeFilter === "rating") {
        result = result.filter(res => res.rating >= 4.4);
        activeFiltersInfo.textContent = "Showing top rated (4.4+ rating) gourmet restaurants";
    } else if (appState.activeFilter === "veg") {
        result = result.filter(res => res.isVeg === true);
        activeFiltersInfo.textContent = "Showing 100% Pure Vegetarian kitchens";
    } else if (appState.activeFilter === "fast") {
        result = result.filter(res => res.time <= 22);
        activeFiltersInfo.textContent = "Showing superfast delivery kitchens (under 22 mins)";
    } else if (appState.activeFilter === "new") {
        result = result.filter(res => res.isNew === true);
        activeFiltersInfo.textContent = "🆕 Showing newly launched restaurants near you";
    } else if (appState.activeFilter === "budget") {
        result = result.filter(res => res.costForTwo <= 300);
        activeFiltersInfo.textContent = "💰 Showing budget-friendly restaurants (₹300 or less for two)";
    } else if (appState.activeFilter === "offers") {
        result = result.filter(res => res.discount && res.discount !== "");
        activeFiltersInfo.textContent = "🎉 Showing restaurants with active offers & discounts";
    } else {
        activeFiltersInfo.textContent = "Showing all popular restaurants around Bandra, Mumbai";
    }

    // 4. Sorting logic
    if (appState.sortBy === "cost-asc") {
        result.sort((a, b) => a.costForTwo - b.costForTwo);
    } else if (appState.sortBy === "cost-desc") {
        result.sort((a, b) => b.costForTwo - a.costForTwo);
    } else if (appState.sortBy === "rating-desc") {
        result.sort((a, b) => b.rating - a.rating);
    } else if (appState.sortBy === "time-asc") {
        result.sort((a, b) => a.time - b.time);
    }

    appState.filteredRestaurants = result;
    renderRestaurants();
}

// Setup Interactive UI listeners
function setupEventListeners() {
    // Live Search
    globalSearch.addEventListener("input", (e) => {
        appState.searchQuery = e.target.value;
        filterRestaurants();
    });

    // Sorting selector
    sortBySelect.addEventListener("change", (e) => {
        appState.sortBy = e.target.value;
        filterRestaurants();
    });

    // Grid Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            appState.activeFilter = btn.getAttribute("data-filter");
            filterRestaurants();
        });
    });

    // Menu Overlay Close
    menuCloseBtn.addEventListener("click", () => {
        menuOverlay.classList.remove("open");
    });
    
    // Close overlay on clicking empty backdrop
    menuOverlay.addEventListener("click", (e) => {
        if (e.target === menuOverlay) menuOverlay.classList.remove("open");
    });

    // Menu category tabs filtering
    menuTabs.addEventListener("click", (e) => {
        const targetTab = e.target.closest(".tab-btn");
        if (!targetTab) return;
        
        document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
        targetTab.classList.add("active");

        const tabCategory = targetTab.getAttribute("data-category");
        renderMenuItems(tabCategory);
    });

    // Cart Triggering Drawers
    cartTrigger.addEventListener("click", () => {
        cartDrawerOverlay.classList.add("open");
        renderCartItems();
    });
    cartCloseBtn.addEventListener("click", () => {
        cartDrawerOverlay.classList.remove("open");
    });
    cartDrawerOverlay.addEventListener("click", (e) => {
        if (e.target === cartDrawerOverlay) cartDrawerOverlay.classList.remove("open");
    });
    fillCartBtn.addEventListener("click", () => {
        cartDrawerOverlay.classList.remove("open");
    });

    // Apply Coupon Code Click
    applyCouponBtn.addEventListener("click", validateAndApplyCoupon);

    // Checkout Flow Modal triggers
    checkoutBtn.addEventListener("click", () => {
        cartDrawerOverlay.classList.remove("open");
        checkoutModal.classList.add("open");
        
        // Load Grand Total into checkout
        const finalTotal = calculateGrandTotal();
        finalPayAmount.textContent = `₹${finalTotal.toFixed(2)}`;
    });

    checkoutClose.addEventListener("click", () => {
        checkoutModal.classList.remove("open");
    });

    // Interactive Address selector
    addressCards.forEach(card => {
        card.addEventListener("click", () => {
            addressCards.forEach(c => c.classList.remove("selected"));
            card.classList.add("selected");
        });
    });

    // Interactive Payment Option selector
    paymentOptions.forEach(opt => {
        opt.addEventListener("click", () => {
            paymentOptions.forEach(o => o.classList.remove("selected"));
            opt.classList.add("selected");
            opt.querySelector("input").checked = true;
        });
    });

    // Final Checkout Trigger: Simulated Live Order Tracking
    payNowBtn.addEventListener("click", runLiveOrderSimulation);

    // Dismiss Tracking Modal
    dismissTrackingBtn.addEventListener("click", () => {
        trackingModal.classList.remove("open");
        dismissTrackingBtn.disabled = true;
        dismissTrackingBtn.textContent = "Awaiting Handover...";
        dismissTrackingBtn.classList.remove("enabled");
    });
}

// Open Restaurant Menu detailed view
function openRestaurantMenu(res) {
    appState.selectedRestaurant = res;
    
    // Set Header Banner Background and Info
    menuHeaderBanner.style.backgroundImage = `url(${res.image})`;
    menuHeaderBanner.innerHTML = `
        <div class="menu-header-content">
            <h2 class="menu-header-name">${res.name}</h2>
            <div class="menu-header-meta">
                <span>⭐ ${res.rating} Ratings</span>
                <span>⏱️ ${res.time} Mins Delivery</span>
                <span>💰 ₹${res.costForTwo} for two</span>
            </div>
        </div>
    `;

    // Reset Menu tabs selection
    document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
    document.querySelector('.tab-btn[data-category="all"]').classList.add("active");

    // Load full menu items
    renderMenuItems("all");
    
    // Open Overlay Drawer
    menuOverlay.classList.add("open");
}

// Render food lists inside detailed menu
function renderMenuItems(categoryFilter) {
    menuItemsList.innerHTML = "";
    const items = appState.selectedRestaurant.menu;
    
    let filteredItems = [...items];
    if (categoryFilter === "recommended") {
        filteredItems = items.filter(i => i.recommended === true);
    } else if (categoryFilter === "veg") {
        filteredItems = items.filter(i => i.isVeg === true);
    }

    if (filteredItems.length === 0) {
        menuItemsList.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--text-secondary); font-weight: 500;">
                No dishes match this category tab
            </div>
        `;
        return;
    }

    filteredItems.forEach(item => {
        // Check if item is already in the cart
        const cartIndex = appState.cart.findIndex(c => c.item.id === item.id);
        const quantity = cartIndex !== -1 ? appState.cart[cartIndex].quantity : 0;

        const card = document.createElement("div");
        card.className = "food-item-card";
        
        let actionMarkup = "";
        if (quantity > 0) {
            actionMarkup = `
                <div class="qty-controller">
                    <button class="qty-btn" onclick="updateItemQuantity(${item.id}, -1)">-</button>
                    <span>${quantity}</span>
                    <button class="qty-btn" onclick="updateItemQuantity(${item.id}, 1)">+</button>
                </div>
            `;
        } else {
            actionMarkup = `<button class="food-add-btn" onclick="addItemToCart(${item.id})">Add</button>`;
        }

        card.innerHTML = `
            <div class="food-info">
                <span class="food-type-tag ${item.isVeg ? '' : 'non-veg'}"></span>
                <h4 class="food-title">${item.name}</h4>
                <p class="food-price">₹${item.price}</p>
                <p class="food-desc">${item.description}</p>
            </div>
            <div class="food-action-box">
                <img class="food-item-img" src="${item.image}" alt="${item.name}">
                ${actionMarkup}
            </div>
        `;
        menuItemsList.appendChild(card);
    });
}

// Cart additions - handles multi-restaurant restriction!
function addItemToCart(itemId) {
    const item = appState.selectedRestaurant.menu.find(i => i.id === itemId);
    
    // Check if adding from a different restaurant
    if (appState.cart.length > 0 && appState.cart[0].restaurantId !== appState.selectedRestaurant.id) {
        const previousRestaurant = RESTAURANTS.find(r => r.id === appState.cart[0].restaurantId);
        
        const confirmClear = confirm(`Your cart contains items from "${previousRestaurant.name}". Clear cart and add dishes from "${appState.selectedRestaurant.name}"?`);
        if (confirmClear) {
            appState.cart = [];
            appState.couponApplied = null;
            couponCodeInput.value = "";
            couponMessage.textContent = "";
        } else {
            return;
        }
    }

    // Add item or increment
    appState.cart.push({
        restaurantId: appState.selectedRestaurant.id,
        item: item,
        quantity: 1
    });

    playSystemVoice(`${item.name} added to cart.`);
    updateCartCount();
    renderMenuItems(document.querySelector(".tab-btn.active").getAttribute("data-category"));
}

// Quantity Counter updates
function updateItemQuantity(itemId, change) {
    const cartIndex = appState.cart.findIndex(c => c.item.id === itemId);
    if (cartIndex === -1) return;

    appState.cart[cartIndex].quantity += change;
    
    if (appState.cart[cartIndex].quantity <= 0) {
        const removedName = appState.cart[cartIndex].item.name;
        appState.cart.splice(cartIndex, 1);
        playSystemVoice(`${removedName} removed.`);
    }

    updateCartCount();
    
    // Re-render components
    if (appState.selectedRestaurant) {
        renderMenuItems(document.querySelector(".tab-btn.active").getAttribute("data-category"));
    }
    if (cartDrawerOverlay.classList.contains("open")) {
        renderCartItems();
    }
}

// Global cart count dynamic badge
function updateCartCount() {
    const totalCount = appState.cart.reduce((sum, current) => sum + current.quantity, 0);
    cartCount.textContent = totalCount;
    
    // Animate cart badge bounce
    cartCount.classList.remove("bounce-animation");
    void cartCount.offsetWidth; // trigger reflow
    cartCount.style.animation = "bounceBadge 0.3s ease";
}

// Draw cart item listings dynamically
function renderCartItems() {
    cartItemsContainer.innerHTML = "";
    
    if (appState.cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-message">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                <p>Your basket is currently empty. Let's feast!</p>
            </div>
        `;
        cartSummarySection.style.display = "none";
        return;
    }

    cartSummarySection.style.display = "block";
    
    appState.cart.forEach(cartRecord => {
        const itemRow = document.createElement("div");
        itemRow.className = "cart-item-row";
        itemRow.innerHTML = `
            <div class="cart-item-info">
                <p class="cart-item-name">${cartRecord.item.name}</p>
                <p class="cart-item-price">₹${cartRecord.item.price} each</p>
            </div>
            
            <div class="cart-qty-box">
                <button class="cart-qty-btn" onclick="updateItemQuantity(${cartRecord.item.id}, -1)">-</button>
                <span class="cart-qty-num">${cartRecord.quantity}</span>
                <button class="cart-qty-btn" onclick="updateItemQuantity(${cartRecord.item.id}, 1)">+</button>
            </div>
            
            <div class="cart-item-total">₹${cartRecord.item.price * cartRecord.quantity}</div>
        `;
        cartItemsContainer.appendChild(itemRow);
    });

    calculateReceiptBreakdown();
}

// Calculate cost details
function calculateReceiptBreakdown() {
    const itemTotal = appState.cart.reduce((sum, current) => sum + (current.item.price * current.quantity), 0);
    billItemTotal.textContent = `₹${itemTotal.toFixed(2)}`;

    // Set delivery fee details
    let deliveryFee = 40.00;
    if (appState.couponApplied && appState.couponApplied.code === "FREEGRAND" && itemTotal >= 400) {
        deliveryFee = 0;
    }
    billDeliveryFee.textContent = `₹${deliveryFee.toFixed(2)}`;

    // Taxes
    const taxes = itemTotal * 0.05; // 5% GST
    billTaxes.textContent = `₹${taxes.toFixed(2)}`;

    // Discount calculations
    let discountAmount = 0.00;
    if (appState.couponApplied) {
        if (appState.couponApplied.code === "BITE50") {
            discountAmount = Math.min(itemTotal * 0.5, 100);
        }
    }

    if (discountAmount > 0) {
        billDiscountRow.style.display = "flex";
        billDiscount.textContent = `-₹${discountAmount.toFixed(2)}`;
    } else {
        billDiscountRow.style.display = "none";
    }

    const grandTotal = (itemTotal + deliveryFee + taxes) - discountAmount;
    billGrandTotal.textContent = `₹${grandTotal.toFixed(2)}`;
}

// Double check Grand total values globally
function calculateGrandTotal() {
    const itemTotal = appState.cart.reduce((sum, current) => sum + (current.item.price * current.quantity), 0);
    let deliveryFee = 40.00;
    if (appState.couponApplied && appState.couponApplied.code === "FREEGRAND" && itemTotal >= 400) {
        deliveryFee = 0;
    }
    const taxes = itemTotal * 0.05;
    let discountAmount = 0.00;
    if (appState.couponApplied && appState.couponApplied.code === "BITE50") {
        discountAmount = Math.min(itemTotal * 0.5, 100);
    }
    return (itemTotal + deliveryFee + taxes) - discountAmount;
}

// Apply valid promo codes
function validateAndApplyCoupon() {
    const code = couponCodeInput.value.trim().toUpperCase();
    const itemTotal = appState.cart.reduce((sum, current) => sum + (current.item.price * current.quantity), 0);

    if (code === "") {
        couponMessage.textContent = "Please type a valid coupon code.";
        couponMessage.style.color = "var(--secondary-red)";
        return;
    }

    if (code === "BITE50") {
        appState.couponApplied = { code: "BITE50", rate: 0.5 };
        couponMessage.textContent = "Bingo! BITE50 applied successfully! 50% discount loaded.";
        couponMessage.style.color = "var(--secondary-green)";
        playSystemVoice("Coupon applied successfully.");
    } else if (code === "FREEGRAND") {
        if (itemTotal < 400) {
            couponMessage.textContent = "Code requires minimum order total of ₹400.";
            couponMessage.style.color = "var(--secondary-red)";
            return;
        }
        appState.couponApplied = { code: "FREEGRAND" };
        couponMessage.textContent = "Superb! Free Delivery charges applied.";
        couponMessage.style.color = "var(--secondary-green)";
        playSystemVoice("Free delivery coupon applied.");
    } else {
        couponMessage.textContent = "Invalid coupon code. Try 'BITE50'!";
        couponMessage.style.color = "var(--secondary-red)";
        return;
    }

    calculateReceiptBreakdown();
}

// Run interactive real-time Order placement & Delivery Tracking Simulation!
function runLiveOrderSimulation() {
    // 1. Close checkout modal
    checkoutModal.classList.remove("open");
    
    // 2. Open tracking screen
    trackingModal.classList.add("open");

    // Initialize tracking layout states
    const steps = [
        document.getElementById("step1"),
        document.getElementById("step2"),
        document.getElementById("step3"),
        document.getElementById("step4")
    ];

    const step1Time = document.getElementById("step1Time");
    const step2Time = document.getElementById("step2Time");
    const step3Time = document.getElementById("step3Time");
    const step4Time = document.getElementById("step4Time");

    // Reset timeline step styles
    steps.forEach(s => s.classList.remove("active", "completed"));
    deliveryBike.style.left = "20px";
    etaTime.textContent = "25 mins";

    // Randomize delivery hero name
    const heroes = ["Rohan Sharma", "Aman Verma", "Rahul Gupta", "Vikram Rathore"];
    const chosenHero = heroes[Math.floor(Math.random() * heroes.length)];
    courierName.textContent = chosenHero;

    // Simulation steps intervals (Real-time animations!)
    // Step 1: Order Confirmed
    steps[0].classList.add("active");
    step1Time.textContent = "Order placed at " + getCurrentTime();
    playSystemVoice("Thank you for ordering on BiteSync. Your order is confirmed!");

    // Transition timers (simulating 4 seconds per state for dramatic, visual UI demo!)
    setTimeout(() => {
        // Step 2: Preparing in Kitchen
        steps[0].classList.remove("active");
        steps[0].classList.add("completed");
        steps[0].querySelector(".step-icon").innerHTML = "✓";

        steps[1].classList.add("active");
        step2Time.textContent = "Chef started preparing your fresh ingredients at " + getCurrentTime();
        deliveryBike.style.left = "30%";
        etaTime.textContent = "18 mins";
        playSystemVoice("The gourmet chef has started preparing your fresh ingredients.");
    }, 4500);

    setTimeout(() => {
        // Step 3: Out for Delivery
        steps[1].classList.remove("active");
        steps[1].classList.add("completed");
        steps[1].querySelector(".step-icon").innerHTML = "✓";

        steps[2].classList.add("active");
        step3Time.textContent = `${chosenHero} picked up food & zipped off at ` + getCurrentTime();
        deliveryBike.style.left = "65%";
        etaTime.textContent = "8 mins";
        playSystemVoice(`Awesome! Delivery partner ${chosenHero} has picked up your food and is flying your way!`);
    }, 9000);

    setTimeout(() => {
        // Step 4: Arrived / Delivered
        steps[2].classList.remove("active");
        steps[2].classList.add("completed");
        steps[2].querySelector(".step-icon").innerHTML = "✓";

        steps[3].classList.add("active");
        steps[3].classList.add("completed");
        steps[3].querySelector(".step-icon").innerHTML = "✓";
        step4Time.textContent = "Handed over directly to you at " + getCurrentTime();
        
        deliveryBike.style.left = "calc(100% - 60px)";
        etaTime.textContent = "Arrived!";
        
        playSystemVoice("Yum! The delivery rider has arrived at your door. Please collect your delicious meal!");

        // Activate "Done" buttons to reset state
        dismissTrackingBtn.disabled = false;
        dismissTrackingBtn.textContent = "Feast Complete! Clear State";
        dismissTrackingBtn.classList.add("enabled");

        // Clear the cart on successful completion
        appState.cart = [];
        updateCartCount();
    }, 14000);
}

// Utility to get current timestamp
function getCurrentTime() {
    const d = new Date();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
}
