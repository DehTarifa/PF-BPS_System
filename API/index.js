/* -----------------------------------------------------------

NOME DA TABELA PRINCIPAL: CLIENTES

COLUNAS DA TABELA:

    fk_classificacao
    nome_cliente
    cpf_cliente
    telefone_cliente
    cidade_cliente

----------------------------------------------------------- */


// IMPORTAÇÃO DE BIBLIOTECAS ---------------------------------

require('dotenv').config()
var cors = require('cors')


const express = require('express');
const { Pool } = require('pg')
const server = express();

server.use(cors({
    origin:'*'
}))
server.use(express.json());

// GET:ID QUE RETORNA UM CLIENTE PELO SEU ID -----------------

server.get('/cliente/:id', async (req, res) => {

    const { id } = req.params

    const pool1 = new Pool()
    const clientes = await pool1.query(
        `select * from clientes where id=$1`,
        [id]
    )

    await pool1.end()

    const [cliente] = clientes.rows

    return res.json({
        cliente
    })
    
});

// GET:ALL QUE RETORNA TODOS OS CLIENTES DA TABELA ----------

server.get('/cliente', async (req, res) => {

    try {
        const pool1 = new Pool()
        const clientes = await pool1.query(
            `SELECT a.id, fk_classificacao, b.name as classificacao, a.status, nome_cliente, cpf_cliente, telefone_cliente, cidade_cliente
            FROM public.clientes as a
            INNER JOIN classificacao as b ON a.fk_classificacao = b.id 
            order by id`
        )
        await pool1.end()

        const list = clientes.rows

        return res.json({
            clientes: list
        })
    } catch (error) {
        console.log(error)
        res.status(400).send()
    }
});

// POST: QUE ADICIONA UM CLIENTE A TABELA -------------------

server.post('/cliente', async (req, res) => {
    try {
        const {
            fk_classificacao,
            nome_cliente,
            cpf_cliente,
            telefone_cliente,
            cidade_cliente } = req.body;

        const pool1 = new Pool()
        
        await pool1.query(
            `INSERT INTO clientes(fk_classificacao, nome_cliente, cpf_cliente, telefone_cliente, cidade_cliente)
                VALUES ($1, $2, $3, $4, $5)`,

            [fk_classificacao,
                nome_cliente,
                cpf_cliente,
                telefone_cliente,
                cidade_cliente]
        )

        await pool1.end()

        return res.send()

    } catch (error) {
        console.log(error)
        res.status(400).send()
    }
});

// PUT: ATUALIZA UM CLIENTE --------------------------------

server.put('/cliente/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            fk_classificacao,
            nome_cliente,
            cpf_cliente,
            telefone_cliente,
            cidade_cliente,
            status } = req.body;

        const pool1 = new Pool()
        const result = await pool1.query(
            `UPDATE clientes SET fk_classificacao=$1, status=$2, nome_cliente=$3, cpf_cliente=$4, telefone_cliente=$5, cidade_cliente=$6
              WHERE id=$7;`,

            [fk_classificacao,
                status,
                nome_cliente,
                cpf_cliente,
                telefone_cliente,
                cidade_cliente,
                id]
        )
        await pool1.end()

        if (result.rowCount > 0) {
            return res.send()
        }
        return res.status(400).json({ message: 'Id de cliente não existe' })

    } catch (error) {
        console.log(error)
        res.status(400).send()
    }
});

// DELET: EXCLUI UM CLIENTE COM BASE NO ID ----------------

server.delete('/cliente/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const pool1 = new Pool()
        const result = await pool1.query(
            `DELETE FROM clientes WHERE id=$1;`,
            [id]
        )
        await pool1.end()

        if (result.rowCount > 0) {
            return res.send()
        }
        return res.status(400).json({ message: 'Id de cliente não existe' })

    } catch (error) {
        console.log(error)
        res.status(400).send()
    }
})








// TABELA DE CLASSIFICAÇÃO -------------------------------

server.get('/routClassicacao/:id', async (req, res) => {

    const { id } = req.params

    const pool1 = new Pool()
    const classificacao = await pool1.query(
        `select * from classificacao where id=$1`,
        [id]
    )

    await pool1.end()

    const [routClassicacao] = classificacao.rows

    return res.json({
        routClassicacao
    })
    
});

server.get('/routClassicacao', async (req, res) => {

    try {
        const pool1 = new Pool()
        const classificacao = await pool1.query(
            `select * from classificacao order by id`
        )
        await pool1.end()

        const list = classificacao.rows

        return res.json({
            classificacao: list
        })
    } catch (error) {
        console.log(error)
        res.status(400).send()
    }
});

server.post('/routClassicacao', async (req, res) => {
    try {
        const {
            name,
            status} = req.body;

        const pool1 = new Pool()
        
        await pool1.query(
            `INSERT INTO classificacao(name, status)
                VALUES ($1, $2)`,

            [name, status]
        )

        await pool1.end()

        return res.send()

    } catch (error) {
        console.log(error)
        res.status(400).send()
    }
});

server.put('/routClassicacao/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            status} = req.body;

        const pool1 = new Pool()
        const result = await pool1.query(
            `UPDATE classificacao SET name=$1, status=$2
              WHERE id=$3;`,

              [name, status, id]
        )

        await pool1.end()

        if (result.rowCount > 0) {
            return res.send()
        }
        return res.status(400).json({ message: 'Id de cliente não existe' })

    } catch (error) {
        console.log(error)
        res.status(400).send()
    }
});

server.delete('/routClassicacao/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const pool1 = new Pool()
        const result = await pool1.query(
            `DELETE FROM classificacao WHERE id=$1;`,
            [id]
        )
        await pool1.end()

        if (result.rowCount > 0) {
            return res.send()
        }
        return res.status(400).json({ message: 'Id de cliente não existe' })

    } catch (error) {
        console.log(error)
        res.status(400).send()
    }
})

// LIGANDO O SERVIDOR NODE

server.listen(3000, () => {
    console.log('Sever is running for 3000 port')
});