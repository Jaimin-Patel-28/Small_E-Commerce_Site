import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Plus } from "lucide-react";

import ProductCard from "../components/ProductCard";
import api from "../shared/api";
import { useAuth } from "../context/AuthContext";

function Products() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/products");
        setProducts(data.products);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this product?");
    if (!confirmed) return;

    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete product.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Page Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Products</h1>
            <p className="mt-2 text-sm text-gray-500">
              Manage your product inventory.
            </p>
          </div>

          {user && (
            <button
              type="button"
              onClick={() => navigate("/products/new")}
              className="flex items-center gap-2 rounded-md bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-800"
            >
              <Plus size={18} />
              Add Product
            </button>
          )}
        </div>

        {loading && (
          <p className="text-sm text-gray-500">Loading products...</p>
        )}

        {!loading && error && (
          <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="text-sm text-gray-500">No products yet.</p>
        )}

        {/* Product Grid */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                canManage={Boolean(user)}
                onDelete={() => handleDelete(product._id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Products;
