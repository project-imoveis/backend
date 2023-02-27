-- Table: public.corretor

-- DROP TABLE IF EXISTS public.corretor;

CREATE TABLE IF NOT EXISTS public."Corretores"
(
    id integer NOT NULL DEFAULT nextval('"Corretores_id_seq"'::regclass),
    name character varying(255) COLLATE pg_catalog."default",
    password character varying(255) COLLATE pg_catalog."default",
    email character varying(255) COLLATE pg_catalog."default",
    creci character varying(255) COLLATE pg_catalog."default",
    tel character varying(255) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Corretores_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.corretor
    OWNER to postgres;
	
-- Table: public.imovel

-- DROP TABLE IF EXISTS public.imovel;

CREATE TABLE IF NOT EXISTS public."Imoveis"
(
    id integer NOT NULL DEFAULT nextval('"Imoveis_id_seq"'::regclass),
    titulo character varying(255) COLLATE pg_catalog."default" NOT NULL,
    descricao character varying(255) COLLATE pg_catalog."default",
    valor integer NOT NULL,
    iptu integer,
    area_util integer NOT NULL,
    area_total integer,
    tipo_de_anuncio character varying(255) COLLATE pg_catalog."default",
    tipo_de_uso character varying(255) COLLATE pg_catalog."default",
    id_corretor integer NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Imoveis_pkey" PRIMARY KEY (id),
    CONSTRAINT "Imoveis_id_corretor_fkey" FOREIGN KEY (id_corretor)
        REFERENCES public."Corretores" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.imovel
    OWNER to postgres;

npx sequelize-cli model:generate --name Imoveis --attributes titulo:string,descricao:string,valor:integer,iptu:integer,area_util:integer,area_total:integer,tipo_de_anuncio:string,tipo_de_uso:string,id_corretor:integer