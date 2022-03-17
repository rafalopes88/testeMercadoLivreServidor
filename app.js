const express = require('express');
const HttpStatus = require('http-status')
const cors = require('cors');
const app = express();
const port = 5000;
const services = require('./services');
const validator = require('./validator');
const httpStatus = require('http-status');
const { validationResult } = require('express-validator');
app.use(cors());

app.get('/api/items', validator.buscarProdutos(), async (req, res) => {
    try{
        validationResult(req).throw();
        const retorno = await services.obterProdutos(req.query.q);
        res.status(httpStatus.OK).send(retorno);
    } catch(e){
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({ error: error.array()[0].msg });
        }
        else{
            return res.status(400).send({ error:'Não foi possivel buscar os produtos: '+ e.message});
        }
    }
    
});


app.get('/api/items/:id', validator.buscarDetalhesProduto(), async (req, res) => {
    try{
        validationResult(req).throw();
        const retorno = await services.obterDetalhamentoProduto(req.params.id);
        res.send(retorno);
    } catch(e){
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({ error: error.array()[0].msg });
        }
        else{
            return res.status(400).json({ error: 'Não foi posssivel buscar os detalhes do produto: '+ e.message });
        }
    }
    
});

app.listen(port, () => {
    console.log(`Escutando na porta ${port}`);
}); 