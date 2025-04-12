'use client';

import ConfirmDeleteModal from '@/component/ConfirmDeleteModal';
import CreateEditModal from '@/component/CreateEditModal';
import Pagination from '@/component/Pagination';
import ProductCard from '@/component/ProductCard';
import SearchBar from '@/component/SearchBar';
import { redirect } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from "@/redux/productSlice";
import { RootState } from '@/redux/store';

const PRODUCTS_PER_PAGE = 12;

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  // add any other properties you need
}


interface ProductFormData {
  id?: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  // other fields as needed
}

export default function ProductPage() {
  const dispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.product);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingProduct, setEditingProduct] = useState<ProductFormData | undefined>(undefined);
  const [showCreateEditModal, setShowCreateEditModal] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [products, searchQuery]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('https://dummyjson.com/products?limit=100');
      const data = await res.json();
      dispatch(setProducts(data.products));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = products.filter((product): product is Product => {
      return (
        typeof product.title === 'string' &&
        product.title.toLowerCase().includes(query.toLowerCase()) &&
        ('thumbnail' in product) 
      );
    });
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleDelete = async (id: number) => {
    try {
      const updatedProducts = products.filter((product: any) => product.id !== id);
      dispatch(setProducts(updatedProducts));
      setDeletingProductId(null);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleSave = async (data: any) => {
    try {
      let updatedProducts;
      
      if (editingProduct) {
        updatedProducts = products.map((product: any) =>
          product.id === editingProduct.id ? { ...product, ...data } : product
        );
      } else {
        const newProduct = {
          ...data,
          id: Math.max(...products.map((p: any) => p.id)) + 1,
        };
        updatedProducts = [...products, newProduct];
      }
      
      dispatch(setProducts(updatedProducts));
      setShowCreateEditModal(false);
      setEditingProduct(undefined);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };
  
  const removeCookiesLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    redirect("/login");
  };

  return (
    <div className="p-2 space-y-1">
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
        <SearchBar 
          query={searchQuery} 
          onChange={handleSearch} 
          removeCookiesLogout={removeCookiesLogout} 
         
        />
        <button
          onClick={() => setShowCreateEditModal(true)}
          className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm"
        >
          + Create Product
        </button>
      </div>
      
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {paginatedProducts.map((product: any, i: number) => (
          <ProductCard
            key={i}
            product={product}
            onEdit={() => {
              setEditingProduct(product);
              setShowCreateEditModal(true);
            }}
            onDelete={() => setDeletingProductId(product.id)}
          />
        ))}
      </div>
      
      <Pagination
        totalPages={Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      
      />

      {showCreateEditModal && (
        <CreateEditModal
          isOpen={showCreateEditModal}
          onClose={() => setShowCreateEditModal(false)}
          onSubmit={handleSave}
          initialData={editingProduct}
       
        />
      )}

      {deletingProductId && (
        <ConfirmDeleteModal
          show={deletingProductId}
          onCancel={() => setDeletingProductId(null)}
          onConfirm={() => handleDelete(deletingProductId)}
          
        />
      )}
    </div>
  );
}