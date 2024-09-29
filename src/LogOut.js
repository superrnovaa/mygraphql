
export function handleLogout() {
    sessionStorage.removeItem('jwt');
    window.location.href = "/";
  }

  export default handleLogout;