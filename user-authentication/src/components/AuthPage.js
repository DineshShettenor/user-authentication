import React, { useState } from 'react';
import './Auth.css'; // Ensure to create a CSS file for styling

const AuthPage = () => {
  
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });

  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isManagerMode, setIsManagerMode] = useState(false);
  const [isStaffMode, setIsStaffMode] = useState(false);

  const toggleAuthMode = () => {
    setIsSignup((prev) => !prev);
    setFormData({ email: '', password: '', confirmPassword: '', firstName: '', lastName: '' });
  };

  const toggleAdminMode = () => {
    setIsAdminMode((prev) => !prev);
    setIsManagerMode(false);
    setIsStaffMode(false);
    setFormData({ email: '', password: '', confirmPassword: '', firstName: '', lastName: '' });
  };

  const toggleManagerMode = () => {
    setIsManagerMode((prev) => !prev);
    setIsAdminMode(false);
    setIsStaffMode(false);
    setFormData({ email: '', password: '', confirmPassword: '', firstName: '', lastName: '' });
  };

  const toggleStaffMode = () => {
    setIsStaffMode((prev) => !prev);
    setIsAdminMode(false);
    setIsManagerMode(false);
    setFormData({ email: '', password: '', confirmPassword: '', firstName: '', lastName: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignup && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const endpoint = isSignup ? '/api/signup' : '/api/login';
      const payload = isSignup ? formData : { email: formData.email, password: formData.password };
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`${isSignup ? 'Signup' : 'Login'} successful!`);
        setFormData({ email: '', password: '', confirmPassword: '', firstName: '', lastName: '' });
      } else {
        alert(data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-buttons">
        <button className="admin-button" onClick={toggleAdminMode}>
          {isAdminMode ? 'Close Admin' : 'Admin'}
        </button>
        <button className="manager-button" onClick={toggleManagerMode}>
          {isManagerMode ? 'Close Manager' : 'Manager'}
        </button>
        <button className="staff-button" onClick={toggleStaffMode}>
          {isStaffMode ? 'Close Staff' : 'Staff'}
        </button>
      </div>

      {(isAdminMode || isManagerMode || isStaffMode) && (
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>{isSignup ? 'Signup' : 'Login'}</h2>

          {isSignup && (isManagerMode || isStaffMode) && (
            <>
              <div className="form-group">
                <label>First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {isSignup && (
            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <button type="submit" className="auth-button">
            {isSignup ? 'Signup' : 'Login'}
          </button>

          <p onClick={toggleAuthMode} className="toggle-mode">
            {isSignup ? 'Already have an account? Login' : "Don't have an account? Signup"}
          </p>
        </form>
      )}
    </div>
  );
};

export default AuthPage;


// import React, { useState } from 'react';
// import './Auth.css'; // Ensure to create a CSS file for styling

// const AuthPage = () => {
//   const [isSignup, setIsSignup] = useState(false);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const [isAdminMode, setIsAdminMode] = useState(false);

//   const toggleAuthMode = () => {
//     setIsSignup((prev) => !prev);
//     setFormData({ email: '', password: '', confirmPassword: '' });
//   };

//   const toggleAdminMode = () => {
//     setIsAdminMode((prev) => !prev);
//     setFormData({ email: '', password: '', confirmPassword: '' });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (isSignup && formData.password !== formData.confirmPassword) {
//       alert('Passwords do not match!');
//       return;
//     }

//     try {
//       const endpoint = isSignup ? '/api/signup' : '/api/login';
//       const response = await fetch(endpoint, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: formData.email, password: formData.password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert(`${isSignup ? 'Signup' : 'Login'} successful!`);
//         setFormData({ email: '', password: '', confirmPassword: '' });
//       } else {
//         alert(data.message || 'Something went wrong');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('An error occurred. Please try again later.');
//     }
//   };

//   return (
//     <div className="auth-container">
//       <button className="admin-button" onClick={toggleAdminMode}>
//         {isAdminMode ? 'Close Admin' : 'Admin'}
//       </button>
//       {isAdminMode && (
//         <form className="auth-form" onSubmit={handleSubmit}>
//           <h2>{isSignup ? 'Signup' : 'Login'}</h2>
//           <div className="form-group">
//             <label>Email:</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Password:</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {isSignup && (
//             <div className="form-group">
//               <label>Confirm Password:</label>
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           )}

//           <button type="submit" className="auth-button">
//             {isSignup ? 'Signup' : 'Login'}
//           </button>

//           <p onClick={toggleAuthMode} className="toggle-mode">
//             {isSignup ? 'Already have an account? Login' : "Don't have an account? Signup"}
//           </p>
//         </form>
//       )}
//     </div>
//   );
// };

// export default AuthPage;