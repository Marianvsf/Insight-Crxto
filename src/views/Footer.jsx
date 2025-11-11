export const Footer = () => { 
return (
<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center text-teal-500 p-4 font-mono border-gray-50 bg-gradient-to-t from-teal-200 to-white shadow-md">
  <a
    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    href="https://github.com/Marianvsf"
    target="_blank"
    rel="noopener noreferrer"
  >Made by →  
  <img
  className="logo w-9 h-9 rounded-full border border-white"
  src="/github.png"
  alt="logo"
  width={35} 
  height={35}
  priority
  />
  Marian Suárez
  </a>
</footer>
)
}