// =============================================
// ✏️ ADICIONE IDs DE PRODUTOS AQUI
// Para adicionar novo produto: coloque a vírgula e o número
// Exemplo: [44922448, 99999999, 88888888]
// =============================================
const produtosInternacionais = [
  44922448, // Pulseira Berloque
  45159144, // Fone de ouvido argola
];

const produtosCustomizados = [
  // Ex: 12345678, // Nome do produto
];
// =============================================

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }
  try {
    const body = req.body;
    const skus = body.skus || [];

    const temInternacional = skus.some(sku =>
      produtosInternacionais.includes(sku.product_id)
    );

    const temCustomizado = skus.some(sku =>
      produtosCustomizados.includes(sku.product_id)
    );

    let opcoesFrete = [];

    if (temInternacional) {
      opcoesFrete = [
        {
          name: "Transportadora - 12 a 20 dias",
          service: "Transportadora",
          price: 0,
          days: 20,
          quote_id: 1
        }
      ];
    } else if (temCustomizado) {
      opcoesFrete = [
        {
          name: "Entrega Personalizada - 15 a 22 dias",
          service: "Personalizada",
          price: 0,
          days: 22,
          quote_id: 1
        }
      ];
    } else {
      opcoesFrete = [
        {
          name: "Expresso - Prazo de 5 a 8 dias",
          service: "Expresso",
          price: 0,
          days: 8,
          quote_id: 1
        },
        {
          name: "Sedex - 4 a 6 dias",
          service: "Sedex",
          price: 9.90,
          days: 6,
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
