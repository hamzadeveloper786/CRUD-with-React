import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Trash, Github, Linkedin, Whatsapp, Youtube, PencilSquare} from "react-bootstrap-icons";
import './home.css'

const Home = () => {

    const postTitleInputRef = useRef(null);
    const postBodyInputRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isAlert, setIsAlert] = useState(null);
    const [allPosts, setAllPosts] = useState([]);
    const [toggleRefresh, setToggleRefresh] = useState(false);

    const getAllPosts = async () => {
        try{
        setIsLoading(true);
        const response = await axios.get(`/api/v1/posts`);
        console.log(response.data);
        setIsLoading(false);
        setAllPosts(response.data);
    }catch(e){
        console.log(e.data);
        setIsLoading(false);
    }
    return ()=>{
        setIsLoading(false);
}
    }
    useEffect(()=>{
        getAllPosts();
        return ()=>{}
    }
    ,[toggleRefresh]);

    const submitHandler = async (e)=>{
        e.preventDefault();
        try{
        setIsLoading(true);

        const response = await axios.post(`/api/v1/post`, {
            title: postTitleInputRef.current.value,
            text: postBodyInputRef.current.value
        })
        setIsLoading(false)
        console.log(response.data);
        setIsAlert(response.data.message);
        setToggleRefresh(!toggleRefresh)
    }
        catch(e){
            console.log(e);
            setIsLoading(false)
            return;
        }
    }

    const deletePostHandler = async (_id) => {
        try {
          setIsLoading(true);
          const response = await axios.delete(`/api/v1/post/${_id}`);
    
          setIsLoading(false);
          console.log(response.data);
          setToggleRefresh(!toggleRefresh);
        } catch (error) {
          // handle error
          console.log(error?.data);
          setIsLoading(false);
        }
      };

    const editPost = async (e) => {
        e.preventDefault();
        const _id = e.target.children[0].value;
        const title = e.target.children[1].value;
        const text = e.target.children[2].value;
        try{
            setIsLoading(true);
          const response = await axios.put(`/api/v1/post/${_id}`,{
            title: title,
            text: text
          });
    
          setIsLoading(false);
          console.log(response.data);
          setToggleRefresh(!toggleRefresh);
        }catch(e){
            console.log(e);
            setIsLoading(false);
            return;

        }
    }

    return (<div>
            <row className="space-around">
        <h1 className="bi bi-activity green"> Mongo DB</h1>
        <div className="dropdown">
            <button className="drop-down" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <h2 className="bi bi-three-dots-vertical dots"></h2>
            </button>
            <ul className="dropdown-menu">
                <li className="list"><a href="https://github.com/hamzadeveloper786"
                        className="drop-down-options" type="button"><Github/> GitHub</a></li>
                <li className="list"><a href="https://linkedin.com/in/ameer-hamza-8a34ba27b/"
                        className="drop-down-options" type="button"><Linkedin/> LinkedIn</a></li>
                <li className="list"><a href="https://wa.me/+923333737701" className="drop-down-options"
                        type="button"><Whatsapp/> WhatsApp</a></li>
                <li className="list"><a href="https://www.youtube.com/@john_hamza/"
                        className="drop-down-options" type="button"><Youtube/> YouTube</a></li>
            </ul>
        </div>
    </row>
      <fieldset>
        <legend>Create a Post</legend>
        <form onSubmit={submitHandler}>
            <label htmlFor="postTitleInput">Title</label>
            <input type="text" placeholder="Enter Post Title" id="postTitleInput" required minLength={2} maxLength={50} ref={postTitleInputRef}/>
            <br />
            <label htmlFor="postBodyInput">Text</label>
            <textarea id="postBodyInput" required minLength={10} maxLength={999} cols="30" rows="4" placeholder="Write Something on your Mind...." ref={postBodyInputRef}></textarea>
            <br />
            <button type="submit">Publish Post</button>
        </form>
      </fieldset>
      <div className="loader">
      {isAlert && <p className="alert">{isAlert}</p>}
      <br />
      {isLoading ? <div className="spinner-container"><div className="loading-spinner"></div></div> : null}
      </div>
      <br />
      <div>
        {allPosts.map((post, index)=>(
            <div key={post._id} className="post-container" >
                {(post.isEdit)?
                                <form onSubmit={editPost}>
                                    <input type="text" disabled hidden value={post._id}/>
                                <input type="text" defaultValue={post.title} />
                                <textarea defaultValue={post.text} cols="30" rows="4"></textarea>
                                <button type="submit">Save</button>
                                <button type="button" onClick={()=>{
                                    post.isEdit = false;
                                    setAllPosts([...allPosts]);
                                }} >Cancel</button>
                                <span>{isLoading && <div className="spinner-container"><div className="loading-spinner"></div></div>}</span>
                            </form> : 
                <div>
                <h2>{post.title}</h2><div className="dropdown" id="dropDown">
            <button className="drop-down" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <p className="bi bi-three-dots-vertical dots"></p>
            </button>
            <ul className="dropdown-menu">
                <li className="list"><button type="button"onClick={() => {
                     post.isEdit= true;
                     setAllPosts([...allPosts]);
                    }}><PencilSquare/> Edit</button></li>
                <li className="list"><button type="button" onClick={(e) => {
                    deletePostHandler(post._id);
                  }}><Trash/> Delete</button></li>
            </ul>
        </div>
                <p>{post.text}</p>
                </div>}
            </div> 
        ))}
        <br/>
      </div>
    </div>
  );

}

export default Home;