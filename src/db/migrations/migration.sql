-- Table: public.corretor

-- DROP TABLE IF EXISTS public.corretor;

CREATE TABLE IF NOT EXISTS public.corretor
(
    id integer NOT NULL DEFAULT nextval('corretor_id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(1000) COLLATE pg_catalog."default" NOT NULL,
    creci character varying(20) COLLATE pg_catalog."default",
    email character varying(30) COLLATE pg_catalog."default",
    tel character(11) COLLATE pg_catalog."default",
    CONSTRAINT corretor_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.corretor
    OWNER to postgres;
	
-- Table: public.imovel

-- DROP TABLE IF EXISTS public.imovel;

CREATE TABLE IF NOT EXISTS public.imovel
(
    id integer NOT NULL DEFAULT nextval('imovel_id_seq'::regclass),
    titulo character varying(200) COLLATE pg_catalog."default" NOT NULL,
    descricao text COLLATE pg_catalog."default",
    valor integer NOT NULL,
    iptu integer,
    area_util integer NOT NULL,
    area_total integer,
    tipo_de_anuncio character varying(30) COLLATE pg_catalog."default",
    tipo_de_uso character varying(30) COLLATE pg_catalog."default",
    id_corretor integer NOT NULL,
    CONSTRAINT imovel_pkey PRIMARY KEY (id),
    CONSTRAINT imovel_id_corretor_fkey FOREIGN KEY (id_corretor)
        REFERENCES public.corretor (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.imovel
    OWNER to postgres;