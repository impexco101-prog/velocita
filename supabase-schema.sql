-- Create diagnostic_results table
CREATE TABLE diagnostic_results (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    year_level INTEGER NOT NULL,
    subjects JSONB NOT NULL,
    current_atar DECIMAL(5,2),
    target_atar DECIMAL(5,2),
    math_score DECIMAL(5,2),
    english_score DECIMAL(5,2),
    study_hours INTEGER,
    has_tutor BOOLEAN DEFAULT FALSE,
    challenge TEXT,
    predicted_atar DECIMAL(5,2),
    email TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX idx_diagnostic_results_email ON diagnostic_results(email);
CREATE INDEX idx_diagnostic_results_created_at ON diagnostic_results(created_at);

-- Add Row Level Security (RLS)
ALTER TABLE diagnostic_results ENABLE ROW LEVEL SECURITY;

-- Create policy for users to see their own results
CREATE POLICY "Users can view own diagnostic results" ON diagnostic_results
    FOR SELECT USING (auth.uid()::text = email);

-- Create policy for users to insert their own results
CREATE POLICY "Users can insert own diagnostic results" ON diagnostic_results
    FOR INSERT WITH CHECK (auth.uid()::text = email);

-- Create policy for users to update their own results
CREATE POLICY "Users can update own diagnostic results" ON diagnostic_results
    FOR UPDATE USING (auth.uid()::text = email);
