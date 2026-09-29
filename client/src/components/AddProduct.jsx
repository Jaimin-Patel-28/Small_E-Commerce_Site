import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { PackagePlus, ArrowLeft } from "lucide-react";
import api from "../shared/api";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  stock: "",
  category: "",
  image: "",
};

function AddProduct() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(isEditMode);

  useEffect(() => {
    if (!isEditMode) return;

    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        const p = data.product;
        setForm({
          name: p.name,
          description: p.description,
          price: p.price,
          stock: p.stock,
          category: p.category,
          image: p.image || "",
        });
      } catch (err) {
        setFormError(err.response?.data?.message || "Failed to load product.");
      } finally {
        setPageLoading(false);
      }
    };
    fetchProduct();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setFormError("");
    setLoading(true);

    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    };

    try {
      if (isEditMode) {
        await api.put(`/products/${id}`, payload);
      } else {
        await api.post("/products", payload);
      }
      navigate("/");
    } catch (err) {
      const data = err.response?.data;
      if (data?.errors) {
        const fieldErrors = {};
        data.errors.forEach((item) => {
          if (!fieldErrors[item.field]) fieldErrors[item.field] = item.message;
        });
        setErrors(fieldErrors);
      } else {
        setFormError(data?.message || "Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-700";

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-gray-50 px-6 py-10">
        <p className="text-sm text-gray-500">Loading product...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-3xl px-6 py-10">
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-2 text-gray-500">
            <PackagePlus size={22} />
            <span className="text-sm font-medium">Product Management</span>
          </div>

          <h1 className="text-3xl font-semibold text-gray-900">
            {isEditMode ? "Edit Product" : "Add Product"}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {isEditMode
              ? "Update this product's details."
              : "Add a new product to your inventory."}
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className={inputClass}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                rows="4"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter product description"
                className={`resize-none ${inputClass}`}
              />
              {errors.description && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Price + Stock */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="2499"
                  className={inputClass}
                />
                {errors.price && (
                  <p className="mt-1 text-xs text-red-600">{errors.price}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Stock
                </label>
                <input
                  name="stock"
                  type="number"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="25"
                  className={inputClass}
                />
                {errors.stock && (
                  <p className="mt-1 text-xs text-red-600">{errors.stock}</p>
                )}
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                name="category"
                type="text"
                value={form.category}
                onChange={handleChange}
                placeholder="Electronics"
                className={inputClass}
              />
              {errors.category && (
                <p className="mt-1 text-xs text-red-600">{errors.category}</p>
              )}
            </div>

            {/* Image */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                name="image"
                type="url"
                value={form.image}
                onChange={handleChange}
                placeholder="https://example.com/product.jpg"
                className={inputClass}
              />
              {errors.image && (
                <p className="mt-1 text-xs text-red-600">{errors.image}</p>
              )}
            </div>

            {formError && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                {formError}
              </p>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-3 border-t border-gray-100 pt-6">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex items-center gap-2 rounded-md border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <ArrowLeft size={17} />
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 rounded-md bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-60"
              >
                <PackagePlus size={17} />
                {loading
                  ? "Saving..."
                  : isEditMode
                    ? "Save Changes"
                    : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AddProduct;
