export interface Product {
  id: string;
  name: string;
  description: string;
  price?: string;
  category: 'candied-fruits' | 'adult-drinks';
  image?: string;
}

export const candiedFruits: Product[] = [
  {
    id: 'strawberry',
    name: 'Candied Strawberries',
    description: 'Fresh strawberries coated in sweet candy glaze',
    price: '$8.99',
    category: 'candied-fruits',
  },
  {
    id: 'grapes',
    name: 'Candied Grapes',
    description: 'Juicy grapes with a crunchy candy shell',
    price: '$7.99',
    category: 'candied-fruits',
  },
  {
    id: 'banana',
    name: 'Candied Bananas',
    description: 'Sweet banana slices with candy coating',
    price: '$6.99',
    category: 'candied-fruits',
  },
  {
    id: 'orange',
    name: 'Candied Orange Slices',
    description: 'Tangy orange slices with sweet candy finish',
    price: '$7.99',
    category: 'candied-fruits',
  },
];

export const adultDrinks: Product[] = [
  {
    id: 'berry-freaky',
    name: 'Berry Freaky',
    description: 'Blue Raspberry Jolly Rancher cocktail',
    price: '$12.99',
    category: 'adult-drinks',
  },
  {
    id: 'gag-green-apple',
    name: 'Gag\'n Green Apple',
    description: 'Green Apple Jolly Rancher cocktail',
    price: '$12.99',
    category: 'adult-drinks',
  },
  {
    id: 'gut-gushing-grape',
    name: 'Gut Gushing Grape',
    description: 'Grape Jolly Rancher cocktail',
    price: '$12.99',
    category: 'adult-drinks',
  },
  {
    id: 'mouth-water-melons',
    name: 'Mouth Water fa Melons',
    description: 'Watermelon Jolly Rancher cocktail',
    price: '$12.99',
    category: 'adult-drinks',
  },
  {
    id: 'cherry-bust',
    name: 'Cherry Bust',
    description: 'Cherry Jolly Rancher cocktail',
    price: '$12.99',
    category: 'adult-drinks',
  },
];

export const allProducts = [...candiedFruits, ...adultDrinks];
