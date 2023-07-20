--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7 (Homebrew)
-- Dumped by pg_dump version 14.7 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: citext; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;


--
-- Name: EXTENSION citext; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION citext IS 'data type for case-insensitive character strings';


--
-- Name: update_mri_count(); Type: FUNCTION; Schema: public; Owner: zimlim
--

CREATE FUNCTION public.update_mri_count() RETURNS trigger
    LANGUAGE plpgsql
    AS $$ BEGIN UPDATE participants SET mri_count = ( SELECT COUNT(*) FROM mri_dates WHERE mri_dates.framid = participants.framid ) WHERE participants.framid = mri_dates.framid; RETURN NEW; END; $$;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: brain_data; Type: TABLE; Schema: public; Owner: zimlim
--

CREATE TABLE public.brain_data (
    plus_framid integer NOT NULL,
    sex integer,
    age_core1 integer,
    race_code character varying,
    edu_core0 integer,
    edu_core17_1 integer,
    edu_core17_2 integer,
    edu_core2372 integer,
    age_death numeric,
    npwhiart integer,
    npwhimac integer,
    npwmr integer,
    nphipscl integer,
    npthal integer,
    npbraak integer,
    npneur integer,
    npadnc integer,
    npdiff integer,
    npamy integer,
    npold integer,
    npold1 integer,
    npold2 integer,
    npold3 integer,
    npold4 integer,
    npoldd integer,
    npoldd1 integer,
    npoldd2 integer,
    npoldd3 integer,
    npoldd4 integer,
    nparter integer,
    nplbod integer,
    nptdpa integer,
    nptdpb integer,
    nptdpc integer,
    nptdpd integer,
    nptdpe integer,
    nppick integer,
    npftdt2 integer,
    npcort integer,
    npprog integer,
    npftdt5 integer,
    npftdt6 integer,
    npftdt7 integer,
    npftdt7a integer,
    npftdt7b integer,
    npftdt7c integer,
    npftdt7d integer,
    npftdt8 integer,
    npftdt9 integer,
    npftdt10 integer,
    npalsmnd integer,
    npoftd integer,
    npoftd1 integer,
    npoftd2 integer,
    npoftd3 integer,
    npoftd4 integer,
    npoftd5 integer,
    npnit integer,
    demrv046 integer,
    demrv103 integer,
    hrx_ever integer,
    dmrx_ever integer,
    liprx_ever integer,
    smoking_ever integer,
    nppmih_hours integer,
    nppmih_minutes integer,
    nprin numeric,
    npfix integer,
    npfrotispre integer,
    npinf integer,
    npavas integer,
    npftdtau integer,
    pathmnd integer,
    pathad integer,
    relatauo integer
);

--
-- Name: brain_data_plus; Type: TABLE; Schema: public; Owner: zimlim
--

CREATE TABLE public.brain_data_plus (
    plus_framid integer NOT NULL,
    sex integer,
    age_core1 integer,
    race_code character varying,
    edu_core0 integer,
    edu_core17_1 integer,
    edu_core17_2 integer,
    edu_core2372 integer,
    age_death numeric,
    npwhiart integer,
    npwhimac integer,
    npwmr integer,
    nphipscl integer,
    npthal integer,
    npbraak integer,
    npneur integer,
    npadnc integer,
    npdiff integer,
    npamy integer,
    npold integer,
    npold1 integer,
    npold2 integer,
    npold3 integer,
    npold4 integer,
    npoldd integer,
    npoldd1 integer,
    npoldd2 integer,
    npoldd3 integer,
    npoldd4 integer,
    nparter integer,
    nplbod integer,
    nptdpa integer,
    nptdpb integer,
    nptdpc integer,
    nptdpd integer,
    nptdpe integer,
    nppick integer,
    npftdt2 integer,
    npcort integer,
    npprog integer,
    npftdt5 integer,
    npftdt6 integer,
    npftdt7 integer,
    npftdt7a integer,
    npftdt7b integer,
    npftdt7c integer,
    npftdt7d integer,
    npftdt8 integer,
    npftdt9 integer,
    npftdt10 integer,
    npalsmnd integer,
    npoftd integer,
    npoftd1 integer,
    npoftd2 integer,
    npoftd3 integer,
    npoftd4 integer,
    npoftd5 integer,
    npnit integer,
    demrv046 integer,
    demrv103 integer,
    hrx_ever integer,
    dmrx_ever integer,
    liprx_ever integer,
    smoking_ever integer
);

--
-- Name: brain_data_plus_framid_seq; Type: SEQUENCE; Schema: public; Owner: zimlim
--

CREATE SEQUENCE public.brain_data_plus_framid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: brain_data_plus_framid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zimlim
--

ALTER SEQUENCE public.brain_data_plus_framid_seq OWNED BY public.brain_data_plus.plus_framid;


--
-- Name: core_sequence; Type: TABLE; Schema: public; Owner: zimlim
--

CREATE TABLE public.core_sequence (
    framid integer NOT NULL,
    core_num integer NOT NULL,
    total_tests integer,
    age integer,
    date date,
    height numeric,
    weight integer,
    bmi numeric,
    sbp numeric,
    dbp numeric,
    vent_rt integer,
    smoking integer,
    cpd integer,
    bg integer,
    tc integer,
    triglycerides integer,
    calc_ldl integer,
    hdl integer,
    hrx integer,
    liprx integer,
    dmrx integer,
    hip numeric,
    waist numeric,
    creatinine numeric,
    fasting_bg integer,
    albumin numeric,
    ast integer,
    alt_indicator integer,
    hemoglobin numeric,
    wbc numeric,
    aspirin_cc integer,
    nsaids_cc integer,
    depressrx integer,
    crp numeric,
    fibrinoger integer,
    hba1c numeric,
    icam1 numeric,
    mcp1 numeric,
    interleukin6 numeric,
    interleukin18 numeric,
    amyloid40 numeric,
    amyloid40_indicator integer,
    amyloid42 numeric,
    myeloperozidase numeric,
    cd40 numeric,
    cogscr integer
);

--
-- Name: core_tests; Type: TABLE; Schema: public; Owner: zimlim
--

CREATE TABLE public.core_tests (
    framid integer NOT NULL,
    core_num integer NOT NULL,
    total_tests integer,
    type character varying NOT NULL,
    age integer,
    date date,
    height numeric,
    weight integer,
    bmi numeric,
    sbp numeric,
    dbp numeric,
    vent_rt integer,
    smoking integer,
    cpd integer,
    bg integer,
    tc integer,
    triglycerides integer,
    calc_ldl integer,
    hdl integer,
    hrx integer,
    liprx integer,
    dmrx integer,
    hip numeric,
    waist numeric,
    creatinine numeric,
    fasting_bg integer,
    albumin numeric,
    ast integer,
    alt_indicator integer,
    hemoglobin numeric,
    wbc numeric,
    aspirin_cc integer,
    nsaids_cc integer,
    depressrx integer,
    crp numeric,
    fibrinoger integer,
    hba1c numeric,
    icam1 numeric,
    mcp1 numeric,
    interleukin6 numeric,
    interleukin18 numeric,
    amyloid40 numeric,
    amyloid40_indicator integer,
    amyloid42 numeric,
    myeloperozidase numeric,
    cd40 numeric,
    cogscr integer
);

--
-- Name: dcdt_dates; Type: TABLE; Schema: public; Owner: zimlim
--

CREATE TABLE public.dcdt_dates (
    framid integer NOT NULL,
    dcdt_date date NOT NULL,
    num_dcdt integer,
    sex integer
);

--
-- Name: derived_dcdt_dates; Type: TABLE; Schema: public; Owner: zimlim
--

CREATE TABLE public.derived_dcdt_dates (
    framid integer NOT NULL,
    derived_dcdt_date date NOT NULL,
    num_derived_dcdt integer,
    sex integer
);

--
-- Name: dvoice_dates; Type: TABLE; Schema: public; Owner: zimlim
--

CREATE TABLE public.dvoice_dates (
    framid integer NOT NULL,
    dvoice_date date NOT NULL,
    num_dvoice integer,
    sex integer
);

--
-- Name: mri_dates; Type: TABLE; Schema: public; Owner: zimlim
--

CREATE TABLE public.mri_dates (
    framid integer NOT NULL,
    mri_date date NOT NULL,
    num_mri integer,
    sex integer
);

--
-- Name: participants; Type: TABLE; Schema: public; Owner: zimlim
--

CREATE TABLE public.participants (
    framid integer NOT NULL,
    cohort integer,
    id integer,
    gender integer,
    race character varying,
    edu_core2 integer,
    edu_core8 integer,
    mri_count integer,
    dvoice_count integer
);

--
-- Name: participants_framid_seq; Type: SEQUENCE; Schema: public; Owner: zimlim
--

CREATE SEQUENCE public.participants_framid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- Name: participants_framid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zimlim
--

ALTER SEQUENCE public.participants_framid_seq OWNED BY public.participants.framid;


--
-- Name: survival; Type: TABLE; Schema: public; Owner: zimlim
--

CREATE TABLE public.survival (
    idtype integer NOT NULL,
    framid integer NOT NULL,
    date_of_death date,
    age_at_death integer
);

--
-- Name: brain_data_plus plus_framid; Type: DEFAULT; Schema: public; Owner: zimlim
--

ALTER TABLE ONLY public.brain_data_plus ALTER COLUMN plus_framid SET DEFAULT nextval('public.brain_data_plus_framid_seq'::regclass);


--
-- Name: participants framid; Type: DEFAULT; Schema: public; Owner: zimlim
--

ALTER TABLE ONLY public.participants ALTER COLUMN framid SET DEFAULT nextval('public.participants_framid_seq'::regclass);


--
-- Data for Name: brain_data; Type: TABLE DATA; Schema: public; Owner: zimlim
--

COPY public.brain_data (plus_framid, sex, age_core1, race_code, edu_core0, edu_core17_1, edu_core17_2, edu_core2372, age_death, npwhiart, npwhimac, npwmr, nphipscl, npthal, npbraak, npneur, npadnc, npdiff, npamy, npold, npold1, npold2, npold3, npold4, npoldd, npoldd1, npoldd2, npoldd3, npoldd4, nparter, nplbod, nptdpa, nptdpb, nptdpc, nptdpd, nptdpe, nppick, npftdt2, npcort, npprog, npftdt5, npftdt6, npftdt7, npftdt7a, npftdt7b, npftdt7c, npftdt7d, npftdt8, npftdt9, npftdt10, npalsmnd, npoftd, npoftd1, npoftd2, npoftd3, npoftd4, npoftd5, npnit, demrv046, demrv103, hrx_ever, dmrx_ever, liprx_ever, smoking_ever, nppmih_hours, nppmih_minutes, nprin, npfix, npfrotispre, npinf, npavas, npftdtau, pathmnd, pathad, relatauo) FROM stdin;
0	2	37	EW	7	\N	\N	\N	86.363449692	2	\N	1	\N	\N	3	1	\N	3	1	0	0	0	0	0	0	0	0	0	0	2	8	\N	\N	\N	\N	\N	0	\N	0	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	3	0	0	6	0	0	9	12	28	\N	1	3	0	2	0	\N	0	\N
1	1	34	EW	8	\N	\N	\N	97.381245722	3	\N	1	0	\N	4	1	\N	3	3	1	2	0	1	0	0	0	0	0	0	3	0	\N	\N	\N	\N	\N	0	\N	0	0	\N	\N	0	0	0	0	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	3	0	9	8	0	4	5	3	6	\N	\N	1	1	2	0	\N	1	\N
2	1	43	EW	7	\N	\N	\N	91.821355236	2	\N	0	\N	\N	3	1	\N	2	3	1	3	2	0	0	0	0	0	0	0	2	0	\N	\N	\N	\N	\N	0	\N	0	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2	0	0	4	0	0	12	3	0	\N	1	1	1	0	1	\N	0	\N
3	2	40	EW	10	\N	\N	\N	93.127994524	2	\N	0	0	\N	5	1	\N	3	1	1	0	1	0	0	0	0	0	0	0	2	0	\N	\N	\N	\N	\N	0	\N	0	0	\N	\N	0	0	0	0	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	1	1	1	6	0	0	14	29	3	\N	1	3	0	0	0	\N	0	\N
4	1	42	EW	5	\N	\N	\N	93.222450376	3	\N	1	0	\N	2	2	\N	3	1	1	2	0	0	0	0	0	0	0	0	3	0	\N	\N	\N	\N	\N	0	\N	0	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	3	0	9	11	0	0	0	4	0	\N	1	3	1	3	0	\N	0	\N
5	2	37	EW	7	\N	\N	\N	88.247091034	1	\N	0	0	\N	2	1	\N	1	1	1	1	0	0	0	0	0	0	0	0	1	0	\N	\N	\N	\N	\N	0	\N	0	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	3	0	9	0	0	0	7	5	12	\N	1	3	1	3	0	\N	1	\N
6	2	29	EW	10	\N	\N	\N	82.221081451	0	\N	0	0	\N	2	2	\N	2	1	0	0	0	0	0	0	0	0	0	0	0	0	\N	\N	\N	\N	\N	0	\N	0	0	\N	\N	0	0	0	0	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	3	0	0	0	0	0	15	3	0	\N	1	2	0	0	0	\N	1	\N
7	1	33	EW	8	\N	\N	\N	94.921971253	2	\N	2	0	\N	1	2	\N	2	2	1	1	0	2	0	0	0	0	0	0	2	1	\N	\N	\N	\N	\N	0	\N	0	0	\N	\N	0	0	0	0	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	3	0	0	6	0	3	0	\N	\N	\N	\N	2	0	3	0	\N	0	\N
8	1	36	EW	6	\N	\N	\N	88.265571526	3	\N	1	0	\N	4	1	\N	3	2	0	0	0	0	0	0	0	0	0	0	3	0	\N	\N	\N	\N	\N	0	\N	0	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	3	1	1	9	0	0	0	\N	\N	\N	1	1	0	2	3	\N	0	\N
9	2	36	EW	\N	\N	\N	\N	91.273785079	2	\N	0	3	\N	1	0	\N	0	1	1	1	3	1	0	1	0	2	0	0	2	0	\N	\N	\N	\N	\N	0	\N	0	0	\N	\N	0	0	0	0	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	4	1	1	5	0	1	8	\N	\N	\N	1	1	0	0	1	\N	0	\N
10	2	45	EW	8	\N	\N	\N	94.026694045	2	\N	0	3	\N	6	1	\N	3	3	0	0	0	0	0	0	0	0	0	0	2	0	\N	\N	\N	\N	\N	0	\N	0	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	1	1	1	2	0	0	0	4	0	\N	1	3	0	1	0	\N	1	\N
\.


--
-- Data for Name: brain_data_plus; Type: TABLE DATA; Schema: public; Owner: zimlim
--

COPY public.brain_data_plus (plus_framid, sex, age_core1, race_code, edu_core0, edu_core17_1, edu_core17_2, edu_core2372, age_death, npwhiart, npwhimac, npwmr, nphipscl, npthal, npbraak, npneur, npadnc, npdiff, npamy, npold, npold1, npold2, npold3, npold4, npoldd, npoldd1, npoldd2, npoldd3, npoldd4, nparter, nplbod, nptdpa, nptdpb, nptdpc, nptdpd, nptdpe, nppick, npftdt2, npcort, npprog, npftdt5, npftdt6, npftdt7, npftdt7a, npftdt7b, npftdt7c, npftdt7d, npftdt8, npftdt9, npftdt10, npalsmnd, npoftd, npoftd1, npoftd2, npoftd3, npoftd4, npoftd5, npnit, demrv046, demrv103, hrx_ever, dmrx_ever, liprx_ever, smoking_ever) FROM stdin;
0	2	37	EW	7	\N	\N	\N	86.363449692	2	\N	1	\N	\N	3	1	\N	3	1	0	0	0	0	0	0	0	0	0	0	2	8	\N	\N	\N	\N	\N	0	\N	0	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	3	0	0	6	0	0	9
1	1	34	EW	8	\N	\N	\N	97.381245722	3	\N	1	0	\N	4	1	\N	3	3	1	2	0	1	0	0	0	0	0	0	3	0	\N	\N	\N	\N	\N	0	\N	0	0	\N	\N	0	0	0	0	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	3	0	9	8	0	4	5
2	1	43	EW	7	\N	\N	\N	91.821355236	2	\N	0	\N	\N	3	1	\N	2	3	1	3	2	0	0	0	0	0	0	0	2	0	\N	\N	\N	\N	\N	0	\N	0	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2	0	0	4	0	0	12
3	2	40	EW	10	\N	\N	\N	93.127994524	2	\N	0	0	\N	5	1	\N	3	1	1	0	1	0	0	0	0	0	0	0	2	0	\N	\N	\N	\N	\N	0	\N	0	0	\N	\N	0	0	0	0	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	1	1	1	6	0	0	14
4	1	42	EW	5	\N	\N	\N	93.222450376	3	\N	1	0	\N	2	2	\N	3	1	1	2	0	0	0	0	0	0	0	0	3	0	\N	\N	\N	\N	\N	0	\N	0	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	3	0	9	11	0	0	0
5	2	37	EW	7	\N	\N	\N	88.247091034	1	\N	0	0	\N	2	1	\N	1	1	1	1	0	0	0	0	0	0	0	0	1	0	\N	\N	\N	\N	\N	0	\N	0	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	3	0	9	0	0	0	7
6	2	29	EW	10	\N	\N	\N	82.221081451	0	\N	0	0	\N	2	2	\N	2	1	0	0	0	0	0	0	0	0	0	0	0	0	\N	\N	\N	\N	\N	0	\N	0	0	\N	\N	0	0	0	0	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	3	0	0	0	0	0	15
7	1	33	EW	8	\N	\N	\N	94.921971253	2	\N	2	0	\N	1	2	\N	2	2	1	1	0	2	0	0	0	0	0	0	2	1	\N	\N	\N	\N	\N	0	\N	0	0	\N	\N	0	0	0	0	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	3	0	0	6	0	3	0
8	1	36	EW	6	\N	\N	\N	88.265571526	3	\N	1	0	\N	4	1	\N	3	2	0	0	0	0	0	0	0	0	0	0	3	0	\N	\N	\N	\N	\N	0	\N	0	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	3	1	1	9	0	0	0
9	2	36	EW	\N	\N	\N	\N	91.273785079	2	\N	0	3	\N	1	0	\N	0	1	1	1	3	1	0	1	0	2	0	0	2	0	\N	\N	\N	\N	\N	0	\N	0	0	\N	\N	0	0	0	0	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	4	1	1	5	0	1	8
10	2	45	EW	8	\N	\N	\N	94.026694045	2	\N	0	3	\N	6	1	\N	3	3	0	0	0	0	0	0	0	0	0	0	2	0	\N	\N	\N	\N	\N	0	\N	0	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	1	1	1	2	0	0	0
\.


--
-- Data for Name: core_sequence; Type: TABLE DATA; Schema: public; Owner: zimlim
--

COPY public.core_sequence (framid, core_num, total_tests, age, date, height, weight, bmi, sbp, dbp, vent_rt, smoking, cpd, bg, tc, triglycerides, calc_ldl, hdl, hrx, liprx, dmrx, hip, waist, creatinine, fasting_bg, albumin, ast, alt_indicator, hemoglobin, wbc, aspirin_cc, nsaids_cc, depressrx, crp, fibrinoger, hba1c, icam1, mcp1, interleukin6, interleukin18, amyloid40, amyloid40_indicator, amyloid42, myeloperozidase, cd40, cogscr) FROM stdin;
\.


--
-- Data for Name: core_tests; Type: TABLE DATA; Schema: public; Owner: zimlim
--

COPY public.core_tests (framid, core_num, total_tests, type, age, date, height, weight, bmi, sbp, dbp, vent_rt, smoking, cpd, bg, tc, triglycerides, calc_ldl, hdl, hrx, liprx, dmrx, hip, waist, creatinine, fasting_bg, albumin, ast, alt_indicator, hemoglobin, wbc, aspirin_cc, nsaids_cc, depressrx, crp, fibrinoger, hba1c, icam1, mcp1, interleukin6, interleukin18, amyloid40, amyloid40_indicator, amyloid42, myeloperozidase, cd40, cogscr) FROM stdin;
\.


--
-- Data for Name: dcdt_dates; Type: TABLE DATA; Schema: public; Owner: zimlim
--

COPY public.dcdt_dates (framid, dcdt_date, num_dcdt, sex) FROM stdin;
0	2012-08-02	2	1
0	2018-12-03	2	1
6	2012-03-28	1	1
8	2011-10-11	1	1
10	2014-05-13	1	2
3	2016-11-28	1	2
10	2018-08-27	1	1
\.


--
-- Data for Name: derived_dcdt_dates; Type: TABLE DATA; Schema: public; Owner: zimlim
--

COPY public.derived_dcdt_dates (framid, derived_dcdt_date, num_derived_dcdt, sex) FROM stdin;
0	2012-08-02	2	1
0	2018-12-03	2	1
6	2012-03-28	1	1
8	2011-10-11	1	1
10	2014-05-13	1	2
3	2016-11-28	1	2
10	2018-08-27	1	1
\.


--
-- Data for Name: dvoice_dates; Type: TABLE DATA; Schema: public; Owner: zimlim
--

COPY public.dvoice_dates (framid, dvoice_date, num_dvoice, sex) FROM stdin;
1	2006-11-08	3	1
1	2010-01-15	3	1
1	2011-07-29	3	1
7	2005-09-27	3	1
7	2006-10-03	3	1
7	2009-04-24	3	1
0	2006-08-11	4	1
0	2008-12-03	4	1
0	2012-08-02	4	1
0	2018-12-03	4	1
6	2012-03-28	1	1
8	2006-02-23	3	1
8	2011-10-11	3	1
8	2019-03-28	3	1
10	2008-09-12	2	2
10	2014-05-13	2	2
3	2009-09-25	2	2
3	2016-11-28	2	2
9	2010-07-30	1	2
10	2012-06-29	2	1
10	2018-08-27	2	1
\.


--
-- Data for Name: mri_dates; Type: TABLE DATA; Schema: public; Owner: zimlim
--

COPY public.mri_dates (framid, mri_date, num_mri, sex) FROM stdin;
1	2000-04-08	7	1
1	2001-09-25	7	1
1	2002-12-10	7	1
1	2004-01-27	7	1
1	2005-05-03	7	1
1	2006-11-08	7	1
1	2008-09-15	7	1
6	2000-06-25	1	2
7	2000-04-19	2	1
7	2003-06-26	2	1
0	1999-08-17	3	1
0	2006-08-11	3	1
0	2012-08-02	3	1
4	1999-08-12	1	1
6	2000-03-20	5	1
6	2002-05-20	5	1
6	2004-11-16	5	1
6	2007-02-09	5	1
6	2012-03-28	5	1
8	1999-06-04	3	1
8	2006-02-23	3	1
8	2011-10-11	3	1
10	2008-09-12	1	2
3	2009-09-25	2	2
3	2016-11-28	2	2
9	2010-07-30	1	2
10	2012-06-29	1	1
\.


--
-- Data for Name: participants; Type: TABLE DATA; Schema: public; Owner: zimlim
--

COPY public.participants (framid, cohort, id, gender, race, edu_core2, edu_core8, mri_count, dvoice_count) FROM stdin;
0	0	31	2	EW	16	7	3	4
1	0	127	1	EW	20	8	7	3
2	0	128	1	EW	16	7	0	0
3	0	167	2	EW	13	5	2	2
4	0	253	1	EW	12	3	1	0
5	0	266	2	EW	16	7	0	0
6	0	317	2	EW	13	5	6	1
7	0	345	1	EW	20	8	2	3
8	0	428	1	EW	13	4	3	3
9	0	488	2	EW	\N	\N	1	1
10	0	533	2	EW	20	8	2	4
\.


--
-- Data for Name: survival; Type: TABLE DATA; Schema: public; Owner: zimlim
--

COPY public.survival (idtype, framid, date_of_death, age_at_death) FROM stdin;
0	0	1998-02-14	82
0	1	2012-03-12	91
0	2	1997-08-25	92
0	3	2001-12-02	91
0	4	2000-02-12	93
0	5	2000-02-21	88
0	6	2002-02-11	81
0	7	2010-11-06	95
0	8	2001-03-21	80
0	9	2005-04-13	92
0	10	1996-01-10	90
\.


--
-- Name: brain_data_plus_framid_seq; Type: SEQUENCE SET; Schema: public; Owner: zimlim
--

SELECT pg_catalog.setval('public.brain_data_plus_framid_seq', 1, false);


--
-- Name: participants_framid_seq; Type: SEQUENCE SET; Schema: public; Owner: zimlim
--

SELECT pg_catalog.setval('public.participants_framid_seq', 1, false);


--
-- Name: brain_data brain_data_pkey; Type: CONSTRAINT; Schema: public; Owner: zimlim
--

ALTER TABLE ONLY public.brain_data
    ADD CONSTRAINT brain_data_pkey PRIMARY KEY (plus_framid);


--
-- Name: brain_data_plus brain_data_plus_pkey; Type: CONSTRAINT; Schema: public; Owner: zimlim
--

ALTER TABLE ONLY public.brain_data_plus
    ADD CONSTRAINT brain_data_plus_pkey PRIMARY KEY (plus_framid);


--
-- Name: core_sequence core_sequence_pkey; Type: CONSTRAINT; Schema: public; Owner: zimlim
--

ALTER TABLE ONLY public.core_sequence
    ADD CONSTRAINT core_sequence_pkey PRIMARY KEY (framid, core_num);


--
-- Name: core_tests core_tests_pkey; Type: CONSTRAINT; Schema: public; Owner: zimlim
--

ALTER TABLE ONLY public.core_tests
    ADD CONSTRAINT core_tests_pkey PRIMARY KEY (framid, core_num, type);


--
-- Name: dcdt_dates dcdt_dates_pkey; Type: CONSTRAINT; Schema: public; Owner: zimlim
--

ALTER TABLE ONLY public.dcdt_dates
    ADD CONSTRAINT dcdt_dates_pkey PRIMARY KEY (framid, dcdt_date);


--
-- Name: derived_dcdt_dates derived_dcdt_dates_pkey; Type: CONSTRAINT; Schema: public; Owner: zimlim
--

ALTER TABLE ONLY public.derived_dcdt_dates
    ADD CONSTRAINT derived_dcdt_dates_pkey PRIMARY KEY (framid, derived_dcdt_date);


--
-- Name: dvoice_dates dvoice_dates_pkey; Type: CONSTRAINT; Schema: public; Owner: zimlim
--

ALTER TABLE ONLY public.dvoice_dates
    ADD CONSTRAINT dvoice_dates_pkey PRIMARY KEY (framid, dvoice_date);


--
-- Name: mri_dates mri_dates_pkey; Type: CONSTRAINT; Schema: public; Owner: zimlim
--

ALTER TABLE ONLY public.mri_dates
    ADD CONSTRAINT mri_dates_pkey PRIMARY KEY (framid, mri_date);


--
-- Name: participants participants_pkey; Type: CONSTRAINT; Schema: public; Owner: zimlim
--

ALTER TABLE ONLY public.participants
    ADD CONSTRAINT participants_pkey PRIMARY KEY (framid);


--
-- Name: survival survival_pkey; Type: CONSTRAINT; Schema: public; Owner: zimlim
--

ALTER TABLE ONLY public.survival
    ADD CONSTRAINT survival_pkey PRIMARY KEY (idtype, framid);


--
-- Name: mri_dates update_mri_count_trigger; Type: TRIGGER; Schema: public; Owner: zimlim
--

CREATE TRIGGER update_mri_count_trigger AFTER INSERT ON public.mri_dates FOR EACH ROW EXECUTE FUNCTION public.update_mri_count();


--
-- Name: core_tests core_tests_framid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zimlim
--

ALTER TABLE ONLY public.core_tests
    ADD CONSTRAINT core_tests_framid_fkey FOREIGN KEY (framid) REFERENCES public.participants(framid);


--
-- PostgreSQL database dump complete
--

