import { Link } from "react-router";
import { Pencil, Trash2, Package } from "lucide-react";

function ProductCard({ product, canManage, onDelete }) {
  const { _id, name, description, price, stock, category, image } = product;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
      {/* Image / Placeholder */}
      {image ? (
        <img
          src={image}
          alt={name}
          className="h-48 w-full flex-shrink-0 object-cover"
        />
      ) : (
        <div className="flex h-48 flex-shrink-0 items-center justify-center bg-gray-100">
          <Package size={48} className="text-gray-400" />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3">
          <h2 className="line-clamp-1 text-lg font-semibold text-gray-900">
            {name}
          </h2>
          <p className="mt-1 text-xs text-gray-500">{category}</p>
        </div>

        <p className="mb-5 line-clamp-3 text-sm leading-6 text-gray-600">
          {description}
        </p>

        {/* Pushes price + actions to the bottom, regardless of description length */}
        <div className="mt-auto">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-gray-900">₹{price}</p>
              <p className="mt-1 text-xs text-gray-500">Stock: {stock}</p>
            </div>
          </div>

          {canManage && (
            <div className="flex gap-3 border-t border-gray-100 pt-4">
              <Link
                to={`/products/${_id}/edit`}
                className="flex flex-1 items-center justify-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <Pencil size={16} />
                Edit
              </Link>

              <button
                type="button"
                onClick={onDelete}
                className="flex flex-1 items-center justify-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
