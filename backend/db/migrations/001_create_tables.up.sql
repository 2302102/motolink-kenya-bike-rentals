-- Bikes table
CREATE TABLE bikes (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  price_per_day BIGINT NOT NULL,
  image_url TEXT NOT NULL,
  features TEXT[] NOT NULL,
  available BOOLEAN NOT NULL DEFAULT TRUE,
  location TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tours table
CREATE TABLE tours (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  destination TEXT NOT NULL,
  description TEXT NOT NULL,
  duration_days INTEGER NOT NULL,
  price BIGINT NOT NULL,
  image_url TEXT NOT NULL,
  highlights TEXT[] NOT NULL,
  difficulty TEXT NOT NULL,
  max_participants INTEGER NOT NULL,
  available BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Customers table
CREATE TABLE customers (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  id_number TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Bookings table
CREATE TABLE bookings (
  id BIGSERIAL PRIMARY KEY,
  customer_id BIGINT NOT NULL REFERENCES customers(id),
  booking_type TEXT NOT NULL,
  item_id BIGINT NOT NULL,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  total_price BIGINT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Garage requests table
CREATE TABLE garage_requests (
  id BIGSERIAL PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  bike_model TEXT NOT NULL,
  issue_description TEXT NOT NULL,
  location TEXT NOT NULL,
  urgency TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  estimated_cost BIGINT,
  assigned_mechanic TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- SOS requests table
CREATE TABLE sos_requests (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  location TEXT NOT NULL,
  emergency_type TEXT NOT NULL,
  description TEXT NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  status TEXT NOT NULL DEFAULT 'active',
  responder_name TEXT,
  response_time TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

-- Insert sample bikes
INSERT INTO bikes (name, type, description, price_per_day, image_url, features, location) VALUES
('Honda CB500X', 'Adventure', 'Perfect for long-distance touring and off-road adventures across Kenya', 3500, '/bikes/honda-cb500x.jpg', ARRAY['ABS Brakes', 'LED Lights', 'Luggage Rack', 'GPS Mount'], 'Nairobi'),
('Yamaha MT-07', 'Sport', 'Agile and powerful bike ideal for city rides and weekend getaways', 3000, '/bikes/yamaha-mt07.jpg', ARRAY['Quick Shifter', 'Traction Control', 'Digital Display'], 'Nairobi'),
('Suzuki V-Strom 650', 'Touring', 'Comfortable touring bike with excellent fuel economy for Kenya roads', 3200, '/bikes/suzuki-vstrom.jpg', ARRAY['Windscreen', 'Panniers', 'Heated Grips', 'Cruise Control'], 'Mombasa'),
('KTM 390 Adventure', 'Adventure', 'Lightweight adventure bike perfect for exploring rough terrain', 2800, '/bikes/ktm-390.jpg', ARRAY['TFT Display', 'Cornering ABS', 'Offroad Mode', 'LED Lights'], 'Nairobi'),
('Royal Enfield Himalayan', 'Adventure', 'Rugged and reliable for Kenyan off-road adventures', 2200, '/bikes/himalayan.jpg', ARRAY['Long Travel Suspension', 'High Ground Clearance', 'Compass', 'Luggage Carrier'], 'Nakuru'),
('Bajaj Pulsar NS200', 'Sport', 'Affordable sporty bike for city commuting and short trips', 1500, '/bikes/pulsar.jpg', ARRAY['Perimeter Frame', 'Liquid Cooling', 'Digital Console'], 'Nairobi'),
('TVS Apache RTR 200', 'Sport', 'Value-packed sport bike with great performance', 1800, '/bikes/apache.jpg', ARRAY['Race Tuned Fuel Injection', 'ABS', 'Slipper Clutch'], 'Kisumu'),
('Honda CRF250L', 'Dual Sport', 'Excellent for both on-road and off-road Kenyan adventures', 2500, '/bikes/crf250l.jpg', ARRAY['Electric Start', 'Fuel Injection', 'Long Travel Suspension'], 'Nairobi');

-- Insert sample tours
INSERT INTO tours (name, destination, description, duration_days, price, image_url, highlights, difficulty, max_participants) VALUES
('Nairobi City Explorer', 'Nairobi', 'Discover the vibrant capital city, visit Nairobi National Park, Giraffe Centre, and Karen Blixen Museum', 1, 8500, '/tours/nairobi.jpg', ARRAY['Nairobi National Park', 'Giraffe Centre', 'Karen Blixen Museum', 'Bomas of Kenya'], 'Easy', 10),
('Great Rift Valley Adventure', 'Rift Valley', 'Ride through the stunning Rift Valley, visit Lake Naivasha, Hell''s Gate, and Mount Longonot', 2, 15000, '/tours/rift-valley.jpg', ARRAY['Lake Naivasha Boat Ride', 'Hell''s Gate Cycling', 'Mount Longonot Hike', 'Scenic Valley Views'], 'Moderate', 8),
('Coastal Paradise - Mombasa', 'Mombasa', 'Experience the beautiful Kenyan coast, pristine beaches, Fort Jesus, and Old Town', 3, 22000, '/tours/mombasa.jpg', ARRAY['Diani Beach', 'Fort Jesus', 'Old Town Tour', 'Swahili Cuisine'], 'Easy', 12),
('Mount Kenya Circuit', 'Mount Kenya', 'Challenge yourself with high-altitude riding around Africa''s second-highest mountain', 4, 28000, '/tours/mt-kenya.jpg', ARRAY['Nanyuki Town', 'Equator Crossing', 'Mountain Views', 'Tea Plantations'], 'Hard', 6),
('Maasai Mara Safari Tour', 'Maasai Mara', 'Epic motorcycle safari to witness the Great Migration and Big Five', 5, 45000, '/tours/mara.jpg', ARRAY['Game Drives', 'Big Five Viewing', 'Great Migration', 'Maasai Village Visit'], 'Moderate', 8),
('Lake Nakuru Flamingo Tour', 'Lake Nakuru', 'Visit the famous flamingo haven and spot rhinos in Nakuru National Park', 2, 16000, '/tours/nakuru.jpg', ARRAY['Flamingo Watching', 'Rhino Sanctuary', 'Baboon Cliff', 'Makalia Falls'], 'Easy', 10),
('Amboseli Elephant Tour', 'Amboseli', 'Ride to Amboseli with stunning views of Mount Kilimanjaro and elephant herds', 3, 25000, '/tours/amboseli.jpg', ARRAY['Mount Kilimanjaro Views', 'Elephant Herds', 'Maasai Culture', 'Observation Hill'], 'Moderate', 8),
('Lamu Island Escape', 'Lamu', 'Coastal ride to the historic Lamu Island, a UNESCO World Heritage Site', 4, 32000, '/tours/lamu.jpg', ARRAY['Dhow Sailing', 'Lamu Old Town', 'Shela Beach', 'Swahili Architecture'], 'Easy', 6);
