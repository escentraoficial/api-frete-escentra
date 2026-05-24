export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }
  try {
    const body = req.body;
    const produtos = body.products || body.items || [];

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
          name: "Entrega Internacional",
          service: "Internacional",
          price: 0,
          days: 20,
          quote_id: 1
        }
      ];
    } else if (temCustomizado) {
      opcoesFrete = [
        {
          name: "Entrega Personalizada",
          service: "Personalizada",
          price: 0,
          days: 25,
          quote_id: 1
        }
      ];
    } else {
      opcoesFrete = [
        {
          name: "SEDEX",
          service: "SEDEX",
          price: 0,
          days: 6,
          quote_id: 1
        },
        {
          name: "Expresso",
          service: "Expresso",
          price: 0,
          days: 8,
          quote_id: 2
        }
      ];
    }

    return res.status(200).json({ quotes: opcoesFrete });

  } catch (error) {
    console.error('Erro na API de frete:', error);
    return res.status(500).json({ error: 'Erro interno' });
  }
}
