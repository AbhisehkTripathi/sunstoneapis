create sequence "public"."api_logs_id_seq";

create sequence "public"."community_posts_post_id_seq";

create sequence "public"."journals_journal_id_seq";

create sequence "public"."meditations_meditation_id_seq";

create sequence "public"."progress_progress_id_seq";

create sequence "public"."sessions_session_id_seq";

create sequence "public"."therapists_therapist_id_seq";

create sequence "public"."user_wellness_data_id_seq";

create sequence "public"."users_user_id_seq";


  create table "public"."api_logs" (
    "id" bigint not null default nextval('public.api_logs_id_seq'::regclass),
    "service_name" character varying(100) not null,
    "request_time" timestamp without time zone default CURRENT_TIMESTAMP,
    "processing_time" bigint,
    "method" character varying(10),
    "url" text,
    "http_version" character varying(10),
    "request_headers" jsonb,
    "request_body" jsonb,
    "response_status_code" integer,
    "response_status_message" character varying(255),
    "response_headers" jsonb,
    "response_body" jsonb,
    "error_message" text,
    "created_at" timestamp without time zone default CURRENT_TIMESTAMP
      );



  create table "public"."community_posts" (
    "post_id" integer not null default nextval('public.community_posts_post_id_seq'::regclass),
    "user_id" integer,
    "content" text,
    "metadata" jsonb,
    "created_at" timestamp without time zone default now()
      );



  create table "public"."daily_welcome_quotes" (
    "id" integer not null,
    "day_number" integer not null,
    "category" character varying(100),
    "quote_text" text,
    "mood_intent" character varying(100),
    "author" character varying(100),
    "created_at" date
      );



  create table "public"."journals" (
    "journal_id" integer not null default nextval('public.journals_journal_id_seq'::regclass),
    "user_id" integer,
    "entry_text" text,
    "metadata" jsonb,
    "created_at" timestamp without time zone default now()
      );



  create table "public"."meditations" (
    "meditation_id" integer not null default nextval('public.meditations_meditation_id_seq'::regclass),
    "title" character varying(150),
    "description" text,
    "file_url" text,
    "metadata" jsonb
      );



  create table "public"."progress" (
    "progress_id" integer not null default nextval('public.progress_progress_id_seq'::regclass),
    "user_id" integer,
    "period" date not null,
    "metrics" jsonb,
    "created_at" timestamp without time zone default now()
      );



  create table "public"."sessions" (
    "session_id" integer not null default nextval('public.sessions_session_id_seq'::regclass),
    "patient_id" integer,
    "therapist_id" integer,
    "scheduled_at" timestamp without time zone not null,
    "status" character varying(50),
    "notes" jsonb
      );



  create table "public"."therapists" (
    "therapist_id" integer not null default nextval('public.therapists_therapist_id_seq'::regclass),
    "user_id" integer,
    "specialization" text,
    "license_no" text,
    "availability" jsonb
      );



  create table "public"."user_wellness_data" (
    "id" bigint not null default nextval('public.user_wellness_data_id_seq'::regclass),
    "user_id" bigint,
    "data_type" character varying(50) not null,
    "title" character varying(255),
    "description" text,
    "created_at" timestamp without time zone default CURRENT_TIMESTAMP,
    "stress_level" integer,
    "sleep_hours" integer,
    "mindfulness_frequency" integer,
    "energy_time" character varying(50),
    "routine_type" character varying(50),
    "activity_time" time without time zone,
    "focus_goals" character varying(255)
      );



  create table "public"."users" (
    "user_id" integer not null default nextval('public.users_user_id_seq'::regclass),
    "name" character varying(100) not null,
    "email" character varying(150) not null,
    "password_hash" text,
    "role" character varying(50) not null,
    "profile" text,
    "created_at" timestamp without time zone default now(),
    "clerk_user_id" character varying(255),
    "jwt_token" text,
    "jwt_expires_at" timestamp without time zone
      );


alter sequence "public"."api_logs_id_seq" owned by "public"."api_logs"."id";

alter sequence "public"."community_posts_post_id_seq" owned by "public"."community_posts"."post_id";

alter sequence "public"."journals_journal_id_seq" owned by "public"."journals"."journal_id";

alter sequence "public"."meditations_meditation_id_seq" owned by "public"."meditations"."meditation_id";

alter sequence "public"."progress_progress_id_seq" owned by "public"."progress"."progress_id";

alter sequence "public"."sessions_session_id_seq" owned by "public"."sessions"."session_id";

alter sequence "public"."therapists_therapist_id_seq" owned by "public"."therapists"."therapist_id";

alter sequence "public"."user_wellness_data_id_seq" owned by "public"."user_wellness_data"."id";

alter sequence "public"."users_user_id_seq" owned by "public"."users"."user_id";

CREATE UNIQUE INDEX api_logs_pkey ON public.api_logs USING btree (id);

CREATE UNIQUE INDEX community_posts_pkey ON public.community_posts USING btree (post_id);

CREATE UNIQUE INDEX daily_welcome_quotes_pkey ON public.daily_welcome_quotes USING btree (id);

CREATE INDEX idx_journals_created_at ON public.journals USING btree (created_at);

CREATE INDEX idx_journals_metadata_gin ON public.journals USING gin (metadata jsonb_path_ops);

CREATE INDEX idx_journals_user_id ON public.journals USING btree (user_id);

CREATE INDEX idx_meditations_metadata_gin ON public.meditations USING gin (metadata jsonb_path_ops);

CREATE INDEX idx_meditations_title ON public.meditations USING btree (title);

CREATE INDEX idx_posts_created_at ON public.community_posts USING btree (created_at);

CREATE INDEX idx_posts_metadata_gin ON public.community_posts USING gin (metadata jsonb_path_ops);

CREATE INDEX idx_posts_user_id ON public.community_posts USING btree (user_id);

CREATE INDEX idx_sessions_notes_gin ON public.sessions USING gin (notes jsonb_path_ops);

CREATE INDEX idx_sessions_patient_id ON public.sessions USING btree (patient_id);

CREATE INDEX idx_sessions_scheduled_at ON public.sessions USING btree (scheduled_at);

CREATE INDEX idx_sessions_status ON public.sessions USING btree (status);

CREATE INDEX idx_sessions_therapist_id ON public.sessions USING btree (therapist_id);

CREATE INDEX idx_therapists_availability_gin ON public.therapists USING gin (availability jsonb_path_ops);

CREATE INDEX idx_therapists_specialization ON public.therapists USING btree (specialization);

CREATE UNIQUE INDEX idx_therapists_user_id ON public.therapists USING btree (user_id);

CREATE UNIQUE INDEX idx_users_email ON public.users USING btree (email);

CREATE INDEX idx_users_role ON public.users USING btree (role);

CREATE UNIQUE INDEX journals_pkey ON public.journals USING btree (journal_id);

CREATE UNIQUE INDEX meditations_pkey ON public.meditations USING btree (meditation_id);

CREATE UNIQUE INDEX progress_pkey ON public.progress USING btree (progress_id);

CREATE UNIQUE INDEX sessions_pkey ON public.sessions USING btree (session_id);

CREATE UNIQUE INDEX therapists_pkey ON public.therapists USING btree (therapist_id);

CREATE UNIQUE INDEX therapists_user_id_key ON public.therapists USING btree (user_id);

CREATE UNIQUE INDEX user_wellness_data_pkey ON public.user_wellness_data USING btree (id);

CREATE UNIQUE INDEX users_clerk_user_id_key ON public.users USING btree (clerk_user_id);

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (user_id);

alter table "public"."api_logs" add constraint "api_logs_pkey" PRIMARY KEY using index "api_logs_pkey";

alter table "public"."community_posts" add constraint "community_posts_pkey" PRIMARY KEY using index "community_posts_pkey";

alter table "public"."daily_welcome_quotes" add constraint "daily_welcome_quotes_pkey" PRIMARY KEY using index "daily_welcome_quotes_pkey";

alter table "public"."journals" add constraint "journals_pkey" PRIMARY KEY using index "journals_pkey";

alter table "public"."meditations" add constraint "meditations_pkey" PRIMARY KEY using index "meditations_pkey";

alter table "public"."progress" add constraint "progress_pkey" PRIMARY KEY using index "progress_pkey";

alter table "public"."sessions" add constraint "sessions_pkey" PRIMARY KEY using index "sessions_pkey";

alter table "public"."therapists" add constraint "therapists_pkey" PRIMARY KEY using index "therapists_pkey";

alter table "public"."user_wellness_data" add constraint "user_wellness_data_pkey" PRIMARY KEY using index "user_wellness_data_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."community_posts" add constraint "community_posts_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(user_id) not valid;

alter table "public"."community_posts" validate constraint "community_posts_user_id_fkey";

alter table "public"."journals" add constraint "journals_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(user_id) not valid;

alter table "public"."journals" validate constraint "journals_user_id_fkey";

alter table "public"."progress" add constraint "progress_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(user_id) not valid;

alter table "public"."progress" validate constraint "progress_user_id_fkey";

alter table "public"."sessions" add constraint "sessions_patient_id_fkey" FOREIGN KEY (patient_id) REFERENCES public.users(user_id) not valid;

alter table "public"."sessions" validate constraint "sessions_patient_id_fkey";

alter table "public"."sessions" add constraint "sessions_status_check" CHECK (((status)::text = ANY (ARRAY[('scheduled'::character varying)::text, ('completed'::character varying)::text, ('cancelled'::character varying)::text]))) not valid;

alter table "public"."sessions" validate constraint "sessions_status_check";

alter table "public"."sessions" add constraint "sessions_therapist_id_fkey" FOREIGN KEY (therapist_id) REFERENCES public.therapists(therapist_id) not valid;

alter table "public"."sessions" validate constraint "sessions_therapist_id_fkey";

alter table "public"."therapists" add constraint "therapists_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE not valid;

alter table "public"."therapists" validate constraint "therapists_user_id_fkey";

alter table "public"."therapists" add constraint "therapists_user_id_key" UNIQUE using index "therapists_user_id_key";

alter table "public"."user_wellness_data" add constraint "user_wellness_data_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE not valid;

alter table "public"."user_wellness_data" validate constraint "user_wellness_data_user_id_fkey";

alter table "public"."users" add constraint "users_clerk_user_id_key" UNIQUE using index "users_clerk_user_id_key";

alter table "public"."users" add constraint "users_email_key" UNIQUE using index "users_email_key";

alter table "public"."users" add constraint "users_role_check" CHECK (((role)::text = ANY (ARRAY[('patient'::character varying)::text, ('therapist'::character varying)::text, ('admin'::character varying)::text]))) not valid;

alter table "public"."users" validate constraint "users_role_check";

grant delete on table "public"."api_logs" to "anon";

grant insert on table "public"."api_logs" to "anon";

grant references on table "public"."api_logs" to "anon";

grant select on table "public"."api_logs" to "anon";

grant trigger on table "public"."api_logs" to "anon";

grant truncate on table "public"."api_logs" to "anon";

grant update on table "public"."api_logs" to "anon";

grant delete on table "public"."api_logs" to "authenticated";

grant insert on table "public"."api_logs" to "authenticated";

grant references on table "public"."api_logs" to "authenticated";

grant select on table "public"."api_logs" to "authenticated";

grant trigger on table "public"."api_logs" to "authenticated";

grant truncate on table "public"."api_logs" to "authenticated";

grant update on table "public"."api_logs" to "authenticated";

grant delete on table "public"."api_logs" to "service_role";

grant insert on table "public"."api_logs" to "service_role";

grant references on table "public"."api_logs" to "service_role";

grant select on table "public"."api_logs" to "service_role";

grant trigger on table "public"."api_logs" to "service_role";

grant truncate on table "public"."api_logs" to "service_role";

grant update on table "public"."api_logs" to "service_role";

grant delete on table "public"."community_posts" to "anon";

grant insert on table "public"."community_posts" to "anon";

grant references on table "public"."community_posts" to "anon";

grant select on table "public"."community_posts" to "anon";

grant trigger on table "public"."community_posts" to "anon";

grant truncate on table "public"."community_posts" to "anon";

grant update on table "public"."community_posts" to "anon";

grant delete on table "public"."community_posts" to "authenticated";

grant insert on table "public"."community_posts" to "authenticated";

grant references on table "public"."community_posts" to "authenticated";

grant select on table "public"."community_posts" to "authenticated";

grant trigger on table "public"."community_posts" to "authenticated";

grant truncate on table "public"."community_posts" to "authenticated";

grant update on table "public"."community_posts" to "authenticated";

grant delete on table "public"."community_posts" to "service_role";

grant insert on table "public"."community_posts" to "service_role";

grant references on table "public"."community_posts" to "service_role";

grant select on table "public"."community_posts" to "service_role";

grant trigger on table "public"."community_posts" to "service_role";

grant truncate on table "public"."community_posts" to "service_role";

grant update on table "public"."community_posts" to "service_role";

grant delete on table "public"."daily_welcome_quotes" to "anon";

grant insert on table "public"."daily_welcome_quotes" to "anon";

grant references on table "public"."daily_welcome_quotes" to "anon";

grant select on table "public"."daily_welcome_quotes" to "anon";

grant trigger on table "public"."daily_welcome_quotes" to "anon";

grant truncate on table "public"."daily_welcome_quotes" to "anon";

grant update on table "public"."daily_welcome_quotes" to "anon";

grant delete on table "public"."daily_welcome_quotes" to "authenticated";

grant insert on table "public"."daily_welcome_quotes" to "authenticated";

grant references on table "public"."daily_welcome_quotes" to "authenticated";

grant select on table "public"."daily_welcome_quotes" to "authenticated";

grant trigger on table "public"."daily_welcome_quotes" to "authenticated";

grant truncate on table "public"."daily_welcome_quotes" to "authenticated";

grant update on table "public"."daily_welcome_quotes" to "authenticated";

grant delete on table "public"."daily_welcome_quotes" to "service_role";

grant insert on table "public"."daily_welcome_quotes" to "service_role";

grant references on table "public"."daily_welcome_quotes" to "service_role";

grant select on table "public"."daily_welcome_quotes" to "service_role";

grant trigger on table "public"."daily_welcome_quotes" to "service_role";

grant truncate on table "public"."daily_welcome_quotes" to "service_role";

grant update on table "public"."daily_welcome_quotes" to "service_role";

grant delete on table "public"."journals" to "anon";

grant insert on table "public"."journals" to "anon";

grant references on table "public"."journals" to "anon";

grant select on table "public"."journals" to "anon";

grant trigger on table "public"."journals" to "anon";

grant truncate on table "public"."journals" to "anon";

grant update on table "public"."journals" to "anon";

grant delete on table "public"."journals" to "authenticated";

grant insert on table "public"."journals" to "authenticated";

grant references on table "public"."journals" to "authenticated";

grant select on table "public"."journals" to "authenticated";

grant trigger on table "public"."journals" to "authenticated";

grant truncate on table "public"."journals" to "authenticated";

grant update on table "public"."journals" to "authenticated";

grant delete on table "public"."journals" to "service_role";

grant insert on table "public"."journals" to "service_role";

grant references on table "public"."journals" to "service_role";

grant select on table "public"."journals" to "service_role";

grant trigger on table "public"."journals" to "service_role";

grant truncate on table "public"."journals" to "service_role";

grant update on table "public"."journals" to "service_role";

grant delete on table "public"."meditations" to "anon";

grant insert on table "public"."meditations" to "anon";

grant references on table "public"."meditations" to "anon";

grant select on table "public"."meditations" to "anon";

grant trigger on table "public"."meditations" to "anon";

grant truncate on table "public"."meditations" to "anon";

grant update on table "public"."meditations" to "anon";

grant delete on table "public"."meditations" to "authenticated";

grant insert on table "public"."meditations" to "authenticated";

grant references on table "public"."meditations" to "authenticated";

grant select on table "public"."meditations" to "authenticated";

grant trigger on table "public"."meditations" to "authenticated";

grant truncate on table "public"."meditations" to "authenticated";

grant update on table "public"."meditations" to "authenticated";

grant delete on table "public"."meditations" to "service_role";

grant insert on table "public"."meditations" to "service_role";

grant references on table "public"."meditations" to "service_role";

grant select on table "public"."meditations" to "service_role";

grant trigger on table "public"."meditations" to "service_role";

grant truncate on table "public"."meditations" to "service_role";

grant update on table "public"."meditations" to "service_role";

grant delete on table "public"."progress" to "anon";

grant insert on table "public"."progress" to "anon";

grant references on table "public"."progress" to "anon";

grant select on table "public"."progress" to "anon";

grant trigger on table "public"."progress" to "anon";

grant truncate on table "public"."progress" to "anon";

grant update on table "public"."progress" to "anon";

grant delete on table "public"."progress" to "authenticated";

grant insert on table "public"."progress" to "authenticated";

grant references on table "public"."progress" to "authenticated";

grant select on table "public"."progress" to "authenticated";

grant trigger on table "public"."progress" to "authenticated";

grant truncate on table "public"."progress" to "authenticated";

grant update on table "public"."progress" to "authenticated";

grant delete on table "public"."progress" to "service_role";

grant insert on table "public"."progress" to "service_role";

grant references on table "public"."progress" to "service_role";

grant select on table "public"."progress" to "service_role";

grant trigger on table "public"."progress" to "service_role";

grant truncate on table "public"."progress" to "service_role";

grant update on table "public"."progress" to "service_role";

grant delete on table "public"."sessions" to "anon";

grant insert on table "public"."sessions" to "anon";

grant references on table "public"."sessions" to "anon";

grant select on table "public"."sessions" to "anon";

grant trigger on table "public"."sessions" to "anon";

grant truncate on table "public"."sessions" to "anon";

grant update on table "public"."sessions" to "anon";

grant delete on table "public"."sessions" to "authenticated";

grant insert on table "public"."sessions" to "authenticated";

grant references on table "public"."sessions" to "authenticated";

grant select on table "public"."sessions" to "authenticated";

grant trigger on table "public"."sessions" to "authenticated";

grant truncate on table "public"."sessions" to "authenticated";

grant update on table "public"."sessions" to "authenticated";

grant delete on table "public"."sessions" to "service_role";

grant insert on table "public"."sessions" to "service_role";

grant references on table "public"."sessions" to "service_role";

grant select on table "public"."sessions" to "service_role";

grant trigger on table "public"."sessions" to "service_role";

grant truncate on table "public"."sessions" to "service_role";

grant update on table "public"."sessions" to "service_role";

grant delete on table "public"."therapists" to "anon";

grant insert on table "public"."therapists" to "anon";

grant references on table "public"."therapists" to "anon";

grant select on table "public"."therapists" to "anon";

grant trigger on table "public"."therapists" to "anon";

grant truncate on table "public"."therapists" to "anon";

grant update on table "public"."therapists" to "anon";

grant delete on table "public"."therapists" to "authenticated";

grant insert on table "public"."therapists" to "authenticated";

grant references on table "public"."therapists" to "authenticated";

grant select on table "public"."therapists" to "authenticated";

grant trigger on table "public"."therapists" to "authenticated";

grant truncate on table "public"."therapists" to "authenticated";

grant update on table "public"."therapists" to "authenticated";

grant delete on table "public"."therapists" to "service_role";

grant insert on table "public"."therapists" to "service_role";

grant references on table "public"."therapists" to "service_role";

grant select on table "public"."therapists" to "service_role";

grant trigger on table "public"."therapists" to "service_role";

grant truncate on table "public"."therapists" to "service_role";

grant update on table "public"."therapists" to "service_role";

grant delete on table "public"."user_wellness_data" to "anon";

grant insert on table "public"."user_wellness_data" to "anon";

grant references on table "public"."user_wellness_data" to "anon";

grant select on table "public"."user_wellness_data" to "anon";

grant trigger on table "public"."user_wellness_data" to "anon";

grant truncate on table "public"."user_wellness_data" to "anon";

grant update on table "public"."user_wellness_data" to "anon";

grant delete on table "public"."user_wellness_data" to "authenticated";

grant insert on table "public"."user_wellness_data" to "authenticated";

grant references on table "public"."user_wellness_data" to "authenticated";

grant select on table "public"."user_wellness_data" to "authenticated";

grant trigger on table "public"."user_wellness_data" to "authenticated";

grant truncate on table "public"."user_wellness_data" to "authenticated";

grant update on table "public"."user_wellness_data" to "authenticated";

grant delete on table "public"."user_wellness_data" to "service_role";

grant insert on table "public"."user_wellness_data" to "service_role";

grant references on table "public"."user_wellness_data" to "service_role";

grant select on table "public"."user_wellness_data" to "service_role";

grant trigger on table "public"."user_wellness_data" to "service_role";

grant truncate on table "public"."user_wellness_data" to "service_role";

grant update on table "public"."user_wellness_data" to "service_role";

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";


