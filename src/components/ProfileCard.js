import {useState, useRef} from 'react'
import {FaMapMarkerAlt, FaEdit} from "react-icons/fa"


function ProfileCard() {
    const [isRotated, setIsRotated] = useState(false);
    const [userData, setUserData] = useState(()=>{
            const savedData=JSON.parse(localStorage.getItem("userData"))
            return savedData || {fName:"Teodora", lName:"Dimovska", location:"Kicevo", profilePic: "../images/ProfilePicture.jpg"}
    })
    

    const [editedData, setEditedData] = useState(userData)
    const inputFile = useRef(null) 
    
    const onRotate = () => {
          setIsRotated((rotated) => !rotated)
          setEditedData(userData)
         
    }
    const handleSave = ()=>{
            if(editedData.lName != "" && editedData.fName !="" && editedData.location!=""){
                    setUserData(editedData)               
                    localStorage.setItem("userData",JSON.stringify(userData));
                    onRotate()
                 
            }else{
                alert("All fields require input")
            }

    }
    const imgClick = ()=>{
            inputFile.current.click();
    }
    const onImageChange= (event) => {
        if (event.target.files && event.target.files[0]) {
            const [file] = event.target.files;
            setEditedData({...userData,profilePic: URL.createObjectURL(file)})     
       }
    } 
    
    return(
        <div className='container'>
            <div className={`card ${isRotated ? 'rotated' : ''}`}>
                    <div className="front">    
                    <FaEdit className='rotateBtn'  onClick={onRotate}> </FaEdit>
                        <div className='details'>
                        <img id="frontImg" src={userData.profilePic} />

                        <p>{userData.fName}</p>
                        <p>{userData.lName}</p>
                        <div className='location'>
                            <FaMapMarkerAlt style={{marginRight: "10px"}}></FaMapMarkerAlt>
                            <h2>{userData.location}</h2>
                        </div>
                        </div>

                    </div>
                    <div className="back">   
                    <div className='details'>
                        <div>
                            <img id="backImg" src={userData.profilePic}  />
                            <span id="changeBtn" onClick={()=>imgClick()}>Change</span>
                            <input type="file" id="inputFile"  ref={inputFile} accept=".jpg,.jpeg,.png" 
                            onChange={onImageChange} style={{ display: 'none' }} />
        
                        </div>
                        

                        <input type="text"  value={editedData.fName} placeholder="Enter your first name"
                        onChange={(e)=>setEditedData({...editedData, fName:e.target.value})}/>
                        <input type="text" value={editedData.lName} placeholder="Enter your last name"
                        onChange={(e)=>setEditedData({...editedData, lName:e.target.value})}/>
                    
                       
                        <div className='location'>
                            <FaMapMarkerAlt style={{marginRight: "10px"}}></FaMapMarkerAlt>
                            <input type="text"  value={editedData.location} placeholder="Enter your office location"  
                            onChange={(e)=>setEditedData({...editedData, location:e.target.value})}/>
                        </div>
                        
                        
                        </div>
                     <div className='backBtns'>
                            <button className='btn' onClick={()=>onRotate()}>Close</button>
                            <button className='btn' onClick={()=>handleSave()}>Save</button>
                        </div>
                    </div>
                        
                </div>

        </div>

     
    );
  }
export default ProfileCard