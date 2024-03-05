// Dependencies;
import { useState } from "react";

export default function EditModal(props) {
  const { currentProfileId, setCurrentProfileId, profiles, setProfiles, isVisible, setIsModalVisible, addCall , putCall} = props;
  const currentProfileData = profiles.find(
    (profile) => profile.id === currentProfileId,
  );
  const [formData, setFormData] = useState(currentProfileData);
  const [errors, setErrors] = useState({
    name: false,
    email: "",
    phone: "",
    website: false,
  });
  const emailRegex = /(.+)@(.+){2,}\.(.+){2,}/;
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "phone" && (value.length > 10 || isNaN(value))) {
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const errorFields = {};
    if (!formData?.name) {
      errorFields.name = true;
    }
    if (!formData.email) {
      errorFields.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errorFields.email = "Invaid Email";
    }
    if (!formData.phone) {
      errorFields.phone = "Phone number is required";
    }
    if (!formData.website) {
      errorFields.website = true;
    }
    if (Object.keys(errorFields).length === 0) {
      if(currentProfileId) {
        const updatedProfiles = profiles.map((profile) => {
          if (profile.id === currentProfileId) {
            return formData;
          } else {
            return profile;
          }
        });
        setProfiles(updatedProfiles);
        putCall(formData);

      } else {
        setProfiles([...profiles, formData]);
        addCall(formData);
      }
      setCurrentProfileId(null);
      setIsModalVisible(false);
    }
    setErrors(errorFields);
  };

  const onCancel = () => {
    setCurrentProfileId(null);
    setIsModalVisible(false);
  };

  const validateFormItem = (e) => {
    // Handles name and website fields validation
    if (
      !e.target.value &&
      (e.target.name !== "phone" || e.target.name !== "email")
    ) {
      setErrors({ ...errors, [e.target.name]: true });
    } else {
      setErrors({ ...errors, [e.target.name]: false });
    }

    // Handles phone number validation
    if (e.target.name === "phone") {
      if (!e.target.value) {
        setErrors({ ...errors, [e.target.name]: "Phone number is required" });
      } 
      else {
        setErrors({ ...errors, [e.target.name]: false });
      }
    }

    // Handles Email validation
    if (e.target.name === "email") {
      if (!e.target.value) {
        setErrors({ ...errors, [e.target.name]: "Email is required" });
      } else if (!emailRegex.test(e.target.value)) {
        setErrors({
          ...errors,
          [e.target.name]: "Invaid Email",
        });
      } else {
        setErrors({ ...errors, [e.target.name]: false });
      }
    }
  };

  return (
    <div>
      <div
        id="myModal"
        className="modal"
        style={isVisible ? { display: "block" } : { display: "none" }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <span className="close" onClick={onCancel}>
              &times;
            </span>
            <h4>{currentProfileId ? 'Edit Profile' : 'Add Profile'}</h4>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-items">
                <div className="form-item">
                  <label>Name:</label>
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData?.name}
                      onChange={handleChange}
                      onBlur={validateFormItem}
                    />
                    {errors.name && <p className="error">Name is required</p>}
                  </div>
                </div>
                <div className="form-item">
                  <label>Email:</label>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData?.email}
                      onChange={handleChange}
                      onBlur={validateFormItem}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                  </div>
                </div>
                <div className="form-item">
                  <label>Phone:</label>
                  <div>
                    <input
                      type="text"
                      name="phone"
                      value={formData?.phone}
                      onChange={handleChange}
                      onBlur={validateFormItem}
                    />
                    {errors.phone && <p className="error">{errors.phone}</p>}
                  </div>
                </div>
                <div className="form-item">
                  <label>Website:</label>
                  <div>
                    <input
                      type="text"
                      name="website"
                      value={formData?.website}
                      onChange={handleChange}
                      onBlur={validateFormItem}
                    />
                    {errors.website && (
                      <p className="error">Website is required</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={onCancel}
                  className="cancel-button"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="ok-button"
                >
                  OK
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}