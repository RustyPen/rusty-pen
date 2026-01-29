import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <img src="/logo/1x1/1.png" alt="Rusty Pen Logo" className="logo-image" />
          <h1 className="app-title">Rusty Pen</h1>
        </div>
        <p className="app-slogan">笔可能生锈，思想不会</p>
      </div>
    </header>
  )
}

export default Header
