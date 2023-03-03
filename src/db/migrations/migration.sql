-- Table: public.corretor

-- DROP TABLE IF EXISTS public.corretor;

CREATE TABLE IF NOT EXISTS public."Corretores"
(
    id integer NOT NULL DEFAULT nextval('"Corretores_id_seq"'::regclass),
    name character varying(255) COLLATE pg_catalog."default",
    password character varying(255) COLLATE pg_catalog."default",
    email character varying(255) COLLATE pg_catalog."default",
    creci character varying(255) COLLATE pg_catalog."default",
    telefone character varying(255) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Corretores_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.corretor
    OWNER to postgres;
	
-- Table: public.property

-- DROP TABLE IF EXISTS public.property;

CREATE TABLE IF NOT EXISTS public."Properties"
(
    id integer NOT NULL DEFAULT nextval('"Properties_id_seq"'::regclass),
    title character varying(255) COLLATE pg_catalog."default" NOT NULL,
    description character varying(255) COLLATE pg_catalog."default",
    value integer NOT NULL,
    iptu integer,
    useful_area integer NOT NULL,
    total_area integer,
    post_type character varying(255) COLLATE pg_catalog."default",
    usage_type character varying(255) COLLATE pg_catalog."default",
    id_corretor integer NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Properties_pkey" PRIMARY KEY (id),
    CONSTRAINT "Properties_id_corretor_fkey" FOREIGN KEY (id_corretor)
        REFERENCES public."Corretores" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.property
    OWNER to postgres;

npx sequelize-cli model:generate --name Properties --attributes title:string,description:string,value:integer,iptu:integer,useful_area:integer,total_area:integer,post_type:string,usage_type:string,id_corretor:integer