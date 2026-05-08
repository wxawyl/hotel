import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function Products() {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [stockQuantity, setStockQuantity] = useState('');
  const [uploading, setUploading] = useState(false);
  const [updatingStock, setUpdatingStock] = useState(false);
  const [message, setMessage] = useState('');
  const [editingProduct, setEditingProduct] = useState({
    name: '',
    price: '',
    description: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    stock: 0
  });
  const [newProductImage, setNewProductImage] = useState(null);
  const [creatingProduct, setCreatingProduct] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const result = await response.json();
      const data = result.data || result;
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
      const response = await fetch(`/api/products/${productId}/upload-image`, {
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
      const response = await fetch(`/api/products/${productId}`, {
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

  const handleProductUpdate = async (productId) => {
    if (!editingProduct.name || !editingProduct.price) {
      setMessage('Please fill in name and price');
      return;
    }

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingProduct),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Product updated successfully!');
        setEditingProduct({ name: '', price: '', description: '' });
        setSelectedProduct(null);
        fetchProducts();
      } else {
        setMessage(result.error || 'Update failed');
      }
    } catch (error) {
      setMessage('Update failed: ' + error.message);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('Product deleted successfully!');
        fetchProducts();
      } else {
        setMessage('Delete failed');
      }
    } catch (error) {
      setMessage('Delete failed: ' + error.message);
    }
  };

  const handleCreateProduct = async () => {
    if (!newProduct.name || !newProduct.price) {
      setMessage('Please fill in name and price');
      return;
    }

    setCreatingProduct(true);
    setMessage('');

    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('price', newProduct.price);
    formData.append('description', newProduct.description || '');
    formData.append('stock', newProduct.stock || 0);
    if (newProductImage) {
      formData.append('image', newProductImage);
    }

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Product created successfully!');
        setNewProduct({ name: '', price: '', description: '', stock: 0 });
        setNewProductImage(null);
        setShowAddForm(false);
        fetchProducts();
      } else {
        setMessage(result.error || 'Creation failed');
      }
    } catch (error) {
      setMessage('Creation failed: ' + error.message);
    } finally {
      setCreatingProduct(false);
    }
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setStockQuantity(product.stock_quantity?.toString() || '');
    setImageFile(null);
    setEditingProduct({
      name: product.name || '',
      price: product.price?.toString() || '',
      description: product.description || ''
    });
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Crect fill="%23e2e8f0" width="200" height="200"/%3E%3Ctext fill="%2394a3b8" font-family="sans-serif" font-size="14" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
    if (imageUrl.startsWith('http')) return imageUrl;
    return imageUrl;
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{t('nav.products')}</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 shadow-md"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </button>
      </div>

      {message && (
        <div className={`mb-4 p-4 rounded-lg ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {!Array.isArray(products) ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No products found</p>
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className={`border rounded-lg overflow-hidden shadow-md transition-all cursor-pointer ${
                selectedProduct?.id === product.id ? 'ring-2 ring-ocean' : 'hover:shadow-lg'
              }`}
              onClick={() => handleSelectProduct(product)}
            >
              <div className="h-36 bg-gray-100">
                <img
                  src={getImageUrl(product.image_url)}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200';
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
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteProduct(product.id);
                  }}
                  className="mt-3 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedProduct && (
        <div className="p-6 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Edit Product: {selectedProduct.name}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold text-gray-700 mb-3">Update Image</h4>
              <div className="flex flex-col gap-4">
                <div className="w-48 h-48 bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 mx-auto">
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
                  className="w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                />
                
                {imageFile && (
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <span className="text-sm text-blue-700 font-medium">✓ Selected: {imageFile.name}</span>
                  </div>
                )}
                
                <button
                  onClick={() => handleUpload(selectedProduct.id)}
                  disabled={uploading || !imageFile}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md"
                >
                  {uploading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      Uploading...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      Upload Image
                    </span>
                  )}
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Update Product Info</h4>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-gray-600 mb-2">Name:</label>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-ocean"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-2">Price ($):</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-ocean"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-2">Description:</label>
                  <textarea
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                    rows="3"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-ocean"
                  />
                </div>
                
                <button
                  onClick={() => handleProductUpdate(selectedProduct.id)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                >
                  Update Info
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Update Stock Quantity</h4>
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
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-ocean"
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
              setEditingProduct({ name: '', price: '', description: '' });
            }}
            className="mt-6 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
          >
            Cancel
          </button>
        </div>
      )}

      {showAddForm && (
        <div className="p-6 bg-gray-50 rounded-lg border">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Product</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="w-48 h-48 bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 mx-auto">
                {newProductImage ? (
                  <img
                    src={URL.createObjectURL(newProductImage)}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <span>No image selected</span>
                  </div>
                )}
              </div>
              
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewProductImage(e.target.files[0])}
                className="w-full mt-4 text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
            </div>
            
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-gray-600 mb-2">Name:</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Price ($):</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter price"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Description:</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  rows="3"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter description"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Initial Stock:</label>
                <input
                  type="number"
                  min="0"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({...newProduct, stock: parseInt(e.target.value) || 0})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter initial stock"
                />
              </div>
              
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleCreateProduct}
                  disabled={creatingProduct}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {creatingProduct ? 'Creating...' : 'Create Product'}
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setNewProduct({ name: '', price: '', description: '', stock: 0 });
                    setNewProductImage(null);
                  }}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
