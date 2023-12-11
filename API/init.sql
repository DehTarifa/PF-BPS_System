CREATE TABLE IF NOT EXISTS classificacao
(
    id serial primary key,
    nome_cliente character varying(100),
	status boolean default true
);

CREATE TABLE IF NOT EXISTS clientes
(
    id serial primary key,
	fk_classificacao integer not null,
	status boolean default true,
    nome_cliente character varying(100),
    cpf_cliente character varying(100),
    telefone_cliente character varying(15),
    cidade_cliente character varying(100),
    CONSTRAINT clientes_fk_classificacao FOREIGN KEY (fk_classificacao)
        REFERENCES classificacao (id)
);