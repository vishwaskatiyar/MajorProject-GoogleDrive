import { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import firebase from "firebase";
import { storage, db } from "../../../firebase";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const NewFile = () => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    setUploading(true);

    storage
      .ref(`files/${file.name}`)
      .put(file)
      .then((snapshot) => {
        console.log(snapshot);

        storage
          .ref("files")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("myFiles").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: file.name,
              fileUrl: url,
              size: snapshot._delegate.bytesTransferred,
            });

            setUploading(false);
            setOpen(false);
            setFile(null);

            alert("Upload successful!");
          });

        storage
          .ref("files")
          .child(file.name)
          .getMetadata()
          .then((meta) => {
            console.log(meta.size);
          });
      });
  };

  return (
    <div className="newFile p-4 bg-gray-100 rounded-lg shadow-md relative">
      <div
        className="newFile__container flex items-center cursor-pointer"
        onClick={handleOpen}
      >
        <AddIcon fontSize="large" className="text-blue-500" />
        <p className="ml-2 text-lg font-semibold text-blue-500">New</p>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div
          style={modalStyle}
          className={`${classes.paper} bg-white p-6 rounded-lg shadow-lg`}
        >
          <p className="text-lg font-medium mb-4">
            Select files you want to upload!
          </p>
          {uploading ? (
            <p className="text-blue-500">Uploading...</p>
          ) : (
            <>
              <input type="file" onChange={handleChange} className="mb-4" />
              <button
                onClick={handleUpload}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Upload
              </button>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default NewFile;
