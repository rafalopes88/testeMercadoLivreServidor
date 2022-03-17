const axios = require('axios')

module.exports = {

    async obterProdutos(query){
        try{
            if(!query){
                return "dados invalidos";
            }
            const resultado = await axios.get('https://api.mercadolibre.com/sites/MLA/search?q='+query);
            return await tratarRetornoPesquisaProdutos(resultado.data.results.slice(0,4), 
            resultado.data.filters.length? resultado.data.filters[0].values[0].path_from_root:
            resultado.data.available_filters[0].values.slice(0,5) );
        }
        catch(e) {
            console.log('Não foi possivel buscar os produtos');
            throw e;
        };

    },

    async obterDetalhamentoProduto(id){
        try{
            const detalhes = await axios.get('https://api.mercadolibre.com/items/'+id);
            const descricao = await axios.get('https://api.mercadolibre.com/items/'+id+'/description');
            const categorias = await axios.get('https://api.mercadolibre.com/categories/'+detalhes.data.category_id);
            
            return await tratarRetornoDetalhamentoProduto(detalhes.data, descricao.data.plain_text, categorias.data.path_from_root);
        }
        catch(e) {
            console.log('Não foi possivel buscar os detalhes produto '+id);
            throw e;
        };
    }
}
async function tratarRetornoDetalhamentoProduto(detalhes, descricao, categorias){
    const categoriasStr = [];
    categorias.forEach(categorias =>{categoriasStr.push(categorias.name)});
    const retorno = {
        author: {
            name: "Rafael",
            lastname:"Lopes" 
        },
        item: {
            id: detalhes.id,
            title: detalhes.title,
            categories: categoriasStr,
            price: {
                currency: detalhes.currency_id,
                amount: detalhes.price,
                
            },
            picture: detalhes.pictures[0].url,
            condition: detalhes.condition,
            free_shipping: detalhes.shipping.free_shipping,
            sold_quantity: detalhes.sold_quantity, 
            description: descricao
        }
    }

    return retorno;
}
async function tratarRetornoPesquisaProdutos(dados, categories){
    let retorno = {
        
        author: {
            name: "Rafael",
            lastname:"Lopes" 
        },
        categories:[],
        items: []
    };
    categories.forEach(category => {
        retorno.categories.push(category.name);
    });
    dados.forEach(item => {
        const itemTratado = {
            id: item.id,
            title: item.title,
            price: {
                currency:item.currency_id,
                amount: item.price,
            },
            picture: item.thumbnail,
            condition: item.condition,
            free_shipping: item.shipping.free_shipping
        };
        retorno.items.push(itemTratado);
    });
    return retorno;
}