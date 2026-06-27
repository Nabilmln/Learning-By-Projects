function UploadButton({ onUpload }) {
  return (
    <label className="upload-story">
      +
      <input type="file" hidden accept="image/*" onChange={onUpload} />
    </label>
  );
}

export default UploadButton;
