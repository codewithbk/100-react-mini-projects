import './Css/header.css'

const Header = () => {
  return (
    <section className='header'>
      <div className="headerContent">
        <h1 className='heroText' ><span className='highlightHeader'>Welcome</span> 100 React Mini <span className="boldHeader">Projects</span></h1>
        <p className='heropara'>Har project ek naya concept sikhata hai — from basics to advanced.</p>
      </div>
    </section>
  )
}

export default Header