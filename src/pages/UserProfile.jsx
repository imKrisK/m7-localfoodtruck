import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Navbar from "../components/navbar";

const defaultAvatar = "/src/assets/LFTlogo.png";

const UserProfile = () => {
  const { currentUser, handleUpdateUser } = useUserContext();
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ ...currentUser });
  const [avatar, setAvatar] = useState(currentUser.avatar || defaultAvatar);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        setForm({ ...form, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser({ ...form, avatar });
    setEditMode(false);
  };

  return (
    <>
      <Navbar />
      <div className="form_container" style={{ maxWidth: 420, margin: '40px auto', background: '#fff', borderRadius: 8, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', padding: 32 }}>
        <h2 style={{ textAlign: 'center' }}>User Profile</h2>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
          <img src={avatar || defaultAvatar} alt="avatar" style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', marginBottom: 12, border: '2px solid #eee' }} />
          {editMode && (
            <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ marginBottom: 12 }} />
          )}
        </div>
        {editMode ? (
          <form onSubmit={handleSubmit} autoComplete="off">
            <InputField
              label="Name:"
              name="name"
              value={form.name || ""}
              onChange={handleChange}
              required
              autoComplete="off"
            />
            <InputField
              label="Email:"
              name="email"
              value={form.email || ""}
              onChange={handleChange}
              required
              autoComplete="off"
            />
            <InputField
              label="Password:"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password || ""}
              onChange={handleChange}
              required
              autoComplete="new-password"
              style={{ marginBottom: 0 }}
            />
            <label style={{ fontSize: 14, marginBottom: 12, display: 'block' }}>
              <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(v => !v)} style={{ marginRight: 6 }} /> Show Password
            </label>
            <Button type="submit">Save</Button>
            <Button type="button" onClick={() => setEditMode(false)} style={{ marginLeft: 8 }}>
              Cancel
            </Button>
          </form>
        ) : (
          <>
            <p><b>Name:</b> {currentUser.name || "-"}</p>
            <p><b>Email:</b> {currentUser.email || "-"}</p>
            <Button onClick={() => setEditMode(true)}>Edit Profile</Button>
          </>
        )}
      </div>
    </>
  );
};

export default UserProfile;
