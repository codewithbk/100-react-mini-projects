import './Css/Crad.css'
import { FaLeaf } from "react-icons/fa";       // Easy - halka/simple feel
import { FaBolt } from "react-icons/fa";       // Medium - thoda energy/effort
import { FaFire } from "react-icons/fa";       // Hard - intense/tough feel
import { FaGithub } from "react-icons/fa"
import { FaRocket } from "react-icons/fa";

const Card = ({ id, title, difficulty, tags, para, githublink, img, liveLink }) => {
  return (

    <div className="cardsBody">
      <div className="chips">

        {(difficulty == 'easy') ? <div className="easy chipstag">
          <span className='chipss' ><FaLeaf /> Easy</span>
        </div> : ''}

        {(difficulty == 'medium') ? <div className="medium chipstag">
          <span className='chipss' ><FaBolt /> Medium</span>
        </div> : ''}

        {(difficulty == 'hard') ? <div className="hard chipstag">
          <span className='chipss' ><FaFire /> Hard</span>
        </div> : ''}


      </div>
      <div className="topsection">
        <img className='cardImg' src={img} alt="" />
      </div>
      <div className="bottomSection">
        <div className="textEni">
          <div className="cardtitle">
            <h2>{title}</h2>
          </div>
          <div className="cardPara">
            <p>{para}</p>
          </div>
        </div>
        <div className="tagsSection">
          {tags.map((item) => (
            <div className="tags">
              <span>{item}</span>
            </div>
          ))}
        </div>
        <div className="buttonsection">
          <div className="gitSourceCode">
            <button className='gitrepobtn'> <a href={githublink} className="hidedefaultlink" target="_blank" rel="noopener noreferrer"> <FaGithub /> <span className="gitrepotxt"
            >Github</span></a></button>
          </div>
          <div className="livesite">
            <button className='livesitebtn' > <a className='hidedefaultlink' target='_blank' href={liveLink} rel="noopener noreferrer"> <FaRocket /> Live</a> </button>
          </div>
        </div>

      </div>
    </div>

  )
}

export default Card