import React, { useState } from "react";
import { toast } from "react-toastify";
import "./AddItem.css";
import axios from "axios";

const AddProduct = () => {

  const API = import.meta.env.VITE_API_URL;

  const categories = [
  { value: "laptops", label: "💻 Laptops" },
  { value: "mobiles", label: "📱 Mobiles" },
  { value: "accessories", label: "🎧 Accessories" },
  { value: "playstation", label: "🎮 PlayStation" },
];
  const [form, setForm] = useState({
    name: "",
    desc: "",
    price: "",
    category: "",
    stock: ""
  });

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);

  // change inputs
  const handleChange = (e) => {
    setForm((prev)=>({
      ...prev,
      [e.target.name]:e.target.value
    }))
  }

  // upload images
  const handleImageChange = (e) => {

    const files=Array.from(e.target.files);

    if(files.length === 0) return;

    const validImages = files.filter(file =>
      file.type.startsWith("image/")
    );

    if(validImages.length !== files.length){
      return toast.error("Please upload only images");
    }

    setImages(prev => [...prev, ...validImages]);

    const previewImages = validImages.map(file =>
      URL.createObjectURL(file)
    );

    setPreview(prev => [...prev, ...previewImages]);
  };

  // remove single image
  const removeImage = (index) => {

    const newImages = images.filter((_,i)=> i !== index);
    const newPreview = preview.filter((_,i)=> i !== index);

    setImages(newImages);
    setPreview(newPreview);
  }

  // validation
  const validate = () => {

    if(!form.name || !form.desc || !form.price || !form.category){
      toast.error("Please fill all required fields");
      return false;
    }

    return true;
  }

  // submit
  const handleSubmit = async(e)=>{
    e.preventDefault();

    if(!validate()) return;

    try{

      setLoading(true);

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("description", form.desc);
      formData.append("price", form.price);
      formData.append("category", form.category);
      formData.append("stock", form.stock);

      images.forEach(img=>{
        formData.append("images", img);
      })

      const res = await axios.post(`${API}/addProduct`,formData);

      if(res.data?.success){

        toast.success("Product Added 🎉");

        setForm({
          name:"",
          desc:"",
          price:"",
          category:"",
          stock:""
        });

        setImages([]);
        setPreview([]);
      }

    }catch(error){

      toast.error(error.response?.data?.message || "Something went wrong");

    }finally{
      setLoading(false);
    }

  }

  return (
    <div className="add-product-container">

      <form className="add-product-card" onSubmit={handleSubmit}>

        <h2>Add Product</h2>

        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
        />

        <textarea
          name="desc"
          placeholder="Description"
          value={form.desc}
          onChange={handleChange}
        />

        <div className="row">

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
          />

        </div>

      <select
  name="category"
  value={form.category}
  onChange={handleChange}
>
  <option value="">Select Category</option>

  {categories.map((cat) => (
    <option key={cat.value} value={cat.value}>
      {cat.label}
    </option>
  ))}
</select>

        {/* upload */}
        <label className="upload-box">

          Upload Images

          <input
            type="file"
            hidden
            multiple
            onChange={handleImageChange}
          />

        </label>

        {/* preview */}

        {preview.length > 0 && (

          <div className="images-preview">

            {preview.map((img,i)=>(
              
              <div className="image-item" key={i}>

                <button
                  type="button"
                  onClick={()=> removeImage(i)}
                >
                  ×
                </button>

                <img src={img} alt="preview"/>

              </div>

            ))}

          </div>

        )}

        <button
          className="btn-addProduct"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>

      </form>

    </div>
  );
};

export default AddProduct;