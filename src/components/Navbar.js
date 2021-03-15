export default function NavBar ({setSelectedTab}) {

    return(
      <div>
        <div onClick={() => setSelectedTab('search')}>Search</div>
        <div onClick={() => setSelectedTab('Netflix')}>Netflix</div>
        <div onClick={() => setSelectedTab('Hulu')}>Hulu</div>
      </div>
    )
  }
