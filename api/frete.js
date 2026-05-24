export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }
  try {
    const body = req.body;
    
    // Log para ver o que a Yampi envia
    console.log('BODY COMPLETO:', JSON.stringify(body));
    
    const produtos = body.products || body.items || [];
    console.log('PRODUTOS:', JSON.stringify(produtos));

    const temInternacional = produtos.some(produto => {
      const termos = produto.search_terms || produto.tags || '';
      return termos.toLowerCase().includes('internacional');
    });

    const temCustomizado = produtos.some(produto => {
      const termos = produto.search_terms || produto.tags || '';
      return termos.toLowerCase().includes('customizado');
    });

    let opcoesFrete = [];

    if (temInternacional) {
      opcoesFrete = [
        {
          name: "Transportadora - 12 a 22 dias",
          service: "Transportadora",
          price: 0,
          days: 22,
          quote_id: 1
        }
      ];
    } else if (temCustomizado) {
      opcoesFrete = [
        {
          name: "Entrega Personalizada - 15 a 25 dias",
          service: "Personalizada",
          price: 0,
          days: 25,
          quote_id: 1
        }
      ];
    } else {
      opcoesFrete = [];
    }

    return res.status(200).json({ quotes: opcoesFrete });

  } catch (error) {
    console.error('Erro na API de frete:', error);
    return res.status(500).json({ error: 'Erro interno' });
  }
}
