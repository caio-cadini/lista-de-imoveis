import Logo from '../assets/Welhome-logo.webp'

function Header() {
  return (
    <>
      <header className="absolute top-0 z-50 w-full bg-white/80 backdrop-blur shadow py-7 pl-7">
        <div >
          <img
            src={Logo}
            alt="Welhome"
            loading="lazy"
          />
        </div>
      </header>
    </>
  )
}

export default Header