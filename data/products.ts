'use client';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  desc: string;
  category: string; // Added to fix your search logic
  story?: string;
  health?: string[];
  recipe?: { title: string; steps: string[] };
}

export const products: Product[] = [
  // --- FAMOUS PAHADI PULSES (DALS) ---
  { 
    id: 1, 
    name: "Bhatt (Black Soybean)", 
    price: 180, 
    image: "/bhatt_dal.svg",
    desc: "Heart of Kumaoni cuisine (Churkani).",
    category: "Pulses",
    story: "In the mist-covered villages of Kumaon, Black Bhatt is not just a lentil; it is winter's warmth encapsulated in a seed. Indigenous to the high-altitude rain-fed fields of Uttarakhand, this black soybean is smaller, flatter, and far more potent than its commercial counterparts. For centuries, Kumaoni mothers have relied on Bhatt to keep their families warm during the harsh snowy months. Unlike regular soybeans, these are cultivated without any chemical fertilizers, drawing their nutrition directly from the mineral-rich Himalayan soil. In local folklore, Bhatt is considered 'Taasir-e-Garam' (hot in nature), making it a staple survival food for high-altitude trekkers and shepherds.",
    health: [
      "High Protein Powerhouse: Contains significantly higher protein than meat or eggs.",
      "Liver Health: Traditional remedy for managing jaundice and liver detoxification.",
      "Diabetes Management: Low glycemic index helps stabilize blood sugar levels.",
      "Rich in Iron: Essential for combating anemia in high-altitude living."
    ],
    recipe: {
      title: "Traditional Kumaoni Churkani",
      steps: [
        "Heat mustard oil in an iron kadhai (wok) until it smokes.",
        "Add a handful of Bhatt lentils and fry until they crackle and split (this is crucial for flavor).",
        "Add wheat flour (atta) to the oil and roast until it turns golden brown and fragrant.",
        "Slowly pour in hot water while stirring continuously to prevent lumps.",
        "Add turmeric, coriander powder, and salt. Simmer on low heat for 45 minutes until the gravy darkens.",
        "Temper with Jakhya (wild mustard) and Gandrayani (angelica) for the authentic aroma.",
        "Serve piping hot with steamed rice and a dollop of pure ghee."
      ]
    }
  },
  { 
    id: 2, 
    name: "Gahat (Horse Gram)", 
    price: 280, 
    image: "/hourse_grams.svg", 
    desc: "Warm potency, kidney stone remedy.",
    category: "Pulses",
    story: "Known as the 'Miracle Pulse' of the Himalayas, Gahat (or Kulath) is legendary in mountain medicine. It is famously said in Pahadi villages that 'Gahat breaks stones', referring to its incredible ability to dissolve kidney stones naturally. Grown in the dry, rocky terrains of Garhwal where other crops fail, Gahat is a survivor crop, and it passes that resilience to those who eat it. It is traditionally consumed in winter because of its extreme heat-generating properties. Village councils often serve Gahat soup during long deliberations in the cold open air to keep the elders warm and energetic.",
    health: [
      "Kidney Stone Dissolver: Diuretic properties help flush out toxins and break down stones.",
      "Winter Warmer: Generates significant internal body heat, preventing colds.",
      "Weight Loss: High fiber content boosts metabolism and keeps you full.",
      "Menstrual Health: Helps regulate cycles and reduce cramping due to its warming nature."
    ],
    recipe: {
      title: "Garhwali Gahat Ka Phanu",
      steps: [
        "Soak Gahat dal overnight. Grind it into a rough, coarse paste (silbatta preferred).",
        "Heat mustard oil and crackle Jakhya seeds.",
        "Sauté the lentil paste with ginger, garlic, and wild turmeric until it turns brown.",
        "Add water and let it slow-cook for at least an hour. The longer it cooks, the earthier it tastes.",
        "Finish with a tempering of Gandrayani and dry red chilies.",
        "Enjoy with Mandua (Finger Millet) Roti for a complete Pahadi meal."
      ]
    }
  },
  { 
    id: 3, 
    name: "Munsiyari Rajma", 
    price: 350, 
    image: "/munsiyari_rajma.svg", 
    desc: "Creamy, premium white kidney beans.",
    category: "Pulses",
    story: "Grown in the pristine, mineral-rich soil of the Munsiyari valley, right at the base of the Panchachuli peaks, this is the 'King of Kidney Beans'. Munsiyari Rajma is distinctively white or off-white and is famous for its incredibly thin skin and buttery texture. Unlike the red rajma found in cities which requires hours of pressure cooking, these delicate beans cook rapidly and melt in the mouth. They are watered by glacial streams, giving them a subtle sweetness that is impossible to replicate elsewhere. Local farmers harvest them by hand in late autumn, drying them on slate rooftops under the crisp Himalayan sun.",
    health: [
      "Heart Health: exceptionally rich in complex carbohydrates and soluble fiber.",
      "Sustained Energy: Low GI provides steady energy release, perfect for mountain climbing.",
      "Bone Strength: High magnesium and calcium content.",
      "Digestive Health: The thin skin makes it much easier to digest than red kidney beans."
    ],
    recipe: {
      title: "Creamy Munsiyari Rajma Curry",
      steps: [
        "Soak the beans for 6-8 hours. Pressure cook for just 2-3 whistles (they are very soft).",
        "In a heavy-bottomed pan, sauté onions, ginger, and garlic paste until golden.",
        "Add fresh tomato puree, turmeric, coriander powder, and a pinch of Kashmiri chili.",
        "Add the boiled rajma along with its stock. Mash a few beans against the side of the pot to thicken the gravy naturally.",
        "Simmer for 15 minutes. Finish with fresh coriander and a pinch of Garam Masala.",
        "Best enjoyed with steamed white rice and Mooli Thechwani (radish salad)."
      ]
    }
  },
  { 
    id: 4, 
    name: "Harsil Rajma", 
    price: 380, 
    image: "/harshi_rajma.svg", 
    desc: "Famous striped kidney beans.",
    category: "Pulses",
    story: "From the serene Harsil valley, famously known as the 'Mini Switzerland of India' near Gangotri, comes this visually striking bean. Harsil Rajma is renowned for its unique purple-speckled appearance and robust, meaty flavor. Cultivated on the banks of the Bhagirathi river, the soil here imbues the beans with a distinct mineral taste. It was famously introduced to the region by Fredrick Wilson (Pahadi Wilson) in the 19th century, and since then, it has become a staple of the local Garhwali diet. It holds its shape well after cooking, making it perfect for heavy, spicy curries.",
    health: [
      "Protein Dense: One of the highest protein contents among vegetarian sources.",
      "Cholesterol Lowering: Soluble fiber helps reduce LDL cholesterol.",
      "Blood Sugar Control: Prevents insulin spikes after meals.",
      "Rich in Molybdenum: An essential trace mineral for detoxification."
    ],
    recipe: {
      title: "Spicy Harsil Rajma Masala",
      steps: [
        "Soak beans overnight. Boil with salt and a bay leaf.",
        "Prepare a tadka with ghee, cumin, and hing (asafoetida).",
        "Add chopped onions and fry until dark brown.",
        "Add a paste of ginger, garlic, and green chilies. Cook until raw smell leaves.",
        "Add boiled rajma and simmer on low heat for 30 minutes to let flavors meld.",
        "Serve with Bhaang ki Chutney and rice."
      ]
    }
  },
  { 
    id: 5, 
    name: "Pahadi Tor (Sabut Toor Dal)", 
    price: 260, 
    image: "/toor.svg", 
    desc: "Sweet, earthy mountain pigeon pea.",
    category: "Pulses",
    story: "Pahadi Tor is smaller, sweeter, and earthier than the Desi Toor dal found in the plains. Grown on the terraced step-farms of Uttarakhand, this lentil is rain-fed and sun-dried, preserving its natural oils. In Pahadi culture, Tor dal is considered a 'comfort food'—simple, nutritious, and easy on the stomach. It is often the first solid food given to babies in the hills because of its digestibility. The farmers practice mixed cropping, growing Tor alongside millets, which naturally enriches the soil with nitrogen, ensuring the crop is sustainable and chemical-free.",
    health: [
      "Folic Acid Rich: Essential for fetal development and blood cell formation.",
      "Weight Management: Low calorie and high fiber content.",
      "Immunity Booster: Rich in magnesium and zinc.",
      "Easy Digestion: Does not cause bloating like other heavy pulses."
    ],
    recipe: {
      title: "Pahadi Tor Dal Tadka",
      steps: [
        "Boil the dal with turmeric and salt until soft.",
        "Heat ghee in a ladle. Add Jakhya, dry red chilies, and thinly sliced garlic.",
        "Pour the sizzling tadka over the boiled dal and cover immediately to trap the aroma.",
        "Garnish with plenty of fresh coriander.",
        "Serve with hot rice and a slice of lemon."
      ]
    }
  },
  { 
    id: 6, 
    name: "Rayans (Rice Bean)", 
    price: 240, 
    image: "/rice_bean.svg", 
    desc: "Unique, small nutritious beans.",
    category: "Pulses",
    story: "Rayans, or the Rice Bean, is a lesser-known gem of the Himalayas. These tiny, reddish-maroon beans are revered in Garhwal not just for food, but for rituals. They are considered pure and are often used in Nanda Devi Raj Jat Yatra and other sacred festivals. Rayans is incredibly hardy, growing in rough terrains where other crops perish. It has a unique texture—soft yet retaining a bite—and a flavor profile that sits somewhere between Lobia and Rajma. It is a traditional 'famine food' that has saved mountain communities during harsh droughts.",
    health: [
      "Anti-Inflammatory: traditional remedy for reducing swelling (edema).",
      "Vitamin B Complex: Rich in Thiamine and Riboflavin.",
      "High Fiber: Excellent for gut health and regular bowel movements.",
      "Low Fat: Ideal for heart patients."
    ],
    recipe: {
      title: "Rayans ki Dal",
      steps: [
        "Soak Rayans for 4 hours. Boil until tender.",
        "Sauté onion, tomato, and local spices in mustard oil.",
        "Add the boiled beans and mash slightly to thicken the curry.",
        "Add a splash of tamarind water or lemon juice for tanginess.",
        "Simmer for 20 minutes and serve with Mandua roti."
      ]
    }
  },
  { 
    id: 7, 
    name: "Pahadi Urad (Black Gram)", 
    price: 310, 
    image: "/Pahadi_Urad.svg", 
    desc: "Perfect for Garhwali Chainsu.",
    category: "Pulses",
    story: "This is the backbone of the famous Garhwali dish 'Chainsu'. Pahadi Urad is distinct from the distinct Urad dal of the plains; it has a stronger aroma and a robust, earthy taste. Traditionally, the pods are harvested and beaten with sticks to release the black seeds. It is considered a 'heavy' food, meant for days of hard labor in the fields. The grinding of Urad dal on the 'Silbatta' (stone grinder) is a morning ritual in many village homes, the rhythmic sound echoing through the valley.",
    health: [
      "Muscle Building: Extremely high protein content.",
      "Nervous System: Ayurveda recommends Urad for strengthening the nervous system.",
      "Skin Health: Applying Urad paste is a traditional beauty treatment for glowing skin.",
      "Bone Density: Rich in phosphorus and calcium."
    ],
    recipe: {
      title: "Traditional Chainsu",
      steps: [
        "Dry roast the Urad dal in an iron pan until fragrant. Grind into a coarse powder.",
        "Heat oil, add Jakhya and garlic.",
        "Add the dal powder and roast again for 2 minutes.",
        "Add water slowly while stirring to avoid lumps. Bring to a boil.",
        "Simmer for 30-40 minutes in an iron pot (crucial for black color and iron fortification).",
        "Serve with red rice."
      ]
    }
  },
  { 
    id: 8, 
    name: "Safed Bhatt (Soybean)", 
    price: 160, 
    image: "/Safed_Bhatt.svg", 
    desc: "Used for Bhatwani curry.",
    category: "Pulses",
    story: "While the Black Bhatt gets all the fame, the White Soybean (Safed Bhatt) is the unsung hero of the everyday Pahadi diet. It is milder in flavor, creamier, and incredibly versatile. It is the primary ingredient for 'Bhatwani', a soup-like curry thickened with rice flour. Farmers often grow Safed Bhatt on the edges of terrace fields to bind the soil. It is harvested in late October, marking the onset of the festive season. The beans are sun-dried for weeks to ensure they last through the snowy winter.",
    health: [
      "Complete Protein: Contains all nine essential amino acids.",
      "Isoflavones: Rich in antioxidants that reduce cancer risk.",
      "Menopausal Health: Helps alleviate symptoms like hot flashes.",
      "Heart Friendly: Low saturated fat and high fiber."
    ],
    recipe: {
      title: "Kumaoni Bhatwani",
      steps: [
        "Soak Safed Bhatt overnight. Grind to a fine paste.",
        "Heat oil in a kadhai, add cumin and hing.",
        "Fry the paste until the raw smell disappears.",
        "Add a mixture of rice flour (biswar) and water to thicken.",
        "Add turmeric, salt, and chili powder. Cook until it reaches a soup consistency.",
        "Serve as a comforting soup or with steamed rice."
      ]
    }
  },

  // --- AUTHENTIC HIMALAYAN SPICES ---
  { 
    id: 9, 
    name: "Jakhya (Wild Mustard)", 
    price: 400, 
    image: "/Jakhya.svg", 
    desc: "Crunchy tempering spice (Tadka).",
    category: "Spices",
    story: "If Jeera (cumin) is the king of spices in the plains, Jakhya is the undisputed emperor of the hills. A small, dark brown seed from the Cleome viscosa plant, it grows wild in the fallow lands of Uttarakhand. It is not farmed; it is foraged. Pahadi cuisine is incomplete without the nutty, crunchy explosion of Jakhya in the tadka. It is preferred over mustard seeds or cumin for tempering green leafy vegetables (saag) and potatoes (Aloo ke Gutke). The crackling sound of Jakhya hitting hot mustard oil is the soundtrack of a Pahadi kitchen.",
    health: [
      "Digestive Aid: Helps digest heavy mountain pulses.",
      "Anthelmintic: Traditionally used to treat intestinal worms.",
      "Antiseptic: crushed leaves are applied to wounds.",
      "Respiratory Health: The oil is used to treat bronchitis."
    ],
    recipe: {
      title: "Pahadi Aloo ke Gutke",
      steps: [
        "Boil potatoes and cut into cubes.",
        "Heat mustard oil to smoking point.",
        "Add a generous amount of Jakhya. Let it crackle aggressively.",
        "Add turmeric, coriander powder, and red chili powder.",
        "Toss the potatoes until coated and crispy.",
        "Garnish with coriander and serve as a tea-time snack."
      ]
    }
  },
  { 
    id: 10, 
    name: "Jambu (Himalayan Chives)", 
    price: 1800, 
    image: "/Jambu.svg", 
    desc: "Aromatic herb for tempering.",
    category: "Spices",
    story: "Jambu (Allium stracheyi) is a rare herb that grows only in the high alpine meadows (Bugyals) between 2500m to 3000m altitude. It belongs to the onion family but has a distinct, potent aroma that smells like dried chives with a hint of garlic. Historically, it was brought down by the Bhotia tribes during their trade migrations from Tibet. Jambu is never cooked for long; it is used exclusively for tempering (chhaunk) at the very end of cooking dals and soups to impart a smoky, grassy flavor that defines the taste of the high Himalayas.",
    health: [
      "Cholesterol Reduction: Known to lower bad cholesterol levels.",
      "Diabetes Control: Helps regulate blood sugar.",
      "Cold Remedy: The soup is given to treat coughs and colds.",
      "Gut Health: Promotes healthy gut flora."
    ],
    recipe: {
      title: "Jambu Tadka Dal",
      steps: [
        "Prepare any simple yellow lentil or Urad dal.",
        "For the tempering, heat ghee in a small pan.",
        "Add dried Jambu strands. Fry for only 5-10 seconds (do not burn!).",
        "Immediately pour over the dal.",
        "The aroma that fills the room is the signature of Jambu."
      ]
    }
  },
  { 
    id: 11, 
    name: "Gandrayani (Angelica)", 
    price: 1900, 
    image: "/Gandrayani.svg", 
    desc: "Fragrant root for digestion.",
    category: "Spices",
    story: "Gandrayani (Angelica glauca) is a medicinal aromatic root found in the rocky crevices of the Himalayas. It is a prized possession in a Pahadi pantry, treated more like medicine than food. The root has a pungent, spicy, and bitter-sweet aroma. It is the secret ingredient in the famous 'Kumaoni Raita'. Villagers believe that Gandrayani has the power to ward off evil spirits, but practically, it is the ultimate digestive aid for the heavy, dairy-rich diet of the mountains.",
    health: [
      "Digestive Super-herb: Cures flatulence, bloating, and indigestion instantly.",
      "Appetite Stimulant: Given to those recovering from illness.",
      "Headache Relief: Paste applied to the forehead soothes migraines.",
      "Respiratory Relief: Used in herbal teas for asthma."
    ],
    recipe: {
      title: "Kumaoni Kheere ka Raita",
      steps: [
        "Grate a large cucumber (pahadi kakdi) and squeeze out excess water.",
        "Whisk fresh yogurt (curd) until smooth.",
        "Add a paste of yellow mustard seeds, green chilies, and salt.",
        "Add the grated cucumber.",
        "Temper with a pinch of Gandrayani and turmeric.",
        "Let it sit for an hour for the mustard pungency to rise."
      ]
    }
  },
  { 
    id: 12, 
    name: "Bhangjeera (Hemp Seeds)", 
    price: 425, 
    image: "/Hemp_Seeds.svg", 
    desc: "Nutty seeds for Chutney.",
    category: "Spices",
    story: "Often misunderstood due to its botanical relation to cannabis, Bhangjeera (Hemp seeds) is completely non-psychoactive and is a culinary staple in Uttarakhand. These tiny, greyish seeds have a distinct nutty flavor. They are roasted and ground with lemon juice and salt to make the iconic 'Bhaang ki Chutney', which is an essential accompaniment to every festive meal. In the harsh winters, the high oil content of these seeds provides essential fats to the body. It is cultivated widely in the hilly districts and is an eco-friendly crop requiring no pesticides.",
    health: [
      "Omega-3 & 6: One of the best plant-based sources of essential fatty acids.",
      "Complete Protein: Contains all 20 amino acids.",
      "Heart Health: Reduces inflammation and improves cardiovascular health.",
      "Skin & Hair: The oil is excellent for dry skin and eczema."
    ],
    recipe: {
      title: "Pahadi Bhaang Ki Chutney",
      steps: [
        "Dry roast a cup of Bhangjeera seeds until they pop and release aroma.",
        "Grind them on a stone silbatta with fresh coriander, mint, green chilies, and garlic.",
        "Add lemon juice (Galgal lemon is best) and salt.",
        "Mix with a little water to form a thick, coarse paste.",
        "Serve with Madua roti or Rice."
      ]
    }
  },
  { 
    id: 13, 
    name: "Timur (Sichuan Pepper)", 
    price: 800, 
    image: "/Timur.svg", 
    desc: "Zesty, numbing Himalayan spice.",
    category: "Spices",
    story: "Timur (Zanthoxylum armatum) is the Himalayan cousin of the famous Sichuan pepper. It is a berry that grows on thorny bushes in the wild. When eaten, it produces a unique tingling, numbing sensation on the tongue, followed by a citrusy, woody flavor. It is not hot like chili, but zesty. In Uttarakhand, Timur is used to make chutneys and to flavor soups. The sticks of the Timur plant are traditionally used as toothbrushes (datun) because of their incredible oral hygiene properties. It creates a mouth-freshness that toothpaste cannot match.",
    health: [
      "Dental Health: Cures toothache and gum bleeding instantly.",
      "Immunity: High antioxidant content fights infections.",
      "Blood Pressure: Helps regulate blood circulation.",
      "Antifungal: Used to preserve other pickles and foods."
    ],
    recipe: {
      title: "Timur-Tomato Chutney",
      steps: [
        "Roast tomatoes on an open flame until the skin chars.",
        "Peel tomatoes and mash them.",
        "Grind a teaspoon of Timur berries with garlic, red chilies, and salt.",
        "Mix the spice paste with the mashed tomatoes.",
        "Add a dash of mustard oil and fresh coriander.",
        "This tangy, tingling chutney goes perfectly with Momos or Dal-Rice."
      ]
    }
  },
  { 
    id: 14, 
    name: "Lakhori Mirch (Yellow Chili)", 
    price: 750, 
    image: "/Lakhori_Mirch.svg", 
    desc: "Spicy yellow turmeric-chili.",
    category: "Spices",
    story: "Native to the Lakhora village in Almora, this yellow chili is a distinct variety found only in this region. Unlike red chilies, Lakhori Mirch has a vibrant yellow color that makes it look like turmeric, but do not be fooled—it packs a serious punch of heat. It is widely used in Kumaoni cuisine because it adds heat without changing the color of the curry (like green vegetables or Kadhi). It is sun-dried on rooftops, creating a beautiful golden mosaic visible from miles away.",
    health: [
      "Metabolism Booster: The capsaicin content aids weight loss.",
      "Pain Relief: Topical application helps with joint pain.",
      "Vitamin C: Surprisingly high in Vitamin C, aiding immunity.",
      "Sinus Relief: The heat helps clear nasal congestion."
    ],
    recipe: {
      title: "Lakhori Mirch Ka Namak",
      steps: [
        "Roast Lakhori chilies, cumin, and garlic cloves.",
        "Grind them together with rock salt (Sendha Namak).",
        "This spicy, aromatic salt is sprinkled over fruits like guava, cucumber, and citrus (Malta) in the winter sun."
      ]
    }
  },
  { 
    id: 15, 
    name: "Pahadi Haldi (Turmeric)", 
    price: 290, 
    image: "/Haldi.svg", 
    desc: "High curcumin content.",
    category: "Spices",
    story: "Pahadi Haldi is not your average grocery store turmeric. Grown in the pristine, pollution-free soil of the hills, it is darker, more orange, and far more potent. The Curcumin content (the active healing compound) in Himalayan turmeric is significantly higher than plains varieties. Families in the hills still boil the raw rhizomes, dry them in the sun, and hand-pound them in large wooden mortars (okhlis). It is considered auspicious and is the first spice added to any dish to purify the food.",
    health: [
      "Potent Anti-inflammatory: Powerful for joint pain and arthritis.",
      "Natural Antibiotic: Applied to cuts and wounds to prevent infection.",
      "Skin Glow: Used in 'Ubtan' for brides for a natural radiance.",
      "Detoxifier: Cleanses the liver and blood."
    ],
    recipe: {
      title: "Himalayan Golden Milk (Haldi Doodh)",
      steps: [
        "Heat a cup of milk.",
        "Add half a teaspoon of Pahadi Haldi and a pinch of black pepper (pepper activates curcumin absorption).",
        "Add a teaspoon of honey and crushed almonds.",
        "Drink warm before bed for deep sleep and healing."
      ]
    }
  },
  { 
    id: 16, 
    name: "Kala Jeera (Wild Cumin)", 
    price: 1300, 
    image: "/Kala_Jeera.svg", 
    desc: "Rare high-altitude cumin.",
    category: "Spices",
    story: "Kala Jeera (Black Cumin) is a rare spice that grows wild in the high-altitude forests of the Himalayas. It is distinct from the regular 'Shah Jeera'. The seeds are darker, thinner, and possess a sweet, floral, earthy aroma. It is a low-yield crop, making it one of the most expensive spices from the region. It is often gathered by shepherds grazing their flocks in high meadows. In Pahadi weddings, Kala Jeera is essential for flavoring special rice dishes and meat preparations.",
    health: [
      "Digestive Tonic: Excellent for colic and bloating.",
      "Lactation Aid: Traditionally given to nursing mothers to boost milk production.",
      "Memory Booster: Believed to sharpen memory and intellect.",
      "Anti-microbial: Fights bad bacteria in the gut."
    ],
    recipe: {
      title: "Kala Jeera Rice",
      steps: [
        "Soak Basmati or local red rice.",
        "Heat ghee in a pot. Add a generous spoon of Kala Jeera.",
        "Let it crackle and release its sweet aroma.",
        "Add the rice and water. Cook until fluffy.",
        "The rice will be infused with a unique, woody fragrance."
      ]
    }
  },
  { 
    id: 17, 
    name: "Pisyu Loon (Mint Salt)", 
    price: 150, 
    image: "/Pisyu_Loon.svg", 
    desc: "Hand-ground rock salt with herbs.",
    category: "Spices",
    story: "Pisyu Loon (Ground Salt) is an art form in Uttarakhand. It is not just salt; it is a flavor bomb. Pahadi women hand-grind rock salt on a Silbatta (flat grinding stone) with fresh herbs like mint, coriander, garlic, ginger, and green chilies. The moisture from the herbs infuses into the salt, creating a colorful, aromatic seasoning. It turns a boring meal into a feast. There are many varieties: Hara Namak (Green/Mint), Lahsun Namak (Garlic), and Adrak Namak (Ginger). It is eaten with Rotis, sprinkled on salads, or licked plain for digestion.",
    health: [
      "Low Sodium: Uses rock salt which is healthier than refined salt.",
      "Digestion: The herbs (mint/garlic) aid digestion.",
      "Appetite: The spicy-salty taste stimulates hunger.",
      "Cooling: Mint salt cools the body in summer."
    ],
    recipe: {
      title: "Pahadi Cucumber Salad",
      steps: [
        "Take a large, crunchy Pahadi cucumber (Kheera).",
        "Cut it into long wedges.",
        "Generously sprinkle Pisyu Loon (Mint variety) over it.",
        "Squeeze a little lemon juice.",
        "Enjoy the fresh, spicy, herbal crunch."
      ]
    }
  },

  // --- MILLETS & GRAINS ---
  { 
    id: 18, 
    name: "Mandua (Finger Millet)", 
    price: 120, 
    image: "/Mandua.svg", 
    desc: "Black millet flour (Roti).",
    category: "Grains",
    story: "Mandua (Ragi) is the staple grain of the hardworking hill people. Known as the 'Black Gold' of Uttarakhand, this millet grows easily in poor soil and requires little water, making it the perfect crop for the mountains. In the past, it was considered a 'poor man's food', but today it is hailed as a superfood. Pahadi farmers start their day with Mandua Roti, which gives them the sustained energy to climb steep slopes and work in the fields for hours without hunger. It has a coarse texture and a rustic, nutty flavor.",
    health: [
      "Calcium King: Highest calcium content among all cereals (good for bones).",
      "Gluten-Free: Perfect for celiacs.",
      "Diabetes Control: High fiber prevents sugar spikes.",
      "Anti-Aging: Rich in amino acids that maintain skin elasticity."
    ],
    recipe: {
      title: "Mandua Ki Roti",
      steps: [
        "Mix Mandua flour with a little wheat flour (to help binding).",
        "Knead into a dough using warm water.",
        "Flatten into thick rotis using your hands (or rolling pin).",
        "Cook on an iron tawa (griddle) until dark brown spots appear.",
        "Apply generous ghee and serve with Gahat dal or Greens (Saag)."
      ]
    }
  },
  { 
    id: 19, 
    name: "Jhangora (Barnyard Millet)", 
    price: 180, 
    image: "/Jhangora.svg", 
    desc: "Himalayan super-grain rice.",
    category: "Grains",
    story: "Jhangora is a wild millet that grows abundantly in the Himalayas. It has tiny, white, round grains that look like semolina but cook like rice. It is one of the oldest cultivated grains in India. In Uttarakhand, Jhangora is often eaten as a substitute for rice or made into a sweet pudding (Kheer). It is a 'Vrat' (fasting) food, consumed during religious observances like Navratri and Ekadashi because of its purity and high energy value. It is drought-resistant and pest-resistant, growing naturally without chemicals.",
    health: [
      "Lowest Carbohydrate: Ideal for weight watchers.",
      "High Fiber: 6 times more fiber than wheat.",
      "Gluten-Free: Safe for gluten intolerance.",
      "Iron Rich: Good for anemia."
    ],
    recipe: {
      title: "Jhangore Ki Kheer",
      steps: [
        "Soak Jhangora for 30 minutes.",
        "Boil milk in a heavy pan and reduce slightly.",
        "Add Jhangora and cook on low heat until soft and creamy.",
        "Add sugar or jaggery, cardamom powder, and nuts.",
        "Serve chilled or warm. It tastes nuttier and creamier than rice kheer."
      ]
    }
  },
  { 
    id: 20, 
    name: "Lal Chawal (Red Rice)", 
    price: 195, 
    image: "/Red_Rice.svg", 
    desc: "Nutty indigenous rice.",
    category: "Grains",
    story: "The Red Rice of Purola and Uttarkashi is legendary. This indigenous variety is rain-fed and grows in the mineral-rich terraced fields. It has a reddish-brown husk and retains its bran layer, which is where all the nutrients lie. Unlike polished white rice, Lal Chawal has a firm texture, a nutty flavor, and takes longer to chew, making you feel full with a smaller portion. It is traditionally served on special occasions and is believed to provide the physical strength needed for life in the rugged terrain.",
    health: [
      "Antioxidant Rich: The red color comes from anthocyanins.",
      "Vitamin B6: Crucial for making serotonin and norepinephrine.",
      "Low GI: Better for blood sugar control than white rice.",
      "Zinc & Iron: High mineral content."
    ],
    recipe: {
      title: "Pahadi Red Rice Pulao",
      steps: [
        "Soak red rice for 2 hours (essential as it is hard).",
        "Boil until tender (it will remain slightly chewy).",
        "In a pan, heat ghee, add cumin, veggies, and salt.",
        "Toss the cooked rice in the mixture.",
        "Serve with Rajma or Kadhi."
      ]
    }
  },
  { 
    id: 21, 
    name: "Ramdana (Amaranth)", 
    price: 220, 
    image: "/Ramdana.svg", 
    desc: "Grain of the Gods.",
    category: "Grains",
    story: "Ramdana translates literally to 'God's Grain' (Ram-Dana). The Amaranth plant, with its vibrant red and purple plumes, paints the Himalayan hillsides in autumn. It is not a true cereal but a pseudo-grain. It is a sacred food, primarily eaten during religious fasts. But beyond religion, it is a nutritional powerhouse. The tiny seeds are popped like popcorn to make laddoos or ground into flour for parathas. It was a staple of the Aztecs, and similarly, it has fueled the Himalayan people for centuries.",
    health: [
      "Protein Quality: Lysine-rich protein (rare in grains).",
      "Calcium Dense: Good for children's bone growth.",
      "Gluten-Free: Excellent alternative flour.",
      "Heart Health: Lowers cholesterol."
    ],
    recipe: {
      title: "Ramdana Laddoos",
      steps: [
        "Roast Ramdana seeds in a dry pan until they pop and turn white.",
        "Melt jaggery (gur) in a separate pan to form a syrup.",
        "Mix the popped seeds into the hot jaggery syrup.",
        "Grease your hands with ghee and roll the mixture into balls while warm.",
        "A healthy, energy-packed snack."
      ]
    }
  },

  // --- FOREST PRODUCE ---
  { 
    id: 22, 
    name: "Premium Burans (Rhododendron)", 
    price: 350, 
    image: "/Rhododendron.svg", 
    desc: "Dried petals for tea/juice.",
    category: "Forest Produce",
    story: "In spring, the forests of Uttarakhand turn a fiery red with the blooming of Burans (Rhododendron arboreum), the state tree. These bright red flowers are not just beautiful; they are edible. For generations, locals have harvested the fresh flowers to make juice (sherbet) and chutneys. The petals have a sweet-sour taste. Burans is strictly seasonal, and preserving the dried petals allows people to enjoy its cooling properties year-round. Villagers believe that drinking Burans juice protects the heart and cools the liver during the hot summer months.",
    health: [
      "Heart Tonic: Traditionally used to maintain healthy blood pressure.",
      "Anti-Diabetic: Helps regulate blood sugar.",
      "Anti-Inflammatory: Reduces pain and swelling.",
      "Cooling Agent: Reduces body heat and treats headaches."
    ],
    recipe: {
      title: "Burans Flower Tea",
      steps: [
        "Take a few dried Burans petals.",
        "Boil them in water for 5 minutes.",
        "Strain the red liquid.",
        "Add honey and a few drops of lemon juice.",
        "Enjoy this tangy, antioxidant-rich herbal tea."
      ]
    }
  },
  { 
    id: 23, 
    name: "Bichoo Ghas (Nettle Tea)", 
    price: 1550, 
    image: "/nettel_tea.svg", 
    desc: "Wild harvested detox tea.",
    category: "Forest Produce",
    story: "Bichoo Ghas (Stinging Nettle) is a plant that demands respect. Touching it in the wild causes a stinging itch, but cooking or drying it turns it into a superfood. It grows wild everywhere in the hills. Traditionally, it was considered a punishment (parents would threaten kids with it!), but culinarily, 'Kandali ka Saag' is a delicacy. When dried for tea, it loses its sting completely and becomes a potent detoxifier. It is the ultimate example of the hill philosophy: 'What is wild is medicine'.",
    health: [
      "Natural Detox: Cleanses the kidneys and urinary tract.",
      "Allergy Relief: Natural antihistamine.",
      "Iron Rich: Excellent for anemia.",
      "Joint Pain: Reduces uric acid, helping with gout and arthritis."
    ],
    recipe: {
      title: "Himalayan Nettle Tea",
      steps: [
        "Steep a teaspoon of dried Nettle leaves in hot water for 5-7 minutes.",
        "Do not boil excessively.",
        "Strain and add honey.",
        "Drink early morning for a gentle body cleanse."
      ]
    }
  },
  { 
    id: 24, 
    name: "Duna (Himalayan Oregano)", 
    price: 2000, 
    image: "/Duna.svg", 
    desc: "Wild mountain oregano.",
    category: "Forest Produce",
    story: "Long before pizza arrived in India, the Himalayas had Duna. This is the wild variety of Oregano growing on the rocky slopes of Uttarakhand. It has a sharper, more intense fragrance than the Italian variety. Shepherds would often crush fresh Duna leaves and rub them on cuts or insect bites because of its antiseptic properties. In the kitchen, it is dried and used to season curries, raitas, and traditional breads. It brings the scent of the pine forest straight to your plate.",
    health: [
      "Antimicrobial: Fights bacteria and fungal infections.",
      "Digestion: Soothes stomach upsets.",
      "Menstrual Cramps: Relieves painful periods.",
      "Antioxidant: Protects cells from damage."
    ],
    recipe: {
      title: "Duna Spiced Potatoes",
      steps: [
        "Boil baby potatoes and smash them slightly.",
        "Pan-fry them in oil until crispy.",
        "Sprinkle salt, chili flakes, and a generous amount of crushed dry Duna.",
        "Toss well. The aroma mimics a mountain herb garden."
      ]
    }
  },
  { 
    id: 25, 
    name: "Linguda (Fiddlehead Fern)", 
    price: 1500, 
    image: "/Linguda.svg", 
    desc: "Pickled wild fern.",
    category: "Forest Produce",
    story: "Linguda (Fiddlehead Fern) is a prehistoric plant that grows wild along the moist river banks of the Himalayas. It is one of the few ferns that are edible. It has a curled, spiral head (resembling a violin scroll) and a crunchy, asparagus-like texture. Linguda cannot be farmed; it must be foraged during the monsoon season. It is a delicacy in Pahadi cuisine, typically eaten as a vegetable stir-fry or pickled to be enjoyed throughout the year. It represents the deep connection between the hill people and the forest.",
    health: [
      "Vitamin A: Excellent for eye health.",
      "Omega-3: Rare vegetable source of healthy fats.",
      "Immunity: High antioxidant content.",
      "Low Calorie: Nutrient dense but light."
    ],
    recipe: {
      title: "Linguda ka Achar (Pickle)",
      steps: [
        "Blanch the ferns and dry them completely in the sun.",
        "Mix with mustard oil, turmeric, red chili powder, and fennel seeds.",
        "Store in a jar for 2 weeks to mature.",
        "Enjoy the crunchy, tangy taste with parathas."
      ]
    }
  },
  { 
    id: 26, 
    name: "Pahadi Garlic (Honey infused)", 
    price: 1500, 
    image: "/Honey_garlic.svg", 
    desc: "Immunity booster.",
    category: "Forest Produce",
    story: "Pahadi Garlic is smaller, more pungent, and more potent than the large white garlic found in cities. Its cloves are often purple-tinged. When preserved in raw forest honey, it transforms into a powerful medicinal tonic. The honey mellows the sharp bite of the garlic, creating a sweet-savory profile. This mixture is a traditional winter remedy in every household in Uttarakhand, taken daily to ward off the flu and keep the body warm during snowfall.",
    health: [
      "Super Immunity: Garlic and Honey are both antimicrobial powerhouses.",
      "Cholesterol: Garlic helps unclog arteries.",
      "Throat Soother: Honey coats the throat while garlic fights infection.",
      "Energy: Provides an instant caloric boost."
    ],
    recipe: {
      title: "Morning Immunity Shot",
      steps: [
        "Eat one clove of honey-infused garlic first thing in the morning.",
        "Chew it well to release the allicin.",
        "Swallow the honey along with it.",
        "Do not drink water for 30 minutes for maximum effect."
      ]
    }
  },
  { 
    id: 27, 
    name: "Apricot Kernel Oil (Chuli)", 
    price: 2200, 
    image: "/Apricot_oil.svg", 
    desc: "Guttti Ka Tel (Joint pain).",
    category: "Forest Produce",
    story: "In the high altitudes of Kumaon and Kinnaur, Wild Apricots (Chuli) grow abundantly. The fruit is eaten, but the real treasure lies inside the hard stone. The kernel is extracted and cold-pressed to produce 'Gutti ka Tel'. This oil has a nutty aroma and is considered a panacea for aches and pains. Pahadi elders massage their knees with this oil to combat the joint pain caused by the cold mountain winds. It is also edible and is used to make specific dishes, adding a rich, nutty flavor.",
    health: [
      "Joint Pain Relief: Reduces inflammation in arthritis.",
      "Skin Moisturizer: Rich in Vitamin E, excellent for dry mountain skin.",
      "Hair Health: Strengthens roots and adds shine.",
      "Heart Health: Good cholesterol source if consumed."
    ],
    recipe: {
      title: "Chuli Oil Massage",
      steps: [
        "Warm the oil slightly.",
        "Massage deeply into joints or dry skin.",
        "Leave overnight for absorption.",
        "Alternatively, drizzle a few drops over salads for a nutty dressing."
      ]
    }
  },
  { 
    id: 28, 
    name: "Perilla Seeds (Bhangjeera)", 
    price: 450, 
    image: "/Perilla_Seeds.svg", 
    desc: "Rich in Omega-3.",
    category: "Forest Produce",
    story: "Often confused with Hemp, Perilla (Perilla frutescens) is another aromatic seed used widely in the Northeast and Himalayan regions. In Uttarakhand, it is also referred to as Bhangjeera in some dialects due to the visual similarity. The seeds are grey/brown and have a distinct minty-nutty flavor. The oil extracted from Perilla is one of the richest sources of Omega-3 found in nature. It is used to flavor chutneys and curries. The plant itself is often grown around fields to repel insects naturally.",
    health: [
      "Omega-3: Contains up to 60% Alpha-Linolenic Acid (ALA).",
      "Allergies: compounds in Perilla suppress allergy symptoms.",
      "Brain Health: Healthy fats support cognitive function.",
      "Anti-inflammatory: Reduces internal swelling."
    ],
    recipe: {
      title: "Roasted Perilla Salt",
      steps: [
        "Roast Perilla seeds with rock salt.",
        "Grind into a coarse powder.",
        "Use this nutritious salt to season fruits, salads, or yogurt.",
        "It adds a crunch and a boost of healthy fats."
      ]
    }
  },
  { 
    id: 30, 
    name: "Malta Squash", 
    price: 350, 
    image: "/Malta.svg", 
    desc: "Himalayan sweet orange.",
    category: "Wellness",
    story: "The Malta (blood orange family) is the winter sunshine of Uttarakhand. As the snow falls on the peaks, the Malta trees in the lower valleys droop with heavy, bright orange fruit. The fruit is extremely juicy, sweet, and tangy. Families sit together in the winter sun, peeling Maltas and sprinkling them with spicy salt. To preserve this fruit, the juice is extracted and cooked with sugar to make squash. This squash is the traditional welcome drink in any Pahadi home, offering a burst of Vitamin C to guests.",
    health: [
      "Vitamin C Bomb: Boosts immunity against winter flu.",
      "Skin Health: Clears skin and promotes collagen.",
      "Hydration: excellent for rehydrating after treks.",
      "Digestion: The citrus acid aids digestion."
    ],
    recipe: {
      title: "Malta Cooler",
      steps: [
        "Mix 1 part Malta squash with 3 parts water.",
        "Add a pinch of black salt and mint leaves.",
        "Add ice cubes.",
        "Serve chilled as a refreshing mountain mocktail."
      ]
    }
  },
  // --- WELLNESS ---
  { 
    id: 31, 
    name: "Giloy (Guduchi) Stem/Powder", 
    price: 900, 
    image: "/Giloy.svg", 
    desc: "Amrita: The Root of Immortality.",
    category: "Wellness",
    story: "In Sanskrit, Giloy is known as 'Amrita'—literally translated as 'the root of immortality'. This heart-leaved climbing shrub grows wild across the lower Himalayan foothills, often wrapping itself around Neem trees to absorb their medicinal properties. For centuries, Himalayan hermits and villagers have used Giloy as a primary defense against seasonal fevers. It is one of the most revered herbs in the Pahadi pharmacopeia, known for its ability to bring the body back into balance regardless of the ailment.",
    health: [
      "Immune System Modulator: Enhances the activity of macrophages (white blood cells).",
      "Chronic Fever Relief: Traditionally used to treat recurring fevers like Dengue and Malaria.",
      "Stress & Anxiety: Acts as an adaptogen to calm the nervous system.",
      "Blood Purifier: Helps flush out toxins from the liver and kidneys."
    ],
    recipe: {
      "title": "Immunity Boosting Giloy Kadha",
      "steps": [
        "Take a small piece of fresh Giloy stem (crushed) or 1 tsp of powder.",
        "Boil in 2 cups of water with a few Tulsi leaves and crushed ginger.",
        "Reduce the liquid to half (approx. 1 cup).",
        "Strain and drink warm on an empty stomach.",
        "Add a drop of honey if the natural bitterness is too strong."
      ]
    }
  },
  { 
    id: 32, 
    name: "Moringa (Sahjan) Leaf Powder", 
    price: 750, 
    image: "/moringa.svg", 
    desc: "Himalayan Green Superfood.",
    category: "Wellness",
    story: "Grown in the fertile valleys of the Himalayan foothills, our Moringa is harvested from trees fed by mineral-rich mountain springs. Often called the 'Miracle Tree', every part of the Moringa plant is nutrient-dense. The leaves are carefully shade-dried at low temperatures to preserve their vibrant green color and delicate enzymatic profile. In the hills, Moringa has traditionally been used to provide nursing mothers and growing children with the concentrated nutrition required for a demanding mountain lifestyle.",
    health: [
      "Nutrient Powerhouse: Contains 7x more Vitamin C than oranges and 15x more Potassium than bananas.",
      "Anti-Inflammatory: Contains 46 types of antioxidants.",
      "Energy Booster: Provides a caffeine-free energy lift through B-vitamins.",
      "Bone Health: Rich in Calcium and Phosphorus for skeletal strength."
    ],
    recipe: {
      "title": "Daily Green Vitality Smoothie",
      "steps": [
        "Add 1 tsp of Moringa powder to a glass of buttermilk or a fruit smoothie.",
        "Alternatively, mix it into your roti dough (atta) before kneading.",
        "Can also be whisked into warm water with lemon and honey.",
        "Consume daily to bridge nutritional gaps."
      ]
    }
  },
];