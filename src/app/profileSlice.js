import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: { name: "", experience: "", designation: "", desc: "", url: "" },
  customForm: [{ title: "", desc: "", list: [] }],
};
const addProfileData = (state, action) => {
      const { key, value } = action.payload;
      return {
        ...state,
        profile: {
          ...state.profile,
          [key]: value,
        },
      };
}
    const addCustomData = (state, action) => {
      const { key, value, index } = action.payload;
      if (index === state.customForm.length) {
        return {
          ...state,
          customForm: [...state.customForm, { title: "", desc: "", list: [] }],
        };
      }
      return {
        ...state,
        customForm: state.customForm.map((item, i) =>
          i === index ? { ...item, [key]: value } : item
        ),
      };
    }
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    addUserProfileFormData: addProfileData,
    addCustomProfileData: addCustomData,
  },
});

export const { addUserProfileFormData, addCustomProfileData } =
  profileSlice.actions;
export default profileSlice.reducer;
