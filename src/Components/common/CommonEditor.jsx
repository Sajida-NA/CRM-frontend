// import React from "react";
// import ReactQuill from "react-quill-new";
// import "react-quill-new/dist/quill.snow.css";

// const editorModules = {
//   toolbar: [
//     [{ header: [1, 2, false] }],
//     ["bold", "italic", "underline"],
//     [{ list: "ordered" }, { list: "bullet" }],
//     ["image"],
//   ],
// };

// const CommonEditor = ({
//   label,
//   value,
//   onChange,
//   required = false,
// }) => {
//   return (
//     <div>
//       <label
//         style={{
//           fontStyle: "normal",
//           fontFamily: "Arial, sans-serif",
//           fontSize: "14px",
//           fontWeight: 600,
//           marginBottom: "8px",
//           display: "block",
//         }}
//       >
//         {label}
//         {required && (
//           <span style={{ color: "red" }}> *</span>
//         )}
//       </label>

//       <ReactQuill
//         theme="snow"
//         value={value}
//         onChange={onChange}
//         placeholder="Enter"
//         modules={editorModules}
//         style={{
//           height: "150px",
//           marginBottom: "50px",
//         }}
//       />
//     </div>
//   );
// };

// export default CommonEditor;



import React from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const editorModules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["image"],
  ],
};

const CommonEditor = ({
  label,
  value,
  onChange,
  required = false,
}) => {
  return (
    <div>
      {/* LABEL */}
      <label
        style={{
          fontStyle: "normal",
          fontFamily: "Arial, sans-serif",
          fontSize: "14px",
          fontWeight: 600,
          marginBottom: "8px",
          display: "block",
          color: "#344054",
        }}
      >
        {label}

        {required && (
          <span
            style={{
              color: "#F04438",
              marginLeft: "2px",
            }}
          >
            *
          </span>
        )}
      </label>

      {/* EDITOR */}
      <div
        style={{
          height: "150px",
          marginBottom: "50px",
        }}
      >
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          placeholder="Enter"
          modules={editorModules}
        />
      </div>

      {/* EDITOR STYLES */}
      <style>
        {`
          .ql-editor {
            color: #344054 !important;
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 1.5;
          }

          .ql-editor.ql-blank::before {
            color: #98A2B3 !important;
            font-style: normal;
          }

          .ql-toolbar.ql-snow {
            border: 1px solid #D0D5DD;
            border-radius: 10px 10px 0 0;
          }

          .ql-container.ql-snow {
            border: 1px solid #D0D5DD;
            border-top: none;
            border-radius: 0 0 10px 10px;
          }

          .ql-editor:focus {
            color: #344054 !important;
          }

          .ql-editor p {
            color: #344054 !important;
          }
        `}
      </style>
    </div>
  );
};

export default CommonEditor;
