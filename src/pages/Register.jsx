// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register({ onRegister }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    bio: ""
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Validation
  const validate = () => {
    let tempErrors = {};

    if (formData.name.trim().length < 3)
      tempErrors.name = "Name must be at least 3 characters";

    if (!/\S+@\S+\.\S+/.test(formData.email))
      tempErrors.email = "Invalid email address";

    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#])[A-Za-z\d@#]{6,}$/.test(formData.password)) {
  tempErrors.password =
    "Password must be at least 6 characters, include a number and @ or #";
}


    if (formData.password !== formData.confirmPassword)
      tempErrors.confirmPassword = "Passwords do not match";

    if (formData.age) {
      const age = Number(formData.age);
      if (age < 18 || age > 60)
        tempErrors.age = "Age must be between 18 and 60";
    }

    if (formData.bio.length > 150)
      tempErrors.bio = "Bio must be under 150 characters";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onRegister(formData);
      navigate("/login");
    }
  };

  const inputClass = (error) =>
    `w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 
     ${error
       ? "border-red-500 focus:ring-red-400"
       : "border-gray-300 focus:ring-blue-500"}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <input
              name="name"
              placeholder="Name"
              onChange={handleChange}
              className={inputClass(errors.name)}
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              className={inputClass(errors.email)}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={handleChange}
                className={`${inputClass(errors.password)} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
              >
                {showPassword ? eyeOffIcon : eyeIcon}
              </button>
            </div>
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                onChange={handleChange}
                className={`${inputClass(errors.confirmPassword)} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
              >
                {showConfirmPassword ? eyeOffIcon : eyeIcon}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Age */}
          <input
            name="age"
            type="number"
            placeholder="Age (optional)"
            onChange={handleChange}
            className={inputClass(errors.age)}
          />

          {/* Bio */}
          <textarea
            name="bio"
            placeholder="Short bio (max 150 characters)"
            rows="3"
            onChange={handleChange}
            className={inputClass(errors.bio)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?
          <Link to="/login" className="ml-1 text-blue-600 font-medium hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

/* SVG Icons */
const eyeIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5
         c4.478 0 8.268 2.943 9.542 7
         -1.274 4.057-5.064 7-9.542 7
         -4.477 0-8.268-2.943-9.542-7z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const eyeOffIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M13.875 18.825A10.05 10.05 0 0112 19
         c-5.523 0-10-4.477-10-10
         0-1.657.402-3.221 1.125-4.6M6.223 6.223
         A9.956 9.956 0 0112 5
         c5.523 0 10 4.477 10 10
         0 1.657-.402 3.221-1.125 4.6" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M3 3l18 18" />
  </svg>
);

export default Register;
