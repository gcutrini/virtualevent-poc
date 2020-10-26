import React, { useState, useRef, useEffect } from 'react'
import AvatarEditor from 'react-avatar-editor'

import styles from '../styles/profile.module.scss'

const ProfilePopupComponent = ({ userProfile, closePopup, showProfile, changePicture, changeProfile }) => {

  const editorRef = useRef(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");

  const [image, setImage] = useState(null);
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });
  const [scale, setScale] = useState(1.2);
  const [rotate, setRotate] = useState(0);
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);

  useEffect(() => {
    setFirstName(userProfile.first_name);
    setLastName(userProfile.last_name);
    setCompany(userProfile.company);
    setImage(userProfile.pic)
    return () => {
      setFirstName('');
      setLastName('');
      setCompany('');
    };
  }, [])

  const handleNewImage = (e) => {
    setImage(e.target.files[0]);
  }

  const handleScale = (e) => {
    const scale = parseFloat(e.target.value);
    setScale(scale);
  }

  const handlePositionChange = (position) => {
    setPosition(position);
  }

  const rotateLeft = (e) => {
    e.preventDefault();
    setRotate(rotate - 90);
  }
  const rotateRight = (e) => {
    e.preventDefault();
    setRotate(rotate + 90);
  }

  const onClickSave = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImage().toDataURL();
      changePicture(canvas);
    }
    if (userProfile.first_name !== firstName ||
      userProfile.last_name !== lastName ||
      userProfile.company !== company) {
        const newProfile = {
          first_name: firstName,
          last_name: lastName,
          company: company
        }
        changeProfile(newProfile)
    }
  }

  return (

    < div className={`${styles.modal} ${showProfile ? styles.isActive : ''}`}>
      <div className={`${styles.modalBackground}`} onClick={() => closePopup()}></div>
      <div className={`${styles.modalCard} ${styles.profilePopup}`}>
        <header className={`${styles.modalCardHead}`}>
          <p className={`${styles.modalCardTitle}`}>Edit profile</p>
          <i onClick={() => closePopup()} className={`${styles.closeIcon} fa fa-times icon is-large`}></i>
        </header>
        <section className={`${styles.modalCardBody}`}>
          <div className={styles.modalCardPicture}>
            <div className={styles.title}>Profile picture</div>
            <div className={styles.picture}>
              <AvatarEditor
                ref={editorRef}
                image={image}
                width={width}
                height={height}
                border={50}
                color={[0, 0, 0, 0.8]} // RGBA
                position={position}
                onPositionChange={handlePositionChange}
                scale={scale}
                borderRadius={5}
                crossOrigin={'anonymous'}
                rotate={parseFloat(rotate)}
              />
              <div className={styles.imageUpload}>
                <label for="file-input">
                  <i className={`${styles.pictureIcon} fa fa-2x fa-camera icon is-large`}></i>
                </label>
                <input name="newImage" id="file-input" type="file" accept=".jpg,.jpeg,.png" onChange={handleNewImage} />
              </div>
              <div>
                <div className={`columns ${styles.inputRow}`}>
                  <div className='column is-one-quarter'>Zoom:</div>
                  <div className='column is-two-thirds'>
                    <input
                      name="scale"
                      type="range"
                      max="2"
                      onChange={(e) => handleScale(e)}
                      step="0.01"
                      defaultValue="1"
                    />
                  </div>
                </div>
                <div className={`columns ${styles.inputRow}`}>
                  <div className='column is-one-quarter'>Rotate:</div>
                  <div className='column is-two-thirds'>
                    <button className={`button is-large ${styles.button}`} onClick={rotateLeft}>
                      <i className={`fa fa-undo icon is-large`} />Left
                  </button>
                    <button className={`button is-large ${styles.button}`} onClick={rotateRight}>
                      <i className={`fa fa-undo icon is-large`} />Right
                  </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div className={styles.modalCardForm}>
            <div className={styles.title}>Profile Info</div>
            <div className={styles.form}>
              <div className={`columns ${styles.inputRow}`}>
                <div className='column is-one-quarter'>First Name</div>
                <div className='column is-two-thirds'>
                  <input
                    className={`${styles.input} ${styles.isMedium}`}
                    type="text"
                    placeholder="First Name"
                    onChange={e => setFirstName(e.target.value)}
                    value={firstName} />
                </div>
              </div>
              <div className={`columns ${styles.inputRow}`}>
                <div className='column is-one-quarter'>Last Name</div>
                <div className='column is-two-thirds'>
                  <input
                    className={`${styles.input} ${styles.isMedium}`}
                    type="text"
                    placeholder="Last Name"
                    onChange={e => setLastName(e.target.value)}
                    value={lastName} />
                </div>
              </div>
              <div className={`columns ${styles.inputRow}`}>
                <div className='column is-one-quarter'>Company</div>
                <div className='column is-two-thirds'>
                  <input
                    className={`${styles.input} ${styles.isMedium}`}
                    type="text"
                    placeholder="Company"
                    onChange={e => setCompany(e.target.value)}
                    value={company}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer className={`${styles.modalCardFoot}`}>
          <button onClick={() => closePopup()} className="button is-large">Discard</button>
          <button onClick={() => onClickSave()} className="button is-large">Update</button>
        </footer>
      </div>
    </div >
  )
}

export default ProfilePopupComponent