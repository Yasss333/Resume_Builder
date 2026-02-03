  const query=new URLSearchParams(window.location.search);
  const urlState= query.get('query');


                         <p>Updated on {new Date(resume.updatedAt).toLocaleDateString}</p>
onClick={e=>e.stopPropagation()}


@layer base{
  botton{
    @apply cursor-pointer;
  } 
  input:not([type="checkbox"]){
    @apply outline-none focus:ring border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-lg 
  }
   
}