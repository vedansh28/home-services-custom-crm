
-- 1. CLIENTS TABLE
CREATE TABLE public.clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid REFERENCES auth.users(id) ON DELETE SET NULL, -- who created it
  name text NOT NULL,
  email text UNIQUE,
  phone text,
  address text,
  billing_term text, -- e.g., monthly, quarterly, biannually
  created_at timestamp with time zone DEFAULT now()
);

-- 2. LEADS TABLE (for Kanban pipeline)
CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES public.clients(id) ON DELETE CASCADE NOT NULL,
  stage text NOT NULL, -- e.g. new-lead, contacted, quote-sent, negotiation, service-booked, completed, invoiced, payment-received, lost
  service_type text NOT NULL, -- window-washing, pressure-washing, holiday-lights, gutter-cleaning, etc
  value integer,
  last_contact date,
  notes text,
  created_at timestamp with time zone DEFAULT now()
);

-- 3. SERVICE RECORDS TABLE
CREATE TABLE public.service_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES public.clients(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL, -- service type
  date date NOT NULL,
  amount integer NOT NULL,
  status text NOT NULL, -- completed, scheduled, cancelled
  created_at timestamp with time zone DEFAULT now()
);

-- 4. RLS POLICIES
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_records ENABLE ROW LEVEL SECURITY;

-- Only allow users to view clients/leads/service_records if they created them, or everyone can view (since it's demo/test data), adjust as needed:
CREATE POLICY "Anyone can view clients" ON public.clients FOR SELECT USING (true);
CREATE POLICY "Anyone can view leads" ON public.leads FOR SELECT USING (true);
CREATE POLICY "Anyone can view service records" ON public.service_records FOR SELECT USING (true);

-- Only owner can modify their clients 
CREATE POLICY "Client owner can update" ON public.clients FOR UPDATE USING (owner_id = auth.uid());
CREATE POLICY "Client owner can insert" ON public.clients FOR INSERT WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Lead can be added/edited if client owner" ON public.leads FOR INSERT WITH CHECK (
  (SELECT owner_id FROM public.clients WHERE id = client_id) = auth.uid()
);
CREATE POLICY "Lead can be updated if client owner" ON public.leads FOR UPDATE USING (
  (SELECT owner_id FROM public.clients WHERE id = client_id) = auth.uid()
);

CREATE POLICY "Service record can be added if client owner" ON public.service_records FOR INSERT WITH CHECK (
  (SELECT owner_id FROM public.clients WHERE id = client_id) = auth.uid()
);
CREATE POLICY "Service record can be updated if client owner" ON public.service_records FOR UPDATE USING (
  (SELECT owner_id FROM public.clients WHERE id = client_id) = auth.uid()
);

-- 5. SEED SAMPLE USER DATA (assume you already have one admin, now add 6 regular users)
-- Replace these UUIDs with real ones post-signup:
-- Insert them via the dashboard: sign up 6 email addresses, then run (for each new user_id):
-- INSERT INTO public.user_roles(user_id, role) VALUES ('NEW_USER_ID', 'user');

-- 6. SEED SAMPLE CLIENTS
-- You'll want 4 clients with a mix of service types.
-- For now, example SQL, but you can insert/update with real UUIDs after you have the users:
-- Insert clients (owner_id = any of the created users):
-- INSERT INTO public.clients(id, owner_id, name, email, phone, address, billing_term) VALUES
--   (gen_random_uuid(), 'USER_ID1', 'Acme Window Cleaning', 'acme@example.com', '(555) 123-0001', '101 1st Ave', 'quarterly'),
--   (gen_random_uuid(), 'USER_ID2', 'Pressure Pros', 'pros@example.com', '(555) 123-0002', '202 2nd Ave', 'monthly'),
--   (gen_random_uuid(), 'USER_ID3', 'Holiday Shine Co', 'shine@example.com', '(555) 123-0003', '303 3rd St', 'biannually'),
--   (gen_random_uuid(), 'USER_ID4', 'Bright & Clean LLC', 'bright@example.com', '(555) 123-0004', '404 4th Ave', 'quarterly');

-- 7. SEED LEADS for Kanban statuses (link each to one client, with service type and one of [quote-sent, service-booked, completed, payment-received])
-- INSERT INTO public.leads(client_id, stage, service_type, value, last_contact, notes) VALUES
--   (CLIENT1_ID, 'quote-sent', 'window-washing', 250, '2024-06-01', 'Ready to send quote by email'),
--   (CLIENT2_ID, 'service-booked', 'pressure-washing', 300, '2024-06-03', 'Booked for next Monday'),
--   (CLIENT3_ID, 'completed', 'window-washing,holiday-lights', 700, '2024-05-30', 'Service complete, sent invoice'),
--   (CLIENT4_ID, 'payment-received', 'gutter-cleaning', 150, '2024-06-05', 'Payment received via card');

-- 8. SEED SERVICE HISTORY for each client
-- INSERT INTO public.service_records(client_id, type, date, amount, status) VALUES
--   (CLIENT1_ID, 'window-washing', '2024-05-01', 250, 'completed'),
--   (CLIENT2_ID, 'pressure-washing', '2024-04-21', 300, 'completed'),
--   (CLIENT3_ID, 'window-washing', '2023-12-15', 400, 'completed'),
--   (CLIENT3_ID, 'holiday-lights', '2023-12-20', 300, 'completed'),
--   (CLIENT4_ID, 'gutter-cleaning', '2024-06-03', 150, 'completed');

-- Adjust OWNER_ID, CLIENT_ID, etc., with actual values after creation.
