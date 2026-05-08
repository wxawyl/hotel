import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function ProductManager() {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [stockQuantity, setStockQuantity] = useState('');
  const [uploading, setUploading] = useState(false);
  const [updatingStock, setUpdatingStock] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleUpload = async (productId) => {
    if (!imageFile) {
      setMessage('Please select an image first');
      return;
    }

    setUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}/upload-image`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Image uploaded successfully!');
        setImageFile(null);
        fetchProducts();
        setSelectedProduct(null);
      } else {
        setMessage(result.error || 'Upload failed');
      }
    } catch (error) {
      setMessage('Upload failed: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleStockUpdate = async (productId) => {
    if (!stockQuantity || isNaN(stockQuantity)) {
      setMessage('Please enter a valid number');
      return;
    }

    setUpdatingStock(true);
    setMessage('');

    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stock_quantity: parseInt(stockQuantity) }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Stock updated successfully!');
        setStockQuantity('');
        fetchProducts();
      } else {
        setMessage(result.error || 'Update failed');
      }
    } catch (error) {
      setMessage('Update failed: ' + error.message);
    } finally {
      setUpdatingStock(false);
    }
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setStockQuantity(product.stock_quantity?.toString() || '');
    setImageFile(null);
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return 'https://via.placeholder.com/300';
    if (imageUrl.startsWith('http')) return imageUrl;
    return `http://localhost:5000${imageUrl}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-ocean mb-8">{t('nav.product_manager')}</h1>

      {message && (
        <div className={`mb-4 p-4 rounded-lg ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className={`border rounded-lg overflow-hidden shadow-md transition-all cursor-pointer ${
              selectedProduct?.id === product.id ? 'ring-2 ring-ocean' : 'hover:shadow-lg'
            }`}
            onClick={() => handleSelectProduct(product)}
          >
            <div className="h-40 bg-gray-100">
              <img
                src={getImageUrl(product.image_url)}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300';
                }}
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 truncate">{product.name}</h3>
              <p className="text-ocean font-bold mt-1">${product.price}</p>
              <div className={`mt-2 px-2 py-1 rounded text-sm ${
                (product.stock_quantity || 0) > 5 ? 'bg-green-100 text-green-700' : 
                (product.stock_quantity || 0) > 0 ? 'bg-yellow-100 text-yellow-700' : 
                'bg-red-100 text-red-700'
              }`}>
                Stock: {product.stock_quantity || 0}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Manage: {selectedProduct.name}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Update Image</h3>
              <div className="flex flex-col gap-4">
                <div className="w-48 h-48 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={getImageUrl(selectedProduct.image_url)}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-ocean file:text-white hover:file:bg-ocean/80"
                />
                
                {imageFile && (
                  <div className="p-2 bg-gray-200 rounded">
                    <span className="text-sm text-gray-600">Selected: {imageFile.name}</span>
                  </div>
                )}
                
                <button
                  onClick={() => handleUpload(selectedProduct.id)}
                  disabled={uploading}
                  className="px-6 py-3 bg-ocean text-white rounded-lg hover:bg-ocean/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? 'Uploading...' : 'Upload Image'}
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Update Stock Quantity</h3>
              <div className="flex flex-col gap-4">
                <div className="p-4 bg-white rounded-lg">
                  <label className="block text-gray-600 mb-2">Current Stock:</label>
                  <span className={`text-2xl font-bold ${
                    (selectedProduct.stock_quantity || 0) > 5 ? 'text-green-600' : 
                    (selectedProduct.stock_quantity || 0) > 0 ? 'text-yellow-600' : 
                    'text-red-600'
                  }`}>
                    {selectedProduct.stock_quantity || 0}
                  </span>
                </div>
                
                <div>
                  <label className="block text-gray-600 mb-2">New Stock Quantity:</label>
                  <input
                    type="number"
                    min="0"
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(e.target.value)}
                    placeholder="Enter new stock quantity"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-ocean focus:border-transparent"
                  />
                </div>
                
                <button
                  onClick={() => handleStockUpdate(selectedProduct.id)}
                  disabled={updatingStock}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {updatingStock ? 'Updating...' : 'Update Stock'}
                </button>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => {
              setSelectedProduct(null);
              setImageFile(null);
              setStockQuantity('');
            }}
            className="mt-6 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
          >
            Cancel
          </button>
        </div>
      )}

      <div className="mt-8 p-6 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-3">How to Manage Products:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">📷 Image Upload</h4>
            <ol className="list-decimal list-inside space-y-1 text-gray-600 text-sm">
              <li>Click on a product card to select it</li>
              <li>Click "Choose File" to select an image</li>
              <li>Click "Upload Image" to upload</li>
            </ol>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">📦 Stock Management</h4>
            <ol className="list-decimal list-inside space-y-1 text-gray-600 text-sm">
              <li>Click on a product card to select it</li>
              <li>Enter new stock quantity in the input field</li>
              <li>Click "Update Stock" to save changes</li>
            </ol>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Supported image formats: JPG, PNG, GIF. Maximum file size: 5MB
        </p>
      </div>
    </div>
  );
}

export default ProductManager;
