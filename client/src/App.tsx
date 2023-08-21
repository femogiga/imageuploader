import './App.css';
import Avatar from './component/Avatar';
import Card from './component/Card';
import cardImage from './assets/image.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProgressCard from './component/ProgressCard';
import SuccessCard from './component/SuccessCard';

// import ProgressCard from './component/ProgressCard';

//

function App() {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [uploadProgress, setUploadProgress] = useState<boolean>(true);
  const [newPhoto, setNewPhoto] = useState('');
  const [clipboardText, setClipboardText] = useState('');

  function handleFile(files) {
    //alert('Number of file ' + files.length);
    setUploadProgress(false);

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    axios
      .post('http://localhost:9000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percent = (loaded / total) * 100;

          //  console.log(`${loaded} bytes of ${total} bytes. ${percent}%`);
          setProgress(percent);

          // }
        },
      })
      .then((res) => {
        setNewPhoto(res.data.path);
        if (res.status === 200) {
          //  setProgress(0);

          setUploadProgress(true);
          setProgress(0);
          console.log(res.data);
        }
        // if (progress === 0) {
        //   setUploadProgress(true);
        //   return;
        // }

        console.log(res);
      })
      .catch((e) => console.error(e));
  }

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files);
      console.log('dropped number of files', e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files);
    }
  };

  useEffect(() => {
     setClipboardText(`http://localhost:9000/${newPhoto}`);
  }, [progress, uploadProgress, newPhoto, clipboardText]);

  const handleCopyChange = () => {
    //setClipboardText(e.target.value);
   setClipboardText(`http://localhost:9000/${newPhoto}`);

  };

  const handleCopyClick = () => {
    console.log('copy clicked', clipboardText);
    navigator.clipboard.writeText(clipboardText);
  };

  return (
    <div className='app'>
      {uploadProgress ? (
        <Card onSubmit={(e) => e.preventDefault()} onDragEnter={handleDrag}>
          <div>
            <h2>Upload your image</h2>
            <p>File should be Jpeg,Png</p>
          </div>

          <Avatar
            // src={cardImage}
            src={`http://localhost:9000/${newPhoto}`}
            onDragEnter={(e) => handleDrag(e)}
            onDragLeave={(e) => handleDrag(e)}
            onDrop={(e) => handleDrop(e)}
            onDragOver={handleDrag}
          />
          <p>Or</p>
          <div className='file-cont'>
            <button type='button'>Choose a file</button>
            <input
              type='file'
              onChange={handleChange}
              multiple
              id='files'
              name='files'
              accept='.jpg, .jpeg, .png,.gif,.svg'
            />
          </div>
        </Card>
      ) : (
        <ProgressCard percent={progress} />
      )}
      {/* <ProgressCard percent={progress}/> */}

      <SuccessCard
        src={`http://localhost:9000/${newPhoto}`}
        newPhoto={newPhoto}
        onChange={handleCopyChange}
        onClick={handleCopyClick}
      />
    </div>
  );
}

export default App;
