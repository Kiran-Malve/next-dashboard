'use client';

import { FC } from 'react';
import Button from '@/component/Button';

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
}

const ProductCard: FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <div className="flex gap-3">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="rounded-lg w-16 h-16 object-cover"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold truncate">{product.title}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">${product.price}</p>
        </div>
      </div>
      <div className="flex gap-2 mt-3 justify-end">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onEdit(product)}
          className="px-2 py-1 text-xs"
        >
          Edit
        </Button>
        <Button 
          variant="destructive" 
          size="sm"
          onClick={() => onDelete(product.id)}
          className="px-2 py-1 text-xs"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;

// 'use client';

// import { FC } from 'react';
// import Button from '@/component/Button';

// interface Product {
//   id: number;
//   title: string;
//   description: string;
//   price: number;
//   thumbnail: string;
// }

// interface ProductCardProps {
//   product: Product;
//   onEdit: (product: Product) => void;
//   onDelete: (productId: number) => void;
// }

// const ProductCard: FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
//   return (
//     <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-md flex flex-col items-center gap-4">
//       <img
//         src={product.thumbnail}
//         alt={product.title}
//         className="rounded-xl w-full h-40 object-cover"
//       />
//       <h3 className="text-lg font-bold">{product.title}</h3>
//       <p className="text-sm text-gray-600 dark:text-gray-300">{product.description}</p>
//       <p className="text-base font-semibold text-green-600">${product.price}</p>
//       <div className="flex gap-3 mt-3">
//         <Button variant="outline" onClick={() => onEdit(product)}>
//           Edit
//         </Button>
//         <Button variant="destructive" onClick={() => onDelete(product.id)}>
//           Delete
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
