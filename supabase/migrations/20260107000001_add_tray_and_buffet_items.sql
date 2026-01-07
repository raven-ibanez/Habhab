/*
  # Add Tray Menu and Buffet Packages
  
  1. New Categories
    - tray-pork: Pork (Tray)
    - tray-beef: Beef (Tray)
    - tray-chicken: Chicken (Tray)
    - tray-seafood: Fish & Seafoods (Tray)
    - buffet-standard: Standard Buffet Packages
    - buffet-premium: Premium Buffet Packages

  2. New Menu Items & Variations
    - Pork, Beef, Chicken, Seafood trays with Medium/Small variations
    - Standard/Premium Buffet packages
*/

-- 1. Create Categories
INSERT INTO categories (id, name, icon, sort_order, active) VALUES
  ('tray-pork', 'Pork Trays', '🐖', 5, true),
  ('tray-beef', 'Beef Trays', '🐄', 6, true),
  ('tray-chicken', 'Chicken Trays', '🐔', 7, true),
  ('tray-seafood', 'Seafood Trays', '🦐', 8, true),
  ('buffet-standard', 'Standard Buffet', '🍽️', 9, true),
  ('buffet-premium', 'Premium Buffet', '💎', 10, true)
ON CONFLICT (id) DO NOTHING;

-- 2. Insert Pork Trays
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Pork BBQ', 'Pork BBQ sticks (Medium: 50 sticks, Small: 25 sticks)', 700, 'tray-pork', true, true),
  ('Grilled Pork', 'Grilled pork belly', 750, 'tray-pork', false, true),
  ('Pork Afritada', 'Classic pork afritada', 650, 'tray-pork', false, true),
  ('Pork Humba', 'Sweet and savory braised pork', 700, 'tray-pork', false, true),
  ('Pork Menudo', 'Traditional pork menudo', 700, 'tray-pork', false, true),
  ('Crispy Kare-Kare', 'Crispy pork kare-kare with peanut sauce', 750, 'tray-pork', true, true),
  ('Pork Ribs (Sweet & Spicy)', 'Sweet and spicy pork ribs', 750, 'tray-pork', false, true),
  ('Pork Bola-Bola (Sweet & Sour)', 'Sweet and sour pork meatballs', 650, 'tray-pork', false, true),
  ('Sweet & Sour Pork', 'Crispy pork in sweet and sour sauce', 700, 'tray-pork', false, true),
  ('Dinakdakan', 'Ilocano style grilled pork', 750, 'tray-pork', false, true);

INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Medium (50 sticks)', 600 FROM menu_items WHERE name = 'Pork BBQ' AND category = 'tray-pork' UNION ALL -- 1300 - 700 = 600
SELECT id, 'Small (25 sticks)', 0 FROM menu_items WHERE name = 'Pork BBQ' AND category = 'tray-pork' UNION ALL
SELECT id, 'Medium', 750 FROM menu_items WHERE name = 'Grilled Pork' AND category = 'tray-pork' UNION ALL -- 1500 - 750 = 750
SELECT id, 'Small', 0 FROM menu_items WHERE name = 'Grilled Pork' AND category = 'tray-pork' UNION ALL
SELECT id, 'Medium', 550 FROM menu_items WHERE name = 'Pork Afritada' AND category = 'tray-pork' UNION ALL -- 1200 - 650 = 550
SELECT id, 'Small', 0 FROM menu_items WHERE name = 'Pork Afritada' AND category = 'tray-pork' UNION ALL
SELECT id, 'Medium', 650 FROM menu_items WHERE name = 'Pork Humba' AND category = 'tray-pork' UNION ALL -- 1350 - 700 = 650
SELECT id, 'Small', 0 FROM menu_items WHERE name = 'Pork Humba' AND category = 'tray-pork' UNION ALL
SELECT id, 'Medium', 600 FROM menu_items WHERE name = 'Pork Menudo' AND category = 'tray-pork' UNION ALL -- 1300 - 700 = 600
SELECT id, 'Small', 0 FROM menu_items WHERE name = 'Pork Menudo' AND category = 'tray-pork' UNION ALL
SELECT id, 'Medium', 650 FROM menu_items WHERE name = 'Crispy Kare-Kare' AND category = 'tray-pork' UNION ALL -- 1400 - 750 = 650
SELECT id, 'Small', 0 FROM menu_items WHERE name = 'Crispy Kare-Kare' AND category = 'tray-pork' UNION ALL
SELECT id, 'Medium', 700 FROM menu_items WHERE name = 'Pork Ribs (Sweet & Spicy)' AND category = 'tray-pork' UNION ALL -- 1450 - 750 = 700
SELECT id, 'Small', 0 FROM menu_items WHERE name = 'Pork Ribs (Sweet & Spicy)' AND category = 'tray-pork' UNION ALL
SELECT id, 'Medium', 550 FROM menu_items WHERE name = 'Pork Bola-Bola (Sweet & Sour)' AND category = 'tray-pork' UNION ALL -- 1200 - 650 = 550
SELECT id, 'Small', 0 FROM menu_items WHERE name = 'Pork Bola-Bola (Sweet & Sour)' AND category = 'tray-pork' UNION ALL
SELECT id, 'Medium', 650 FROM menu_items WHERE name = 'Sweet & Sour Pork' AND category = 'tray-pork' UNION ALL -- 1350 - 700 = 650
SELECT id, 'Small', 0 FROM menu_items WHERE name = 'Sweet & Sour Pork' AND category = 'tray-pork' UNION ALL
SELECT id, 'Medium', 650 FROM menu_items WHERE name = 'Dinakdakan' AND category = 'tray-pork' UNION ALL -- 1400 - 750 = 650
SELECT id, 'Small', 0 FROM menu_items WHERE name = 'Dinakdakan' AND category = 'tray-pork';

-- 3. Insert Beef Trays
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Beef Caldereta', 'Rich beef stew with tomato sauce', 800, 'tray-beef', true, true),
  ('Beef w/ Mushroom', 'Beef stir-fry with mushrooms', 750, 'tray-beef', false, true),
  ('Beef w/ Broco', 'Beef stir-fry with broccoli', 750, 'tray-beef', false, true),
  ('Beef Kare-kare', 'Beef in peanut sauce', 800, 'tray-beef', false, true),
  ('Beef Mechado', 'Beef stew with tomato sauce', 800, 'tray-beef', false, true),
  ('Creamy Beefsteak', 'Creamy version of Filipino beefsteak', 700, 'tray-beef', false, true);

INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Medium', 700 FROM menu_items WHERE name = 'Beef Caldereta' AND category = 'tray-beef' UNION ALL -- 1500 - 800 = 700
SELECT id, 'Small', 0 FROM menu_items WHERE name = 'Beef Caldereta' AND category = 'tray-beef' UNION ALL
SELECT id, 'Medium', 650 FROM menu_items WHERE name = 'Beef w/ Mushroom' AND category = 'tray-beef' UNION ALL -- 1400 - 750 = 650
SELECT id, 'Small', 0 FROM menu_items WHERE name = 'Beef w/ Mushroom' AND category = 'tray-beef' UNION ALL
SELECT id, 'Medium', 650 FROM menu_items WHERE name = 'Beef w/ Broco' AND category = 'tray-beef' UNION ALL -- 1400 - 750 = 650
SELECT id, 'Small', 0 FROM menu_items WHERE name = 'Beef w/ Broco' AND category = 'tray-beef' UNION ALL
SELECT id, 'Medium', 700 FROM menu_items WHERE name = 'Beef Kare-kare' AND category = 'tray-beef' UNION ALL -- 1500 - 800 = 700
SELECT id, 'Small', 0 FROM menu_items WHERE name = 'Beef Kare-kare' AND category = 'tray-beef' UNION ALL
SELECT id, 'Medium', 700 FROM menu_items WHERE name = 'Beef Mechado' AND category = 'tray-beef' UNION ALL -- 1500 - 800 = 700
SELECT id, 'Small', 0 FROM menu_items WHERE name = 'Beef Mechado' AND category = 'tray-beef' UNION ALL
SELECT id, 'Medium', 700 FROM menu_items WHERE name = 'Creamy Beefsteak' AND category = 'tray-beef' UNION ALL -- 1400 - 700 = 700
SELECT id, 'Small', 0 FROM menu_items WHERE name = 'Creamy Beefsteak' AND category = 'tray-beef';

-- 4. Insert Chicken Trays
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('F. Chicken', 'Fried chicken', 650, 'tray-chicken', false, true),
  ('Buffalo Wings', 'Spicy buffalo chicken wings', 650, 'tray-chicken', false, true),
  ('Buttered Garlic Chicken', 'Chicken in buttered garlic sauce', 650, 'tray-chicken', false, true),
  ('Chicken Parmesan', 'Breaded chicken with parmesan', 700, 'tray-chicken', false, true),
  ('Ala King', 'Chicken in creamy white sauce', 700, 'tray-chicken', false, true),
  ('Chicken Fillet', 'Breaded chicken fillet', 600, 'tray-chicken', false, true),
  ('Chicken Lollipop', 'Chicken lollipops', 600, 'tray-chicken', false, true),
  ('Chicken Afritada', 'Classic chicken afritada', 600, 'tray-chicken', false, true),
  ('Chicken Curry', 'Classic chicken curry', 650, 'tray-chicken', false, true),
  ('Chicken Inasal (10 pcs)', 'Grilled chicken inasal', 650, 'tray-chicken', false, true),
  ('Cordon Bleu', 'Chicken cordon bleu wraps', 700, 'tray-chicken', true, true),
  ('Chicken Fingers', 'Crispy chicken fingers', 650, 'tray-chicken', false, true),
  ('Honey Glazed', 'Honey glazed chicken', 1250, 'tray-chicken', false, true);

INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Medium', 550 FROM menu_items WHERE name = 'F. Chicken' AND category = 'tray-chicken' UNION ALL -- 1200 - 650 = 550
SELECT id, 'Small', 0 FROM menu_items WHERE name = 'F. Chicken' AND category = 'tray-chicken' UNION ALL
SELECT id, 'Medium', 650 FROM menu_items WHERE name = 'Buffalo Wings' AND category = 'tray-chicken' UNION ALL -- 1300 - 650 = 650
SELECT id, 'Small', 0 FROM menu_items WHERE name = 'Buffalo Wings' AND category = 'tray-chicken' UNION ALL
SELECT id, 'Medium', 650 FROM menu_items WHERE name = 'Buttered Garlic Chicken' AND category = 'tray-chicken' UNION ALL -- 1300 - 650 = 650
SELECT id, 'Small', 0 FROM menu_items WHERE name = 'Buttered Garlic Chicken' AND category = 'tray-chicken' UNION ALL
SELECT id, 'Medium', 650 FROM menu_items WHERE name = 'Chicken Parmesan' AND category = 'tray-chicken' UNION ALL -- 1350 - 700 = 650
SELECT id, 'Small', 0 FROM menu_items WHERE name = 'Chicken Parmesan' AND category = 'tray-chicken' UNION ALL
SELECT id, 'Medium', 650 FROM menu_items WHERE name = 'Ala King' AND category = 'tray-chicken' UNION ALL -- 1350 - 700 = 650
SELECT id, 'Small', 0 FROM menu_items WHERE name = 'Ala King' AND category = 'tray-chicken' UNION ALL
SELECT id, 'Medium', 500 FROM menu_items WHERE name = 'Chicken Fillet' AND category = 'tray-chicken' UNION ALL -- 1100 - 600 = 500
SELECT id, 'Small', 0 FROM menu_items WHERE name = 'Chicken Fillet' AND category = 'tray-chicken' UNION ALL
SELECT id, 'Medium', 600 FROM menu_items WHERE name = 'Chicken Lollipop' AND category = 'tray-chicken' UNION ALL -- 1200 - 600 = 600
SELECT id, 'Small', 0 FROM menu_items WHERE name = 'Chicken Lollipop' AND category = 'tray-chicken' UNION ALL
SELECT id, 'Medium', 500 FROM menu_items WHERE name = 'Chicken Afritada' AND category = 'tray-chicken' UNION ALL -- 1100 - 600 = 500
SELECT id, 'Small', 0 FROM menu_items WHERE name = 'Chicken Afritada' AND category = 'tray-chicken' UNION ALL
SELECT id, 'Medium', 550 FROM menu_items WHERE name = 'Chicken Curry' AND category = 'tray-chicken' UNION ALL -- 1200 - 650 = 550
SELECT id, 'Small', 0 FROM menu_items WHERE name = 'Chicken Curry' AND category = 'tray-chicken' UNION ALL
SELECT id, 'Medium', 550 FROM menu_items WHERE name = 'Chicken Inasal (10 pcs)' AND category = 'tray-chicken' UNION ALL -- 1200 - 650 = 550
SELECT id, 'Small', 0 FROM menu_items WHERE name = 'Chicken Inasal (10 pcs)' AND category = 'tray-chicken' UNION ALL
SELECT id, 'Medium', 600 FROM menu_items WHERE name = 'Cordon Bleu' AND category = 'tray-chicken' UNION ALL -- 1300 - 700 = 600
SELECT id, 'Small', 0 FROM menu_items WHERE name = 'Cordon Bleu' AND category = 'tray-chicken' UNION ALL
SELECT id, 'Medium', 450 FROM menu_items WHERE name = 'Chicken Fingers' AND category = 'tray-chicken' UNION ALL -- 1100 - 650 = 450
SELECT id, 'Small', 0 FROM menu_items WHERE name = 'Chicken Fingers' AND category = 'tray-chicken' UNION ALL
SELECT id, 'Medium', 0 FROM menu_items WHERE name = 'Honey Glazed' AND category = 'tray-chicken'; -- Single price

-- 5. Insert Fish & Seafoods Trays
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Fish Fillet', 'Breaded fish fillet', 650, 'tray-seafood', false, true),
  ('Sweet & Sour Seafood', 'Fish in sweet and sour sauce', 700, 'tray-seafood', false, true),
  ('Kinilaw', 'Fresh raw fish in vinegar', 650, 'tray-seafood', false, true),
  ('Sinuglaw', 'Grilled pork and raw fish', 700, 'tray-seafood', false, true),
  ('Buttered Garlic Shrimp', 'Shrimp in buttered garlic sauce', 700, 'tray-seafood', false, true),
  ('Sweet & Spicy Shrimp', 'Shrimp in sweet and spicy sauce', 700, 'tray-seafood', false, true),
  ('Shrimp Tempura', 'Crispy shrimp tempura', 700, 'tray-seafood', true, true),
  ('Calamares', 'Crispy calamari rings', 700, 'tray-seafood', false, true),
  ('Mixed Seafoods Cajun Sauce', 'Assorted seafood in Cajun sauce', 1700, 'tray-seafood', false, true);

INSERT INTO variations (menu_item_id, name, price)
SELECT id, 'Medium', 600 FROM menu_items WHERE name = 'Fish Fillet' AND category = 'tray-seafood' UNION ALL -- 1250 - 650 = 600
SELECT id, 'Small', 0 FROM menu_items WHERE name = 'Fish Fillet' AND category = 'tray-seafood' UNION ALL
SELECT id, 'Medium', 650 FROM menu_items WHERE name = 'Sweet & Sour Seafood' AND category = 'tray-seafood' UNION ALL -- 1350 - 700 = 650
SELECT id, 'Small', 0 FROM menu_items WHERE name = 'Sweet & Sour Seafood' AND category = 'tray-seafood' UNION ALL
SELECT id, 'Medium', 550 FROM menu_items WHERE name = 'Kinilaw' AND category = 'tray-seafood' UNION ALL -- 1200 - 650 = 550
SELECT id, 'Small', 0 FROM menu_items WHERE name = 'Kinilaw' AND category = 'tray-seafood' UNION ALL
SELECT id, 'Medium', 650 FROM menu_items WHERE name = 'Sinuglaw' AND category = 'tray-seafood' UNION ALL -- 1350 - 700 = 650
SELECT id, 'Small', 0 FROM menu_items WHERE name = 'Sinuglaw' AND category = 'tray-seafood' UNION ALL
SELECT id, 'Medium', 600 FROM menu_items WHERE name = 'Buttered Garlic Shrimp' AND category = 'tray-seafood' UNION ALL -- 1300 - 700 = 600
SELECT id, 'Small', 0 FROM menu_items WHERE name = 'Buttered Garlic Shrimp' AND category = 'tray-seafood' UNION ALL
SELECT id, 'Medium', 700 FROM menu_items WHERE name = 'Sweet & Spicy Shrimp' AND category = 'tray-seafood' UNION ALL -- 1400 - 700 = 700
SELECT id, 'Small', 0 FROM menu_items WHERE name = 'Sweet & Spicy Shrimp' AND category = 'tray-seafood' UNION ALL
SELECT id, 'Medium', 700 FROM menu_items WHERE name = 'Shrimp Tempura' AND category = 'tray-seafood' UNION ALL -- 1400 - 700 = 700
SELECT id, 'Small', 0 FROM menu_items WHERE name = 'Shrimp Tempura' AND category = 'tray-seafood' UNION ALL
SELECT id, 'Medium', 600 FROM menu_items WHERE name = 'Calamares' AND category = 'tray-seafood' UNION ALL -- 1300 - 700 = 600
SELECT id, 'Small', 0 FROM menu_items WHERE name = 'Calamares' AND category = 'tray-seafood' UNION ALL
SELECT id, 'Medium', 0 FROM menu_items WHERE name = 'Mixed Seafoods Cajun Sauce' AND category = 'tray-seafood'; -- Single price

-- 6. Insert Standard Buffet Packages
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('200/HEAD (Full)', '2 Main Dishes, 1 Side Dish, 1 Soft Drink, 1 Cup Dessert, Rice', 200, 'buffet-standard', false, true),
  ('200/HEAD (Basic)', '2 Main Dishes, 1 Side Dish', 200, 'buffet-standard', false, true),
  ('230/HEAD', '2 Main Dishes, 1 Side Dish', 230, 'buffet-standard', false, true),
  ('250/HEAD', '3 Main Dishes, 1 Side Dish, 1 Soft Drink, 1 Cup Dessert, Rice', 250, 'buffet-standard', false, true),
  ('270/HEAD', '3 Main Dishes, 1 Side Dish', 270, 'buffet-standard', false, true),
  ('300/HEAD', '3 Main Dishes, 2 Side Dishes', 300, 'buffet-standard', false, true);

-- 7. Insert Premium Buffet Packages
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('280/HEAD', '3 Main Dishes, 2 Side Dishes OR 1 Dish (from additional options), 1 Soft Drink, 1 Cup Dessert, Rice', 280, 'buffet-premium', false, true),
  ('320/HEAD', '3 Main Dishes, 2 Side Dishes OR 1 Dish, 1 Dish on Additional food options, 1 Soft Drink, 1 Cup Dessert, Rice', 320, 'buffet-premium', false, true),
  ('350/HEAD', '3 Main Dishes, 2 Side Dishes, 1 Additional Food Option', 350, 'buffet-premium', true, true);
