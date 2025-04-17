--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Attribute; Type: TABLE; Schema: public; Owner: corso_its_db
--

CREATE TABLE public."Attribute" (
    id text NOT NULL,
    key character varying(20) NOT NULL,
    name character varying(20) NOT NULL,
    value integer DEFAULT 20
);


ALTER TABLE public."Attribute" OWNER TO corso_its_db;

--
-- Name: Character; Type: TABLE; Schema: public; Owner: corso_its_db
--

CREATE TABLE public."Character" (
    id text NOT NULL,
    name character varying(20) NOT NULL,
    history text,
    age integer,
    health integer DEFAULT 100,
    stamina integer DEFAULT 100,
    mana integer DEFAULT 100,
    "idRace" text NOT NULL,
    "idClass" text NOT NULL
);


ALTER TABLE public."Character" OWNER TO corso_its_db;

--
-- Name: Class; Type: TABLE; Schema: public; Owner: corso_its_db
--

CREATE TABLE public."Class" (
    id text NOT NULL,
    name character varying(20) NOT NULL,
    key character varying(20) NOT NULL,
    description text
);


ALTER TABLE public."Class" OWNER TO corso_its_db;

--
-- Name: ClassSkillMod; Type: TABLE; Schema: public; Owner: corso_its_db
--

CREATE TABLE public."ClassSkillMod" (
    "idSkill" text NOT NULL,
    "idClass" text NOT NULL,
    value integer NOT NULL
);


ALTER TABLE public."ClassSkillMod" OWNER TO corso_its_db;

--
-- Name: Race; Type: TABLE; Schema: public; Owner: corso_its_db
--

CREATE TABLE public."Race" (
    id text NOT NULL,
    key character varying(20) NOT NULL,
    name character varying(20) NOT NULL,
    "modHealth" integer NOT NULL,
    "modStamina" integer NOT NULL,
    "modMana" integer NOT NULL
);


ALTER TABLE public."Race" OWNER TO corso_its_db;

--
-- Name: RaceAttrMod; Type: TABLE; Schema: public; Owner: corso_its_db
--

CREATE TABLE public."RaceAttrMod" (
    "idRace" text NOT NULL,
    "idAttribute" text NOT NULL,
    value integer NOT NULL
);


ALTER TABLE public."RaceAttrMod" OWNER TO corso_its_db;

--
-- Name: Skill; Type: TABLE; Schema: public; Owner: corso_its_db
--

CREATE TABLE public."Skill" (
    id text NOT NULL,
    name character varying(20) NOT NULL,
    key character varying(20) NOT NULL,
    value integer DEFAULT 10
);


ALTER TABLE public."Skill" OWNER TO corso_its_db;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: corso_its_db
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO corso_its_db;

--
-- Data for Name: Attribute; Type: TABLE DATA; Schema: public; Owner: corso_its_db
--

COPY public."Attribute" (id, key, name, value) FROM stdin;
6fb357b0-fdce-4273-9473-4cbe4a725e2b	forza	Forza	20
dfed935b-5403-4974-8e46-f3df53a80ea4	resistenza	Resistenza	20
71b79ca1-8719-45e7-a3cb-b9e41424020b	destrezza	Destrezza	20
2e548b5e-d561-41c5-8ac4-5ea95bf14cb4	intelligenza	Intelligenza	20
34f9623d-3a05-4ea0-ba1b-48a72263ac55	volonta	Volontà	20
e8aa9a36-e799-45df-a54a-4b04e41c6002	personalita	Personalità	20
\.


--
-- Data for Name: Character; Type: TABLE DATA; Schema: public; Owner: corso_its_db
--

COPY public."Character" (id, name, history, age, health, stamina, mana, "idRace", "idClass") FROM stdin;
6ab48c13-df38-400d-9e1c-f36e855a5af8	Vaelion	Vaelion nacque in una città corrotta dal commercio clandestino e dalle gilde di assassini. Figlio di una nobildonna elfica e di un umano fuorilegge, crebbe tra gli intrighi di palazzo e le ombre delle strade. Fin da bambino dimostrò un talento innato per il furto e l'inganno, ma fu quando scoprì di poter intrecciare la magia con la sua abilità di combattente che divenne davvero pericoloso.	25	100	100	100	dd9f99a8-056a-4312-bc58-4b53f4152f2e	f2897055-79b6-452c-8b12-63910507f2df
\.


--
-- Data for Name: Class; Type: TABLE DATA; Schema: public; Owner: corso_its_db
--

COPY public."Class" (id, name, key, description) FROM stdin;
cab5476b-8ff2-47c8-a81e-da8ce8ccdeca	Arcere	arcere	
f2897055-79b6-452c-8b12-63910507f2df	Ladro	ladro	
6bf8caa9-0911-41ef-b877-fc7a2997cd58	Guerriero	guerriero	
19cdacdd-0e62-4e7d-851b-c56ad4670c7d	Stregone	stregone	
\.


--
-- Data for Name: ClassSkillMod; Type: TABLE DATA; Schema: public; Owner: corso_its_db
--

COPY public."ClassSkillMod" ("idSkill", "idClass", value) FROM stdin;
c5a61b01-870b-48dc-aef0-b361b424eac1	6bf8caa9-0911-41ef-b877-fc7a2997cd58	10
e442536e-b0bd-4f5c-8e98-777bc45fb8c3	6bf8caa9-0911-41ef-b877-fc7a2997cd58	10
a44e9f23-601f-4a12-a0a4-8cf85fe50168	6bf8caa9-0911-41ef-b877-fc7a2997cd58	-5
\.


--
-- Data for Name: Race; Type: TABLE DATA; Schema: public; Owner: corso_its_db
--

COPY public."Race" (id, key, name, "modHealth", "modStamina", "modMana") FROM stdin;
fd2803dc-e909-4ee4-bfdf-b0b9eec9688e	umano	Umano	0	0	0
dd9f99a8-056a-4312-bc58-4b53f4152f2e	elfo_oscuro	Elfo Oscuro	0	-20	20
b76203fb-691d-4895-b3fc-9b16e2daa6a2	nano	Nano	20	40	-20
\.


--
-- Data for Name: RaceAttrMod; Type: TABLE DATA; Schema: public; Owner: corso_its_db
--

COPY public."RaceAttrMod" ("idRace", "idAttribute", value) FROM stdin;
dd9f99a8-056a-4312-bc58-4b53f4152f2e	2e548b5e-d561-41c5-8ac4-5ea95bf14cb4	5
dd9f99a8-056a-4312-bc58-4b53f4152f2e	34f9623d-3a05-4ea0-ba1b-48a72263ac55	10
dd9f99a8-056a-4312-bc58-4b53f4152f2e	6fb357b0-fdce-4273-9473-4cbe4a725e2b	-5
\.


--
-- Data for Name: Skill; Type: TABLE DATA; Schema: public; Owner: corso_its_db
--

COPY public."Skill" (id, name, key, value) FROM stdin;
333864b1-84d6-4ef5-b0c0-ae70f25f4d19	Armi pesanti	armi_pesanti	10
f1e74ba6-faeb-4fcd-ac65-ba8599115e75	Armi leggere	armi_leggere	10
c5a61b01-870b-48dc-aef0-b361b424eac1	Corpo a corpo	corpo_a_corpo	10
e442536e-b0bd-4f5c-8e98-777bc45fb8c3	Armature pesanti	armature_pesanti	10
a44e9f23-601f-4a12-a0a4-8cf85fe50168	Furtività	furtivita	10
8a2b3f28-ef78-4153-a01b-927b4c13899d	Illusione	illusione	10
224e0efe-08db-4e56-bb85-4279dfb98624	Guarigione	guarigione	10
14c2c4a9-038b-4a0c-8377-ea0e48c8e50d	Carisma	carisma	10
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: corso_its_db
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
11a06312-c0ba-4273-8d61-834a3c1d190f	ce3bb43a320a5687eda26c1e32ee8d8b645cf4b8fc7d1b347d71fca7f009e6e0	2025-03-31 09:48:52.185944+00	20250331094852_latest	\N	\N	2025-03-31 09:48:52.163897+00	1
267c8eec-9e4a-4d6d-90d1-3384715b65c1	22f04dcbb1f9e6f834c849cbef88ffb8ef03bd605800bb465d16ef83e4cb9ad4	2025-03-31 10:22:58.315908+00	20250331102258_latest	\N	\N	2025-03-31 10:22:58.307833+00	1
0205ef75-d7b4-45a2-83cf-7198d369db83	005482ecf1848970ed9ab6ca597c1f27c298fce4da866bba3252fc5a7fef2751	2025-03-31 10:37:59.493197+00	20250331103759_latest	\N	\N	2025-03-31 10:37:59.477253+00	1
\.


--
-- Name: Attribute Attribute_pkey; Type: CONSTRAINT; Schema: public; Owner: corso_its_db
--

ALTER TABLE ONLY public."Attribute"
    ADD CONSTRAINT "Attribute_pkey" PRIMARY KEY (id);


--
-- Name: Character Character_pkey; Type: CONSTRAINT; Schema: public; Owner: corso_its_db
--

ALTER TABLE ONLY public."Character"
    ADD CONSTRAINT "Character_pkey" PRIMARY KEY (id);


--
-- Name: ClassSkillMod ClassSkillMod_pkey; Type: CONSTRAINT; Schema: public; Owner: corso_its_db
--

ALTER TABLE ONLY public."ClassSkillMod"
    ADD CONSTRAINT "ClassSkillMod_pkey" PRIMARY KEY ("idSkill", "idClass");


--
-- Name: Class Class_pkey; Type: CONSTRAINT; Schema: public; Owner: corso_its_db
--

ALTER TABLE ONLY public."Class"
    ADD CONSTRAINT "Class_pkey" PRIMARY KEY (id);


--
-- Name: RaceAttrMod RaceAttrMod_pkey; Type: CONSTRAINT; Schema: public; Owner: corso_its_db
--

ALTER TABLE ONLY public."RaceAttrMod"
    ADD CONSTRAINT "RaceAttrMod_pkey" PRIMARY KEY ("idRace", "idAttribute");


--
-- Name: Race Race_pkey; Type: CONSTRAINT; Schema: public; Owner: corso_its_db
--

ALTER TABLE ONLY public."Race"
    ADD CONSTRAINT "Race_pkey" PRIMARY KEY (id);


--
-- Name: Skill Skill_pkey; Type: CONSTRAINT; Schema: public; Owner: corso_its_db
--

ALTER TABLE ONLY public."Skill"
    ADD CONSTRAINT "Skill_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: corso_its_db
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Character Character_idClass_fkey; Type: FK CONSTRAINT; Schema: public; Owner: corso_its_db
--

ALTER TABLE ONLY public."Character"
    ADD CONSTRAINT "Character_idClass_fkey" FOREIGN KEY ("idClass") REFERENCES public."Class"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Character Character_idRace_fkey; Type: FK CONSTRAINT; Schema: public; Owner: corso_its_db
--

ALTER TABLE ONLY public."Character"
    ADD CONSTRAINT "Character_idRace_fkey" FOREIGN KEY ("idRace") REFERENCES public."Race"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ClassSkillMod ClassSkillMod_idClass_fkey; Type: FK CONSTRAINT; Schema: public; Owner: corso_its_db
--

ALTER TABLE ONLY public."ClassSkillMod"
    ADD CONSTRAINT "ClassSkillMod_idClass_fkey" FOREIGN KEY ("idClass") REFERENCES public."Class"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ClassSkillMod ClassSkillMod_idSkill_fkey; Type: FK CONSTRAINT; Schema: public; Owner: corso_its_db
--

ALTER TABLE ONLY public."ClassSkillMod"
    ADD CONSTRAINT "ClassSkillMod_idSkill_fkey" FOREIGN KEY ("idSkill") REFERENCES public."Skill"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: RaceAttrMod RaceAttrMod_idAttribute_fkey; Type: FK CONSTRAINT; Schema: public; Owner: corso_its_db
--

ALTER TABLE ONLY public."RaceAttrMod"
    ADD CONSTRAINT "RaceAttrMod_idAttribute_fkey" FOREIGN KEY ("idAttribute") REFERENCES public."Attribute"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: RaceAttrMod RaceAttrMod_idRace_fkey; Type: FK CONSTRAINT; Schema: public; Owner: corso_its_db
--

ALTER TABLE ONLY public."RaceAttrMod"
    ADD CONSTRAINT "RaceAttrMod_idRace_fkey" FOREIGN KEY ("idRace") REFERENCES public."Race"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

