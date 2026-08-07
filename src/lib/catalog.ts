export type Product = {
  name: string;
  price: number;
  old?: number;
  rating?: number;
  reviews?: number;
  category?: string;
  image?: string;
  seller?: string;
  sellerVerified?: boolean;
};

export interface Vendor {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviews: number;
  productsCount: number;
  badge: string;
  category: string;
  description: string;
}

export const featuredVendors: Vendor[] = [
  {
    id: "lumina-official",
    name: "Lumina Official Store",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviews: 4820,
    productsCount: 154,
    badge: "Tienda Oficial",
    category: "Audio & Tecnología",
    description: "Diseño minimalista y tecnología acústica premium directa del fabricante.",
  },
  {
    id: "soundmaster-co",
    name: "SoundMaster Studio",
    logo: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=150&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews: 1940,
    productsCount: 86,
    badge: "Top Vendedor",
    category: "Audio Pro",
    description:
      "Especialistas en cancelación de ruido, audio Hi-Fi y equipos de sonido profesional.",
  },
  {
    id: "techworld-global",
    name: "TechWorld Global",
    logo: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=150&auto=format&fit=crop&q=80",
    rating: 4.7,
    reviews: 3210,
    productsCount: 230,
    badge: "Verificado",
    category: "Gadgets & Móviles",
    description:
      "Gadgets inteligentes, accesorios de carga rápida y componentes de última generación.",
  },
  {
    id: "modastyle-hub",
    name: "ModaStyle & Travel",
    logo: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=150&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviews: 1120,
    productsCount: 64,
    badge: "Envío Exprés",
    category: "Calzado & Mochilas",
    description:
      "Colecciones exclusivas de calzado casual, mochilas ergonómicas y accesorios de viaje.",
  },
  {
    id: "home-living-direct",
    name: "Home & Living Direct",
    logo: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=150&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews: 870,
    productsCount: 112,
    badge: "Verificado",
    category: "Hogar & Iluminación",
    description:
      "Iluminación domótica, pequeños electrodomésticos y organización inteligente para tu hogar.",
  },
];

export const categories = [
  "Tecnología",
  "Audio",
  "Hogar",
  "Accesorios",
  "Deporte",
  "Belleza",
  "Calzado",
  "Bebidas",
] as const;

export const bestSellers: Product[] = [
  {
    name: "Auriculares Pro X",
    price: 129.99,
    old: 179.99,
    rating: 4.9,
    reviews: 1240,
    category: "Audio",
    seller: "Lumina Official Store",
    sellerVerified: true,
  },
  {
    name: "Smartwatch Series 9",
    price: 199.99,
    old: 249.99,
    rating: 4.8,
    reviews: 890,
    category: "Accesorios",
    seller: "TechWorld Global",
    sellerVerified: true,
  },
  {
    name: "Altavoz Inalámbrico",
    price: 89.99,
    old: 119.99,
    rating: 4.9,
    reviews: 654,
    category: "Audio",
    seller: "SoundMaster Studio",
    sellerVerified: true,
  },
  {
    name: "Mochila Minimal 2.0",
    price: 69.99,
    old: 99.99,
    rating: 4.7,
    reviews: 432,
    category: "Accesorios",
    seller: "ModaStyle & Travel",
    sellerVerified: true,
  },
  {
    name: "Cámara Mini 4K",
    price: 159.99,
    old: 219.99,
    rating: 4.8,
    reviews: 1120,
    category: "Tecnología",
    seller: "TechWorld Global",
    sellerVerified: true,
  },
];

export const products: Product[] = [
  {
    name: "Lámpara LED Inteligente",
    price: 49.99,
    category: "Hogar",
    seller: "Home & Living Direct",
    sellerVerified: true,
  },
  {
    name: "Teclado Mecánico Pro",
    price: 99.99,
    category: "Tecnología",
    seller: "TechWorld Global",
    sellerVerified: true,
  },
  {
    name: "Mouse Inalámbrico Ergonómico",
    price: 39.99,
    category: "Tecnología",
    seller: "TechWorld Global",
    sellerVerified: true,
  },
  {
    name: "Cargador 3 en 1 MagSafe",
    price: 59.99,
    category: "Accesorios",
    seller: "Lumina Official Store",
    sellerVerified: true,
  },
  {
    name: "Botella Térmica 500ml",
    price: 29.99,
    category: "Deporte",
    seller: "ModaStyle & Travel",
    sellerVerified: true,
  },
  {
    name: "Soporte Ajustable Laptop",
    price: 34.99,
    category: "Tecnología",
    seller: "TechWorld Global",
    sellerVerified: true,
  },
  {
    name: "Power Bank 20K Ultra",
    price: 49.99,
    category: "Tecnología",
    seller: "TechWorld Global",
    sellerVerified: true,
  },
  {
    name: "Cable USB-C a C 100W",
    price: 19.99,
    category: "Accesorios",
    seller: "Lumina Official Store",
    sellerVerified: true,
  },
  {
    name: "Auriculares On-Ear Lite",
    price: 59.99,
    category: "Audio",
    seller: "SoundMaster Studio",
    sellerVerified: true,
  },
  {
    name: "Organizador de Cables",
    price: 14.99,
    category: "Hogar",
    seller: "Home & Living Direct",
    sellerVerified: true,
  },
];

export const recent: Product[] = [
  {
    name: "Drone Mini 2",
    price: 299.99,
    category: "Tecnología",
    seller: "TechWorld Global",
    sellerVerified: true,
  },
  {
    name: "Proyector Portátil",
    price: 189.99,
    category: "Tecnología",
    seller: "Lumina Official Store",
    sellerVerified: true,
  },
  {
    name: "Hub USB-C 7 en 1",
    price: 49.99,
    category: "Tecnología",
    seller: "TechWorld Global",
    sellerVerified: true,
  },
  {
    name: "Luz RGB Inteligente",
    price: 24.99,
    category: "Hogar",
    seller: "Home & Living Direct",
    sellerVerified: true,
  },
  {
    name: 'Monitor Portátil 15.6"',
    price: 159.99,
    category: "Tecnología",
    seller: "TechWorld Global",
    sellerVerified: true,
  },
];

export const allProducts: Product[] = [...bestSellers, ...products, ...recent];

export const catalogSummary = allProducts
  .map(
    (p) =>
      `- ${p.name} · ${p.category ?? "General"} · $${p.price.toFixed(2)}${p.rating ? ` · ${p.rating}★` : ""}`,
  )
  .join("\n");

export const fmt = (n: number) => `$${n.toFixed(2)}`;

export const csvProducts: Product[] = [
  {
    name: "Smart Watch",
    price: 12.0,
    category: "Relojes",
    image: "https://alaricariasllc.com/wp-content/uploads/2019/09/Group-1274.jpg",
    rating: 4.5,
    reviews: 128,
  },
  {
    name: "Coca-Cola 12 -Pack 12 - fl oz Cola Soft Drink",
    price: 10.0,
    old: 12.0,
    category: "Bebidas",
    image:
      "https://alaricariasllc.com/wp-content/uploads/2025/12/af97552f-e102-4c64-ac87-d6cd5084a3c6.f987be3b1c362dc57451eb684ebf4c77.webp",
    rating: 4.8,
    reviews: 320,
  },
  {
    name: "Coca-Cola 12 -Pack 24 – fl oz Cola Soft Drink",
    price: 38.0,
    old: 40.0,
    category: "Bebidas",
    image:
      "https://alaricariasllc.com/wp-content/uploads/2025/12/f9586c36ab7db84d09b777cee8c829b1.jpeg",
    rating: 4.7,
    reviews: 185,
  },
  {
    name: "ADQ Zapatos sin Cordones para Mujer, Zapatos Casuales, Zapatillas Antideslizantes Ligeras y Transpirables",
    price: 20.0,
    old: 22.0,
    category: "Calzado",
    image:
      "https://alaricariasllc.com/wp-content/uploads/2025/12/ADQ-Women-s-Slip-on-Shoes-Casual-Shoes-Lightweight-Breathable-Anti-Slip-Sneakers_b028cd23-6561-4a42-aaa3-72081c8bbe45.f8e64f99d375096eb0984962c67ca055.jpeg",
    rating: 4.6,
    reviews: 242,
  },
  {
    name: "Madden Girl Zapatillas con Cordones y Suela de Goma Giia para Mujer",
    price: 50.0,
    old: 55.0,
    category: "Calzado",
    image:
      "https://alaricariasllc.com/wp-content/uploads/2025/12/Madden-Girl-Women-s-Giia-Gum-Sole-Lace-Up-Sneakers_a4e62d29-8dfd-44ab-9368-953655bdb558.8d6d442d07acc54fe23a101cb865c5a2.webp",
    rating: 4.9,
    reviews: 95,
  },
  {
    name: "Kricely Tenis para Running para Hombre, Zapatillas de Senderismo a la Moda para Hombre, Calzado de Entrenamiento Cruzado de Tenis, Calzado de Entrenamiento Casual para Hombre, Talla 12",
    price: 50.0,
    old: 55.0,
    category: "Calzado",
    image:
      "https://alaricariasllc.com/wp-content/uploads/2025/12/Kricely-Men-s-Trail-Running-Shoes-Fashion-Walking-Hiking-Sneakers-Men-Tennis-Cross-Training-Shoe-Outdoor-Snearker-Mens-Casual-Workout-Footwear.webp",
    rating: 4.5,
    reviews: 167,
  },
  {
    name: "Men's Classic Lace-Up 100% Genuine Leather Dress Shoes",
    price: 200.0,
    old: 205.0,
    category: "Calzado",
    image:
      "https://alaricariasllc.com/wp-content/uploads/2025/12/Men-s-Classic-Lace-Up-100-Genuine-Leather-Dress-Shoes_71cb8287-50ed-47e8-8859-07951b55b8a1.f437f89f7cb7df1890e83bce25afa022.webp",
    rating: 4.8,
    reviews: 312,
  },
  {
    name: "Bota Robinhood 100 para Hombre.",
    price: 80.0,
    old: 82.99,
    category: "Calzado",
    image:
      "https://alaricariasllc.com/wp-content/uploads/2025/12/Men-s-Robinhood-100-Boot_d7ccd3f.webp",
    rating: 4.4,
    reviews: 83,
  },
  {
    name: "Mujer Demonia Shaker 100",
    price: 110.0,
    old: 112.99,
    category: "Calzado",
    image:
      "https://alaricariasllc.com/wp-content/uploads/2025/12/Women-s-Demonia-Shaker-100_fa62d.jpeg",
    rating: 4.7,
    reviews: 114,
  },
  {
    name: 'NIKE Cortez para Hombre "Coágulo - Blanco',
    price: 370.0,
    old: 374.0,
    category: "Calzado",
    image:
      "https://alaricariasllc.com/wp-content/uploads/2025/12/NIKE-MENS-Cortez-Clot-White-Royal-Red-DZ3239-100-from-Stadium-Goods_1e203f0.webp",
    rating: 4.9,
    reviews: 420,
  },
  {
    name: "Papel Higiénico Profesional de Alta Capacidad Georgia Pacific, 2 Capas, Blanco, 1000 Hojas/rollo, 48 Rollos/caja",
    price: 135.0,
    old: 137.0,
    category: "Hogar",
    image:
      "https://alaricariasllc.com/wp-content/uploads/2025/12/Georgia-Pacific-Professional-High-Capacity-Toilet-Paper-2-Ply-White-1000-Sheets-Roll-48-Rolls-Carton_23.webp",
    rating: 4.6,
    reviews: 58,
  },
  {
    name: "UBesGoo Juego de Herramientas de 1000 Piezas, Kit de Herramientas Manuales de Reparación para el Hogar, Kit de Herramientas Mecánicas, con Caja de Carrito",
    price: 100.0,
    old: 105.0,
    category: "Herramientas",
    image:
      "https://alaricariasllc.com/wp-content/uploads/2025/12/UBesGoo-148-Piece-Household-Tool-Set-Home-Hand-Tool-Kit-Includes-Measure-Tape-Screwdri.webp",
    rating: 4.5,
    reviews: 92,
  },
  {
    name: "1000 para Mujeres de Jean Patou 1.6 oz Eau de Toilette Spray",
    price: 60.0,
    old: 62.0,
    category: "Perfumería",
    image:
      "https://alaricariasllc.com/wp-content/uploads/2025/12/1000-for-Women-by-Jean-Patou-1-6-oz-Eau-de-Toilette-Spray_3cf.webp",
    rating: 4.7,
    reviews: 140,
  },
  {
    name: "Guantes de Examen de Nitrilo Ndigo de Primera Elección, Tamaño Pequeño, 1000 Unidades, Uso Liviano",
    price: 65.0,
    old: 69.0,
    category: "Salud",
    image:
      "https://alaricariasllc.com/wp-content/uploads/2025/12/1st-Choice-Indigo-Nitrile-Exam-Gloves-Size-Small-1000-Count-Light-Duty_fe4c8b.webp",
    rating: 4.8,
    reviews: 210,
  },
  {
    name: "Ninja Professional Batidora de 1000 Vatios, BL610",
    price: 70.0,
    old: 75.0,
    category: "Electrónica",
    image:
      "https://alaricariasllc.com/wp-content/uploads/2025/12/Ninja-Professional-Blender-1000W-Black-BL610_.webp",
    rating: 4.9,
    reviews: 385,
  },
  {
    name: "Frigidaire Máquina para Hacer Hielo con Pepitas de Encimera de 33 Lb, Autolimpiante, Negra, Modelo EFIC226",
    price: 100.0,
    old: 104.0,
    category: "Electrónica",
    image:
      "https://alaricariasllc.com/wp-content/uploads/2025/12/Frigidaire-Gallery-26-lb-Countertop-Ice-Maker-Bullet-Ice-EFIC226-Blac.webp",
    rating: 4.7,
    reviews: 148,
  },
  {
    name: "X-Pro Rover 1 Asiento 49cc 1.4KW Go-Kart de Gas de 8 Años a 12 Años - Rojo",
    price: 600.0,
    old: 850.0,
    category: "Vehículos",
    image:
      "https://alaricariasllc.com/wp-content/uploads/2025/12/X-Pro-Rover-1-Seater-49cc-1-4KW-Gas-Go-Kart-from-8-Years-to-12-Years-Red_742c.webp",
    rating: 4.9,
    reviews: 74,
  },
  {
    name: 'Royal Baby Rocket Bicicleta con Rueda de Entrenamiento de 14" para Niños y Niñas',
    price: 90.0,
    old: 95.0,
    category: "Deportes",
    image:
      "https://alaricariasllc.com/wp-content/uploads/2025/12/Royal-Baby-Rocket-Boys-and-Girls-14-Training-Wheel-Bicycle_a41fe.webp",
    rating: 4.8,
    reviews: 130,
  },
  {
    name: "YDOJG Camiseta para Hombre Camiseta Navideña de Moda Deportes Ffitness Camiseta con Impresión Digital 3D Al Aire Libre Camisa de Manga Corta",
    price: 5.0,
    old: 8.0,
    category: "Ropa",
    image:
      "https://alaricariasllc.com/wp-content/uploads/2025/12/YDOJG-Mens-T-Shirt-Fashion-Christmas-T-Shirt-Ssports-Ffitness-Outdoor-3D-Digital-Printing-T-Shirt-S.webp",
    rating: 4.2,
    reviews: 45,
  },
  {
    name: "SUNBS Camisetas de Talla Grande para Mujer, Camisetas de Entrenamiento, Camiseta de Manga Corta para Primavera, Ropa de Verano, Tallas S-3XL",
    price: 5.0,
    old: 6.99,
    category: "Ropa",
    image:
      "https://alaricariasllc.com/wp-content/uploads/2025/12/SUNBS-Plus-Size-Tops-for-Women-Workout-T-Shirts-Short-Sleeve-Spring-Tee-Summer-Clothes.webp",
    rating: 4.3,
    reviews: 62,
  },
];
