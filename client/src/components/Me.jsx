export default function Me() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    
    if(!user){ window.location.href = "/" };

    return (
      <div className="profile">
        <div className="me">
          <div className="sepicon"></div>
          <p><span>First Name:</span> {user.firstName}</p>
          <p><span>Last Name:</span> {user.lastName}</p>
          <p><span>Email:</span> {user.email}</p>
          <p><span>Role:</span> {user.role}</p>
        </div>
      </div>
    )
}
