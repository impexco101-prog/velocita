-- ============================================
-- VELOCITA COMPREHENSIVE DEMO DATA
-- Run in Supabase SQL Editor
-- 3 tutors, 4 families, 8 students, 35 sessions
-- ============================================

-- ============================================
-- TUTOR PROFILES
-- ============================================

INSERT INTO tutor_profiles (
  id, full_name, email, university, degree,
  year_of_study, subjects, about,
  wwcc_status, wwcc_number, is_safety_cleared,
  velocity_score, sessions_completed,
  avg_atar_improvement, created_at
) VALUES (
  '11111111-1111-1111-1111-111111111111',
  'Emma Wong',
  'emma@velocita-demo.com',
  'University of Melbourne',
  'Doctor of Medicine',
  '4th Year',
  ARRAY['Mathematical Methods','Specialist Mathematics',
    'Chemistry','Physics'],
  'I am a 4th year medical student passionate 
  about helping VCE students reach their 
  potential. I specialise in Mathematical 
  Methods and Sciences, helping students build 
  deep conceptual understanding rather than 
  just memorising formulas. I have helped 
  47 students improve their ATAR scores with 
  an average improvement of 8.2 points.',
  'verified','WWC-1234567',TRUE,
  92,47,8.2,NOW()
),(
  '11111111-1111-1111-1111-111111111112',
  'James Liu',
  'james@velocita-demo.com',
  'Monash University',
  'Doctor of Medicine',
  '3rd Year',
  ARRAY['English','English Language','Biology',
    'Psychology','Literature'],
  'Third year medical student with a passion 
  for humanities and sciences. I tutor in 
  English and Biology, helping students 
  develop analytical thinking and essay 
  writing skills. I am fluent in Mandarin 
  and English, which helps me connect with 
  students from Chinese-speaking families. 
  Average ATAR improvement across my 
  students: 7.1 points.',
  'verified','WWC-2345678',TRUE,
  85,31,7.1,NOW()
),(
  '11111111-1111-1111-1111-111111111113',
  'Priya Sharma',
  'priya@velocita-demo.com',
  'University of Melbourne',
  'Bachelor of Commerce / Bachelor of Laws',
  '5th Year',
  ARRAY['Economics','Legal Studies',
    'Business Management','Accounting',
    'English'],
  'Final year Commerce/Law student 
  specialising in Economics and Legal 
  Studies. I help students understand 
  complex economic concepts and develop 
  strong analytical writing for Legal 
  Studies. My students consistently 
  outperform their predicted scores with 
  an average improvement of 6.8 points.',
  'verified','WWC-3456789',TRUE,
  78,22,6.8,NOW()
);

-- ============================================
-- FAMILY ACCOUNTS
-- ============================================

-- Family 1: Chen Family (2 children)
INSERT INTO family_accounts (
  id,parent_id,family_name,
  preferred_language,created_at
) VALUES (
  '22222222-2222-2222-2222-222222222221',
  NULL,'Chen Family','en',NOW()
);

-- Family 2: Nguyen Family
INSERT INTO family_accounts (
  id,parent_id,family_name,
  preferred_language,created_at
) VALUES (
  '22222222-2222-2222-2222-222222222222',
  NULL,'Nguyen Family','vi',NOW()
);

-- Family 3: Zhang Family (2 children, Mandarin)
INSERT INTO family_accounts (
  id,parent_id,family_name,
  preferred_language,created_at
) VALUES (
  '22222222-2222-2222-2222-222222222223',
  NULL,'Zhang Family','zh-hans',NOW()
);

-- Family 4: Patel Family (2 children)
INSERT INTO family_accounts (
  id,parent_id,family_name,
  preferred_language,created_at
) VALUES (
  '22222222-2222-2222-2222-222222222224',
  NULL,'Patel Family','en',NOW()
);

-- ============================================
-- STUDENTS
-- ============================================

INSERT INTO students (
  id,family_id,first_name,year_level,
  school_name,current_atar_estimate,
  target_atar,curriculum_code,market_code,
  created_at
) VALUES
-- Johnny Chen: Year 12, turnaround story
(
  '33333333-3333-3333-3333-333333333331',
  '22222222-2222-2222-2222-222222222221',
  'Johnny',12,'Melbourne High School',
  74,85,'VCE','MEL',NOW()
),
-- Amy Chen: Year 10, new student
(
  '33333333-3333-3333-3333-333333333332',
  '22222222-2222-2222-2222-222222222221',
  'Amy',10,'Melbourne High School',
  NULL,NULL,'VCE','MEL',NOW()
),
-- Sarah Nguyen: Year 11, high performer
(
  '33333333-3333-3333-3333-333333333333',
  '22222222-2222-2222-2222-222222222222',
  'Sarah',11,
  'MacRobertson Girls High School',
  78,92,'VCE','MEL',NOW()
),
-- Kevin Zhang: Year 12, elite student
(
  '33333333-3333-3333-3333-333333333334',
  '22222222-2222-2222-2222-222222222223',
  'Kevin',12,
  'Melbourne High School',
  91,99,'VCE','MEL',NOW()
),
-- Jessica Zhang: Year 11, steady improver
(
  '33333333-3333-3333-3333-333333333335',
  '22222222-2222-2222-2222-222222222223',
  'Jessica',11,
  'Mckinnon Secondary College',
  72,80,'VCE','MEL',NOW()
),
-- Arjun Patel: Year 12, balanced student
(
  '33333333-3333-3333-3333-333333333336',
  '22222222-2222-2222-2222-222222222224',
  'Arjun',12,
  'Nossal High School',
  76,85,'VCE','MEL',NOW()
),
-- Maya Patel: Year 9, selective entry
(
  '33333333-3333-3333-3333-333333333337',
  '22222222-2222-2222-2222-222222222224',
  'Maya',9,
  'Glen Waverley Secondary College',
  NULL,NULL,'SELECTIVE_VIC','MEL',NOW()
);

-- ============================================
-- SUBJECT HEALTH SCORES
-- ============================================

INSERT INTO subject_health (
  student_id,subject,understanding_score,
  application_score,exam_technique_score,
  time_management_score,confidence_score,
  curriculum_code
) VALUES
-- Johnny Chen
('33333333-3333-3333-3333-333333333331',
  'Mathematical Methods',72,65,60,58,68,'VCE'),
('33333333-3333-3333-3333-333333333331',
  'Chemistry',42,38,35,48,40,'VCE'),
('33333333-3333-3333-3333-333333333331',
  'English',78,75,72,74,82,'VCE'),
-- Amy Chen (new student, less data)
('33333333-3333-3333-3333-333333333332',
  'English',65,60,55,58,70,'VCE'),
('33333333-3333-3333-3333-333333333332',
  'Biology',58,52,50,55,62,'VCE'),
-- Sarah Nguyen
('33333333-3333-3333-3333-333333333333',
  'Biology',88,82,70,65,78,'VCE'),
('33333333-3333-3333-3333-333333333333',
  'English',84,80,76,72,86,'VCE'),
('33333333-3333-3333-3333-333333333333',
  'Psychology',70,65,60,58,68,'VCE'),
-- Kevin Zhang
('33333333-3333-3333-3333-333333333334',
  'Specialist Mathematics',95,92,88,85,94,'VCE'),
('33333333-3333-3333-3333-333333333334',
  'Mathematical Methods',98,95,92,90,96,'VCE'),
('33333333-3333-3333-3333-333333333334',
  'Chemistry',88,85,82,80,88,'VCE'),
-- Jessica Zhang
('33333333-3333-3333-3333-333333333335',
  'English',72,68,65,62,70,'VCE'),
('33333333-3333-3333-3333-333333333335',
  'Economics',68,64,60,58,65,'VCE'),
-- Arjun Patel
('33333333-3333-3333-3333-333333333336',
  'Economics',84,80,78,75,82,'VCE'),
('33333333-3333-3333-3333-333333333336',
  'Legal Studies',62,58,55,60,60,'VCE'),
('33333333-3333-3333-3333-333333333336',
  'Mathematical Methods',75,70,68,65,72,'VCE'),
-- Maya Patel (selective entry)
('33333333-3333-3333-3333-333333333337',
  'Mathematical Reasoning',78,72,68,65,74,
  'SELECTIVE_VIC'),
('33333333-3333-3333-3333-333333333337',
  'Verbal Reasoning',82,78,74,70,80,
  'SELECTIVE_VIC');

-- ============================================
-- BOOKINGS (35 sessions)
-- ============================================

INSERT INTO bookings (
  id,student_id,tutor_id,subject,
  curriculum_code,scheduled_at,
  duration_minutes,status,session_notes,
  tutor_rating,parent_rating,amount_aud,
  created_at
) VALUES
-- Johnny Chen sessions (8 completed, 1 upcoming)
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  '33333333-3333-3333-3333-333333333331',
  '11111111-1111-1111-1111-111111111111',
  'Mathematical Methods','VCE',
  NOW()-INTERVAL '56 days',60,'completed',
  'First session. Johnny came in nervous 
  but engaged well. Assessed his knowledge 
  gaps: strong algebra, weak on calculus 
  foundations. Created a 10-week improvement 
  plan. Initial ATAR estimate: 68.',
  5,5,75.00,NOW()-INTERVAL '56 days'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaab',
  '33333333-3333-3333-3333-333333333331',
  '11111111-1111-1111-1111-111111111111',
  'Mathematical Methods','VCE',
  NOW()-INTERVAL '49 days',60,'completed',
  'Focused on differentiation rules. 
  Johnny mastered product rule and chain 
  rule by end of session. His confidence 
  is building. Revised ATAR estimate: 69.',
  5,5,75.00,NOW()-INTERVAL '49 days'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaac',
  '33333333-3333-3333-3333-333333333331',
  '11111111-1111-1111-1111-111111111111',
  'Chemistry','VCE',
  NOW()-INTERVAL '42 days',60,'completed',
  'First Chemistry session. Johnny 
  struggles with mole calculations — 
  this is his biggest weakness. Worked 
  through 20 practice problems. Progress 
  slow but steady.',
  4,5,75.00,NOW()-INTERVAL '42 days'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaad',
  '33333333-3333-3333-3333-333333333331',
  '11111111-1111-1111-1111-111111111111',
  'Mathematical Methods','VCE',
  NOW()-INTERVAL '35 days',60,'completed',
  'Integration introduction. Johnny 
  picked this up faster than expected. 
  His calculus foundation is now solid. 
  Updated estimate: 71.',
  5,5,75.00,NOW()-INTERVAL '35 days'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaae',
  '33333333-3333-3333-3333-333333333331',
  '11111111-1111-1111-1111-111111111111',
  'Mathematical Methods','VCE',
  NOW()-INTERVAL '28 days',60,'completed',
  'Logarithms. This clicked beautifully 
  for Johnny using visual representations. 
  Significant breakthrough session. 
  Updated estimate: 72.',
  5,5,75.00,NOW()-INTERVAL '28 days'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaf',
  '33333333-3333-3333-3333-333333333331',
  '11111111-1111-1111-1111-111111111111',
  'Chemistry','VCE',
  NOW()-INTERVAL '21 days',60,'completed',
  'Equilibrium constants. Johnny is 
  improving but Chemistry remains his 
  weakest subject. SAC approaching — 
  recommend extra practice this week.',
  4,4,75.00,NOW()-INTERVAL '21 days'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaag',
  '33333333-3333-3333-3333-333333333331',
  '11111111-1111-1111-1111-111111111111',
  'Mathematical Methods','VCE',
  NOW()-INTERVAL '14 days',60,'completed',
  'Integration by parts — Johnny nailed 
  it. His exam technique has improved 
  significantly. All working shown clearly. 
  Updated estimate: 74.',
  5,5,75.00,NOW()-INTERVAL '14 days'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaah',
  '33333333-3333-3333-3333-333333333331',
  '11111111-1111-1111-1111-111111111111',
  'Mathematical Methods','VCE',
  NOW()-INTERVAL '7 days',60,'completed',
  'Complex integration scenarios and 
  exam practice. Johnny completed a 
  full past exam paper — scored 72%. 
  Strong improvement from 58% in Week 1.',
  5,5,75.00,NOW()-INTERVAL '7 days'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaai',
  '33333333-3333-3333-3333-333333333331',
  '11111111-1111-1111-1111-111111111111',
  'Mathematical Methods','VCE',
  NOW()+INTERVAL '7 days',60,'confirmed',
  NULL,NULL,NULL,75.00,NOW()),

-- Amy Chen sessions (2 completed, 1 upcoming)
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbba',
  '33333333-3333-3333-3333-333333333332',
  '11111111-1111-1111-1111-111111111112',
  'English','VCE',
  NOW()-INTERVAL '14 days',60,'completed',
  'First session with Amy. She is 
  enthusiastic and engaged. Strong 
  creative writing instincts. Focus 
  areas: analytical essay structure 
  and evidence integration.',
  5,5,75.00,NOW()-INTERVAL '14 days'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb2',
  '33333333-3333-3333-3333-333333333332',
  '11111111-1111-1111-1111-111111111112',
  'English','VCE',
  NOW()-INTERVAL '7 days',60,'completed',
  'Worked on analytical essay structure. 
  Amy is developing her contention-evidence 
  technique. Good progress for only second 
  session. She is a motivated learner.',
  5,5,75.00,NOW()-INTERVAL '7 days'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb3',
  '33333333-3333-3333-3333-333333333332',
  '11111111-1111-1111-1111-111111111112',
  'English','VCE',
  NOW()+INTERVAL '7 days',60,'confirmed',
  NULL,NULL,NULL,75.00,NOW()),

-- Sarah Nguyen sessions (5 completed, 1 upcoming)
('cccccccc-cccc-cccc-cccc-ccccccccccc1',
  '33333333-3333-3333-3333-333333333333',
  '11111111-1111-1111-1111-111111111112',
  'Biology','VCE',
  NOW()-INTERVAL '35 days',60,'completed',
  'First session. Sarah has exceptional 
  conceptual understanding. Focus will be 
  exam technique and time management.',
  5,5,75.00,NOW()-INTERVAL '35 days'),
('cccccccc-cccc-cccc-cccc-ccccccccccc2',
  '33333333-3333-3333-3333-333333333333',
  '11111111-1111-1111-1111-111111111112',
  'Biology','VCE',
  NOW()-INTERVAL '28 days',60,'completed',
  'Cell biology and timed practice. 
  Sarah improved completion rate from 
  70% to 82%. Significant improvement 
  in exam technique.',
  5,5,75.00,NOW()-INTERVAL '28 days'),
('cccccccc-cccc-cccc-cccc-ccccccccccc3',
  '33333333-3333-3333-3333-333333333333',
  '11111111-1111-1111-1111-111111111112',
  'Biology','VCE',
  NOW()-INTERVAL '21 days',60,'completed',
  'Genetics and heredity — Sarah 
  mastered Mendelian genetics quickly. 
  Her strong foundation accelerates 
  learning significantly.',
  5,5,75.00,NOW()-INTERVAL '21 days'),
('cccccccc-cccc-cccc-cccc-ccccccccccc4',
  '33333333-3333-3333-3333-333333333333',
  '11111111-1111-1111-1111-111111111112',
  'Psychology','VCE',
  NOW()-INTERVAL '14 days',60,'completed',
  'Research methods in Psychology. 
  Sarah needs to build more confidence 
  in statistical analysis. Good progress 
  on research design questions.',
  4,5,75.00,NOW()-INTERVAL '14 days'),
('cccccccc-cccc-cccc-cccc-ccccccccccc5',
  '33333333-3333-3333-3333-333333333333',
  '11111111-1111-1111-1111-111111111112',
  'Biology','VCE',
  NOW()-INTERVAL '7 days',60,'completed',
  'Exam practice — full past paper. 
  Sarah scored 85%. On track to exceed 
  her 92 ATAR target at current pace.',
  5,5,75.00,NOW()-INTERVAL '7 days'),
('cccccccc-cccc-cccc-cccc-ccccccccccc6',
  '33333333-3333-3333-3333-333333333333',
  '11111111-1111-1111-1111-111111111112',
  'Biology','VCE',
  NOW()+INTERVAL '3 days',60,'confirmed',
  NULL,NULL,NULL,75.00,NOW()),

-- Kevin Zhang sessions (6 completed, 1 upcoming)
('dddddddd-dddd-dddd-dddd-ddddddddddd1',
  '33333333-3333-3333-3333-333333333334',
  '11111111-1111-1111-1111-111111111111',
  'Specialist Mathematics','VCE',
  NOW()-INTERVAL '42 days',60,'completed',
  'Kevin is exceptional. Working at 
  university level in some areas. Focus 
  is on perfect exam technique and 
  eliminating careless errors.',
  5,5,75.00,NOW()-INTERVAL '42 days'),
('dddddddd-dddd-dddd-dddd-ddddddddddd2',
  '33333333-3333-3333-3333-333333333334',
  '11111111-1111-1111-1111-111111111111',
  'Specialist Mathematics','VCE',
  NOW()-INTERVAL '35 days',60,'completed',
  'Complex numbers — Kevin mastered 
  this instantly. Moving to differential 
  equations. Targeting 50/50 raw score.',
  5,5,75.00,NOW()-INTERVAL '35 days'),
('dddddddd-dddd-dddd-dddd-ddddddddddd3',
  '33333333-3333-3333-3333-333333333334',
  '11111111-1111-1111-1111-111111111111',
  'Specialist Mathematics','VCE',
  NOW()-INTERVAL '28 days',60,'completed',
  'Differential equations and mechanics. 
  Kevin is performing at the top 0.1% 
  level. Minor errors in notation only.',
  5,5,75.00,NOW()-INTERVAL '28 days'),
('dddddddd-dddd-dddd-dddd-ddddddddddd4',
  '33333333-3333-3333-3333-333333333334',
  '11111111-1111-1111-1111-111111111111',
  'Chemistry','VCE',
  NOW()-INTERVAL '21 days',60,'completed',
  'Organic chemistry revision. Kevin 
  is thorough and methodical. No 
  significant gaps identified. 
  Focus: speed under exam conditions.',
  5,5,75.00,NOW()-INTERVAL '21 days'),
('dddddddd-dddd-dddd-dddd-ddddddddddd5',
  '33333333-3333-3333-3333-333333333334',
  '11111111-1111-1111-1111-111111111111',
  'Specialist Mathematics','VCE',
  NOW()-INTERVAL '14 days',60,'completed',
  'Past exam paper — Kevin scored 
  96%. Two minor errors identified 
  and corrected. On track for 99+ 
  ATAR with current trajectory.',
  5,5,75.00,NOW()-INTERVAL '14 days'),
('dddddddd-dddd-dddd-dddd-ddddddddddd6',
  '33333333-3333-3333-3333-333333333334',
  '11111111-1111-1111-1111-111111111111',
  'Specialist Mathematics','VCE',
  NOW()-INTERVAL '7 days',60,'completed',
  'Final polish on proof writing. 
  Kevin''s mathematical communication 
  is now exam-ready. Predicted: 
  raw 50 in Specialist Maths.',
  5,5,75.00,NOW()-INTERVAL '7 days'),
('dddddddd-dddd-dddd-dddd-ddddddddddd7',
  '33333333-3333-3333-3333-333333333334',
  '11111111-1111-1111-1111-111111111111',
  'Specialist Mathematics','VCE',
  NOW()+INTERVAL '5 days',60,'confirmed',
  NULL,NULL,NULL,75.00,NOW()),

-- Jessica Zhang sessions (4 completed, 1 upcoming)
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeee1',
  '33333333-3333-3333-3333-333333333335',
  '11111111-1111-1111-1111-111111111113',
  'Economics','VCE',
  NOW()-INTERVAL '28 days',60,'completed',
  'Jessica has good understanding of 
  microeconomics. Macroeconomics needs 
  work. Essay writing structure is 
  her main challenge.',
  4,4,75.00,NOW()-INTERVAL '28 days'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeee2',
  '33333333-3333-3333-3333-333333333335',
  '11111111-1111-1111-1111-111111111113',
  'Economics','VCE',
  NOW()-INTERVAL '21 days',60,'completed',
  'Macroeconomics policy — monetary 
  and fiscal policy. Jessica is 
  making steady progress. Not fast 
  but consistent.',
  4,4,75.00,NOW()-INTERVAL '21 days'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeee3',
  '33333333-3333-3333-3333-333333333335',
  '11111111-1111-1111-1111-111111111113',
  'English','VCE',
  NOW()-INTERVAL '14 days',60,'completed',
  'Text response essay writing. 
  Jessica improved her paragraph 
  structure significantly. Evidence 
  integration is developing well.',
  4,5,75.00,NOW()-INTERVAL '14 days'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeee4',
  '33333333-3333-3333-3333-333333333335',
  '11111111-1111-1111-1111-111111111113',
  'Economics','VCE',
  NOW()-INTERVAL '7 days',60,'completed',
  'Practice SAC under timed conditions. 
  Jessica scored 68% — a 12% improvement 
  from her baseline. Steady progress 
  continuing.',
  4,4,75.00,NOW()-INTERVAL '7 days'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeee5',
  '33333333-3333-3333-3333-333333333335',
  '11111111-1111-1111-1111-111111111113',
  'Economics','VCE',
  NOW()+INTERVAL '4 days',60,'confirmed',
  NULL,NULL,NULL,75.00,NOW()),

-- Arjun Patel sessions (7 completed, 1 upcoming)
('ffffffff-ffff-ffff-ffff-fffffffffff1',
  '33333333-3333-3333-3333-333333333336',
  '11111111-1111-1111-1111-111111111113',
  'Economics','VCE',
  NOW()-INTERVAL '49 days',60,'completed',
  'First session. Arjun is strong in 
  Economics — his main challenge is 
  Legal Studies essay technique.',
  5,5,75.00,NOW()-INTERVAL '49 days'),
('ffffffff-ffff-ffff-ffff-fffffffffff2',
  '33333333-3333-3333-3333-333333333336',
  '11111111-1111-1111-1111-111111111113',
  'Legal Studies','VCE',
  NOW()-INTERVAL '42 days',60,'completed',
  'Criminal law unit. Arjun understands 
  content but struggles to structure 
  legal arguments in essays. Working on 
  IRAC method.',
  4,5,75.00,NOW()-INTERVAL '42 days'),
('ffffffff-ffff-ffff-ffff-fffffffffff3',
  '33333333-3333-3333-3333-333333333336',
  '11111111-1111-1111-1111-111111111113',
  'Legal Studies','VCE',
  NOW()-INTERVAL '35 days',60,'completed',
  'Civil law and dispute resolution. 
  Arjun''s essay structure is improving. 
  IRAC method becoming more natural.',
  4,4,75.00,NOW()-INTERVAL '35 days'),
('ffffffff-ffff-ffff-ffff-fffffffffff4',
  '33333333-3333-3333-3333-333333333336',
  '11111111-1111-1111-1111-111111111113',
  'Economics','VCE',
  NOW()-INTERVAL '28 days',60,'completed',
  'International trade and globalisation. 
  Arjun excels here — this is his 
  strongest Economics topic.',
  5,5,75.00,NOW()-INTERVAL '28 days'),
('ffffffff-ffff-ffff-ffff-fffffffffff5',
  '33333333-3333-3333-3333-333333333336',
  '11111111-1111-1111-1111-111111111113',
  'Legal Studies','VCE',
  NOW()-INTERVAL '21 days',60,'completed',
  'Rights and justice unit. Arjun 
  is now writing confident legal 
  essays. Significant improvement 
  from first session.',
  5,5,75.00,NOW()-INTERVAL '21 days'),
('ffffffff-ffff-ffff-ffff-fffffffffff6',
  '33333333-3333-3333-3333-333333333336',
  '11111111-1111-1111-1111-111111111113',
  'Economics','VCE',
  NOW()-INTERVAL '14 days',60,'completed',
  'Full Economics practice exam. 
  Arjun scored 78% — on track 
  for his 85 ATAR target.',
  5,5,75.00,NOW()-INTERVAL '14 days'),
('ffffffff-ffff-ffff-ffff-fffffffffff7',
  '33333333-3333-3333-3333-333333333336',
  '11111111-1111-1111-1111-111111111113',
  'Legal Studies','VCE',
  NOW()-INTERVAL '7 days',60,'completed',
  'Legal Studies practice exam. 
  Arjun scored 72% — improved from 
  58% baseline. Legal argument 
  structure now strong.',
  5,5,75.00,NOW()-INTERVAL '7 days'),
('ffffffff-ffff-ffff-ffff-fffffffffff8',
  '33333333-3333-3333-3333-333333333336',
  '11111111-1111-1111-1111-111111111113',
  'Legal Studies','VCE',
  NOW()+INTERVAL '6 days',60,'confirmed',
  NULL,NULL,NULL,75.00,NOW()),

-- Maya Patel sessions (3 completed, 1 upcoming)
('gggggggg-gggg-gggg-gggg-ggggggggggg1',
  '33333333-3333-3333-3333-333333333337',
  '11111111-1111-1111-1111-111111111111',
  'Mathematical Reasoning','SELECTIVE_VIC',
  NOW()-INTERVAL '21 days',60,'completed',
  'First selective entry prep session. 
  Maya is bright and motivated. Strong 
  in numerical reasoning, needs work 
  on abstract patterns.',
  5,5,75.00,NOW()-INTERVAL '21 days'),
('gggggggg-gggg-gggg-gggg-ggggggggggg2',
  '33333333-3333-3333-3333-333333333337',
  '11111111-1111-1111-1111-111111111111',
  'Verbal Reasoning','SELECTIVE_VIC',
  NOW()-INTERVAL '14 days',60,'completed',
  'Verbal reasoning and reading 
  comprehension. Maya''s vocabulary 
  is excellent. Speed needs improvement 
  for timed test conditions.',
  5,5,75.00,NOW()-INTERVAL '14 days'),
('gggggggg-gggg-gggg-gggg-ggggggggggg3',
  '33333333-3333-3333-3333-333333333337',
  '11111111-1111-1111-1111-111111111111',
  'Mathematical Reasoning','SELECTIVE_VIC',
  NOW()-INTERVAL '7 days',60,'completed',
  'Abstract reasoning patterns. Maya 
  improved significantly with practice. 
  On track for Melbourne High entry 
  score at current pace.',
  5,5,75.00,NOW()-INTERVAL '7 days'),
('gggggggg-gggg-gggg-gggg-ggggggggggg4',
  '33333333-3333-3333-3333-333333333337',
  '11111111-1111-1111-1111-111111111111',
  'Mathematical Reasoning','SELECTIVE_VIC',
  NOW()+INTERVAL '7 days',60,'confirmed',
  NULL,NULL,NULL,75.00,NOW());

-- ============================================
-- PROGRESS NARRATIVES
-- ============================================

INSERT INTO progress_narratives (
  student_id,week_number,narrative_en,
  narrative_vi,generated_at,sent_to_parent
) VALUES
(
  '33333333-3333-3333-3333-333333333331',
  8,
  'This week Johnny had a breakthrough 
  session on integration by parts — one 
  of the most challenging topics in 
  Mathematical Methods. After 8 sessions 
  with Emma, his trajectory has shifted 
  from 68 to 74 ATAR estimate. This 7-week 
  journey shows what consistent effort 
  and targeted tutoring can achieve.

  Emma reports that Johnny''s mathematical 
  maturity has grown considerably. He now 
  attempts harder questions first, 
  shows all working methodically, and 
  checks his answers under time pressure. 
  His most recent practice exam scored 
  72% — compared to 58% in Week 1.

  The next 4 weeks will focus on 
  probability and statistics — the 
  remaining high-value topics before 
  exams. With Chemistry SAC approaching, 
  we recommend adding one Chemistry 
  session this fortnight. Johnny is on 
  track to reach his 85 ATAR target.',
  'Tuần này Johnny đã có bước đột phá 
  trong tích phân từng phần. Sau 8 buổi 
  học với Emma, quỹ đạo ATAR của bạn ấy 
  đã tăng từ 68 lên 74.',
  NOW(),TRUE
),(
  '33333333-3333-3333-3333-333333333333',
  5,
  'Sarah continues to impress. Her 
  Biology understanding is among the 
  strongest James has seen in Year 11 
  students — she grasps complex concepts 
  quickly and applies them accurately 
  under pressure. This week''s full 
  practice paper scored 85%, putting 
  her well ahead of her target trajectory.

  The focus is now shifting to Psychology, 
  where Sarah''s research methods knowledge 
  needs development. This is normal for 
  Year 11 students — the statistical 
  analysis component is genuinely 
  challenging. James has a clear plan 
  to close this gap over the next 
  three weeks.

  Sarah''s predicted ATAR has increased 
  from 78 to 81 based on current 
  performance. She is on track to 
  exceed her 92 target if she maintains 
  current effort levels. Excellent work 
  this week.',
  'Sarah tiếp tục gây ấn tượng. Sự hiểu 
  biết Sinh học của bạn ấy là một trong 
  những điều mạnh nhất mà James từng 
  thấy ở học sinh Năm 11.',
  NOW()-INTERVAL '3 days',TRUE
),(
  '33333333-3333-3333-3333-333333333334',
  6,
  'Kevin is operating at an exceptional 
  level. This week''s Specialist Mathematics 
  session covered the final topic areas 
  before exams — Kevin''s proof writing 
  is now exam-ready and his raw score 
  prediction for Specialist Maths is 
  50 out of 50. This places him in the 
  top 0.1% of VCE students nationally.

  Emma notes that tutoring Kevin is a 
  unique experience — sessions feel 
  more like collaborative problem-solving 
  than traditional tutoring. He asks 
  sophisticated questions and often 
  identifies elegant solutions that 
  Emma herself finds impressive.

  At current trajectory, Kevin is 
  predicted to achieve a 99+ ATAR. 
  The remaining sessions will focus 
  on eliminating the small errors 
  that stand between good and perfect.',
  NULL,
  NOW()-INTERVAL '2 days',TRUE
),(
  '33333333-3333-3333-3333-333333333336',
  7,
  'Arjun has shown remarkable improvement 
  in Legal Studies this week. Seven 
  sessions ago he was scoring 58% on 
  practice essays — this week he scored 
  72%. The IRAC method has transformed 
  his legal argument structure and he 
  now approaches essay questions with 
  confidence rather than anxiety.

  Economics remains Arjun''s strongest 
  subject — his international trade 
  knowledge is excellent and his 
  written analysis is sophisticated. 
  The recent practice exam scored 78%, 
  putting him firmly on track for 
  his 85 ATAR target.

  With exams approximately 12 weeks 
  away, focus will shift to 
  integrating both subjects into 
  a comprehensive exam preparation 
  strategy. Arjun is well-positioned 
  for a strong result.',
  NULL,
  NOW()-INTERVAL '1 days',TRUE
);

-- ============================================
-- STUDENT ALERTS
-- ============================================

INSERT INTO student_alerts (
  student_id,alert_type,severity,
  message,is_resolved
) VALUES
(
  '33333333-3333-3333-3333-333333333331',
  'declining_scores','warning',
  'Johnny''s Chemistry scores have 
  declined over the past 2 sessions. 
  Chemistry SAC is in 3 weeks. 
  Consider adding an extra Chemistry 
  session this fortnight.',
  FALSE
),(
  '33333333-3333-3333-3333-333333333332',
  'low_ai_engagement','info',
  'Amy has only completed 2 sessions. 
  More data needed to generate 
  meaningful progress insights.',
  FALSE
),(
  '33333333-3333-3333-3333-333333333336',
  'declining_scores','warning',
  'Arjun''s Legal Studies scores 
  need attention before his SAC. 
  Extra practice recommended.',
  FALSE
);

-- ============================================
-- VELOCITY SCORES FOR ALL TUTORS
-- ============================================

INSERT INTO velocity_scores (
  tutor_id,score,sessions_count,
  avg_atar_improvement,
  student_retention_rate,
  parent_satisfaction_avg,
  calculated_at
) VALUES
(
  '11111111-1111-1111-1111-111111111111',
  92,47,8.2,0.94,4.9,NOW()
),(
  '11111111-1111-1111-1111-111111111112',
  85,31,7.1,0.90,4.8,NOW()
),(
  '11111111-1111-1111-1111-111111111113',
  78,22,6.8,0.86,4.7,NOW()
);
