const {query, param} = require('express-validator');

module.exports = {

    buscarProdutos() {
        return [
            query('q')
                .notEmpty()
                .withMessage('O parametro de pesquisa é obrigatório')
        ];
    },

    buscarDetalhesProduto(){
        return [
            param('id')
                .notEmpty()
                .withMessage('O parametro identificador do produto é obrigatório')
        ]
    }

}