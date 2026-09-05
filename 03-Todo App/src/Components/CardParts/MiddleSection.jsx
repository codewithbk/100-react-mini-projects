import './MiddleSection.css'
import { useEffect, useState } from 'react';
import { FaTriangleExclamation } from "react-icons/fa6";
import Popup from './Popup'




const MiddleSection = ({ workDone , onSearch }) => {
  const [query, setQuery] = useState("");
  const [isEmpty, setEmpty] = useState(false);
  const [isLess, setLess] = useState(false);
  const [isMore, setMore] = useState(false);
  const [popupKey, setPopupKey] = useState(0);

  //  clear input when got the single 
    useEffect(() => {
    if (workDone) {
      setQuery("")
      onSearch("");      
      // child ka kaam
    }
  }, [workDone]);


  const handleSubmit = (e) => {
    e.preventDefault();
    const words = query.trim().split(/\s+/).filter(Boolean).length;

    if (query.trim() === "") {
      setEmpty(true);
      setLess(false);
      setMore(false);
      setPopupKey(prev => prev + 1);
      onSearch(null);
    }

    else if (words >= 20) {
      setEmpty(false);
      setLess(true);
      setMore(false);
      setPopupKey(prev => prev + 1);
      onSearch(null);
    }
    
    else if (words <= 2){
     setEmpty(false);
      setLess(false);
      setMore(true);
      setPopupKey(prev => prev + 1);
      onSearch(null);

    }

    else {
      setEmpty(false);
      setLess(false);
      setMore(false);
      onSearch(query);
    }
  };

  return (
    <>
      {(isEmpty && <Popup key={`empty-${popupKey}`} logo={<FaTriangleExclamation />} message='Input cannot be Empty ' duration={4} />)}
      {(isLess && <Popup key={`less-${popupKey}`} logo={<FaTriangleExclamation />} message='Input cannot be greater than 20 words ' duration={4} />)}
      {(isMore && <Popup key={`less-${popupKey}`} logo={<FaTriangleExclamation />} message='Your Input can be greater than 2 words ' duration={4} />)}
     <form onSubmit={handleSubmit} className="todoForm">

  <div className="inputWrapper">
    <input
      className="todoInput"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="What do you want to do?"
    />

    {query && (
      <button
        type="button"
        className="inputCancelBtn"
        onClick={() => setQuery("")}
        aria-label="Clear input"
      >
        ×
      </button>
    )}
  </div>

  <button className="addBtn">
    <span>+</span>
  </button>

</form>
    </>
  )
}

export default MiddleSection