const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const services = require('./services')
app.use(cors());




app.get('/api/items', async (req, res) => {
    try{
        const retorno = await services.obterProdutos(req.query.q);
        res.send(retorno);
    } catch(e){
        throw(e);
    }
    
});


app.get('/api/items/:id', async (req, res) => {
    try{
        const retorno = await services.obterDetalhamentoProduto(req.params.id);
        res.send(retorno);
    } catch(e){
        throw(e);
    }
    
});

app.listen(port, () => {
    console.log(`Escutando na porta ${port}`);
}); 