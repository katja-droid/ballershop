import React, { useState, useCallback, useContext } from 'react';
import { useAuth } from '../AuthContext';
import './ProductForm.css';
function ProductForm() {
 
  const [formData, setFormData] = useState({
    name: '',
    state: '',
    category: '', // ДОДАЛАСЬ КАТЕГОРІЯ
    price: '',
    productImage: '', // Primary image
    imageUrls: [], // Additional images will be added here via drag-and-drop
    location: '',
    cushioning: '',
    traction: '',
    supportive: '',
    lightweight: '',
    durability: '',
    signature: '',
    versatility: '',
   
    description: ''
  });
  const [uploadedFileNames, setUploadedFileNames] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false); // New state for tracking submission status
  const { user, logout } = useAuth();
  const onDrop = useCallback(async (acceptedFiles) => {
    const filesArray = Array.from(acceptedFiles);
    if (filesArray.length === 0) {
      return;
    }
    const filesToUpload = filesArray.map(file => uploadFile(file));
    const urls = await Promise.all(filesToUpload);
  
    // Update formData with new image URLs
    setFormData(prevFormData => ({
      ...prevFormData,
      imageUrls: [...prevFormData.imageUrls, ...urls], // Use sanitized file names
      productImage: prevFormData.productImage || urls[0] // First uploaded file as primary if not set
    }));
  
    // Also update the display names
    const newFileNames = urls; // Already sanitized
    setUploadedFileNames(prevFileNames => [...prevFileNames, ...newFileNames]);
  }, []);
  const uploadFile = async (file) => {
    const accessToken = 'sl.B0nvS39NNadXGUkIi3pP8WbWPO1Y9cFTUBspv7gSJMbkNtr6a1_5thLbjJLdDtwzT63FPgn4zvLf-eqZ8U8ph6PPGIGeCvxrzej8jaj43VcFV2o4XoApKIYZQdB8ENkVPscapZq7ZakwrEhYYU-5R-Q'; // Ensure to securely manage your access token
    const url = 'https://content.dropboxapi.com/2/files/upload';
    const formattedFileName = file.name.replace(/\//g, '-');

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
  
      reader.onload = async () => {
        const fileContent = reader.result;
        const headers = {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/octet-stream',
          'Dropbox-API-Arg': JSON.stringify({
            path: '/' + encodeURIComponent(formattedFileName),
            mode: 'add',
            autorename: true,
            mute: false,
            strict_conflict: false
          })
        };
  
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: fileContent
          });
  
          if (!response.ok) {
            const errorData = await response.text();
            throw new Error('Failed to upload image: ' + errorData);
          }
  
          const data = await response.json();
          // Resolve with the sanitized file name, not the path from Dropbox
          resolve(formattedFileName);
        } catch (error) {
          console.error('Error uploading image: ', error);
          reject(error);
        }
      };
    });
  };


  const onDragOver = (e) => {
    e.preventDefault(); // Prevent default to allow drop
  };

  const onDropHandler = (e) => {
    e.preventDefault(); // Prevent default behavior
    onDrop(e.dataTransfer.files); // Process dropped files
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value // Directly update state for all fields except imageUrls and productImage
    }));
    console.log(formData)
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if there's an authorized user
    if (!user) {
      alert("You must be logged in to submit a product.");
      return;
    }
  
    // Ensure there's at least a primary image or one additional image
    if (!formData.productImage && formData.imageUrls.length === 0) {
      alert("Please add at least one image for the product.");
      return;
    }
  
    try {
      // Add user information to formData
      const formDataWithUser = {
        ...formData,
        user: user,
      };
  
      const response = await fetch('http://localhost:5001/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataWithUser), // Send formData with user information
      });
  
      if (!response.ok) {
        throw new Error('Failed to add product');
      }
  
      console.log('Product added successfully');
      setIsSubmitted(true);
      // Optionally, handle success response such as redirecting the user or showing a success message.
    } catch (error) {
      console.error('There was a problem adding the product:', error);
      // Optionally, handle error response such as displaying an error message to the user.
    }
  };
  if (isSubmitted) {
    return <SubmissionSuccess />;
  }


  return (
    <form className="submitForm" onSubmit={handleSubmit}> 
    <h2>Add Product</h2> 
    <input name="name" type="text" placeholder="Name"required onChange={handleChange} value={formData.name}/>
    <select name="category" onChange={handleChange} value={formData.state} required>
      <option value="">Shoes</option> 
      <option value="new">Clothing</option>
      <option value="new">Accessories</option>
      <option value="new">Rare items</option>
      <option value="used">Basketballs</option>
    </select>
    <select name="state" onChange={handleChange} value={formData.state} required>
      <option value="">Select State</option> 
      <option value="new">New</option>
      <option value="used">Used</option>
    </select>

    <input name="price" type="number" placeholder="Price" onChange={handleChange} value={formData.price}  required />
    <input name="location" type="text" placeholder="Location" onChange={handleChange} value={formData.location} required />

    <select name="cushioning" onChange={handleChange} value={formData.state} required>
    <option value="">Select Cushioning</option> 
    <option value="Rolled Foam">Rolled Foam</option> 
    <option value="Air Pillows">Air Pillows</option> 
    <option value="Anti-Static">Anti-Static</option> 
    <option value="Bubble Pouches">Bubble Pouches</option> 
    <option value="other">other</option> 
    </select>

    <select name="traction" onChange={handleChange} value={formData.state} required>    
    <option value="">Select Traction</option> 
    <option value="Chain">Chain</option> 
    <option value="Spiked">Spiked</option> 
    <option value="Crampons">Crampons</option> 
    <option value="other">other</option> 
    </select>

    <select name="supportive" onChange={handleChange} value={formData.state} required>    
    <option value="">Select Supportive</option> 
    <option value="Yes">Yes</option> 
    <option value="No">No</option> 
    </select>

    <select name="lightweight" onChange={handleChange} value={formData.state} required>    
    <option value="">Select Lightweight</option> 
    <option value="Yes">Yes</option> 
    <option value="No">No</option> 
    </select>

    <select name="durability" onChange={handleChange} value={formData.state} required>    
    <option value="">Select Lightweight</option> 
    <option value="Yes">High</option> 
    <option value="No">Mid</option>  
    <option value="No">Low</option> 
    </select>

    <select name="versality" onChange={handleChange} value={formData.state} required>    
    <option value="">Select Versality</option> 
    <option value="Air Pillows">Air Pillows</option> 
    <option value="Anti-Static">Anti-Static</option> 
    <option value="Bubble Pouches">Bubble Pouches</option> 
    <option value="other">other</option> 
    </select>
    
    <select name="state" onChange={handleChange} value={formData.state} required>    
    <option value="">Select Cushioning</option> 
    <option value="Air Pillows">Air Pillows</option> 
    <option value="Anti-Static">Anti-Static</option> 
    <option value="Bubble Pouches">Bubble Pouches</option> 
    <option value="other">other</option> 
    </select>

    <select name="state" onChange={handleChange} value={formData.state} required>    
    <option value="">Select Cushioning</option> 
    <option value="Air Pillows">Air Pillows</option> 
    <option value="Anti-Static">Anti-Static</option> 
    <option value="Bubble Pouches">Bubble Pouches</option> 
    <option value="other">other</option> 
    </select>
    <textarea name="description" placeholder="Description" required onChange={handleChange} value={formData.description}/>
    

    <div
      className="dropArea" 
    >
      Drag and drop additional images here
    </div>
    <button type="submit">Submit</button>
  </form>
  );
}

export default ProductForm;
