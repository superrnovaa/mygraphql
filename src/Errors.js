export function Error() {
    
    return (
      <div className="Error">
        <h2 className="sign">{'Error 404 page not found'}</h2>
      </div>
    );
  }

export default Error


export function Loading() {
   const template = document.querySelector('.App');
   template.innerHTML = `  <div className="Error">
   <h2 className="sign">{'Loading .....'}</h2>
 </div>`
}