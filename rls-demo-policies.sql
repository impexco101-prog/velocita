-- Allow demo reads for all tables
CREATE POLICY IF NOT EXISTS 
  "demo_read_velocity_scores"
ON velocity_scores FOR SELECT
USING (true);

CREATE POLICY IF NOT EXISTS 
  "demo_read_bookings"
ON bookings FOR SELECT
USING (true);

CREATE POLICY IF NOT EXISTS
  "demo_read_tutor_profiles"  
ON tutor_profiles FOR SELECT
USING (true);
